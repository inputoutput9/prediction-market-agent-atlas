# SkillSpector scan — [`newyorkcompute/kalshi`](https://github.com/newyorkcompute/kalshi)

> **Static pattern-match signals, pending human triage** — NOT verdicts, and NOT the curated safety score.
> SkillSpector runs static analysis only here (`--no-llm`), which over-flags heavily: the atlas's *safest* curated repo scans as CRITICAL. These signals are triage input, never a ranking. For the human-reviewed safety score of `newyorkcompute/kalshi`, see the [main README](../../README.md) and [methodology](../methodology.md).

**Scanner grade:** 🔴 flagged-critical (untriaged) · SkillSpector v2.3.7

| Field | Value |
|---|---|
| Scanner risk score | 100/100 |
| Scanner severity | CRITICAL |
| Scanner recommendation | DO_NOT_INSTALL |
| Post-baseline counts | 🔴 5 C · 🟠 16 H · 🟡 18 M · ⚪ 69 L |
| Suppressed by baseline | 0 |
| Coverage | 100% (partial — LLM meta-analysis skipped) |
| Scanned head_sha | `52371ce04d16` |

**Baseline:** none yet — counts are raw static signal, expect false positives. See [baselines](../../data/skillspector-baselines/README.md).

## Findings

| Severity | Location | Category | Confidence | Finding |
|---|---|---|---|---|
| 🔴 Critical | `apps/mm/package.json:52` | Supply Chain | 0.9 | vitest==3.2.3 |
| 🔴 Critical | `packages/core/package.json:57` | Supply Chain | 0.9 | vitest==3.2.3 |
| 🔴 Critical | `packages/mcp/package.json:65` | Supply Chain | 0.9 | vitest==3.2.3 |
| 🔴 Critical | `packages/tui/package.json:64` | Supply Chain | 0.9 | vitest==3.2.3 |
| 🔴 Critical | `packages/weather/package.json:52` | Supply Chain | 0.9 | vitest==3.2.3 |
| 🟠 High | `apps/mm/package.json:33` | Supply Chain | 0.8 | @hono/node-server==1.14.1 |
| 🟠 High | `apps/mm/package.json:36` | Supply Chain | 0.8 | hono==4.7.10 |
| 🟠 High | `apps/mm/package.json:38` | Supply Chain | 0.8 | js-yaml==4.1.0 |
| 🟠 High | `apps/mm/src/api/server.ts:173` | Tool Misuse | 0.8 | DELETE /markets/:ticker |
| 🟠 High | `apps/mm/src/dashboard/components.tsx:344` | Privilege Escalation | 0.6 | .env.local |
| 🟠 High | `packages/core/package.json:48` | Supply Chain | 0.8 | ws==8.18.0 |
| 🟠 High | `packages/core/src/config.test.ts:41` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `packages/mcp/package.json:53` | Supply Chain | 0.8 | @modelcontextprotocol/sdk==1.12.1 |
| 🟠 High | `packages/mcp/scripts/test-connection.ts:14` | Privilege Escalation | 0.6 | .env.local |
| 🟠 High | `packages/mcp/scripts/test-connection.ts:24` | Privilege Escalation | 0.6 | .env.local" |
| 🟠 High | `packages/mcp/scripts/test-connection.ts:30` | Privilege Escalation | 0.6 | .env.local" |
| 🟠 High | `packages/mcp/scripts/test-mcp.ts:15` | Privilege Escalation | 0.6 | .env.local |
| 🟠 High | `packages/mcp/scripts/test-mcp.ts:16` | Privilege Escalation | 0.6 | .env.local" |
| 🟠 High | `packages/mcp/src/config.test.ts:9` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `packages/mcp/src/config.test.ts:13` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `packages/weather/src/smoke-test.ts:12` | Privilege Escalation | 0.6 | .env.local |
| 🟡 Medium | `apps/mm/scripts/analyze-performance.ts:2` | Output Handling | 0.8 | fill log |
| 🟡 Medium | `apps/mm/src/compliance/audit-logger.ts:8` | Output Handling | 0.8 | fill log |
| 🟡 Medium | `apps/mm/src/daemon/bot.ts:202` | Output Handling | 0.8 | fill log |
| 🟡 Medium | `apps/mm/src/daemon/bot.ts:838` | Output Handling | 0.8 | fill channel |
| 🟡 Medium | `apps/mm/src/daemon/bot.ts:1291` | Output Handling | 0.8 | fill log |
| 🟡 Medium | `packages/core/src/config.test.ts:28` | Data Exfiltration | 0.5 | https://api.elections.kalshi.com/ |
| 🟡 Medium | `packages/core/src/config.ts:31` | Data Exfiltration | 0.5 | https://api.elections.kalshi.com/ |
| 🟡 Medium | `packages/core/src/websocket/client.ts:29` | Excessive Agency | 0.75 | Retry forever |
| 🟡 Medium | `packages/mcp/CHANGELOG.md:25` | Excessive Agency | 0.85 | tools:* |
| 🟡 Medium | `packages/mcp/CHANGELOG.md:30` | Excessive Agency | 0.85 | tools:* |
| 🟡 Medium | `packages/mcp/CHANGELOG.md:35` | Excessive Agency | 0.85 | tools:* |
| 🟡 Medium | `packages/mcp/CHANGELOG.md:39` | Excessive Agency | 0.85 | tools:* |
| 🟡 Medium | `packages/mcp/scripts/test-connection.ts:40` | Data Exfiltration | 0.5 | https://api.elections.kalshi.com/ |
| 🟡 Medium | `packages/mcp/src/config.test.ts:26` | Data Exfiltration | 0.5 | https://api.elections.kalshi.com/ |
| 🟡 Medium | `packages/mcp/src/index.ts:81` | Data Exfiltration | 0.5 | https://api.elections.kalshi.com/ |
| 🟡 Medium | `README.md:136` | Rogue Agent | 0.6 | write and execute code directly against the Kalshi API — no MCP server needed. ### Claude Code ```bash # Personal (avail |
| 🟡 Medium | `skills/kalshi-trading/AUTHENTICATION.md:114` | Data Exfiltration | 0.5 | https://api.elections.kalshi.com/ |
| 🟡 Medium | `skills/kalshi-trading/scripts/kalshi-client.ts:114` | Data Exfiltration | 0.5 | https://api.elections.kalshi.com/ |
| ⚪ Low | `apps/mm/package.json:33` | Supply Chain | 0.4 | "@hono/node-server": "^1.14.1" |
| ⚪ Low | `apps/mm/package.json:34` | Supply Chain | 0.7 | "@newyorkcompute/kalshi-core": "*" |
| ⚪ Low | `apps/mm/package.json:35` | Supply Chain | 0.7 | "@newyorkcompute/kalshi-weather": "*" |
| ⚪ Low | `apps/mm/package.json:36` | Supply Chain | 0.4 | "hono": "^4.7.10" |
| ⚪ Low | `apps/mm/package.json:37` | Supply Chain | 0.4 | "ink": "^5.2.1" |
| ⚪ Low | `apps/mm/package.json:38` | Supply Chain | 0.4 | "js-yaml": "^4.1.0" |
| ⚪ Low | `apps/mm/package.json:39` | Supply Chain | 0.4 | "kalshi-typescript": "^3.3.0" |
| ⚪ Low | `apps/mm/package.json:40` | Supply Chain | 0.4 | "react": "^18.3.1" |
| ⚪ Low | `apps/mm/package.json:41` | Supply Chain | 0.4 | "zod": "^3.25.36" |
| ⚪ Low | `apps/mm/package.json:44` | Supply Chain | 0.4 | "@eslint/js": "^9.28.0" |
| ⚪ Low | `apps/mm/package.json:45` | Supply Chain | 0.4 | "@types/js-yaml": "^4.0.9" |

_…and 58 more finding(s) — see the artifact JSON._

