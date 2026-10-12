# SkillSpector scan — [`JamesANZ/prediction-market-mcp`](https://github.com/JamesANZ/prediction-market-mcp)

> **Static pattern-match signals, pending human triage** — NOT verdicts, and NOT the curated safety score.
> SkillSpector runs static analysis only here (`--no-llm`), which over-flags heavily: the atlas's *safest* curated repo scans as CRITICAL. These signals are triage input, never a ranking. For the human-reviewed safety score of `JamesANZ/prediction-market-mcp`, see the [main README](../../README.md) and [methodology](../methodology.md).

**Scanner grade:** 🟠 needs-triage (untriaged) · SkillSpector v2.4.3

| Field | Value |
|---|---|
| Scanner risk score | 100/100 |
| Scanner severity | CRITICAL |
| Scanner recommendation | DO_NOT_INSTALL |
| Post-baseline counts | 🔴 0 C · 🟠 9 H · 🟡 6 M · ⚪ 8 L |
| Suppressed by baseline | 0 |
| Coverage | 100% (partial — LLM meta-analysis skipped) |
| Scanned head_sha | `e25160be15d9` |

**Baseline:** none yet — counts are raw static signal, expect false positives. See [baselines](../../data/skillspector-baselines/README.md).

## Findings

| Severity | Location | Category | Confidence | Finding |
|---|---|---|---|---|
| 🟠 High | `package.json:46` | Supply Chain | 0.8 | @modelcontextprotocol/sdk==1.15.0 |
| 🟠 High | `README.md:46` | YARA Match | 0.8 | Parameters:; Parameters:; lnbc1pjhhsqepp5mjgwnvg0z53shm22hfe9us289lnaqkwv8rn2s0rtekg5vvj56xnqdqqcqzzsxqyz5vqsp5gu6vh9hyp |
| 🟠 High | `src/providers/agent-reach.ts:166` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `src/providers/agent-reach.ts:197` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `src/providers/agent-reach.ts:237` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `src/providers/command.ts:39` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `test/provider.test.ts:70` | Prompt Injection | 0.8 | Ignore previous instructions |
| 🟠 High | `test/provider.test.ts:80` | Prompt Injection | 0.8 | Ignore previous instructions |
| 🟠 High | `test/tool.test.ts:83` | Prompt Injection | 0.8 | Ignore previous instructions |
| 🟡 Medium | `package.json:9` | Privilege Escalation | 0.8 | chmod 755 |
| 🟡 Medium | `src/evidence/normalize.ts:195` | Rogue Agent | 0.75 | pList |
| 🟡 Medium | `src/evidence/normalize.ts:199` | Rogue Agent | 0.75 | pList |
| 🟡 Medium | `src/markets/kalshi.ts:12` | Data Exfiltration | 0.5 | https://api.elections.kalshi.com/ |
| 🟡 Medium | `src/markets/kalshi.ts:13` | Data Exfiltration | 0.5 | https://api.elections.kalshi.com/ |
| 🟡 Medium | `src/markets/kalshi.ts:14` | Data Exfiltration | 0.5 | https://api.elections.kalshi.com/ |
| ⚪ Low | `LICENSE:16` | Excessive Agency | 0.7 | NOT LIMITED TO |
| ⚪ Low | `package.json:46` | Supply Chain | 0.4 | "@modelcontextprotocol/sdk": "^1.15.0" |
| ⚪ Low | `package.json:47` | Supply Chain | 0.4 | "superagent": "^10.2.2" |
| ⚪ Low | `package.json:48` | Supply Chain | 0.4 | "zod": "^3.25.75" |
| ⚪ Low | `package.json:51` | Supply Chain | 0.4 | "@types/node": "^24.0.10" |
| ⚪ Low | `package.json:52` | Supply Chain | 0.4 | "@types/superagent": "^8.1.9" |
| ⚪ Low | `package.json:53` | Supply Chain | 0.4 | "tsx": "^4.23.15" |
| ⚪ Low | `package.json:54` | Supply Chain | 0.4 | "typescript": "^5.8.3" |

