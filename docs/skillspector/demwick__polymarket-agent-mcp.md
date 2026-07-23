# SkillSpector scan — [`demwick/polymarket-agent-mcp`](https://github.com/demwick/polymarket-agent-mcp)

> **Static pattern-match signals, pending human triage** — NOT verdicts, and NOT the curated safety score.
> SkillSpector runs static analysis only here (`--no-llm`), which over-flags heavily: the atlas's *safest* curated repo scans as CRITICAL. These signals are triage input, never a ranking. For the human-reviewed safety score of `demwick/polymarket-agent-mcp`, see the [main README](../../README.md) and [methodology](../methodology.md).

**Scanner grade:** 🟠 needs-triage (untriaged) · SkillSpector v2.3.7

| Field | Value |
|---|---|
| Scanner risk score | 100/100 |
| Scanner severity | CRITICAL |
| Scanner recommendation | DO_NOT_INSTALL |
| Post-baseline counts | 🔴 0 C · 🟠 10 H · 🟡 3 M · ⚪ 15 L |
| Suppressed by baseline | 0 |
| Coverage | 100% (partial — LLM meta-analysis skipped) |
| Scanned head_sha | `6057a0b1b498` |

**Baseline:** none yet — counts are raw static signal, expect false positives. See [baselines](../../data/skillspector-baselines/README.md).

## Findings

| Severity | Location | Category | Confidence | Finding |
|---|---|---|---|---|
| 🟠 High | `.well-known/mcp/server-card.json:1487` | Privilege Escalation | 0.6 | .env" |
| 🟠 High | `assets/icon-v3c.svg:9` | Prompt Injection | 0.7 | &lt;!-- Hexagon frame -->   &lt;polygon points="256,60 430,160 430,352 256,452 82,352 82,160"     stroke="url(#glow3c)"  |
| 🟠 High | `docker-compose.yml:11` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `package.json:70` | Supply Chain | 0.8 | ws==8.20.0 |
| 🟠 High | `safeskill.manifest.json:52` | Privilege Escalation | 0.6 | .env" |
| 🟠 High | `SECURITY.md:76` | Privilege Escalation | 0.7 | keychain |
| 🟠 High | `server.json:4` | YARA Match | 0.8 | "description":; description":; "description":; description":; "description":; description":; "description":; description |
| 🟠 High | `src/index.ts:550` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `tests/tools/stop-monitor.test.ts:35` | YARA Match | 0.75 | pSpy; pSpy; pSpy; pSpy; pSpy; pSpy |
| 🟠 High | `tests/utils/config.test.ts:6` | Privilege Escalation | 0.6 | .env |
| 🟡 Medium | `Dockerfile:27` | Server-Side Request Forgery | 0.7 | fetch('http://localhost |
| 🟡 Medium | `PERMISSIONS.md:103` | Privilege Escalation | 0.6 | modify system config |
| 🟡 Medium | `README.md:16` | Data Exfiltration | 0.5 | https://api.securityscorecards.dev/ |
| ⚪ Low | `LICENSE:16` | Excessive Agency | 0.7 | NOT LIMITED TO |
| ⚪ Low | `package.json:65` | Supply Chain | 0.4 | "@ethersproject/wallet": "^5.8.0" |
| ⚪ Low | `package.json:66` | Supply Chain | 0.4 | "@modelcontextprotocol/sdk": "^1.29.0" |
| ⚪ Low | `package.json:67` | Supply Chain | 0.4 | "@polymarket/clob-client": "^5.8.1" |
| ⚪ Low | `package.json:68` | Supply Chain | 0.4 | "better-sqlite3": "^12.8.0" |
| ⚪ Low | `package.json:69` | Supply Chain | 0.4 | "dotenv": "^17.4.1" |
| ⚪ Low | `package.json:70` | Supply Chain | 0.4 | "ws": "^8.20.0" |
| ⚪ Low | `package.json:71` | Supply Chain | 0.4 | "zod": "^4.3.6" |
| ⚪ Low | `package.json:74` | Supply Chain | 0.4 | "@types/better-sqlite3": "^7.6.13" |
| ⚪ Low | `package.json:75` | Supply Chain | 0.4 | "@types/node": "^25.5.2" |
| ⚪ Low | `package.json:76` | Supply Chain | 0.4 | "@types/ws": "^8.18.1" |
| ⚪ Low | `package.json:77` | Supply Chain | 0.4 | "@vitest/coverage-v8": "^4.1.4" |
| ⚪ Low | `package.json:78` | Supply Chain | 0.4 | "fast-check": "^4.6.0" |
| ⚪ Low | `package.json:79` | Supply Chain | 0.4 | "typescript": "^6.0.2" |
| ⚪ Low | `package.json:80` | Supply Chain | 0.4 | "vitest": "^4.1.3" |

