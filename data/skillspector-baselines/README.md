# SkillSpector baselines — the human-reviewed false-positive ledger

SkillSpector's **static** analysis (`--no-llm`) over-flags heavily: the atlas's
safest curated repo (`cejor6/kalshi-mcp-server`, curated safety 5/5) scans as
CRITICAL/100/DO_NOT_INSTALL with 71 findings — including `getattr(logging, ...)`
tagged "Dangerous Code Execution" at 0.5 confidence. Raw counts are triage
signal, not a verdict.

A **baseline** is a curated, human-owned suppression file that records "a human
reviewed these findings and judged them false positives / accepted risk". Once
committed, the scanner drops them before scoring, so future scans report only
**NEW** findings — the file becomes this repo's *provenly-reviewed* ledger for
that repo.

## Files

- One YAML per scanned repo, named by the entry's slug (`owner/repo` →
  `owner__repo.yaml`), matching `data/skillspector/<slug>.json`.
- Curated and human-owned — like the curated scores in `data/repos.yaml`, the
  scanner NEVER writes these. A machine-generated baseline that suppresses
  everything unreviewed would defeat the point.

## Generating one (after review)

```bash
# 1. Read data/skillspector/<slug>.json and confirm each finding is a false
#    positive or an accepted risk for THIS repo.
# 2. Generate the suppression file:
skillspector baseline https://github.com/<owner>/<repo> \
  -o data/skillspector-baselines/<slug>.yaml --no-llm
# 3. Re-run the scan; it now reports only findings NOT in the baseline:
bun run scan:skillspector --only <owner>/<repo>
```

Committing the baseline flips that repo's scanner grade from
`… (untriaged)` to a triaged grade in `docs/skillspector/`. It does **not**
touch the curated safety score — those two systems are deliberately separate.
