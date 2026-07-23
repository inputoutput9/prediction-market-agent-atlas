# SkillSpector scan — [`pab1it0/polymarket-mcp`](https://github.com/pab1it0/polymarket-mcp)

> **Static pattern-match signals, pending human triage** — NOT verdicts, and NOT the curated safety score.
> SkillSpector runs static analysis only here (`--no-llm`), which over-flags heavily: the atlas's *safest* curated repo scans as CRITICAL. These signals are triage input, never a ranking. For the human-reviewed safety score of `pab1it0/polymarket-mcp`, see the [main README](../../README.md) and [methodology](../methodology.md).

**Scanner grade:** 🔴 flagged-critical (untriaged) · SkillSpector v2.3.7

| Field | Value |
|---|---|
| Scanner risk score | 100/100 |
| Scanner severity | CRITICAL |
| Scanner recommendation | DO_NOT_INSTALL |
| Post-baseline counts | 🔴 2 C · 🟠 7 H · 🟡 1 M · ⚪ 0 L |
| Suppressed by baseline | 0 |
| Coverage | 100% (partial — LLM meta-analysis skipped) |
| Scanned head_sha | `3b067c590523` |

**Baseline:** none yet — counts are raw static signal, expect false positives. See [baselines](../../data/skillspector-baselines/README.md).

## Findings

| Severity | Location | Category | Confidence | Finding |
|---|---|---|---|---|
| 🔴 Critical | `pyproject.toml:9` | Supply Chain | 0.9 | httpx |
| 🔴 Critical | `pyproject.toml:29` | Supply Chain | 0.9 | setuptools |
| 🟠 High | `.github/workflows/ci.yml:23` | Tool Misuse | 0.7 | \| sh |
| 🟠 High | `.github/workflows/ci.yml:61` | Tool Misuse | 0.7 | \| sh |
| 🟠 High | `pyproject.toml:8` | Supply Chain | 0.8 | mcp |
| 🟠 High | `pyproject.toml:15` | Supply Chain | 0.8 | pytest |
| 🟠 High | `tests/unit/test_main.py:17` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `tests/unit/test_main.py:31` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `tests/unit/test_main.py:32` | Privilege Escalation | 0.6 | .env" |
| 🟡 Medium | `pyproject.toml:10` | Supply Chain | 0.7 | python-dotenv |

