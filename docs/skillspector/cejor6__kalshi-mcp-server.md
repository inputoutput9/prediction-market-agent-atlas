# SkillSpector scan — [`cejor6/kalshi-mcp-server`](https://github.com/cejor6/kalshi-mcp-server)

> **Static pattern-match signals, pending human triage** — NOT verdicts, and NOT the curated safety score.
> SkillSpector runs static analysis only here (`--no-llm`), which over-flags heavily: the atlas's *safest* curated repo scans as CRITICAL. These signals are triage input, never a ranking. For the human-reviewed safety score of `cejor6/kalshi-mcp-server`, see the [main README](../../README.md) and [methodology](../methodology.md).

**Scanner grade:** 🟡 minor-signals · SkillSpector v2.4.3

| Field | Value |
|---|---|
| Scanner risk score | 13/100 |
| Scanner severity | LOW |
| Scanner recommendation | SAFE |
| Post-baseline counts | 🔴 0 C · 🟠 0 H · 🟡 4 M · ⚪ 4 L |
| Suppressed by baseline | 65 |
| Coverage | 100% (partial — LLM meta-analysis skipped) |
| Scanned head_sha | `9441a80e56df` |

**Baseline:** 65 finding(s) suppressed by a reviewed baseline.

## Findings

| Severity | Location | Category | Confidence | Finding |
|---|---|---|---|---|
| 🟡 Medium | `.claude/settings.json:48` | MCP Rug Pull | 0.75 |  |
| 🟡 Medium | `Dockerfile:68` | MCP Rug Pull | 0.75 |  |
| 🟡 Medium | `mcpconform.config.json:4` | MCP Rug Pull | 0.7 |  |
| 🟡 Medium | `README.md:159` | MCP Rug Pull | 0.75 |  |
| ⚪ Low | `pyproject.toml:40` | MCP Rug Pull | 0.6 |  |
| ⚪ Low | `README.md:47` | MCP Rug Pull | 0.6 |  |
| ⚪ Low | `README.md:142` | MCP Rug Pull | 0.6 |  |
| ⚪ Low | `src/kalshi_mcp_server/safety_store.py:106` | MCP Rug Pull | 0.6 |  |

