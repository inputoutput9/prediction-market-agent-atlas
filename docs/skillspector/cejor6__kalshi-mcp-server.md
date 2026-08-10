# SkillSpector scan — [`cejor6/kalshi-mcp-server`](https://github.com/cejor6/kalshi-mcp-server)

> **Static pattern-match signals, pending human triage** — NOT verdicts, and NOT the curated safety score.
> SkillSpector runs static analysis only here (`--no-llm`), which over-flags heavily: the atlas's *safest* curated repo scans as CRITICAL. These signals are triage input, never a ranking. For the human-reviewed safety score of `cejor6/kalshi-mcp-server`, see the [main README](../../README.md) and [methodology](../methodology.md).

**Scanner grade:** 🔴 flagged-critical · SkillSpector v2.4.3

| Field | Value |
|---|---|
| Scanner risk score | 100/100 |
| Scanner severity | CRITICAL |
| Scanner recommendation | DO_NOT_INSTALL |
| Post-baseline counts | 🔴 2 C · 🟠 16 H · 🟡 8 M · ⚪ 4 L |
| Suppressed by baseline | 46 |
| Coverage | 100% (partial — LLM meta-analysis skipped) |
| Scanned head_sha | `128495bf7590` |

**Baseline:** 46 finding(s) suppressed by a reviewed baseline.

## Findings

| Severity | Location | Category | Confidence | Finding |
|---|---|---|---|---|
| 🔴 Critical | `pyproject.toml:30` | Supply Chain | 0.9 | fastmcp |
| 🔴 Critical | `pyproject.toml:32` | Supply Chain | 0.9 | httpx |
| 🟠 High | `pyproject.toml:31` | Supply Chain | 0.8 | cryptography |
| 🟠 High | `pyproject.toml:33` | Supply Chain | 0.8 | websockets |
| 🟠 High | `pyproject.toml:34` | Supply Chain | 0.8 | pydantic |
| 🟠 High | `pyproject.toml:44` | Supply Chain | 0.8 | redis |
| 🟠 High | `pyproject.toml:44` | Supply Chain | 0.8 | redis |
| 🟠 High | `pyproject.toml:49` | Supply Chain | 0.8 | pytest |
| 🟠 High | `src/kalshi_mcp_server/oauth.py:280` | Data Exfiltration | 0.7 | os.environ.get("MCP_JWT_SIGNING_KEY |
| 🟠 High | `src/kalshi_mcp_server/oauth.py:379` | Data Exfiltration | 0.7 | os.environ.get("GITHUB_CLIENT_SECRET |
| 🟠 High | `src/kalshi_mcp_server/oauth.py:394` | Data Exfiltration | 0.7 | os.environ.get("MCP_JWT_SIGNING_KEY |
| 🟠 High | `uv.lock:602` | Privilege Escalation | 0.7 | keyring |
| 🟠 High | `uv.lock:616` | Privilege Escalation | 0.7 | keyring |
| 🟠 High | `uv.lock:888` | Privilege Escalation | 0.7 | keyring |
| 🟠 High | `uv.lock:900` | Privilege Escalation | 0.7 | keyring |
| 🟠 High | `uv.lock:902` | Privilege Escalation | 0.7 | keyring |
| 🟠 High | `uv.lock:1063` | Privilege Escalation | 0.7 | keyring |
| 🟠 High | `uv.lock:1064` | Privilege Escalation | 0.7 | keyring |
| 🟡 Medium | `.claude/settings.json:48` | MCP Rug Pull | 0.75 |  |
| 🟡 Medium | `AGENTS.md:238` | Excessive Agency | 0.75 | without checking |
| 🟡 Medium | `DEPLOY.md:631` | Data Exfiltration | 0.5 | https://api.render.com/ |
| 🟡 Medium | `Dockerfile:68` | MCP Rug Pull | 0.75 |  |
| 🟡 Medium | `mcpconform.config.json:4` | MCP Rug Pull | 0.7 |  |
| 🟡 Medium | `pyproject.toml:35` | Supply Chain | 0.7 | python-dotenv |
| 🟡 Medium | `README.md:159` | MCP Rug Pull | 0.75 |  |
| 🟡 Medium | `src/kalshi_mcp_server/oauth.py:224` | Excessive Agency | 0.75 | without checking |
| ⚪ Low | `pyproject.toml:42` | MCP Rug Pull | 0.6 |  |
| ⚪ Low | `README.md:47` | MCP Rug Pull | 0.6 |  |
| ⚪ Low | `README.md:142` | MCP Rug Pull | 0.6 |  |
| ⚪ Low | `src/kalshi_mcp_server/safety_store.py:115` | MCP Rug Pull | 0.6 |  |

