# Ranking methodology

Every entry in [`data/repos.yaml`](../data/repos.yaml) is scored on four curated axes (0–5 integers, evidence-dated) plus one computed axis. Weighted total → percentage of max → tier. Hard flags override scores entirely.

## Weights and tiers

| Axis | Weight | Curated? |
|---|---|---|
| Safety | ×3 | yes |
| Provenance | ×2 | yes |
| Capability | ×2 | yes |
| Agent fit | ×2 | yes |
| Maintenance | ×2 | **no — computed** |

Tier thresholds (share of max score): **S ≥ 80%** · **A ≥ 65%** · **B ≥ 45%** · **C** below. Safety carries the highest weight because the atlas's core promise is "safest", and because a capability gap costs you a feature while a safety gap costs you a wallet.

## Per-level anchors

Scores are anchored so two reviewers land on the same number. Score the level whose description fits best; don't average adjacent levels.

### Safety (×3)

| Level | Anchor |
|---|---|
| 5 | Demo-by-default **and** explicit opt-in flags for real-money writes **and** spend/order caps enforced client-side; clean env-only key handling; read/write tools separated |
| 4 | Clean key handling plus at least one real guard (confirm-first writes, demo mode, caps) — or read-only by design with no key surface at all where writes would be expected |
| 3 | Standard env-var keys, client-side signing, no extra rails — the baseline for honest trading code |
| 2 | Works but sloppy: unclear key flow, stale deps on the signing path, broad credential scope in one process |
| 1 | Red flags short of exfiltration: hardcoded third-party endpoints for signed traffic, keys accepted via CLI args, secrets in logs |
| 0 | Exfiltration or credential harvesting — auto-blacklist via `key_exfil` flag |

### Provenance (×2)

| Level | Anchor |
|---|---|
| 5 | Official venue org |
| 4 | Official-adjacent (venue-endorsed, or registry package documented as official) |
| 3 | Established maintainer: real history, multiple contributors or a track record beyond this repo |
| 2 | Single community dev, real inspectable code |
| 1 | Unknown or trust-damaged: throwaway account, engagement metrics inconsistent with history (star/fork ratios, hype-doc floods) |
| 0 | Misattributed or impersonating |

### Capability (×2)

Scored against the venue surface the category implies (an MCP server is scored on tools exposed; an SDK on API coverage).

| Level | Anchor |
|---|---|
| 5 | Full surface: market data + streaming + order lifecycle + portfolio/settlement (+ margin where the venue has it) |
| 4 | Most of the surface; one meaningful gap (e.g. no streaming, or no settlement ops) |
| 3 | Solid working subset — usable for real flows without forking |
| 2 | Narrow slice (data-only, single asset class, one workflow) |
| 1 | Minimal / demo-grade |

### Agent fit (×2)

| Level | Anchor |
|---|---|
| 5 | Built *for* an agent harness: MCP server or skill with quality schemas, confirm-gated write tools, progressive-disclosure docs — or a native harness plugin |
| 4 | MCP/skill present and functional, or exceptionally agent-friendly interface (typed structured output designed for tool use) |
| 3 | Agent-usable with light glue: JSON-output CLI, well-typed SDK with good docs |
| 2 | Usable as a library; agent integration is your problem |
| 1 | Hostile to automation (interactive-only, undocumented) |

### Maintenance (×2) — computed, never curated

From `data/live.json`, at the pinned `data/as-of.txt` date, using `days = now − max(pushed_at, released_at)`:

| Days since activity | Score |
|---|---|
| ≤ 30 | 5 |
| ≤ 90 | 4 |
| ≤ 180 | 3 |
| ≤ 365 | 2 |
| > 365 | 1 |
| archived | 0 |

Registry-only entries (no public source repo) use the release date alone — official SDKs decay on the same clock as everyone else.

## Hard flags and precedence

`scam` > `key_exfil` > `archived` > idle-cap. The first two route to the 🚩 Flagged table (dangerous); `archived` routes to Deprecated (dead but possibly instructive) — the distinction matters, an archived official framework is not malware. Idle > 180 days caps the tier at B unless `official_dormant` is set (an official surface we accept as dormant, stated in the entry's notes).

## What is deliberately NOT scored

- **Stars/popularity** — displayed as context, never scored: scam repos buy stars, and star-weighting would churn tiers weekly.
- **Our own usage** — the atlas records evidence anyone can re-check, not anecdotes.

## Evidence discipline

- Every entry carries `evidence` strings prefixed with the verification date.
- A score without evidence fails the schema gate (`bun test`).
- Negative claims ("no official X exists") rot silently — they must be dated where they appear.
- Two dates, never conflated: `data/as-of.txt` is the **liveness reference** (decay clock, bumped by the weekly scan); `data/curated-as-of.txt` is when a **human** last reviewed the curated scores — only humans touch it. The README renders both.
- **Review-pinned SHA (drift detection):** an entry may record `reviewed_sha` — the default-branch HEAD at the time its safety review was done. The weekly scan records the current head in `live.json`; when they differ, the README flags "commits since safety review". This catches the attack liveness metrics can't: a good repo turning bad *after* its review. New/updated safety scores should set `reviewed_sha` from `live.json`'s `head_sha`.
- `license_missing` renders a "⚠️ no license" caveat on the row — legal status of embedding is undefined until the author adds one.
