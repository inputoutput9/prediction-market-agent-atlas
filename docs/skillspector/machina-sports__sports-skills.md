# SkillSpector scan — [`machina-sports/sports-skills`](https://github.com/machina-sports/sports-skills)

> **Static pattern-match signals, pending human triage** — NOT verdicts, and NOT the curated safety score.
> SkillSpector runs static analysis only here (`--no-llm`), which over-flags heavily: the atlas's *safest* curated repo scans as CRITICAL. These signals are triage input, never a ranking. For the human-reviewed safety score of `machina-sports/sports-skills`, see the [main README](../../README.md) and [methodology](../methodology.md).

**Scanner grade:** 🔴 flagged-critical (untriaged) · SkillSpector v2.4.3

| Field | Value |
|---|---|
| Scanner risk score | 100/100 |
| Scanner severity | CRITICAL |
| Scanner recommendation | DO_NOT_INSTALL |
| Post-baseline counts | 🔴 3 C · 🟠 19 H · 🟡 56 M · ⚪ 5 L |
| Suppressed by baseline | 0 |
| Coverage | 100% (partial — LLM meta-analysis skipped) |
| Scanned head_sha | `c25ee37cdffd` |

**Baseline:** none yet — counts are raw static signal, expect false positives. See [baselines](../../data/skillspector-baselines/README.md).

## Findings

| Severity | Location | Category | Confidence | Finding |
|---|---|---|---|---|
| 🔴 Critical | `pyproject.toml:34` | Supply Chain | 0.9 | pyarrow |
| 🔴 Critical | `pyproject.toml:34` | Supply Chain | 0.9 | pyarrow |
| 🔴 Critical | `pyproject.toml:46` | Supply Chain | 0.9 | pyyaml |
| 🟠 High | `AGENTS.md:22` | Supply Chain | 0.9 | curl \| bash |
| 🟠 High | `CHANGELOG.md:28` | Supply Chain | 0.9 | curl \| bash |
| 🟠 High | `pyproject.toml:29` | Supply Chain | 0.8 | feedparser |
| 🟠 High | `pyproject.toml:33` | Supply Chain | 0.8 | pandas |
| 🟠 High | `pyproject.toml:33` | Supply Chain | 0.8 | pandas |
| 🟠 High | `pyproject.toml:33` | Supply Chain | 0.8 | pandas |
| 🟠 High | `pyproject.toml:45` | Supply Chain | 0.8 | pytest |
| 🟠 High | `pyproject.toml:46` | Supply Chain | 0.8 | jinja2 |
| 🟠 High | `site/templates/base.html:28` | Prompt Injection | 0.7 | &lt;!-- NAV -->   &lt;nav>     &lt;a href="/" class="nav-brand" style="text-decoration:none;">       &lt;span class="dot |
| 🟠 High | `site/templates/index.html:41` | Prompt Injection | 0.7 | &lt;!-- HERO --> &lt;section class="hero">   &lt;div class="container">     &lt;div class="fade-in">       &lt;pre class |
| 🟠 High | `site/templates/skill.html:39` | Prompt Injection | 0.7 | &lt;!-- BREADCRUMB --> &lt;div class="breadcrumb">   &lt;div class="container">     &lt;a href="/">sports-skills.sh&lt;/ |
| 🟠 High | `site/templates/skill.html:92` | Prompt Injection | 0.7 | &lt;!-- COMMANDS --> &lt;section class="commands-section">   &lt;div class="container">     &lt;h2>Commands&lt;/h2>      |
| 🟠 High | `skills/football-data/SKILL.md:26` | YARA Match | 0.425 | pip install git+https://; pip install git+https:// |
| 🟠 High | `skills/nfl-data/SKILL.md:26` | YARA Match | 0.425 | pip install git+https://; pip install git+https:// |
| 🟠 High | `skills/sports-reporter/SKILL.md:384` | YARA Match | 0.85 | pip install git+https:// |
| 🟠 High | `skills/volleyball-data/SKILL.md:26` | YARA Match | 0.425 | pip install git+https://; pip install git+https:// |
| 🟠 High | `skills/xctf-data/SKILL.md:27` | YARA Match | 0.425 | pip install git+https:// |
| 🟠 High | `src/sports_skills/polymarket/_cli.py:126` | Data Exfiltration | 0.7 | os.environ.get("POLYMARKET_PRIVATE_KEY |
| 🟠 High | `src/sports_skills/volleyball/_nevobo.py:301` | YARA Match | 0.7 | Hydra / JSON-L |
| 🟡 Medium | `AGENTS.md:8` | Excessive Agency | 0.8 | Never ask the user |
| 🟡 Medium | `CHANGELOG.md:159` | Agent Snooping | 0.8 | skills/metadata/SKILL.md |
| 🟡 Medium | `CHANGELOG.md:162` | Agent Snooping | 0.8 | skills/machina/SKILL.md |
| 🟡 Medium | `README.md:10` | MCP Rug Pull | 0.7 |  |
| 🟡 Medium | `README.md:22` | MCP Rug Pull | 0.7 |  |
| 🟡 Medium | `README.md:30` | Excessive Agency | 0.8 | Never ask user |
| 🟡 Medium | `README.md:59` | MCP Rug Pull | 0.7 |  |
| 🟡 Medium | `reports/health/2026-02-18.json:204` | Data Exfiltration | 0.5 | https://api.elections.kalshi.com/ |
| 🟡 Medium | `reports/health/2026-02-19.json:249` | Data Exfiltration | 0.5 | https://api.elections.kalshi.com/ |
| 🟡 Medium | `reports/health/2026-02-20.json:303` | Data Exfiltration | 0.5 | https://api.elections.kalshi.com/ |
| 🟡 Medium | `scripts/nightly_health_check.py:66` | Data Exfiltration | 0.6 | https://api.elections.kalshi.com/ |
| 🟡 Medium | `scripts/nightly_improve.py:48` | Data Exfiltration | 0.6 | https://api.elections.kalshi.com/ |
| 🟡 Medium | `scripts/nightly_improve.py:77` | Dangerous Code Execution | 0.7 | result = subprocess.run(cmd, capture_output=True, text=True, cwd=cwd or REPO_ROOT) |
| 🟡 Medium | `site/build.py:352` | MCP Rug Pull | 0.7 |  |
| 🟡 Medium | `site/build.py:468` | MCP Rug Pull | 0.7 |  |
| 🟡 Medium | `site/templates/index.html:69` | MCP Rug Pull | 0.7 |  |
| 🟡 Medium | `site/templates/index.html:146` | MCP Rug Pull | 0.7 |  |
| 🟡 Medium | `skills/catalog.json:23` | Agent Snooping | 0.8 | skills/betting/SKILL.md |
| 🟡 Medium | `skills/catalog.json:34` | Agent Snooping | 0.8 | skills/cbb-data/SKILL.md |
| 🟡 Medium | `skills/catalog.json:45` | Agent Snooping | 0.8 | skills/cfb-data/SKILL.md |
| 🟡 Medium | `skills/catalog.json:56` | Agent Snooping | 0.8 | skills/cricket-data/SKILL.md |
| 🟡 Medium | `skills/catalog.json:67` | Agent Snooping | 0.8 | skills/esports/SKILL.md |
| 🟡 Medium | `skills/catalog.json:78` | Agent Snooping | 0.8 | skills/fastf1/SKILL.md |
| 🟡 Medium | `skills/catalog.json:89` | Agent Snooping | 0.8 | skills/football-data/SKILL.md |
| 🟡 Medium | `skills/catalog.json:100` | Agent Snooping | 0.8 | skills/golf-data/SKILL.md |
| 🟡 Medium | `skills/catalog.json:111` | Agent Snooping | 0.8 | skills/kalshi/SKILL.md |
| 🟡 Medium | `skills/catalog.json:122` | Agent Snooping | 0.8 | skills/machina/SKILL.md |
| 🟡 Medium | `skills/catalog.json:133` | Agent Snooping | 0.8 | skills/markets/SKILL.md |

_…and 33 more finding(s) — see the artifact JSON._

