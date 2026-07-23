# SkillSpector scan — [`alsk1992/CloddsBot`](https://github.com/alsk1992/CloddsBot)

> **Static pattern-match signals, pending human triage** — NOT verdicts, and NOT the curated safety score.
> SkillSpector runs static analysis only here (`--no-llm`), which over-flags heavily: the atlas's *safest* curated repo scans as CRITICAL. These signals are triage input, never a ranking. For the human-reviewed safety score of `alsk1992/CloddsBot`, see the [main README](../../README.md) and [methodology](../methodology.md).

**Scanner grade:** 🔴 flagged-critical (untriaged) · SkillSpector v2.3.7

| Field | Value |
|---|---|
| Scanner risk score | 100/100 |
| Scanner severity | CRITICAL |
| Scanner recommendation | DO_NOT_INSTALL |
| Post-baseline counts | 🔴 3 C · 🟠 219 H · 🟡 352 M · ⚪ 97 L |
| Suppressed by baseline | 0 |
| Coverage | 100% (partial — LLM meta-analysis skipped) |
| Scanned head_sha | `e71a5f635d99` |

**Baseline:** none yet — counts are raw static signal, expect false positives. See [baselines](../../data/skillspector-baselines/README.md).

## Findings

| Severity | Location | Category | Confidence | Finding |
|---|---|---|---|---|
| 🔴 Critical | `package.json:101` | Supply Chain | 0.9 | @whiskeysockets/baileys==6.7.0 |
| 🔴 Critical | `src/cli/commands/index.ts:424` | YARA Match | 0.85 | process.env ; process.env.; process.env.; process.env.; process.env.; process.env.; process.env.; process.env.; process. |
| 🔴 Critical | `src/cli/commands/onboard.ts:284` | YARA Match | 0.85 | process.env.; ANTHROPIC_API_KEY; fetch(; fetch(; fetch(; api.telegram.org/bot |
| 🟠 High | `docker-compose.yml:7` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `docs/API_REFERENCE.md:189` | Tool Misuse | 0.24 | DELETE /api/chat/sessions/:id |
| 🟠 High | `docs/API_REFERENCE.md:544` | Tool Misuse | 0.24 | DELETE /api/dca/:id |
| 🟠 High | `docs/API_REFERENCE.md:980` | Tool Misuse | 0.24 | DELETE /v1/job/:jobId |
| 🟠 High | `docs/API_REFERENCE.md:1122` | Tool Misuse | 0.24 | DELETE /api/twap/:id |
| 🟠 High | `docs/API_REFERENCE.md:1190` | Tool Misuse | 0.24 | DELETE /api/triggers/:id |
| 🟠 High | `docs/API_REFERENCE.md:1222` | Tool Misuse | 0.24 | DELETE /api/copy-trading/leaders/:address |
| 🟠 High | `docs/API_REFERENCE.md:1349` | Tool Misuse | 0.24 | DELETE /api/whales/wallets/:address |
| 🟠 High | `docs/API_REFERENCE.md:1615` | Tool Misuse | 0.24 | DELETE /api/alerts/:id |
| 🟠 High | `docs/API_REFERENCE.md:1664` | Tool Misuse | 0.24 | DELETE /api/webhooks/:id |
| 🟠 High | `docs/API_REFERENCE.md:1776` | Tool Misuse | 0.24 | DELETE /api/cron/jobs/:id |
| 🟠 High | `docs/API_REFERENCE.md:1840` | Tool Misuse | 0.24 | DELETE /api/positions/managed/:id/stop-loss |
| 🟠 High | `docs/API_REFERENCE.md:1844` | Tool Misuse | 0.24 | DELETE /api/positions/managed/:id/take-profit |
| 🟠 High | `docs/API.md:449` | Tool Misuse | 0.24 | DELETE /api/chat/sessions/:id` |
| 🟠 High | `docs/API.md:1251` | Tool Misuse | 0.24 | DELETE /api/dca/:id |
| 🟠 High | `docs/API.md:1754` | Tool Misuse | 0.24 | DELETE /v1/job/:jobId |
| 🟠 High | `docs/ARCHITECTURE.md:697` | Prompt Injection | 0.27 | Send message to |
| 🟠 High | `docs/AUTHENTICATION.md:34` | Privilege Escalation | 0.21 | access token |
| 🟠 High | `docs/DEPLOYMENT_GUIDE.md:106` | Privilege Escalation | 0.18 | .env |
| 🟠 High | `docs/DEPLOYMENT.md:81` | Privilege Escalation | 0.21 | credentials.json |
| 🟠 High | `docs/DEPLOYMENT.md:352` | Privilege Escalation | 0.18 | .env |
| 🟠 High | `docs/USER_GUIDE.md:167` | Rogue Agent | 0.255 | Update skill |
| 🟠 High | `docs/VPS_SECURITY.md:323` | Privilege Escalation | 0.27 | .ssh/authorized_keys |
| 🟠 High | `docs/VPS_SECURITY.md:433` | Tool Misuse | 0.22499999999999998 | && sudo |
| 🟠 High | `package-lock.json:5635` | Privilege Escalation | 0.7 | keyring |
| 🟠 High | `package-lock.json:5709` | Privilege Escalation | 0.7 | keyring |
| 🟠 High | `package-lock.json:5711` | Privilege Escalation | 0.7 | keyring |
| 🟠 High | `package-lock.json:5711` | Privilege Escalation | 0.7 | keyring |
| 🟠 High | `package-lock.json:5780` | Privilege Escalation | 0.7 | keyring |
| 🟠 High | `package-lock.json:5806` | Privilege Escalation | 0.7 | keyring |
| 🟠 High | `package-lock.json:7262` | Tool Misuse | 0.85 | rmaibWJQxMwC5lSaORSZuwjopSUE6T0nb/MVg6Z1siNCXhh/HFTOg0l8bNvZHgBcN/ |
| 🟠 High | `package-lock.json:9575` | Tool Misuse | 0.85 | RmhMd/wD+CF8Dfo+cVIy3RR5cl8CyfXQ0tGgW6XBL8L4LM/ |
| 🟠 High | `package-lock.json:12694` | Tool Misuse | 0.85 | RMr0FhtfXemyinomL4hrWcYJxmX6deFdCxpJzhDttxgO1+bcCnkk+9drydLVDmAMG7NE6aN/fl4F7ucU/ |
| 🟠 High | `package-lock.json:18071` | Tool Misuse | 0.85 | RM5oyBy45cLEoHqCeh+MNuFAxO0vTFBLskvQbOKnEE7YTTSN4tbN8QWDIPQ6L+WvKsB/ |
| 🟠 High | `package.json:19` | YARA Match | 0.85 | "postinstall": "node -e |
| 🟠 High | `package.json:125` | Supply Chain | 0.8 | fast-xml-parser==5.3.7 |
| 🟠 High | `package.json:127` | Supply Chain | 0.8 | glob==10.3.10 |
| 🟠 High | `package.json:135` | Supply Chain | 0.8 | nodemailer==7.0.13 |
| 🟠 High | `package.json:139` | Supply Chain | 0.8 | sharp==0.34.5 |
| 🟠 High | `package.json:144` | Supply Chain | 0.8 | ws==8.16.0 |
| 🟠 High | `public/webchat/index.html:12` | Prompt Injection | 0.7 | &lt;!-- Sidebar -->     &lt;aside class="sidebar" aria-label="Chat history">       &lt;!-- Icon Rail (always visible) -- |
| 🟠 High | `public/webchat/index.html:180` | Prompt Injection | 0.7 | &lt;!-- Main -->     &lt;main class="main welcome-mode" aria-label="Chat">       &lt;header class="chat-header">         |
| 🟠 High | `public/webchat/js/app.js:527` | Memory Poisoning | 0.8 | delete conversation |
| 🟠 High | `public/webchat/js/app.js:531` | Memory Poisoning | 0.8 | delete conversation |
| 🟠 High | `README.md:108` | Memory Poisoning | 0.8 | delete conversation |
| 🟠 High | `scripts/install.sh:4` | Supply Chain | 0.9 | curl -fsSL https://clodds.com/install.sh \| bash |
| 🟠 High | `scripts/install.sh:4` | Tool Misuse | 0.7 | \| bash |

_…and 621 more finding(s) — see the artifact JSON._

