# SkillSpector scan — [`berlinbra/polymarket-mcp`](https://github.com/berlinbra/polymarket-mcp)

> **Static pattern-match signals, pending human triage** — NOT verdicts, and NOT the curated safety score.
> SkillSpector runs static analysis only here (`--no-llm`), which over-flags heavily: the atlas's *safest* curated repo scans as CRITICAL. These signals are triage input, never a ranking. For the human-reviewed safety score of `berlinbra/polymarket-mcp`, see the [main README](../../README.md) and [methodology](../methodology.md).

**Scanner grade:** 🔴 flagged-critical (untriaged) · SkillSpector v2.3.7

| Field | Value |
|---|---|
| Scanner risk score | 78/100 |
| Scanner severity | HIGH |
| Scanner recommendation | DO_NOT_INSTALL |
| Post-baseline counts | 🔴 1 C · 🟠 1 H · 🟡 1 M · ⚪ 1 L |
| Suppressed by baseline | 0 |
| Coverage | 100% (partial — LLM meta-analysis skipped) |
| Scanned head_sha | `0b36c7169c85` |

**Baseline:** none yet — counts are raw static signal, expect false positives. See [baselines](../../data/skillspector-baselines/README.md).

## Findings

| Severity | Location | Category | Confidence | Finding |
|---|---|---|---|---|
| 🔴 Critical | `pyproject.toml:12` | Supply Chain | 0.9 | httpx |
| 🟠 High | `pyproject.toml:11` | Supply Chain | 0.8 | mcp |
| 🟡 Medium | `pyproject.toml:13` | Supply Chain | 0.7 | python-dotenv |
| ⚪ Low | `LICENSE:16` | Excessive Agency | 0.7 | NOT LIMITED TO |

