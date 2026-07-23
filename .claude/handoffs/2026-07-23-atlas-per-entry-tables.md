# Handoff — atlas per-entry table redesign

Created: 2026-07-23
Repo: /Users/james/code/prediction-market-agent-atlas (public, main, GitHub inputoutput9/prediction-market-agent-atlas)
Prev tip: fc24c5e

## Task

Redesign ranked-entry rendering in README. Now = flat 4-line list per entry. Want = per-entry MINI-TABLES.

Per user, each ranked entry becomes:

1. **Identity table** (1 row):
   `| Repo | Grade | Score |`
   → `| [kalshi-mcp-server](https://github.com/cejor6/kalshi-mcp-server) by [cejor6](https://github.com/cejor6) | 🟢 S-tier | 47/55 |`
   - repo cell = `[<repo-name>](<url>) by [<owner>](https://github.com/<owner>)`
   - repo-name = id after `/`; owner = id before `/`.
2. **Description** text below identity table (the notes + any ⚠️ caveats).
3. **Axes table** (1 row), each axis its own column WITH colored circle by value:
   `| provenance: 🟢 5/5 | capability: 🟢 4/5 | safety: 🟡 3/5 | agent-fit: 🟡 3/5 | category: sdk-client |`
   - circle: value ≥4 → 🟢 · =3 → 🟡 · ≤2 → 🔴.
4. **Health badge strip** (last-commit · stars · license · pypi/npm) — reuse existing `healthBadges()`, unchanged.

Sort ranked entries by **tier → score desc → stars desc → id asc** ("rank by tier/score/star counts at top"). Current sort = tier→score→id; ADD stars desc before id.

## Where

- ALL rendering logic: `scripts/generate-readme.ts`, fn `rankedList()` (~line 113). Rewrite to emit the two-table block instead of the 4-line bullet.
- Sort: `sortRanked()` same file (~line 70). Add stars-desc tiebreak. Stars = `r.live.stars ?? 0`.
- Grade label helper: map S→"🟢 S-tier", A→"🟡 A-tier", B→"🔵 B-tier", C→"⚪ C-tier". tierBadge const already near top.
- Score = `${v.score}/${MAX_SCORE}` (MAX_SCORE=55).
- Data types: `RepoEntry`, `LiveEntry`, `Verdict` in `scripts/lib/scoring.ts`. scores = {provenance,capability,safety,agent_fit} each 0-5.

## Gotchas — READ

- **Markdown tables inside `- ` list bullets render UNRELIABLY on GitHub.** Likely must DROP the bullet wrapper — make each entry a standalone block: identity table, blank line, description, blank line, axes table, blank line, badges, then `---` or blank separator. MUST verify render (below). Do NOT assume; render + look.
- **Registry-only entries have NO GitHub owner** (no `entry.url`; only `packages.pypi`/`.npm`). e.g. `kalshi-python-sync`, `kalshi-typescript`. id has no `/`. Identity cell: link repo-name to registry URL, DROP "by [owner]" (or "by official"). Existing `link()` helper already picks pypi/npm URL when no `url`. Handle the no-owner branch explicitly — don't emit `by [undefined]`.
- **Drift gate is now REAL** (fc24c5e fixed it). After editing generator: `bun scripts/generate-readme.ts` to regen, else `bun run gate` fails on drift. Gate = `--check` first then `bun test`.
- **Determinism test** compares `--stdout` runs + committed==generated. Stars come from committed `data/live.json` → deterministic. Fine.
- **Deprecated + Flagged tables**: leave as-is. User asked only re ranked entries.
- Idle-capped + license_missing + drift caveats currently prefixed into `why`. Keep in description text.

## Verify (hard gate)

1. `bun scripts/generate-readme.ts` → regen README.
2. `bun run gate` → must be green (24 tests + drift check).
3. RENDER-VERIFY via GitHub's own markdown API (only trusted check for GitHub table-in-list behavior):
   `sed -n '/### Kalshi/,/### Polymarket/p' README.md | head -N > /tmp/ex.md`
   `gh api markdown -f text="$(cat /tmp/ex.md)" > out.html`
   wrap in GitHub-ish CSS, Chrome headless screenshot, LOOK. Tables must render as real tables, colored circles present, no raw pipes leaking, entries separated cleanly.
   Chrome bin: `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome` `--headless --disable-gpu --screenshot=x.png --window-size=1000,1400 file://...`
4. If tables-in-bullets break → use standalone blocks (no `- `). Re-render.
5. Commit + push. Gate green REQUIRED before push.

## Context

- This supersedes flat-list format (commits 99a34fc → fc24c5e). Intentional redesign per explicit user request. Not a regression.
- README structure: banner SVG → overview.svg hero → TOC → Why → How ranking works → **The Rankings (generated block, BEGIN/END markers — edit generator NOT README)** → Safety → Diagrams → etc.
- Benchmark = awesome-claude-code README (list+badges style). User now wants MORE tabular per entry.
- Health badges style: shields.io flat-square labelColor=2b2b2b color=6b6b6b. Keep.
- Commands: `bun scripts/generate-readme.ts` (regen) · `bun run gate` · `bun scripts/scan.ts` (network, refresh live.json — NOT needed for this task).

## Work Completed (do NOT redo)

- Fact-check of Perplexity Kalshi/Polymarket report → PR #438 on lever-backoffice (separate repo).
- Built this atlas repo: 44 entries, scoring engine, weekly scan Action, docs, diagrams.
- README beautified to benchmark: banner, overview.svg hero, TOC, moved flowcharts to diagrams/.
- Ranked tables → flat list (fixed 6-col cramming).
- Fixed neutered drift gate (proven RED). Gate now real.

## Immediate Next Steps

1. Rewrite `rankedList()` in `scripts/generate-readme.ts` → two-table-per-entry block + grade label + axis-circle helper.
2. Add stars-desc tiebreak to `sortRanked()`.
3. Handle registry-only (no-owner) entries in identity cell.
4. Regen (`bun scripts/generate-readme.ts`), `bun run gate` green.
5. Render-verify via `gh api markdown` + screenshot. Fix table-in-bullet if broken (standalone blocks).
6. Commit + push.

## Blockers / Open Questions

- Table-in-list GitHub render = unknown until tested. Resolve by rendering, not guessing.
- No user decision pending. Format fully specified above.
