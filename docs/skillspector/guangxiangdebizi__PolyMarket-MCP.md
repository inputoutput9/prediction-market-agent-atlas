# SkillSpector scan — [`guangxiangdebizi/PolyMarket-MCP`](https://github.com/guangxiangdebizi/PolyMarket-MCP)

> **Static pattern-match signals, pending human triage** — NOT verdicts, and NOT the curated safety score.
> SkillSpector runs static analysis only here (`--no-llm`), which over-flags heavily: the atlas's *safest* curated repo scans as CRITICAL. These signals are triage input, never a ranking. For the human-reviewed safety score of `guangxiangdebizi/PolyMarket-MCP`, see the [main README](../../README.md) and [methodology](../methodology.md).

**Scanner grade:** 🟠 needs-triage (untriaged) · SkillSpector v2.3.7

| Field | Value |
|---|---|
| Scanner risk score | 100/100 |
| Scanner severity | CRITICAL |
| Scanner recommendation | DO_NOT_INSTALL |
| Post-baseline counts | 🔴 0 C · 🟠 5 H · 🟡 0 M · ⚪ 7 L |
| Suppressed by baseline | 0 |
| Coverage | 100% (partial — LLM meta-analysis skipped) |
| Scanned head_sha | `c1c41ea772a6` |

**Baseline:** none yet — counts are raw static signal, expect false positives. See [baselines](../../data/skillspector-baselines/README.md).

## Findings

| Severity | Location | Category | Confidence | Finding |
|---|---|---|---|---|
| 🟠 High | `package-lock.json:399` | Tool Misuse | 0.85 | RmkhL8CAyCRPXCE28MMH0z2PNWQBNk2Q09ZdxM9IOOXwxwZbN+qbWaatPkdkWIKL2ZVDImrN/ |
| 🟠 High | `package.json:54` | Supply Chain | 0.8 | @modelcontextprotocol/sdk==0.6.0 |
| 🟠 High | `package.json:55` | Supply Chain | 0.8 | axios==1.6.0 |
| 🟠 High | `package.json:56` | Supply Chain | 0.8 | ws==8.14.0 |
| 🟠 High | `README.md:258` | Prompt Injection | 0.6 | ‍ |
| ⚪ Low | `LICENSE:55` | Excessive Agency | 0.7 | not limited to |
| ⚪ Low | `LICENSE:160` | Excessive Agency | 0.7 | not limited to |
| ⚪ Low | `package.json:55` | Supply Chain | 0.4 | "axios": "^1.6.0" |
| ⚪ Low | `package.json:56` | Supply Chain | 0.4 | "ws": "^8.14.0" |
| ⚪ Low | `package.json:59` | Supply Chain | 0.4 | "@types/node": "^20.11.24" |
| ⚪ Low | `package.json:60` | Supply Chain | 0.4 | "@types/ws": "^8.5.0" |
| ⚪ Low | `package.json:61` | Supply Chain | 0.4 | "typescript": "^5.3.3" |

