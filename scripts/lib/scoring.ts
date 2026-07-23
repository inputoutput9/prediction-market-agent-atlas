/**
 * Scoring engine. Pure functions only — no I/O — so the whole rubric is
 * testable and the README generator + weekly scan share one code path.
 *
 * Curated axes (hand-reviewed, evidence-dated in data/repos.yaml):
 *   provenance, capability, safety, agent_fit — each 0-5.
 * Computed axis (never curated — staff-review C2):
 *   maintenance — derived from live.json activity dates at generate time.
 */

export const WEIGHTS = {
  provenance: 2,
  capability: 2,
  safety: 3, // "safest" is the atlas's promise — weighted highest
  agent_fit: 2,
  maintenance: 2,
} as const;

export type Axis = keyof typeof WEIGHTS;
export const CURATED_AXES = [
  "provenance",
  "capability",
  "safety",
  "agent_fit",
] as const satisfies readonly Axis[];

export const MAX_SCORE = Object.values(WEIGHTS).reduce((a, w) => a + 5 * w, 0);

export type Tier = "S" | "A" | "B" | "C";
const TIER_THRESHOLDS: Array<{ tier: Tier; min: number }> = [
  { tier: "S", min: 0.8 },
  { tier: "A", min: 0.65 },
  { tier: "B", min: 0.45 },
];

export const VENUES = ["kalshi", "polymarket", "cross-venue"] as const;
export const CATEGORIES = [
  "mcp-server",
  "sdk-client",
  "agent-framework",
  "skill",
  "cli",
  "data-backtesting",
] as const;
export const HARD_FLAGS = [
  "scam",
  "key_exfil",
  "archived",
  "official_dormant",
  "license_missing",
] as const;

export type Venue = (typeof VENUES)[number];
export type Category = (typeof CATEGORIES)[number];
export type HardFlag = (typeof HARD_FLAGS)[number];

export interface RepoEntry {
  id: string;
  venue: Venue;
  category: Category;
  url?: string;
  /** Publisher shown as "by <owner>". GitHub entries derive it from the id
   * (`owner/repo`); registry-only entries (id has no `/`) set it here. */
  owner?: string;
  packages?: { pypi?: string; npm?: string };
  scores?: { provenance: number; capability: number; safety: number; agent_fit: number };
  hard_flags?: HardFlag[];
  /** default-branch HEAD sha at the time the safety review was done —
   * the weekly scan records the current head in live.json, and the README
   * flags commits-since-review drift. */
  reviewed_sha?: string;
  evidence: string[];
  notes?: string;
}

export interface LiveEntry {
  stars?: number;
  pushed_at?: string;
  archived?: boolean;
  latest_version?: string;
  released_at?: string;
  head_sha?: string;
  removed?: boolean;
  stale?: boolean;
}

export const IDLE_CAP_DAYS = 180;

/** Days since last observed activity: max(repo push, latest package release). */
export function daysSinceActivity(live: LiveEntry, now: Date): number | undefined {
  const dates = [live.pushed_at, live.released_at]
    .filter((d): d is string => Boolean(d))
    .map((d) => new Date(d).getTime());
  if (dates.length === 0) return undefined;
  return Math.floor((now.getTime() - Math.max(...dates)) / 86_400_000);
}

export function maintenanceScore(live: LiveEntry, now: Date): number {
  if (live.archived) return 0;
  const days = daysSinceActivity(live, now);
  if (days === undefined) return 0;
  if (days <= 30) return 5;
  if (days <= 90) return 4;
  if (days <= 180) return 3;
  if (days <= 365) return 2;
  return 1;
}

export type Verdict =
  | { state: "blacklist"; reason: "scam" | "key_exfil" }
  | { state: "deprecated"; reason: "archived" | "removed" }
  | { state: "ranked"; tier: Tier; score: number; pct: number; capped: boolean };

/**
 * Hard-flag precedence (staff-review S6): scam > key_exfil > archived/removed
 * > idle-cap. Blacklist (dangerous) and Deprecated (dead but possibly
 * instructive) are distinct terminal states, never mixed into the ranked
 * tiers. A repo deleted from GitHub (`removed`) can never stay ranked —
 * takedowns are the strongest possible liveness signal.
 */
export function computeVerdict(entry: RepoEntry, live: LiveEntry, now: Date): Verdict {
  const flags = entry.hard_flags ?? [];
  if (flags.includes("scam")) return { state: "blacklist", reason: "scam" };
  if (flags.includes("key_exfil")) return { state: "blacklist", reason: "key_exfil" };
  if (flags.includes("archived") || live.archived) return { state: "deprecated", reason: "archived" };
  if (live.removed) return { state: "deprecated", reason: "removed" };

  if (!entry.scores) throw new Error(`${entry.id}: ranked entry missing scores`);
  const maintenance = maintenanceScore(live, now);
  const score =
    entry.scores.provenance * WEIGHTS.provenance +
    entry.scores.capability * WEIGHTS.capability +
    entry.scores.safety * WEIGHTS.safety +
    entry.scores.agent_fit * WEIGHTS.agent_fit +
    maintenance * WEIGHTS.maintenance;
  const pct = score / MAX_SCORE;

  let tier: Tier = "C";
  for (const t of TIER_THRESHOLDS) {
    if (pct >= t.min) {
      tier = t.tier;
      break;
    }
  }

  // Idle decay cap: a repo idle past IDLE_CAP_DAYS can't rank above B, unless
  // it's an official surface we deliberately accept as dormant.
  const days = daysSinceActivity(live, now);
  let capped = false;
  if (
    days !== undefined &&
    days > IDLE_CAP_DAYS &&
    !flags.includes("official_dormant") &&
    (tier === "S" || tier === "A")
  ) {
    tier = "B";
    capped = true;
  }
  return { state: "ranked", tier, score, pct, capped };
}

/** Schema validation (staff-review S3) — unknown enum/range = throw, never skip. */
export function validateEntry(raw: Record<string, unknown>): RepoEntry {
  const e = raw as unknown as RepoEntry;
  const fail = (msg: string) => {
    throw new Error(`repos.yaml entry ${JSON.stringify(raw.id ?? "<no id>")}: ${msg}`);
  };
  if (!e.id || typeof e.id !== "string") fail("missing string id");
  if (!VENUES.includes(e.venue)) fail(`invalid venue ${JSON.stringify(e.venue)}`);
  if (!CATEGORIES.includes(e.category)) fail(`invalid category ${JSON.stringify(e.category)}`);
  for (const f of e.hard_flags ?? []) {
    if (!HARD_FLAGS.includes(f)) fail(`invalid hard_flag ${JSON.stringify(f)}`);
  }
  if (!Array.isArray(e.evidence) || e.evidence.length === 0) {
    fail("evidence[] required — every entry carries dated evidence");
  }
  // Terminal states (blacklist, deprecated) never reach the scorer.
  const terminal = (e.hard_flags ?? []).some(
    (f) => f === "scam" || f === "key_exfil" || f === "archived",
  );
  if (!terminal) {
    if (!e.scores) fail("scores required for non-blacklisted entries");
    for (const axis of CURATED_AXES) {
      const v = e.scores![axis];
      if (typeof v !== "number" || v < 0 || v > 5 || !Number.isInteger(v)) {
        fail(`scores.${axis} must be an integer 0-5, got ${JSON.stringify(v)}`);
      }
    }
    if ("maintenance" in (e.scores as object)) {
      fail("maintenance is computed from live data, never curated");
    }
  }
  if (!e.url && !e.packages?.pypi && !e.packages?.npm) {
    fail("entry needs a url or at least one package ref");
  }
  return e;
}
