# SkillSpector scan — [`PlayAINetwork/Polymarket-mcp`](https://github.com/PlayAINetwork/Polymarket-mcp)

> **Static pattern-match signals, pending human triage** — NOT verdicts, and NOT the curated safety score.
> SkillSpector runs static analysis only here (`--no-llm`), which over-flags heavily: the atlas's *safest* curated repo scans as CRITICAL. These signals are triage input, never a ranking. For the human-reviewed safety score of `PlayAINetwork/Polymarket-mcp`, see the [main README](../../README.md) and [methodology](../methodology.md).

**Scanner grade:** 🟠 needs-triage (untriaged) · SkillSpector v2.3.7

| Field | Value |
|---|---|
| Scanner risk score | 89/100 |
| Scanner severity | CRITICAL |
| Scanner recommendation | DO_NOT_INSTALL |
| Post-baseline counts | 🔴 0 C · 🟠 4 H · 🟡 0 M · ⚪ 11 L |
| Suppressed by baseline | 0 |
| Coverage | 100% (partial — LLM meta-analysis skipped) |
| Scanned head_sha | `9d9b6a07d0dd` |

**Baseline:** none yet — counts are raw static signal, expect false positives. See [baselines](../../data/skillspector-baselines/README.md).

## Findings

| Severity | Location | Category | Confidence | Finding |
|---|---|---|---|---|
| 🟠 High | `package.json:25` | Supply Chain | 0.8 | @modelcontextprotocol/sdk==1.10.2 |
| 🟠 High | `package.json:27` | Supply Chain | 0.8 | axios==1.9.0 |
| 🟠 High | `pnpm-lock.yaml:221` | Tool Misuse | 0.85 | rmnyck/ |
| 🟠 High | `pnpm-lock.yaml:551` | Tool Misuse | 0.85 | RmkhL8CAyCRPXCE28MMH0z2PNWQBNk2Q09ZdxM9IOOXwxwZbN+qbWaatPkdkWIKL2ZVDImrN/ |
| ⚪ Low | `LICENSE:16` | Excessive Agency | 0.7 | NOT LIMITED TO |
| ⚪ Low | `package.json:22` | Supply Chain | 0.4 | "@ethersproject/contracts": "^5.8.0" |
| ⚪ Low | `package.json:23` | Supply Chain | 0.4 | "@ethersproject/providers": "^5.8.0" |
| ⚪ Low | `package.json:24` | Supply Chain | 0.4 | "@ethersproject/wallet": "^5.8.0" |
| ⚪ Low | `package.json:25` | Supply Chain | 0.4 | "@modelcontextprotocol/sdk": "^1.10.2" |
| ⚪ Low | `package.json:26` | Supply Chain | 0.4 | "@polymarket/clob-client": "^4.18.0" |
| ⚪ Low | `package.json:27` | Supply Chain | 0.4 | "axios": "^1.9.0" |
| ⚪ Low | `package.json:28` | Supply Chain | 0.4 | "dotenv": "^16.5.0" |
| ⚪ Low | `package.json:29` | Supply Chain | 0.4 | "ethers": "^6.14.4" |
| ⚪ Low | `package.json:30` | Supply Chain | 0.4 | "zod": "^3.24.3" |
| ⚪ Low | `package.json:33` | Supply Chain | 0.4 | "@types/bs58": "^5.0.0" |

