# Contributing

## Adding a repo

1. Add an entry to `data/repos.yaml`: `id` (owner/repo or package name), `venue`, `category`, `url` and/or `packages`, four curated scores, `evidence` (dated strings — what you checked and when), optional `notes`.
2. Score against the anchors in [docs/methodology.md](docs/methodology.md). Do **not** set a `maintenance` score — it's computed and the gate rejects it.
3. Run `bun scripts/scan.ts` (fills `data/live.json` for the new entry), then `bun scripts/generate-readme.ts`.
4. Gate: `bun test && bun scripts/generate-readme.ts --check` must be green.
5. PR with the evidence in the description. Claims without a command or URL that proves them will be asked for.

## Adding a venue

Add the venue string to `VENUES` in `scripts/lib/scoring.ts`, then add entries. Anything with a GitHub URL or PyPI/npm ref gets scanned and decay-managed automatically. If the venue needs a new registry type (crates, Go modules), extend `scan.ts` in the same PR.

## Corrections & appeals

Rankings are dated opinions, and 🚩 flags are dated pattern-match claims. If your repo is listed and you believe the evidence is wrong or stale:

1. Open an issue titled `appeal: <repo id>` with what changed (or what we misread), with links/commits.
2. We re-run the checks against current state and update the entry + evidence dates either way.
3. Flag removals are handled with priority — a wrong scam flag is the worst bug this repo can have.

## Weekly scan

`.github/workflows/scan.yml` refreshes `data/live.json`, bumps `data/as-of.txt` (the liveness/decay date — never `data/curated-as-of.txt`, which is human-only), regenerates the README, and commits only when something substantive changed (a run that only moves the date line is skipped). Tier moves caused purely by decay are expected and correct — that's the feature.

When you re-review an entry's curated scores: update its evidence dates, set `reviewed_sha` to the current `head_sha` from `data/live.json`, and bump `data/curated-as-of.txt`.
