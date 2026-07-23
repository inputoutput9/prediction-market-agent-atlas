# SkillSpector scan — [`Polymarket/agent-skills`](https://github.com/Polymarket/agent-skills)

> **Static pattern-match signals, pending human triage** — NOT verdicts, and NOT the curated safety score.
> SkillSpector runs static analysis only here (`--no-llm`), which over-flags heavily: the atlas's *safest* curated repo scans as CRITICAL. These signals are triage input, never a ranking. For the human-reviewed safety score of `Polymarket/agent-skills`, see the [main README](../../README.md) and [methodology](../methodology.md).

**Scanner grade:** 🟠 needs-triage (untriaged) · SkillSpector v2.3.7

| Field | Value |
|---|---|
| Scanner risk score | 38/100 |
| Scanner severity | MEDIUM |
| Scanner recommendation | CAUTION |
| Post-baseline counts | 🔴 0 C · 🟠 2 H · 🟡 1 M · ⚪ 0 L |
| Suppressed by baseline | 0 |
| Coverage | 100% (partial — LLM meta-analysis skipped) |
| Scanned head_sha | `91ee44ae113e` |

**Baseline:** none yet — counts are raw static signal, expect false positives. See [baselines](../../data/skillspector-baselines/README.md).

## Findings

| Severity | Location | Category | Confidence | Finding |
|---|---|---|---|---|
| 🟠 High | `authentication.md:160` | Data Exfiltration | 0.8 | os.environ["POLY_BUILDER_API_KEY"] |
| 🟠 High | `authentication.md:161` | Data Exfiltration | 0.8 | os.environ["POLY_BUILDER_SECRET"] |
| 🟡 Medium | `authentication.md:111` | Excessive Agency | 0.85 | auto-deploy |

