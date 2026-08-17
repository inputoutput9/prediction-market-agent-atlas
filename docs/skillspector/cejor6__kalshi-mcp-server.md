# SkillSpector scan — [`cejor6/kalshi-mcp-server`](https://github.com/cejor6/kalshi-mcp-server)

> **Static pattern-match signals, pending human triage** — NOT verdicts, and NOT the curated safety score.
> SkillSpector runs static analysis only here (`--no-llm`), which over-flags heavily: the atlas's *safest* curated repo scans as CRITICAL. These signals are triage input, never a ranking. For the human-reviewed safety score of `cejor6/kalshi-mcp-server`, see the [main README](../../README.md) and [methodology](../methodology.md).

**Scanner grade:** 🔴 flagged-critical · SkillSpector v2.4.3

| Field | Value |
|---|---|
| Scanner risk score | 100/100 |
| Scanner severity | CRITICAL |
| Scanner recommendation | DO_NOT_INSTALL |
| Post-baseline counts | 🔴 2 C · 🟠 20 H · 🟡 29 M · ⚪ 11 L |
| Suppressed by baseline | 29 |
| Coverage | 100% (partial — LLM meta-analysis skipped) |
| Scanned head_sha | `44c679ea24d8` |

**Baseline:** 29 finding(s) suppressed by a reviewed baseline.

## Findings

| Severity | Location | Category | Confidence | Finding |
|---|---|---|---|---|
| 🔴 Critical | `pyproject.toml:30` | Supply Chain | 0.9 | fastmcp |
| 🔴 Critical | `pyproject.toml:32` | Supply Chain | 0.9 | httpx |
| 🟠 High | `pyproject.toml:31` | Supply Chain | 0.8 | cryptography |
| 🟠 High | `pyproject.toml:33` | Supply Chain | 0.8 | websockets |
| 🟠 High | `pyproject.toml:34` | Supply Chain | 0.8 | pydantic |
| 🟠 High | `pyproject.toml:40` | Supply Chain | 0.8 | pyjwt |
| 🟠 High | `pyproject.toml:49` | Supply Chain | 0.8 | redis |
| 🟠 High | `pyproject.toml:49` | Supply Chain | 0.8 | redis |
| 🟠 High | `pyproject.toml:54` | Supply Chain | 0.8 | pytest |
| 🟠 High | `src/kalshi_mcp_server/config.py:118` | Data Exfiltration | 0.7 | os.environ.get("KALSHI_API_KEY |
| 🟠 High | `src/kalshi_mcp_server/config.py:126` | Data Exfiltration | 0.7 | os.environ.get("KALSHI_PRIVATE_KEY |
| 🟠 High | `src/kalshi_mcp_server/config.py:127` | Data Exfiltration | 0.7 | os.environ.get("KALSHI_PRIVATE_KEY |
| 🟠 High | `src/kalshi_mcp_server/oauth.py:280` | Data Exfiltration | 0.7 | os.environ.get("MCP_JWT_SIGNING_KEY |
| 🟠 High | `src/kalshi_mcp_server/oauth.py:379` | Data Exfiltration | 0.7 | os.environ.get("GITHUB_CLIENT_SECRET |
| 🟠 High | `src/kalshi_mcp_server/oauth.py:394` | Data Exfiltration | 0.7 | os.environ.get("MCP_JWT_SIGNING_KEY |
| 🟠 High | `src/kalshi_mcp_server/tools/exchange.py:76` | Privilege Escalation | 0.7 | access token |
| 🟠 High | `uv.lock:602` | Privilege Escalation | 0.7 | keyring |
| 🟠 High | `uv.lock:616` | Privilege Escalation | 0.7 | keyring |
| 🟠 High | `uv.lock:890` | Privilege Escalation | 0.7 | keyring |
| 🟠 High | `uv.lock:902` | Privilege Escalation | 0.7 | keyring |
| 🟠 High | `uv.lock:904` | Privilege Escalation | 0.7 | keyring |
| 🟠 High | `uv.lock:1065` | Privilege Escalation | 0.7 | keyring |
| 🟡 Medium | `.claude/settings.json:48` | MCP Rug Pull | 0.75 |  |
| 🟡 Medium | `AGENTS.md:297` | Excessive Agency | 0.75 | without checking |
| 🟡 Medium | `DEPLOY.md:631` | Data Exfiltration | 0.5 | https://api.render.com/ |
| 🟡 Medium | `Dockerfile:68` | MCP Rug Pull | 0.75 |  |
| 🟡 Medium | `mcpconform.config.json:4` | MCP Rug Pull | 0.7 |  |
| 🟡 Medium | `pyproject.toml:35` | Supply Chain | 0.7 | python-dotenv |
| 🟡 Medium | `README.md:159` | MCP Rug Pull | 0.75 |  |
| 🟡 Medium | `src/kalshi_mcp_server/oauth.py:224` | Excessive Agency | 0.75 | without checking |
| 🟡 Medium | `tests/test_discovery.py:661` | Excessive Agency | 0.75 | loop forever |
| 🟡 Medium | `tests/test_external_data.py:186` | Data Exfiltration | 0.6 | https://api.open-meteo.com/ |
| 🟡 Medium | `tests/test_external_data.py:204` | Data Exfiltration | 0.6 | https://api.open-meteo.com/ |
| 🟡 Medium | `tests/test_external_data.py:219` | Data Exfiltration | 0.6 | https://api.weather.gov/ |
| 🟡 Medium | `tests/test_external_data.py:225` | Data Exfiltration | 0.6 | https://api.weather.gov/ |
| 🟡 Medium | `tests/test_external_data.py:289` | Data Exfiltration | 0.6 | https://api.weather.gov/ |
| 🟡 Medium | `tests/test_external_data.py:299` | Data Exfiltration | 0.6 | https://api.weather.gov/ |
| 🟡 Medium | `tests/test_external_data.py:340` | Data Exfiltration | 0.6 | https://api.weather.gov/ |
| 🟡 Medium | `tests/test_external_data.py:346` | Data Exfiltration | 0.6 | https://api.weather.gov/ |
| 🟡 Medium | `tests/test_external_data.py:349` | Data Exfiltration | 0.6 | https://api.weather.gov/ |
| 🟡 Medium | `tests/test_external_data.py:360` | Data Exfiltration | 0.6 | https://api.weather.gov/ |
| 🟡 Medium | `tests/test_external_data.py:372` | Excessive Agency | 0.8 | unbounded call |
| 🟡 Medium | `tests/test_external_data.py:380` | Data Exfiltration | 0.6 | https://api.weather.gov/ |
| 🟡 Medium | `tests/test_external_data.py:391` | Data Exfiltration | 0.6 | https://api.weather.gov/ |
| 🟡 Medium | `tests/test_external_data.py:394` | Data Exfiltration | 0.6 | https://api.weather.gov/ |
| 🟡 Medium | `tests/test_external_data.py:403` | Data Exfiltration | 0.6 | https://api.weather.gov/ |
| 🟡 Medium | `tests/test_external_data.py:406` | Data Exfiltration | 0.6 | https://api.weather.gov/ |
| 🟡 Medium | `tests/test_external_data.py:408` | Data Exfiltration | 0.6 | https://api.weather.gov/ |
| 🟡 Medium | `tests/test_external_data.py:420` | Data Exfiltration | 0.6 | https://api.weather.gov/ |
| 🟡 Medium | `tests/test_external_data.py:438` | Data Exfiltration | 0.6 | https://api.weather.gov/ |

_…and 12 more finding(s) — see the artifact JSON._

