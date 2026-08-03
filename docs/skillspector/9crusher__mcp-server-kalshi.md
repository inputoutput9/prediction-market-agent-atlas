# SkillSpector scan — [`9crusher/mcp-server-kalshi`](https://github.com/9crusher/mcp-server-kalshi)

> **Static pattern-match signals, pending human triage** — NOT verdicts, and NOT the curated safety score.
> SkillSpector runs static analysis only here (`--no-llm`), which over-flags heavily: the atlas's *safest* curated repo scans as CRITICAL. These signals are triage input, never a ranking. For the human-reviewed safety score of `9crusher/mcp-server-kalshi`, see the [main README](../../README.md) and [methodology](../methodology.md).

**Scanner grade:** 🔴 flagged-critical (untriaged) · SkillSpector v2.4.3

| Field | Value |
|---|---|
| Scanner risk score | 100/100 |
| Scanner severity | CRITICAL |
| Scanner recommendation | DO_NOT_INSTALL |
| Post-baseline counts | 🔴 3 C · 🟠 4 H · 🟡 11 M · ⚪ 2 L |
| Suppressed by baseline | 0 |
| Coverage | 100% (partial — LLM meta-analysis skipped) |
| Scanned head_sha | `867d12c2f0a0` |

**Baseline:** none yet — counts are raw static signal, expect false positives. See [baselines](../../data/skillspector-baselines/README.md).

## Findings

| Severity | Location | Category | Confidence | Finding |
|---|---|---|---|---|
| 🔴 Critical | `pyproject.toml:11` | Supply Chain | 0.9 | httpx |
| 🔴 Critical | `pyproject.toml:20` | Supply Chain | 0.9 | black |
| 🔴 Critical | `pyproject.toml:30` | Supply Chain | 0.9 | setuptools |
| 🟠 High | `pyproject.toml:10` | Supply Chain | 0.8 | mcp |
| 🟠 High | `pyproject.toml:12` | Supply Chain | 0.8 | cryptography |
| 🟠 High | `pyproject.toml:23` | Supply Chain | 0.8 | pytest |
| 🟠 High | `src/mcp_server_kalshi/config.py:46` | Privilege Escalation | 0.6 | .env" |
| 🟡 Medium | `.github/workflows/deploy.yml:51` | MCP Rug Pull | 0.65 |  |
| 🟡 Medium | `.github/workflows/deploy.yml:66` | MCP Rug Pull | 0.65 |  |
| 🟡 Medium | `.github/workflows/deploy.yml:100` | MCP Rug Pull | 0.65 |  |
| 🟡 Medium | `README.md:96` | MCP Rug Pull | 0.7 |  |
| 🟡 Medium | `scripts/smoke_test_uvx.py:13` | MCP Rug Pull | 0.65 |  |
| 🟡 Medium | `scripts/smoke_test_uvx.py:15` | MCP Rug Pull | 0.65 |  |
| 🟡 Medium | `scripts/smoke_test_uvx.py:33` | MCP Rug Pull | 0.65 |  |
| 🟡 Medium | `scripts/smoke_test_uvx.py:81` | Dangerous Code Execution | 0.7 | proc = subprocess.Popen(         argv,         stdin=subprocess.PIPE,         stdout=subprocess.PIPE,         stderr=sub |
| 🟡 Medium | `src/mcp_server_kalshi/config.py:9` | Data Exfiltration | 0.6 | https://api.elections.kalshi.com/ |
| 🟡 Medium | `tests/test_config.py:19` | Data Exfiltration | 0.6 | https://api.elections.kalshi.com/ |
| 🟡 Medium | `tests/test_config.py:41` | Data Exfiltration | 0.6 | https://api.elections.kalshi.com/ |
| ⚪ Low | `LICENSE:16` | Excessive Agency | 0.7 | NOT LIMITED TO |
| ⚪ Low | `pyproject.toml:13` | Supply Chain | 0.6 | pypdf |

