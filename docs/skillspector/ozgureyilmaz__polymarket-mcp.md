# SkillSpector scan — [`ozgureyilmaz/polymarket-mcp`](https://github.com/ozgureyilmaz/polymarket-mcp)

> **Static pattern-match signals, pending human triage** — NOT verdicts, and NOT the curated safety score.
> SkillSpector runs static analysis only here (`--no-llm`), which over-flags heavily: the atlas's *safest* curated repo scans as CRITICAL. These signals are triage input, never a ranking. For the human-reviewed safety score of `ozgureyilmaz/polymarket-mcp`, see the [main README](../../README.md) and [methodology](../methodology.md).

**Scanner grade:** 🟠 needs-triage (untriaged) · SkillSpector v2.3.7

| Field | Value |
|---|---|
| Scanner risk score | 100/100 |
| Scanner severity | CRITICAL |
| Scanner recommendation | DO_NOT_INSTALL |
| Post-baseline counts | 🔴 0 C · 🟠 5 H · 🟡 2 M · ⚪ 1 L |
| Suppressed by baseline | 0 |
| Coverage | 100% (partial — LLM meta-analysis skipped) |
| Scanned head_sha | `966055688d5e` |

**Baseline:** none yet — counts are raw static signal, expect false positives. See [baselines](../../data/skillspector-baselines/README.md).

## Findings

| Severity | Location | Category | Confidence | Finding |
|---|---|---|---|---|
| 🟠 High | `.github/workflows/release.yml:71` | Tool Misuse | 0.75 | \|           sudo |
| 🟠 High | `Cargo.toml:12` | Tool Misuse | 0.85 | rmcp = { git = "https://github.com/modelcontextprotocol/ |
| 🟠 High | `Dockerfile:22` | Tool Misuse | 0.85 | rm -rf src target/release/deps/ |
| 🟠 High | `Dockerfile:22` | Tool Misuse | 0.75 | && rm - |
| 🟠 High | `polymarket-mcp.service:23` | Privilege Escalation | 0.6 | .env |
| 🟡 Medium | `.github/workflows/release.yml:72` | Privilege Escalation | 0.7 | sudo |
| 🟡 Medium | `.github/workflows/release.yml:73` | Privilege Escalation | 0.7 | sudo |
| ⚪ Low | `LICENSE:16` | Excessive Agency | 0.7 | NOT LIMITED TO |

