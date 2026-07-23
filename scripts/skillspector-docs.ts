/**
 * Regenerate the SkillSpector docs tree from COMMITTED artifacts only — no
 * network, deterministic — so it runs in CI after the static (and optional LLM
 * delta) scan pass, and locally without cloning anything.
 *
 *   bun scripts/skillspector-docs.ts          # write docs, delete orphans
 *   bun scripts/skillspector-docs.ts --check  # OFFLINE drift gate: exit 1 if
 *                                             # committed docs/artifacts drifted
 *
 * Reads data/skillspector/<slug>.json + data/skillspector-baselines/<slug>.yaml
 * and writes docs/skillspector/<slug>.md + docs/skillspector/README.md.
 *
 * A repo delisted from repos.yaml (or moved out of scanner scope) must not leave
 * a stale report or artifact behind: generate deletes orphan docs/artifacts;
 * --check treats an orphan (or any missing/stale/extra file) as drift.
 */
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { parse } from "yaml";
import { validateEntry, type RepoEntry } from "./lib/scoring";
import {
  inScope,
  outOfScopeReason,
  renderIndex,
  renderRepoDoc,
  slugFor,
  type SkillspectorArtifact,
} from "./lib/skillspector";

const ROOT = new URL("..", import.meta.url).pathname;

/** Paths the generator reads/writes. Overridable so the orphan/drift logic is
 * unit-testable against a hermetic tmp tree. */
export interface DocPaths {
  repos: string;
  artifactDir: string;
  baselineDir: string;
  docsDir: string;
}

const DEFAULT_PATHS: DocPaths = {
  repos: `${ROOT}data/repos.yaml`,
  artifactDir: `${ROOT}data/skillspector`,
  baselineDir: `${ROOT}data/skillspector-baselines`,
  docsDir: `${ROOT}docs/skillspector`,
};

export function loadEntries(reposPath = DEFAULT_PATHS.repos): RepoEntry[] {
  const raw = parse(readFileSync(reposPath, "utf-8")) as {
    entries: Record<string, unknown>[];
  };
  return raw.entries.map(validateEntry);
}

/**
 * Build every doc IN MEMORY (basename → content, including README.md) plus the
 * in-scope slug set. Reads committed artifacts/baselines but never writes — so
 * generate and --check share one source of truth for "what SHOULD be on disk".
 */
function buildDocs(paths: DocPaths): {
  docs: Map<string, string>;
  scopedCount: number;
  scopedSlugs: Set<string>;
} {
  const artifactPath = (id: string) => `${paths.artifactDir}/${slugFor(id)}.json`;
  const baselinePath = (id: string) => `${paths.baselineDir}/${slugFor(id)}.yaml`;

  const entries = loadEntries(paths.repos);
  const scoped = entries.filter(inScope);
  const scopedSlugs = new Set(scoped.map((e) => slugFor(e.id)));

  const docs = new Map<string, string>();
  const indexRows: Array<{ entry: RepoEntry; artifact?: SkillspectorArtifact; hasBaseline: boolean }> = [];
  for (const entry of scoped) {
    const hasBaseline = existsSync(baselinePath(entry.id));
    const p = artifactPath(entry.id);
    if (!existsSync(p)) {
      indexRows.push({ entry, hasBaseline });
      continue;
    }
    const artifact = JSON.parse(readFileSync(p, "utf-8")) as SkillspectorArtifact;
    docs.set(`${slugFor(entry.id)}.md`, renderRepoDoc(artifact, entry, hasBaseline));
    indexRows.push({ entry, artifact, hasBaseline });
  }

  const outOfScope = entries
    .map((entry) => ({ entry, reason: outOfScopeReason(entry) }))
    .filter((x): x is { entry: RepoEntry; reason: string } => x.reason !== undefined);

  docs.set("README.md", renderIndex(indexRows, outOfScope));
  return { docs, scopedCount: scoped.length, scopedSlugs };
}

const listByExt = (dir: string, ext: string): string[] =>
  existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith(ext)) : [];

/** data/skillspector/*.json orphans — a scan report whose slug is no longer in scope. */
const orphanArtifacts = (paths: DocPaths, scopedSlugs: Set<string>): string[] =>
  listByExt(paths.artifactDir, ".json").filter((f) => !scopedSlugs.has(f.slice(0, -".json".length)));

/** Regenerate every doc from committed state and delete orphans. Returns the
 * in-scope entry count. */
export function generateDocs(paths: DocPaths = DEFAULT_PATHS): number {
  const { docs, scopedCount, scopedSlugs } = buildDocs(paths);
  mkdirSync(paths.docsDir, { recursive: true });
  for (const [name, content] of docs) writeFileSync(`${paths.docsDir}/${name}`, content);
  // Orphan docs: any .md on disk the generator didn't just produce.
  for (const f of listByExt(paths.docsDir, ".md")) if (!docs.has(f)) rmSync(`${paths.docsDir}/${f}`);
  // Orphan artifacts: a scan report for a repo no longer in scanner scope.
  for (const f of orphanArtifacts(paths, scopedSlugs)) rmSync(`${paths.artifactDir}/${f}`);
  return scopedCount;
}

/** OFFLINE drift check. Returns a list of drift reasons (empty = in sync):
 * a doc that's missing, stale, or an orphan, or an orphan artifact JSON. */
export function checkDocs(paths: DocPaths = DEFAULT_PATHS): string[] {
  const { docs, scopedSlugs } = buildDocs(paths);
  const drift: string[] = [];
  for (const [name, content] of docs) {
    const p = `${paths.docsDir}/${name}`;
    if (!existsSync(p)) drift.push(`missing docs/skillspector/${name}`);
    else if (readFileSync(p, "utf-8") !== content) drift.push(`stale docs/skillspector/${name}`);
  }
  for (const f of listByExt(paths.docsDir, ".md")) if (!docs.has(f)) drift.push(`orphan docs/skillspector/${f}`);
  for (const f of orphanArtifacts(paths, scopedSlugs)) drift.push(`orphan data/skillspector/${f}`);
  return drift;
}

// Run when invoked directly (not when imported by the driver).
if (import.meta.main) {
  if (process.argv.includes("--check")) {
    const drift = checkDocs();
    if (drift.length > 0) {
      console.error("skillspector docs out of date — run: bun scripts/skillspector-docs.ts");
      for (const d of drift) console.error(`  ${d}`);
      process.exit(1);
    }
    console.log("skillspector docs in sync");
  } else {
    const n = generateDocs();
    console.log(`skillspector docs regenerated (${n} in-scope repos)`);
  }
}
