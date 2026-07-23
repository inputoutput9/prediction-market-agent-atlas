/**
 * Weekly liveness scan. Refreshes data/live.json from GitHub / PyPI / npm.
 *
 * Failure policy (per-repo, never whole-run): on any fetch error the previous
 * values are kept and the entry is stamped `stale: true`; a GitHub 404 keeps
 * the row but stamps `removed: true` (flagged repos get taken down — the
 * takedown IS the story, so rows are never dropped).
 *
 * live.json carries NO timestamp — the scan date lives in the commit message —
 * so re-running against unchanged registries is byte-idempotent and the
 * weekly auto-commit only fires on real changes.
 *
 *   bun scripts/scan.ts
 */
import { readFileSync, writeFileSync } from "node:fs";
import { parse } from "yaml";
import { validateEntry, type LiveEntry, type RepoEntry } from "./lib/scoring";

const ROOT = new URL("..", import.meta.url).pathname;
const LIVE_PATH = `${ROOT}data/live.json`;

const raw = parse(readFileSync(`${ROOT}data/repos.yaml`, "utf-8")) as {
  entries: Record<string, unknown>[];
};
const entries: RepoEntry[] = raw.entries.map(validateEntry);
const live = JSON.parse(readFileSync(LIVE_PATH, "utf-8")) as Record<string, LiveEntry>;

const ghToken =
  process.env.GITHUB_TOKEN ??
  (() => {
    try {
      return Bun.spawnSync(["gh", "auth", "token"]).stdout.toString().trim() || undefined;
    } catch {
      return undefined;
    }
  })();

async function getJson(url: string): Promise<{ status: number; body?: Record<string, unknown> }> {
  const headers: Record<string, string> = { "User-Agent": "prediction-market-agent-atlas" };
  if (ghToken && url.startsWith("https://api.github.com/")) {
    headers.Authorization = `Bearer ${ghToken}`;
  }
  const res = await fetch(url, { headers });
  if (!res.ok) return { status: res.status };
  return { status: res.status, body: (await res.json()) as Record<string, unknown> };
}

const day = (iso: unknown): string | undefined =>
  typeof iso === "string" && iso.length >= 10 ? iso.slice(0, 10) : undefined;

let failures = 0;
for (const entry of entries) {
  const prev = live[entry.id] ?? {};
  const next: LiveEntry = { ...prev };
  delete next.stale;

  if (entry.url?.startsWith("https://github.com/")) {
    const slug = entry.url.replace("https://github.com/", "");
    try {
      const { status, body } = await getJson(`https://api.github.com/repos/${slug}`);
      if (status === 404) {
        next.removed = true;
      } else if (body) {
        delete next.removed;
        next.stars = Number(body.stargazers_count ?? prev.stars ?? 0);
        next.pushed_at = day(body.pushed_at) ?? prev.pushed_at;
        next.archived = Boolean(body.archived);
      } else {
        next.stale = true;
        failures++;
      }
    } catch {
      next.stale = true;
      failures++;
    }
  }

  try {
    if (entry.packages?.pypi) {
      const { body } = await getJson(`https://pypi.org/pypi/${entry.packages.pypi}/json`);
      if (body) {
        const info = body.info as Record<string, unknown>;
        const version = String(info.version);
        next.latest_version = version;
        const files = (body.releases as Record<string, Array<{ upload_time?: string }>>)[version];
        next.released_at = day(files?.[0]?.upload_time) ?? next.released_at;
      }
    } else if (entry.packages?.npm) {
      const { body } = await getJson(
        `https://registry.npmjs.org/${encodeURIComponent(entry.packages.npm)}`,
      );
      if (body) {
        const version = String((body["dist-tags"] as Record<string, string>).latest);
        next.latest_version = version;
        next.released_at = day((body.time as Record<string, string>)[version]) ?? next.released_at;
      }
    }
  } catch {
    next.stale = true;
    failures++;
  }

  live[entry.id] = next;
}

// Deterministic key order so diffs are minimal and reviewable.
const sorted = Object.fromEntries(
  entries.map((e) => [e.id, live[e.id]]).filter(([, v]) => v !== undefined),
);
writeFileSync(LIVE_PATH, `${JSON.stringify(sorted, null, 2)}\n`);
console.log(`scanned ${entries.length} entries, ${failures} fetch failure(s)`);
process.exit(0);
