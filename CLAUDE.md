# CLAUDE.md — Prediction Market Agent Atlas

Data-driven knowledgebase ranking prediction-market LLM-integration repos. Bun + TypeScript.

## Commands

```bash
bun install
bun run gate       # bun test + README drift check — run before every commit
bun run scan       # refresh data/live.json from GitHub/PyPI/npm (network)
bun run generate   # regenerate README ranking tables
```

## Rules

- **README ranking tables are GENERATED** between the BEGIN/END markers — never hand-edit them; edit `data/repos.yaml` and run `bun run generate`.
- **`maintenance` is a computed axis** (from `data/live.json` + `data/as-of.txt`) — never add it to curated scores; the schema gate rejects it.
- Every entry needs **dated evidence strings**; scores follow the anchors in `docs/methodology.md`.
- `data/live.json` is committed and carries **no timestamp** (scan date lives in the commit message) — keeps the gate offline-deterministic and weekly auto-commits diff-only.
- Hard-flag precedence: `scam` > `key_exfil` > `archived` > idle-cap. Blacklist (dangerous) ≠ Deprecated (dead but instructive).
- 🚩 flag phrasing is always "matches signatures on DATE" — dated pattern-match claims, never verdicts on intent. Appeals: CONTRIBUTING.md.
- Stars are displayed, never scored (scam repos buy them).
