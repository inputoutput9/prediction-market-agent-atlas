# SkillSpector scan — [`caiovicentino/polymarket-mcp-server`](https://github.com/caiovicentino/polymarket-mcp-server)

> **Static pattern-match signals, pending human triage** — NOT verdicts, and NOT the curated safety score.
> SkillSpector runs static analysis only here (`--no-llm`), which over-flags heavily: the atlas's *safest* curated repo scans as CRITICAL. These signals are triage input, never a ranking. For the human-reviewed safety score of `caiovicentino/polymarket-mcp-server`, see the [main README](../../README.md) and [methodology](../methodology.md).

**Scanner grade:** 🔴 flagged-critical (untriaged) · SkillSpector v2.4.3

| Field | Value |
|---|---|
| Scanner risk score | 100/100 |
| Scanner severity | CRITICAL |
| Scanner recommendation | DO_NOT_INSTALL |
| Post-baseline counts | 🔴 4 C · 🟠 315 H · 🟡 170 M · ⚪ 9 L |
| Suppressed by baseline | 0 |
| Coverage | 100% (partial — LLM meta-analysis skipped) |
| Scanned head_sha | `21f65f319ff0` |

**Baseline:** none yet — counts are raw static signal, expect false positives. See [baselines](../../data/skillspector-baselines/README.md).

## Findings

| Severity | Location | Category | Confidence | Finding |
|---|---|---|---|---|
| 🔴 Critical | `pyproject.toml:20` | Supply Chain | 0.9 | httpx |
| 🔴 Critical | `pyproject.toml:20` | Supply Chain | 0.9 | httpx |
| 🔴 Critical | `pyproject.toml:39` | Supply Chain | 0.9 | black |
| 🔴 Critical | `pyproject.toml:54` | Supply Chain | 0.9 | pyyaml |
| 🟠 High | `demo_mcp_tools.py:268` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `DOCKER_INFRASTRUCTURE_COMPLETE.md:43` | Privilege Escalation | 0.7 | secret.yaml |
| 🟠 High | `docker-compose.prod.yml:10` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `docker-start.sh:59` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `docker-start.sh:60` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `docker-start.sh:180` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `docker-start.sh:183` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `docker-start.sh:184` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `FAQ.md:445` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `install.bat:218` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `install.bat:239` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `install.bat:241` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `install.bat:248` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `install.bat:262` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `install.bat:284` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `install.bat:285` | Privilege Escalation | 0.6 | .env' |
| 🟠 High | `install.bat:286` | Privilege Escalation | 0.6 | .env' |
| 🟠 High | `install.bat:357` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `install.sh:210` | Privilege Escalation | 0.6 | .env" |
| 🟠 High | `install.sh:212` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `install.sh:225` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `install.sh:319` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `install.sh:341` | Privilege Escalation | 0.6 | .env" |
| 🟠 High | `install.sh:379` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `install.sh:380` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `install.sh:488` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `install.sh:533` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `install.sh:534` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `install.sh:535` | Privilege Escalation | 0.6 | .env" |
| 🟠 High | `install.sh:536` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `install.sh:537` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `install.sh:538` | Privilege Escalation | 0.6 | .env" |
| 🟠 High | `install.sh:539` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `INSTALLATION_COMPARISON.md:15` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `INSTALLATION.md:422` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `Makefile:129` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `PROJECT_COMPLETE.md:114` | YARA Match | 0.4 | Tools:; ‍ |
| 🟠 High | `pyproject.toml:15` | Supply Chain | 0.8 | mcp |
| 🟠 High | `pyproject.toml:17` | Supply Chain | 0.8 | websockets |
| 🟠 High | `pyproject.toml:17` | Supply Chain | 0.8 | websockets |
| 🟠 High | `pyproject.toml:18` | Supply Chain | 0.8 | eth-account |
| 🟠 High | `pyproject.toml:21` | Supply Chain | 0.8 | pydantic |
| 🟠 High | `pyproject.toml:23` | Supply Chain | 0.8 | fastapi |
| 🟠 High | `pyproject.toml:24` | Supply Chain | 0.8 | uvicorn |
| 🟠 High | `pyproject.toml:25` | Supply Chain | 0.8 | jinja2 |
| 🟠 High | `pyproject.toml:31` | Supply Chain | 0.8 | pytest |

_…and 448 more finding(s) — see the artifact JSON._

