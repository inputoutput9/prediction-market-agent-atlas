# SkillSpector scan — [`JamesANZ/prediction-market-mcp`](https://github.com/JamesANZ/prediction-market-mcp)

> **Static pattern-match signals, pending human triage** — NOT verdicts, and NOT the curated safety score.
> SkillSpector runs static analysis only here (`--no-llm`), which over-flags heavily: the atlas's *safest* curated repo scans as CRITICAL. These signals are triage input, never a ranking. For the human-reviewed safety score of `JamesANZ/prediction-market-mcp`, see the [main README](../../README.md) and [methodology](../methodology.md).

**Scanner grade:** 🟠 needs-triage (untriaged) · SkillSpector v2.3.7

| Field | Value |
|---|---|
| Scanner risk score | 100/100 |
| Scanner severity | CRITICAL |
| Scanner recommendation | DO_NOT_INSTALL |
| Post-baseline counts | 🔴 0 C · 🟠 3 H · 🟡 3 M · ⚪ 7 L |
| Suppressed by baseline | 0 |
| Coverage | 100% (partial — LLM meta-analysis skipped) |
| Scanned head_sha | `b534ffa621b4` |

**Baseline:** none yet — counts are raw static signal, expect false positives. See [baselines](../../data/skillspector-baselines/README.md).

## Findings

| Severity | Location | Category | Confidence | Finding |
|---|---|---|---|---|
| 🟠 High | `package-lock.json:999` | Tool Misuse | 0.85 | RmkhL8CAyCRPXCE28MMH0z2PNWQBNk2Q09ZdxM9IOOXwxwZbN+qbWaatPkdkWIKL2ZVDImrN/ |
| 🟠 High | `package.json:45` | Supply Chain | 0.8 | @modelcontextprotocol/sdk==1.15.0 |
| 🟠 High | `README.md:46` | YARA Match | 0.8 | Parameters:; lnbc1pjhhsqepp5mjgwnvg0z53shm22hfe9us289lnaqkwv8rn2s0rtekg5vvj56xnqdqqcqzzsxqyz5vqsp5gu6vh9hyp94c7t3tkpqrp2 |
| 🟡 Medium | `package.json:9` | Privilege Escalation | 0.8 | chmod 755 |
| 🟡 Medium | `src/utils/utils.ts:16` | Data Exfiltration | 0.5 | https://api.elections.kalshi.com/ |
| 🟡 Medium | `src/utils/utils.ts:18` | Data Exfiltration | 0.5 | https://api.elections.kalshi.com/ |
| ⚪ Low | `LICENSE:16` | Excessive Agency | 0.7 | NOT LIMITED TO |
| ⚪ Low | `package.json:45` | Supply Chain | 0.4 | "@modelcontextprotocol/sdk": "^1.15.0" |
| ⚪ Low | `package.json:46` | Supply Chain | 0.4 | "superagent": "^10.2.2" |
| ⚪ Low | `package.json:47` | Supply Chain | 0.4 | "zod": "^3.25.75" |
| ⚪ Low | `package.json:50` | Supply Chain | 0.4 | "@types/node": "^24.0.10" |
| ⚪ Low | `package.json:51` | Supply Chain | 0.4 | "@types/superagent": "^8.1.9" |
| ⚪ Low | `package.json:52` | Supply Chain | 0.4 | "typescript": "^5.8.3" |

