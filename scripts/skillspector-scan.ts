/**
 * SkillSpector scan driver. Clones + static-scans every in-scope repo, writes a
 * normalized, timestamp-free artifact per repo, then regenerates the docs.
 *
 * NETWORK + slow (~20s/repo) — deliberately NOT wired into `bun run gate`
 * (which must stay offline-deterministic). Run via `bun run scan:skillspector`.
 *
 * SHA-gate: an entry is skipped when its committed artifact's head_sha already
 * equals live.json's head_sha for that id (repo unchanged since last scan), so
 * the weekly CI sweep only re-scans repos that actually moved.
 *   --force        rescan everything, ignoring the sha-gate
 *   --only <id>    scan a single entry (e.g. cejor6/kalshi-mcp-server)
 *   --llm-delta    escalation pass (CI): for every repo whose fresh static
 *                  counts ROSE vs the last committed artifact (git show HEAD),
 *                  re-scan WITH the LLM analyzer and overwrite its artifact+doc.
 *                  Requires ANTHROPIC_API_KEY + SKILLSPECTOR_PROVIDER=anthropic.
 *
 * Failure policy (per-repo, never whole-run): a clone error / nonzero exit
 * writes a {id, head_sha, error} artifact and the sweep continues; the driver
 * exits nonzero at the very end so CI notices, AFTER writing every artifact.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { parse } from "yaml";
import { validateEntry, type LiveEntry, type RepoEntry } from "./lib/scoring";
import {
  inScope,
  normalizeArtifact,
  serializeArtifact,
  slugFor,
  totalCount,
  type SkillspectorArtifact,
} from "./lib/skillspector";
import { generateDocs } from "./skillspector-docs";

const ROOT = new URL("..", import.meta.url).pathname;
const ARTIFACT_DIR = `${ROOT}data/skillspector`;
const BASELINE_DIR = `${ROOT}data/skillspector-baselines`;

const args = process.argv.slice(2);
const force = args.includes("--force");
const llmDelta = args.includes("--llm-delta");
const onlyIdx = args.indexOf("--only");
const only = onlyIdx !== -1 ? args[onlyIdx + 1] : undefined;

const entries: RepoEntry[] = (
  parse(readFileSync(`${ROOT}data/repos.yaml`, "utf-8")) as { entries: Record<string, unknown>[] }
).entries.map(validateEntry);
const live = JSON.parse(readFileSync(`${ROOT}data/live.json`, "utf-8")) as Record<string, LiveEntry>;

let due = entries.filter(inScope);
if (only) {
  due = due.filter((e) => e.id === only);
  if (due.length === 0) {
    console.error(`--only ${only}: not an in-scope entry`);
    process.exit(1);
  }
}

const artifactPath = (id: string) => `${ARTIFACT_DIR}/${slugFor(id)}.json`;
const baselinePath = (id: string) => `${BASELINE_DIR}/${slugFor(id)}.yaml`;

/** True when the committed artifact is already for the current head_sha. */
function upToDate(entry: RepoEntry): boolean {
  const p = artifactPath(entry.id);
  if (!existsSync(p)) return false;
  const liveSha = live[entry.id]?.head_sha;
  if (!liveSha) return false; // no known head → always rescan
  try {
    const prev = JSON.parse(readFileSync(p, "utf-8")) as SkillspectorArtifact;
    return prev.head_sha === liveSha && !prev.error;
  } catch {
    return false;
  }
}

// Per-repo wall-clock cap so one hung clone can't stall the whole sweep (and, in
// CI, burn to the job timeout — a cancelled job skips the `!cancelled()` commit
// step, losing every other repo's fresh artifact). The LLM pass makes API calls
// so it gets a larger budget. ponytail: fixed ceiling; env-override if a legit
// large clone ever needs more.
const scanTimeoutMs = (llm: boolean): number =>
  Number(process.env.SKILLSPECTOR_TIMEOUT_MS) || (llm ? 600_000 : 180_000);

async function scan(entry: RepoEntry, llm = false): Promise<SkillspectorArtifact> {
  const headSha = live[entry.id]?.head_sha;
  const tmp = `${ARTIFACT_DIR}/.raw-${slugFor(entry.id)}.json`;
  const cmd = ["skillspector", "scan", entry.url!, "--format", "json", "-o", tmp];
  if (!llm) cmd.push("--no-llm"); // static-only; LLM pass omits it to enable meta-analysis
  // A reviewed baseline drops known false positives before scoring; --show-suppressed
  // keeps them counted in suppressed_count so the ledger stays visible.
  if (existsSync(baselinePath(entry.id))) {
    cmd.push("--baseline", baselinePath(entry.id), "--show-suppressed");
  }
  // NOTE: skillspector exits nonzero when it FINDS high-severity issues (like a
  // linter), so exit code is NOT a failure signal. A scan succeeded iff it wrote
  // a parseable report; a real failure (clone error) leaves no valid output.
  // On timeout Bun kills the process and resolves `.exited` (code 143) — it falls
  // through to the error path below, same as any other non-completing scan.
  const proc = Bun.spawn(cmd, { stdout: "pipe", stderr: "pipe", timeout: scanTimeoutMs(llm) });
  const code = await proc.exited;
  try {
    if (existsSync(tmp)) {
      const raw = JSON.parse(readFileSync(tmp, "utf-8")) as Record<string, unknown>;
      if (raw.risk_assessment || raw.issues) return normalizeArtifact(raw, entry.id, headSha);
    }
    const lastLine = (await new Response(proc.stderr).text()).trim().split("\n").pop() || "";
    const err = proc.killed ? `timed out after ${scanTimeoutMs(llm)}ms (killed)` : lastLine || `exit ${code}`;
    return { id: entry.id, head_sha: headSha, error: err.slice(0, 200) };
  } catch (e) {
    return { id: entry.id, head_sha: headSha, error: `parse failure: ${String(e).slice(0, 150)}` };
  } finally {
    if (existsSync(tmp)) Bun.spawnSync(["rm", "-f", tmp]);
  }
}

mkdirSync(ARTIFACT_DIR, { recursive: true });

// Previous committed counts for an artifact (HEAD version), or 0 if new/absent.
function committedTotal(id: string): number {
  const rel = `data/skillspector/${slugFor(id)}.json`;
  const out = Bun.spawnSync(["git", "-C", ROOT, "show", `HEAD:${rel}`]);
  if (out.exitCode !== 0) return 0;
  try {
    const prev = JSON.parse(out.stdout.toString()) as SkillspectorArtifact;
    return prev.counts ? totalCount(prev.counts) : 0;
  } catch {
    return 0;
  }
}

// LLM escalation pass: re-scan (with the LLM meta-analyzer) only the repos whose
// fresh static counts rose vs the last commit — an increase is where the cheap
// static pass most needs the LLM's higher-precision second look.
if (llmDelta) {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.log("--llm-delta: ANTHROPIC_API_KEY not set — skipping LLM pass (static-only)");
    process.exit(0);
  }
  const risen = due.filter((entry) => {
    const p = artifactPath(entry.id);
    if (!existsSync(p)) return false;
    try {
      const cur = JSON.parse(readFileSync(p, "utf-8")) as SkillspectorArtifact;
      return !cur.error && cur.counts !== undefined && totalCount(cur.counts) > committedTotal(entry.id);
    } catch {
      return false;
    }
  });
  console.log(`--llm-delta: ${risen.length} repo(s) with risen static counts → LLM re-scan`);
  let llmErr = 0;
  for (const entry of risen) {
    console.log(`llm-scan ${entry.id} …`);
    const artifact = await scan(entry, true);
    writeFileSync(artifactPath(entry.id), serializeArtifact(artifact));
    if (artifact.error) {
      llmErr++;
      console.error(`  ERROR ${entry.id}: ${artifact.error}`);
    }
  }
  const n = generateDocs();
  console.log(`llm-delta done: ${risen.length} re-scanned, ${llmErr} errored, docs regenerated (${n} repos)`);
  if (llmErr > 0) process.exit(1);
  process.exit(0);
}

let errored = 0;
let scanned = 0;
for (const entry of due) {
  if (!force && upToDate(entry)) {
    console.log(`skip ${entry.id} — artifact up to date (head_sha ${live[entry.id]?.head_sha})`);
    continue;
  }
  console.log(`scan ${entry.id} …`);
  const artifact = await scan(entry);
  writeFileSync(artifactPath(entry.id), serializeArtifact(artifact));
  scanned++;
  if (artifact.error) {
    errored++;
    console.error(`  ERROR ${entry.id}: ${artifact.error}`);
  } else {
    const c = artifact.counts!;
    console.log(`  ${entry.id}: ${c.critical}C/${c.high}H/${c.medium}M/${c.low}L`);
  }
}

const n = generateDocs();
console.log(`done: ${scanned} scanned, ${errored} errored, docs regenerated (${n} in-scope repos)`);
// CI must go red if any repo failed — but only after every artifact + doc is written.
if (errored > 0) process.exit(1);
