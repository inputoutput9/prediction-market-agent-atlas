# SkillSpector scan — [`austron24/kalshi-trader-plugin`](https://github.com/austron24/kalshi-trader-plugin)

> **Static pattern-match signals, pending human triage** — NOT verdicts, and NOT the curated safety score.
> SkillSpector runs static analysis only here (`--no-llm`), which over-flags heavily: the atlas's *safest* curated repo scans as CRITICAL. These signals are triage input, never a ranking. For the human-reviewed safety score of `austron24/kalshi-trader-plugin`, see the [main README](../../README.md) and [methodology](../methodology.md).

**Scanner grade:** 🟠 needs-triage (untriaged) · SkillSpector v2.3.7

| Field | Value |
|---|---|
| Scanner risk score | 24/100 |
| Scanner severity | MEDIUM |
| Scanner recommendation | CAUTION |
| Post-baseline counts | 🔴 0 C · 🟠 1 H · 🟡 0 M · ⚪ 1 L |
| Suppressed by baseline | 0 |
| Coverage | 100% (partial — LLM meta-analysis skipped) |
| Scanned head_sha | `79e2b3ae75a6` |

**Baseline:** none yet — counts are raw static signal, expect false positives. See [baselines](../../data/skillspector-baselines/README.md).

## Findings

| Severity | Location | Category | Confidence | Finding |
|---|---|---|---|---|
| 🟠 High | `commands/finalize.md:423` | Data Exfiltration | 0.85 | Log the session |
| ⚪ Low | `LICENSE:16` | Excessive Agency | 0.7 | NOT LIMITED TO |

