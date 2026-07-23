/**
 * Renders the ranking tables into README.md between BEGIN/END markers, purely
 * from committed files (data/repos.yaml + data/live.json) — no network — so
 * the drift gate (`--check`) runs offline and deterministically.
 *
 * Ordering is total and pinned: tier (S→A→B→C) → weighted score desc → id asc.
 *
 *   bun scripts/generate-readme.ts          # rewrite README section
 *   bun scripts/generate-readme.ts --check  # exit 1 if README is out of date
 */
import { readFileSync, writeFileSync } from "node:fs";
import { parse } from "yaml";
import {
  computeVerdict,
  daysSinceActivity,
  validateEntry,
  MAX_SCORE,
  type LiveEntry,
  type RepoEntry,
  type Verdict,
} from "./lib/scoring";

const ROOT = new URL("..", import.meta.url).pathname;
const README_PATH = `${ROOT}README.md`;
const BEGIN = "<!-- BEGIN GENERATED RANKINGS (bun scripts/generate-readme.ts) -->";
const END = "<!-- END GENERATED RANKINGS -->";

// Two dates, deliberately separate (reflect finding — conflating them made
// the bot falsify the human-review claim weekly):
// - as-of.txt: liveness reference date — the decay clock. Bumped by the scan.
// - curated-as-of.txt: when a human last reviewed the curated scores.
//   ONLY humans touch this file.
// Both pinned in files (not wall-clock) so the gate is deterministic.
const AS_OF = readFileSync(`${ROOT}data/as-of.txt`, "utf-8").trim();
const CURATED_AS_OF = readFileSync(`${ROOT}data/curated-as-of.txt`, "utf-8").trim();
const NOW = new Date(`${AS_OF}T00:00:00Z`);

const raw = parse(readFileSync(`${ROOT}data/repos.yaml`, "utf-8")) as {
  entries: Record<string, unknown>[];
};
const entries: RepoEntry[] = raw.entries.map(validateEntry);
const ids = new Set(entries.map((e) => e.id));
if (ids.size !== entries.length) throw new Error("duplicate entry ids in repos.yaml");
const live = JSON.parse(readFileSync(`${ROOT}data/live.json`, "utf-8")) as Record<
  string,
  LiveEntry
>;

interface Row {
  entry: RepoEntry;
  live: LiveEntry;
  verdict: Verdict;
}
const rows: Row[] = entries.map((entry) => ({
  entry,
  live: live[entry.id] ?? {},
  verdict: computeVerdict(entry, live[entry.id] ?? {}, NOW),
}));

const tierOrder = { S: 0, A: 1, B: 2, C: 3 } as const;
function sortRanked(a: Row, b: Row): number {
  const va = a.verdict as Extract<Verdict, { state: "ranked" }>;
  const vb = b.verdict as Extract<Verdict, { state: "ranked" }>;
  return (
    tierOrder[va.tier] - tierOrder[vb.tier] ||
    vb.score - va.score ||
    (b.live.stars ?? 0) - (a.live.stars ?? 0) ||
    a.entry.id.localeCompare(b.entry.id)
  );
}

const link = (e: RepoEntry): string => {
  if (e.url) return `[\`${e.id}\`](${e.url})`;
  if (e.packages?.pypi) return `[\`${e.id}\`](https://pypi.org/project/${e.packages.pypi}/)`;
  if (e.packages?.npm) return `[\`${e.id}\`](https://www.npmjs.com/package/${e.packages.npm})`;
  return `\`${e.id}\``;
};

const tierBadge = { S: "🟢 **S**", A: "🟡 **A**", B: "🔵 **B**", C: "⚪ **C**" } as const;
const gradeLabel = { S: "🟢 S-tier", A: "🟡 A-tier", B: "🔵 B-tier", C: "⚪ C-tier" } as const;

// Per-axis circle: 🟢 strong (≥4) · 🟡 middling (3) · 🔴 weak (≤2).
const axisCircle = (v: number): string => (v >= 4 ? "🟢" : v === 3 ? "🟡" : "🔴");

// Canonical link target for an entry: GitHub url if present, else the registry.
const entryUrl = (e: RepoEntry): string | undefined =>
  e.url ??
  (e.packages?.pypi
    ? `https://pypi.org/project/${e.packages.pypi}/`
    : e.packages?.npm
      ? `https://www.npmjs.com/package/${e.packages.npm}`
      : undefined);

// Identity cell: `[repo-name](url) by [owner](gh)`. GitHub entries (id =
// `owner/repo`) derive owner from the id and link it to the GitHub profile;
// registry-only entries (no `/`) take owner from the curated `owner` field and
// render it as plain text (no GitHub profile to link).
function identityCell(e: RepoEntry): string {
  const url = entryUrl(e);
  const slash = e.id.indexOf("/");
  if (slash === -1) {
    const repo = url ? `[${e.id}](${url})` : e.id;
    return e.owner ? `${repo} by ${e.owner}` : repo;
  }
  const owner = e.id.slice(0, slash);
  const name = e.id.slice(slash + 1);
  const repo = url ? `[${name}](${url})` : name;
  return `${repo} by [${owner}](https://github.com/${owner})`;
}

// Live shields.io badge strip (benchmark style: flat-square, 2b2b2b/6b6b6b) —
// renders current last-commit/stars/license on every page view, no scan needed
// for DISPLAY. Tiering still computes from the committed scan (deterministic).
const SHIELD = "style=flat-square&labelColor=2b2b2b&color=6b6b6b";
function healthBadges(e: RepoEntry, l: LiveEntry): string {
  if (l.removed) return "🪦 removed from GitHub";
  const imgs: string[] = [];
  if (e.url?.startsWith("https://github.com/")) {
    const slug = e.url.replace("https://github.com/", "");
    imgs.push(
      `<img src="https://img.shields.io/github/last-commit/${slug}?${SHIELD}" alt="last-commit">`,
      `<img src="https://img.shields.io/github/stars/${slug}?${SHIELD}" alt="stars">`,
      `<img src="https://img.shields.io/github/license/${slug}?${SHIELD}" alt="license">`,
    );
  }
  if (e.packages?.pypi) {
    imgs.push(
      `<img src="https://img.shields.io/pypi/v/${e.packages.pypi}?${SHIELD}&label=pypi" alt="pypi">`,
    );
  }
  if (e.packages?.npm) {
    imgs.push(
      `<img src="https://img.shields.io/npm/v/${encodeURIComponent(e.packages.npm)}?${SHIELD}&label=npm" alt="npm">`,
    );
  }
  const strip = imgs.join(" ");
  return l.stale ? `${strip} ⚠️ stale scan` : strip || "—";
}

// Per-entry mini-tables (standalone blocks, NOT list bullets — GitHub renders
// tables inside `- ` bullets unreliably). Each entry is: an identity table
// (repo · grade · weighted score), a description line (caveats + notes), a
// per-axis table (one column each, colored marker by value), then the live
// health badge strip. Entries separated by a horizontal rule.
function rankedList(venue: RepoEntry["venue"]): string {
  const ranked = rows
    .filter((r) => r.entry.venue === venue && r.verdict.state === "ranked")
    .sort(sortRanked);
  const blocks: string[] = [];
  for (const r of ranked) {
    const v = r.verdict as Extract<Verdict, { state: "ranked" }>;
    const s = r.entry.scores!;
    const caveats: string[] = [];
    if (r.entry.hard_flags?.includes("license_missing")) caveats.push("**⚠️ no license.**");
    if (
      r.entry.reviewed_sha &&
      r.live.head_sha &&
      !r.live.head_sha.startsWith(r.entry.reviewed_sha.slice(0, 12))
    ) {
      caveats.push(`**⚠️ commits since safety review (\`${r.entry.reviewed_sha.slice(0, 7)}\`).**`);
    }
    if (v.capped) caveats.push("**⚠️ idle-capped to B.**");
    const desc = [...caveats, r.entry.notes ?? ""].filter(Boolean).join(" ");
    const ax = (name: string, val: number) => `${name}: ${axisCircle(val)} ${val}/5`;
    blocks.push(
      `| Repo | Grade | Score |\n` +
        `|---|---|---|\n` +
        `| ${identityCell(r.entry)} | ${gradeLabel[v.tier]} | ${v.score}/${MAX_SCORE} |\n\n` +
        `${desc}\n\n` +
        `| ${ax("provenance", s.provenance)} | ${ax("capability", s.capability)} | ${ax("safety", s.safety)} | ${ax("agent-fit", s.agent_fit)} | category: \`${r.entry.category}\` |\n` +
        `|---|---|---|---|---|\n\n` +
        `${healthBadges(r.entry, r.live)}`,
    );
  }
  return blocks.join("\n\n---\n\n");
}

function deprecatedTable(): string {
  const dep = rows
    .filter((r) => r.verdict.state === "deprecated")
    .sort((a, b) => a.entry.id.localeCompare(b.entry.id));
  if (dep.length === 0) return "_None currently._";
  const lines = ["| Repo | Status | Last activity | Why it's here |", "|---|---|---|---|"];
  for (const r of dep) {
    const v = r.verdict as Extract<Verdict, { state: "deprecated" }>;
    const status = v.reason === "removed" ? "🪦 removed from GitHub" : "📦 archived";
    lines.push(
      `| ${link(r.entry)} | ${status} | ${r.live.pushed_at ?? "—"} | ${r.entry.notes ?? ""} |`,
    );
  }
  return lines.join("\n");
}

function flaggedTable(): string {
  const flagged = rows
    .filter((r) => r.verdict.state === "blacklist")
    .sort((a, b) => a.entry.id.localeCompare(b.entry.id));
  const lines = ["| Repo | Status | Evidence |", "|---|---|---|"];
  for (const r of flagged) {
    const status = r.live.removed ? "🪦 taken down since flagging" : "🚩 flagged";
    lines.push(`| \`${r.entry.id}\` | ${status} | ${r.entry.evidence.join("; ")} |`);
  }
  return lines.join("\n");
}

const generated = `${BEGIN}

> **${rows.length} entries** · curated scores last human-reviewed **${CURATED_AS_OF}** · liveness data as of **${AS_OF}** (auto-refreshed weekly by the [scan workflow](.github/workflows/scan.yml)). Each entry shows an **identity row** (repo · grade · weighted score / ${MAX_SCORE}), a short description, then a **per-axis row** — provenance/capability/safety/agent-fit, 0–5 each with a colored marker (🟢 ≥4 · 🟡 3 · 🔴 ≤2); maintenance is computed from activity, see [methodology](docs/methodology.md). The badge strip is live GitHub/registry health.

### Kalshi

${rankedList("kalshi")}

### Polymarket

${rankedList("polymarket")}

### Cross-venue

${rankedList("cross-venue")}

### Deprecated / reference-only

Dead or archived code that is still instructive to read — never a dependency.

${deprecatedTable()}

### 🚩 Flagged — do not run

Entries matching known scam-repo signatures (buying stars, README-only "bots", drainer patterns — the signature list is in [docs/safety.md](docs/safety.md)). Flags are evidence-dated claims, not verdicts on intent; corrections welcome via the [appeal path](CONTRIBUTING.md#corrections--appeals).

${flaggedTable()}

${END}`;

const readme = readFileSync(README_PATH, "utf-8");
const start = readme.indexOf(BEGIN);
const end = readme.indexOf(END);
if (start === -1 || end === -1) throw new Error("README markers missing");
const next = readme.slice(0, start) + generated + readme.slice(end + END.length);

if (process.argv.includes("--stdout")) {
  // Emit the assembled README WITHOUT writing — lets the determinism test
  // compare runs without clobbering the tracked file (which would let the gate
  // self-heal committed drift and never fail --check).
  process.stdout.write(next);
} else if (process.argv.includes("--check")) {
  if (next !== readme) {
    console.error("README rankings out of date — run: bun scripts/generate-readme.ts");
    process.exit(1);
  }
  console.log(`README in sync (${rows.length} entries, as of ${AS_OF})`);
} else {
  writeFileSync(README_PATH, next);
  console.log(`README rankings regenerated (${rows.length} entries, as of ${AS_OF})`);
}

// Consistency guard: daysSinceActivity must be defined for every ranked entry,
// or its maintenance score silently bottoms out. Fatal in --check (gate) so a
// data hole can't ship green.
for (const r of rows) {
  if (r.verdict.state === "ranked" && daysSinceActivity(r.live, NOW) === undefined) {
    console.error(`${r.entry.id}: no activity date in live.json — maintenance scored 0`);
    if (process.argv.includes("--check")) process.exitCode = 1;
  }
}
