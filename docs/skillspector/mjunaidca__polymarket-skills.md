# SkillSpector scan — [`mjunaidca/polymarket-skills`](https://github.com/mjunaidca/polymarket-skills)

> **Static pattern-match signals, pending human triage** — NOT verdicts, and NOT the curated safety score.
> SkillSpector runs static analysis only here (`--no-llm`), which over-flags heavily: the atlas's *safest* curated repo scans as CRITICAL. These signals are triage input, never a ranking. For the human-reviewed safety score of `mjunaidca/polymarket-skills`, see the [main README](../../README.md) and [methodology](../methodology.md).

**Scanner grade:** 🟠 needs-triage (untriaged) · SkillSpector v2.3.7

| Field | Value |
|---|---|
| Scanner risk score | 100/100 |
| Scanner severity | CRITICAL |
| Scanner recommendation | DO_NOT_INSTALL |
| Post-baseline counts | 🔴 0 C · 🟠 23 H · 🟡 12 M · ⚪ 0 L |
| Suppressed by baseline | 0 |
| Coverage | 100% (partial — LLM meta-analysis skipped) |
| Scanned head_sha | `ffed17f13bc5` |

**Baseline:** none yet — counts are raw static signal, expect false positives. See [baselines](../../data/skillspector-baselines/README.md).

## Findings

| Severity | Location | Category | Confidence | Finding |
|---|---|---|---|---|
| 🟠 High | `polymarket-live-executor/scripts/check_positions.py:33` | Data Exfiltration | 0.7 | os.environ.get("POLYMARKET_PRIVATE_KEY |
| 🟠 High | `polymarket-live-executor/scripts/execute_live.py:41` | Data Exfiltration | 0.7 | os.environ.get("POLYMARKET_PRIVATE_KEY |
| 🟠 High | `polymarket-live-executor/scripts/execute_live.py:104` | Data Exfiltration | 0.8 | os.environ["POLYMARKET_PRIVATE_KEY"] |
| 🟠 High | `polymarket-live-executor/scripts/setup_wallet.py:54` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `polymarket-live-executor/scripts/setup_wallet.py:57` | Privilege Escalation | 0.6 | .env" |
| 🟠 High | `polymarket-live-executor/scripts/setup_wallet.py:77` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `polymarket-live-executor/scripts/setup_wallet.py:91` | Data Exfiltration | 0.7 | os.environ.get("POLYMARKET_PRIVATE_KEY |
| 🟠 High | `polymarket-live-executor/scripts/setup_wallet.py:130` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `polymarket-live-executor/scripts/setup_wallet.py:131` | Privilege Escalation | 0.6 | .env" |
| 🟠 High | `polymarket-live-executor/scripts/setup_wallet.py:135` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `polymarket-live-executor/scripts/setup_wallet.py:137` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `polymarket-live-executor/scripts/setup_wallet.py:139` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `polymarket-live-executor/scripts/setup_wallet.py:139` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `polymarket-live-executor/scripts/setup_wallet.py:145` | Privilege Escalation | 0.6 | .env" |
| 🟠 High | `polymarket-live-executor/scripts/setup_wallet.py:146` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `polymarket-live-executor/scripts/setup_wallet.py:148` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `polymarket-live-executor/scripts/setup_wallet.py:173` | Data Exfiltration | 0.7 | os.environ.get("POLYMARKET_PRIVATE_KEY |
| 🟠 High | `polymarket-live-executor/SKILL.md:44` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `polymarket-live-executor/SKILL.md:45` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `polymarket-live-executor/SKILL.md:45` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `polymarket-live-executor/SKILL.md:46` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `SECURITY-AUDIT.md:6` | YARA Match | 0.8 | model; LLM; AI agent; LLM; model; LLM; IGNORE ALL PREVIOUS INSTRUCTIONS |
| 🟠 High | `SECURITY-AUDIT.md:573` | Tool Misuse | 0.85 | rm -r --cached */ |
| 🟡 Medium | `CLAUDE.md:17` | Excessive Agency | 0.85 | auto-confirm |
| 🟡 Medium | `polymarket-live-executor/scripts/check_positions.py:32` | Rogue Agent | 0.6 | Create an L2-authenticated ClobClient."""     key = os.environ.get("POLYMARKET_PRIVATE_KEY", "")     if not key:         |
| 🟡 Medium | `polymarket-live-executor/scripts/setup_wallet.py:62` | Privilege Escalation | 0.8 | chmod 600 |
| 🟡 Medium | `polymarket-live-executor/scripts/setup_wallet.py:137` | Privilege Escalation | 0.8 | chmod 600 |
| 🟡 Medium | `polymarket-live-executor/scripts/setup_wallet.py:204` | Data Exfiltration | 0.7999999999999999 | requests.post(POLYGON_RPC, json= |
| 🟡 Medium | `polymarket-live-executor/scripts/setup_wallet.py:226` | Data Exfiltration | 0.7999999999999999 | requests.post(POLYGON_RPC, json= |
| 🟡 Medium | `polymarket-live-executor/SKILL.md:26` | Excessive Agency | 0.85 | auto-confirm |
| 🟡 Medium | `polymarket-live-executor/SKILL.md:45` | Privilege Escalation | 0.8 | chmod 600 |
| 🟡 Medium | `polymarket-strategy-advisor/scripts/backtest.py:261` | Memory Poisoning | 0.8 |  |
| 🟡 Medium | `polymarket-strategy-advisor/scripts/backtest.py:262` | Memory Poisoning | 0.8 |  |
| 🟡 Medium | `polymarket-strategy-advisor/scripts/backtest.py:263` | Memory Poisoning | 0.8 |  |
| 🟡 Medium | `README.md:233` | Privilege Escalation | 0.8 | chmod 600 |

