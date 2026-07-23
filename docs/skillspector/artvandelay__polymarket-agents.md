# SkillSpector scan — [`artvandelay/polymarket-agents`](https://github.com/artvandelay/polymarket-agents)

> **Static pattern-match signals, pending human triage** — NOT verdicts, and NOT the curated safety score.
> SkillSpector runs static analysis only here (`--no-llm`), which over-flags heavily: the atlas's *safest* curated repo scans as CRITICAL. These signals are triage input, never a ranking. For the human-reviewed safety score of `artvandelay/polymarket-agents`, see the [main README](../../README.md) and [methodology](../methodology.md).

**Scanner grade:** 🔴 flagged-critical (untriaged) · SkillSpector v2.3.7

| Field | Value |
|---|---|
| Scanner risk score | 100/100 |
| Scanner severity | CRITICAL |
| Scanner recommendation | DO_NOT_INSTALL |
| Post-baseline counts | 🔴 2 C · 🟠 4 H · 🟡 2 M · ⚪ 1 L |
| Suppressed by baseline | 0 |
| Coverage | 100% (partial — LLM meta-analysis skipped) |
| Scanned head_sha | `feeffc1f67f9` |

**Baseline:** none yet — counts are raw static signal, expect false positives. See [baselines](../../data/skillspector-baselines/README.md).

## Findings

| Severity | Location | Category | Confidence | Finding |
|---|---|---|---|---|
| 🔴 Critical | `pyproject.toml:12` | Supply Chain | 0.9 | httpx |
| 🔴 Critical | `pyproject.toml:16` | Supply Chain | 0.9 | pyyaml |
| 🟠 High | `pyproject.toml:11` | Supply Chain | 0.8 | mcp |
| 🟠 High | `pyproject.toml:13` | Supply Chain | 0.8 | pydantic |
| 🟠 High | `pyproject.toml:14` | Supply Chain | 0.8 | websockets |
| 🟠 High | `src/domains/cricket/prompts.py:51` | System Prompt Leakage | 0.85 | return prompt |
| 🟡 Medium | `pyproject.toml:15` | Supply Chain | 0.7 | python-dotenv |
| 🟡 Medium | `README.md:282` | Excessive Agency | 0.85 | tools: * |
| ⚪ Low | `LICENSE:16` | Excessive Agency | 0.7 | NOT LIMITED TO |

