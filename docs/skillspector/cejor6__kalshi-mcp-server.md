# SkillSpector scan — [`cejor6/kalshi-mcp-server`](https://github.com/cejor6/kalshi-mcp-server)

> **Static pattern-match signals, pending human triage** — NOT verdicts, and NOT the curated safety score.
> SkillSpector runs static analysis only here (`--no-llm`), which over-flags heavily: the atlas's *safest* curated repo scans as CRITICAL. These signals are triage input, never a ranking. For the human-reviewed safety score of `cejor6/kalshi-mcp-server`, see the [main README](../../README.md) and [methodology](../methodology.md).

**Scanner grade:** 🔴 flagged-critical · SkillSpector v2.4.3

| Field | Value |
|---|---|
| Scanner risk score | 100/100 |
| Scanner severity | CRITICAL |
| Scanner recommendation | DO_NOT_INSTALL |
| Post-baseline counts | 🔴 3 C · 🟠 27 H · 🟡 53 M · ⚪ 13 L |
| Suppressed by baseline | 20 |
| Coverage | 100% (partial — LLM meta-analysis skipped) |
| Scanned head_sha | `01f3d34545c4` |

**Baseline:** 20 finding(s) suppressed by a reviewed baseline.

## Findings

| Severity | Location | Category | Confidence | Finding |
|---|---|---|---|---|
| 🔴 Critical | `pyproject.toml:43` | Supply Chain | 0.9 | fastmcp |
| 🔴 Critical | `pyproject.toml:49` | Supply Chain | 0.9 | httpx |
| 🔴 Critical | `pyproject.toml:57` | Supply Chain | 0.9 | pyjwt |
| 🟠 High | `pyproject.toml:47` | Supply Chain | 0.8 | mcp |
| 🟠 High | `pyproject.toml:48` | Supply Chain | 0.8 | cryptography |
| 🟠 High | `pyproject.toml:50` | Supply Chain | 0.8 | websockets |
| 🟠 High | `pyproject.toml:51` | Supply Chain | 0.8 | pydantic |
| 🟠 High | `pyproject.toml:66` | Supply Chain | 0.8 | redis |
| 🟠 High | `pyproject.toml:66` | Supply Chain | 0.8 | redis |
| 🟠 High | `pyproject.toml:71` | Supply Chain | 0.8 | pytest |
| 🟠 High | `src/kalshi_mcp_server/config.py:138` | Data Exfiltration | 0.7 | os.environ.get("KALSHI_API_KEY |
| 🟠 High | `src/kalshi_mcp_server/config.py:146` | Data Exfiltration | 0.7 | os.environ.get("KALSHI_PRIVATE_KEY |
| 🟠 High | `src/kalshi_mcp_server/config.py:147` | Data Exfiltration | 0.7 | os.environ.get("KALSHI_PRIVATE_KEY |
| 🟠 High | `src/kalshi_mcp_server/oauth.py:248` | Data Exfiltration | 0.7 | os.environ.get("MCP_JWT_SIGNING_KEY |
| 🟠 High | `src/kalshi_mcp_server/oauth.py:386` | Data Exfiltration | 0.8 | os.environ["GITHUB_CLIENT_SECRET"] |
| 🟠 High | `src/kalshi_mcp_server/oauth.py:399` | Data Exfiltration | 0.7 | os.environ.get("MCP_JWT_SIGNING_KEY |
| 🟠 High | `src/kalshi_mcp_server/oauth.py:463` | Privilege Escalation | 0.7 | access token |
| 🟠 High | `src/kalshi_mcp_server/tools/exchange.py:76` | Privilege Escalation | 0.7 | access token |
| 🟠 High | `src/kalshi_mcp_server/tools/scoring.py:195` | Data Exfiltration | 0.7 | os.environ.get("TYPESAFE_API_KEY |
| 🟠 High | `src/kalshi_mcp_server/tools/scoring.py:698` | Privilege Escalation | 0.8 | .netrc |
| 🟠 High | `tests/test_auth_perimeter.py:304` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `tests/test_auth_perimeter.py:469` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `tests/test_external_data.py:144` | YARA Match | 0.8 | LLM; ignore prior instructions; ignore prior instructions |
| 🟠 High | `tests/test_scoring.py:165` | Data Exfiltration | 0.8 | os.environ["TYPESAFE_API_KEY"] |
| 🟠 High | `uv.lock:602` | Privilege Escalation | 0.7 | keyring |
| 🟠 High | `uv.lock:616` | Privilege Escalation | 0.7 | keyring |
| 🟠 High | `uv.lock:892` | Privilege Escalation | 0.7 | keyring |
| 🟠 High | `uv.lock:904` | Privilege Escalation | 0.7 | keyring |
| 🟠 High | `uv.lock:906` | Privilege Escalation | 0.7 | keyring |
| 🟠 High | `uv.lock:1068` | Privilege Escalation | 0.7 | keyring |
| 🟡 Medium | `.claude/settings.json:48` | MCP Rug Pull | 0.75 |  |
| 🟡 Medium | `AGENTS.md:433` | Excessive Agency | 0.75 | without checking |
| 🟡 Medium | `DEPLOY.md:83` | Excessive Agency | 0.85 | auto-deploy |
| 🟡 Medium | `DEPLOY.md:99` | Rogue Agent | 0.6 | write access can tag any commit (even one on an   unmerged branch) and ship it. - **The `release` environment** gates th |
| 🟡 Medium | `DEPLOY.md:372` | Data Exfiltration | 0.5 | https://api.github.com/ |
| 🟡 Medium | `DEPLOY.md:675` | Data Exfiltration | 0.5 | https://api.render.com/ |
| 🟡 Medium | `Dockerfile:107` | MCP Rug Pull | 0.75 |  |
| 🟡 Medium | `mcpconform.config.json:4` | MCP Rug Pull | 0.7 |  |
| 🟡 Medium | `pyproject.toml:52` | Supply Chain | 0.7 | python-dotenv |
| 🟡 Medium | `README.md:159` | MCP Rug Pull | 0.75 |  |
| 🟡 Medium | `src/kalshi_mcp_server/config.py:31` | Data Exfiltration | 0.6 | https://api.elections.kalshi.com/ |
| 🟡 Medium | `src/kalshi_mcp_server/oauth.py:200` | Excessive Agency | 0.75 | without checking |
| 🟡 Medium | `src/kalshi_mcp_server/oauth.py:431` | Data Exfiltration | 0.6 | https://api.github.com/ |
| 🟡 Medium | `src/kalshi_mcp_server/tools/scoring.py:93` | Data Exfiltration | 0.6 | https://api.typesafe.ai/ |
| 🟡 Medium | `tests/test_discovery.py:661` | Excessive Agency | 0.75 | loop forever |
| 🟡 Medium | `tests/test_external_data.py:73` | Data Exfiltration | 0.6 | https://api.weather.gov/ |
| 🟡 Medium | `tests/test_external_data.py:78` | Data Exfiltration | 0.6 | https://api.weather.gov/ |
| 🟡 Medium | `tests/test_external_data.py:78` | Data Exfiltration | 0.6 | https://api.weather.gov/ |
| 🟡 Medium | `tests/test_external_data.py:83` | Data Exfiltration | 0.6 | https://api.weather.gov./ |
| 🟡 Medium | `tests/test_external_data.py:89` | Data Exfiltration | 0.6 | http://api.weather.gov/ |

_…and 46 more finding(s) — see the artifact JSON._

