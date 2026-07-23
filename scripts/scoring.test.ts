import { describe, expect, it } from "bun:test";
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { parse } from "yaml";
import {
  computeVerdict,
  maintenanceScore,
  validateEntry,
  MAX_SCORE,
  WEIGHTS,
  type LiveEntry,
  type RepoEntry,
} from "./lib/scoring";

const NOW = new Date("2026-07-23T00:00:00Z");
const base: RepoEntry = {
  id: "x/y",
  venue: "kalshi",
  category: "mcp-server",
  url: "https://github.com/x/y",
  scores: { provenance: 5, capability: 5, safety: 5, agent_fit: 5 },
  evidence: ["2026-07-23: test"],
};

describe("maintenance is computed from activity", () => {
  const cases: Array<[string, LiveEntry, number]> = [
    ["fresh push", { pushed_at: "2026-07-20" }, 5],
    ["2 months", { pushed_at: "2026-05-20" }, 4],
    ["5 months", { pushed_at: "2026-03-01" }, 3],
    ["9 months", { pushed_at: "2025-10-20" }, 2],
    [">1 year", { pushed_at: "2025-01-01" }, 1],
    ["archived", { pushed_at: "2026-07-20", archived: true }, 0],
    ["no dates", {}, 0],
    ["release newer than push", { pushed_at: "2025-01-01", released_at: "2026-07-21" }, 5],
    ["registry-only (release date only)", { released_at: "2026-07-21" }, 5],
  ];
  for (const [name, live, want] of cases) {
    it(name, () => expect(maintenanceScore(live, NOW)).toBe(want));
  }
});

describe("tiers and caps", () => {
  it("perfect scores + fresh = S", () => {
    const v = computeVerdict(base, { pushed_at: "2026-07-20" }, NOW);
    expect(v).toMatchObject({ state: "ranked", tier: "S", score: MAX_SCORE });
  });
  it("idle >180d caps an S at B", () => {
    const v = computeVerdict(base, { pushed_at: "2025-12-01" }, NOW);
    expect(v).toMatchObject({ state: "ranked", tier: "B", capped: true });
  });
  it("official_dormant exempts the idle cap", () => {
    const entry = { ...base, hard_flags: ["official_dormant" as const] };
    const v = computeVerdict(entry, { pushed_at: "2025-12-01" }, NOW);
    expect(v).toMatchObject({ state: "ranked", capped: false });
    expect((v as { tier: string }).tier).not.toBe("C");
  });
  it("low scores = C", () => {
    const entry = {
      ...base,
      scores: { provenance: 1, capability: 1, safety: 1, agent_fit: 1 },
    };
    const v = computeVerdict(entry, { pushed_at: "2025-01-01" }, NOW);
    expect(v).toMatchObject({ state: "ranked", tier: "C" });
  });
});

describe("hard-flag precedence: scam > key_exfil > archived > removed", () => {
  it("scam wins over archived", () => {
    const entry = { ...base, hard_flags: ["archived" as const, "scam" as const] };
    expect(computeVerdict(entry, {}, NOW)).toEqual({ state: "blacklist", reason: "scam" });
  });
  it("archived (flag or live) = deprecated, not blacklist", () => {
    expect(computeVerdict(base, { archived: true }, NOW)).toEqual({
      state: "deprecated",
      reason: "archived",
    });
  });
  it("a repo removed from GitHub can never stay ranked", () => {
    const v = computeVerdict(base, { pushed_at: "2026-07-20", removed: true }, NOW);
    expect(v).toEqual({ state: "deprecated", reason: "removed" });
  });
});

describe("schema validation", () => {
  it("rejects unknown venue", () => {
    expect(() => validateEntry({ ...base, venue: "kalshi " })).toThrow(/invalid venue/);
  });
  it("rejects curated maintenance score", () => {
    expect(() =>
      validateEntry({ ...base, scores: { ...base.scores, maintenance: 5 } }),
    ).toThrow(/never curated/);
  });
  it("rejects out-of-range score", () => {
    expect(() =>
      validateEntry({ ...base, scores: { ...base.scores, safety: 6 } }),
    ).toThrow(/integer 0-5/);
  });
  it("requires evidence", () => {
    expect(() => validateEntry({ ...base, evidence: [] })).toThrow(/evidence/);
  });
});

describe("data files", () => {
  it("every repos.yaml entry validates and every ranked one has live data", () => {
    const raw = parse(readFileSync(`${import.meta.dir}/../data/repos.yaml`, "utf-8")) as {
      entries: Record<string, unknown>[];
    };
    const live = JSON.parse(
      readFileSync(`${import.meta.dir}/../data/live.json`, "utf-8"),
    ) as Record<string, LiveEntry>;
    for (const rawEntry of raw.entries) {
      const entry = validateEntry(rawEntry);
      const verdict = computeVerdict(entry, live[entry.id] ?? {}, NOW);
      if (verdict.state === "ranked") {
        expect(live[entry.id], `${entry.id} missing from live.json`).toBeDefined();
      }
    }
  });
  it("weights derive MAX_SCORE (no hardcoded twin)", () => {
    expect(MAX_SCORE).toBe(Object.values(WEIGHTS).reduce((a, w) => a + 5 * w, 0));
  });
});

describe("generator determinism", () => {
  it("generate twice → README byte-identical, --check green", () => {
    const readme = () => readFileSync(`${import.meta.dir}/../README.md`);
    execSync("bun scripts/generate-readme.ts", { cwd: `${import.meta.dir}/..` });
    const first = readme();
    execSync("bun scripts/generate-readme.ts", { cwd: `${import.meta.dir}/..` });
    expect(Buffer.compare(first, readme())).toBe(0);
    execSync("bun scripts/generate-readme.ts --check", { cwd: `${import.meta.dir}/..` });
  });
});
