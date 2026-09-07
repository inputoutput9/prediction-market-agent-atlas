# SkillSpector scan — [`alsk1992/CloddsBot`](https://github.com/alsk1992/CloddsBot)

> **Static pattern-match signals, pending human triage** — NOT verdicts, and NOT the curated safety score.
> SkillSpector runs static analysis only here (`--no-llm`), which over-flags heavily: the atlas's *safest* curated repo scans as CRITICAL. These signals are triage input, never a ranking. For the human-reviewed safety score of `alsk1992/CloddsBot`, see the [main README](../../README.md) and [methodology](../methodology.md).

**Scanner grade:** 🔴 flagged-critical (untriaged) · SkillSpector v2.4.3

| Field | Value |
|---|---|
| Scanner risk score | 100/100 |
| Scanner severity | CRITICAL |
| Scanner recommendation | DO_NOT_INSTALL |
| Post-baseline counts | 🔴 3 C · 🟠 175 H · 🟡 382 M · ⚪ 101 L |
| Suppressed by baseline | 0 |
| Coverage | 100% (partial — LLM meta-analysis skipped) |
| Scanned head_sha | `715fd4a6c06b` |

**Baseline:** none yet — counts are raw static signal, expect false positives. See [baselines](../../data/skillspector-baselines/README.md).

## Findings

| Severity | Location | Category | Confidence | Finding |
|---|---|---|---|---|
| 🔴 Critical | `package.json:107` | Supply Chain | 0.9 | @whiskeysockets/baileys==6.7.0 |
| 🔴 Critical | `src/cli/commands/index.ts:424` | YARA Match | 0.85 | process.env ; process.env.; process.env.; process.env.; process.env.; process.env.; process.env.; process.env.; process. |
| 🔴 Critical | `src/cli/commands/onboard.ts:284` | YARA Match | 0.85 | process.env.; ANTHROPIC_API_KEY; fetch(; fetch(; fetch(; api.telegram.org/bot |
| 🟠 High | `docker-compose.yml:7` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `docs/ARCHITECTURE.md:697` | Prompt Injection | 0.27 | Send message to |
| 🟠 High | `docs/DEPLOYMENT_GUIDE.md:106` | Privilege Escalation | 0.18 | .env |
| 🟠 High | `docs/DEPLOYMENT.md:81` | Privilege Escalation | 0.21 | credentials.json |
| 🟠 High | `docs/DEPLOYMENT.md:352` | Privilege Escalation | 0.18 | .env |
| 🟠 High | `docs/VPS_SECURITY.md:433` | Tool Misuse | 0.22499999999999998 | && sudo |
| 🟠 High | `package-lock.json:5380` | Privilege Escalation | 0.7 | keyring |
| 🟠 High | `package-lock.json:5454` | Privilege Escalation | 0.7 | keyring |
| 🟠 High | `package-lock.json:5456` | Privilege Escalation | 0.7 | keyring |
| 🟠 High | `package-lock.json:5456` | Privilege Escalation | 0.7 | keyring |
| 🟠 High | `package-lock.json:5525` | Privilege Escalation | 0.7 | keyring |
| 🟠 High | `package-lock.json:5551` | Privilege Escalation | 0.7 | keyring |
| 🟠 High | `package.json:19` | YARA Match | 0.85 | "postinstall": "node scripts/fix-native-bindings.js && node scripts/fix-anchor-bn-export.js && node -e |
| 🟠 High | `package.json:131` | Supply Chain | 0.8 | fast-xml-parser==5.3.7 |
| 🟠 High | `package.json:133` | Supply Chain | 0.8 | glob==10.3.10 |
| 🟠 High | `package.json:150` | Supply Chain | 0.8 | ws==8.16.0 |
| 🟠 High | `public/webchat/index.html:12` | Prompt Injection | 0.7 | &lt;!-- Sidebar -->     &lt;aside class="sidebar" aria-label="Chat history">       &lt;!-- Icon Rail (always visible) -- |
| 🟠 High | `public/webchat/index.html:180` | Prompt Injection | 0.7 | &lt;!-- Main -->     &lt;main class="main welcome-mode" aria-label="Chat">       &lt;header class="chat-header">         |
| 🟠 High | `public/webchat/js/app.js:527` | Memory Poisoning | 0.8 | delete conversation |
| 🟠 High | `public/webchat/js/app.js:531` | Memory Poisoning | 0.8 | delete conversation |
| 🟠 High | `README.md:112` | Memory Poisoning | 0.8 | delete conversation |
| 🟠 High | `scripts/install.sh:4` | Supply Chain | 0.9 | curl -fsSL https://clodds.com/install.sh \| bash |
| 🟠 High | `scripts/install.sh:4` | Tool Misuse | 0.7 | \| bash |
| 🟠 High | `src/agents/index.ts:205` | Memory Poisoning | 0.8 | Clear conversation |
| 🟠 High | `src/agents/index.ts:7688` | Memory Poisoning | 0.8 | reset context |
| 🟠 High | `src/agents/index.ts:7798` | YARA Match | 0.8 | tools:; tools:; Tools =; tools:; Tools     :; Tools:; Tools:; Tools:; TOOLS =; Tools =; Tools =; Tools =; Tools =; Tools |
| 🟠 High | `src/agents/index.ts:8402` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `src/agents/index.ts:16136` | Tool Misuse | 0.9 | rm -rf / |
| 🟠 High | `src/agents/index.ts:16136` | Tool Misuse | 0.85 | rm -rf /', |
| 🟠 High | `src/agents/index.ts:17294` | Memory Poisoning | 0.8 | clear conversation |
| 🟠 High | `src/auth/google.ts:217` | Privilege Escalation | 0.7 | access token |
| 🟠 High | `src/auth/google.ts:263` | Privilege Escalation | 0.7 | access token |
| 🟠 High | `src/auth/google.ts:322` | Privilege Escalation | 0.7 | access token |
| 🟠 High | `src/auth/oauth.ts:352` | Privilege Escalation | 0.7 | access token |
| 🟠 High | `src/auth/oauth.ts:406` | Privilege Escalation | 0.7 | access token |
| 🟠 High | `src/auto-reply/index.ts:143` | System Prompt Leakage | 0.85 | Save rules to file |
| 🟠 High | `src/auto-reply/index.ts:307` | System Prompt Leakage | 0.85 | return rules |
| 🟠 High | `src/channels/googlechat/index.ts:230` | Prompt Injection | 0.9 | Send message to |
| 🟠 High | `src/channels/matrix/index.ts:333` | Prompt Injection | 0.9 | Send message to |
| 🟠 High | `src/channels/mattermost/index.ts:6` | Privilege Escalation | 0.7 | access token |
| 🟠 High | `src/channels/teams/index.ts:100` | Privilege Escalation | 0.7 | access token |
| 🟠 High | `src/channels/teams/index.ts:126` | Privilege Escalation | 0.7 | access token |
| 🟠 High | `src/channels/teams/index.ts:267` | Prompt Injection | 0.9 | Send message to |
| 🟠 High | `src/channels/voice/index.ts:287` | Prompt Injection | 0.9 | send message to |
| 🟠 High | `src/channels/zalo/index.ts:6` | Privilege Escalation | 0.7 | access token |
| 🟠 High | `src/channels/zalo/index.ts:23` | Privilege Escalation | 0.7 | Access token |
| 🟠 High | `src/cli/commands/index.ts:424` | Privilege Escalation | 0.6 | .env |

_…and 611 more finding(s) — see the artifact JSON._

