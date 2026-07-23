# SkillSpector scan — [`caiovicentino/polymarket-mcp-server`](https://github.com/caiovicentino/polymarket-mcp-server)

> **Static pattern-match signals, pending human triage** — NOT verdicts, and NOT the curated safety score.
> SkillSpector runs static analysis only here (`--no-llm`), which over-flags heavily: the atlas's *safest* curated repo scans as CRITICAL. These signals are triage input, never a ranking. For the human-reviewed safety score of `caiovicentino/polymarket-mcp-server`, see the [main README](../../README.md) and [methodology](../methodology.md).

**Scanner grade:** 🔴 flagged-critical (untriaged) · SkillSpector v2.3.7

| Field | Value |
|---|---|
| Scanner risk score | 100/100 |
| Scanner severity | CRITICAL |
| Scanner recommendation | DO_NOT_INSTALL |
| Post-baseline counts | 🔴 3 C · 🟠 107 H · 🟡 84 M · ⚪ 2 L |
| Suppressed by baseline | 0 |
| Coverage | 100% (partial — LLM meta-analysis skipped) |
| Scanned head_sha | `b96412357750` |

**Baseline:** none yet — counts are raw static signal, expect false positives. See [baselines](../../data/skillspector-baselines/README.md).

## Findings

| Severity | Location | Category | Confidence | Finding |
|---|---|---|---|---|
| 🔴 Critical | `pyproject.toml:17` | Supply Chain | 0.9 | httpx |
| 🔴 Critical | `pyproject.toml:17` | Supply Chain | 0.9 | httpx |
| 🔴 Critical | `pyproject.toml:36` | Supply Chain | 0.9 | black |
| 🟠 High | `DASHBOARD_SUMMARY.md:506` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `demo_mcp_tools.py:266` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `DOCKER_FILES.txt:25` | Privilege Escalation | 0.7 | secret.yaml |
| 🟠 High | `DOCKER_INFRASTRUCTURE_COMPLETE.md:44` | Privilege Escalation | 0.7 | secret.yaml |
| 🟠 High | `DOCKER_SUMMARY.md:32` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `DOCKER_SUMMARY.md:69` | Privilege Escalation | 0.7 | secret.yaml |
| 🟠 High | `DOCKER_SUMMARY.md:69` | Privilege Escalation | 0.7 | secret.yaml |
| 🟠 High | `DOCKER_SUMMARY.md:324` | Privilege Escalation | 0.7 | secret.yaml |
| 🟠 High | `docker-start.sh:58` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `docker-start.sh:59` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `docker-start.sh:60` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `docker-start.sh:90` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `docker-start.sh:93` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `docker-start.sh:94` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `DOCKER.md:215` | Privilege Escalation | 0.6 | .env" |
| 🟠 High | `FAQ.md:445` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `install.bat:112` | Tool Misuse | 0.85 | rmdir /s / |
| 🟠 High | `install.bat:218` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `install.bat:239` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `install.bat:241` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `install.bat:248` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `install.bat:262` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `install.bat:284` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `install.bat:285` | Privilege Escalation | 0.6 | .env' |
| 🟠 High | `install.bat:286` | Privilege Escalation | 0.6 | .env' |
| 🟠 High | `install.bat:357` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `install.sh:203` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `install.sh:289` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `install.sh:290` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `install.sh:312` | Privilege Escalation | 0.6 | .env" |
| 🟠 High | `install.sh:345` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `install.sh:346` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `install.sh:347` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `install.sh:423` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `install.sh:463` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `install.sh:464` | Privilege Escalation | 0.6 | .env" |
| 🟠 High | `install.sh:465` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `install.sh:466` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `INSTALLATION_COMPARISON.md:15` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `INSTALLATION_COMPARISON.md:97` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `INSTALLATION.md:163` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `INSTALLATION.md:422` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `Makefile:127` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `PROJECT_COMPLETE.md:114` | YARA Match | 0.4 | Tools:; ‍ |
| 🟠 High | `PROJECT_COMPLETE.md:380` | Prompt Injection | 0.6 | ‍ |
| 🟠 High | `pyproject.toml:12` | Supply Chain | 0.8 | mcp |
| 🟠 High | `pyproject.toml:14` | Supply Chain | 0.8 | websockets |

_…and 146 more finding(s) — see the artifact JSON._

