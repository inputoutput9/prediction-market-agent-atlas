# SkillSpector scan — [`machina-sports/sports-skills`](https://github.com/machina-sports/sports-skills)

> **Static pattern-match signals, pending human triage** — NOT verdicts, and NOT the curated safety score.
> SkillSpector runs static analysis only here (`--no-llm`), which over-flags heavily: the atlas's *safest* curated repo scans as CRITICAL. These signals are triage input, never a ranking. For the human-reviewed safety score of `machina-sports/sports-skills`, see the [main README](../../README.md) and [methodology](../methodology.md).

**Scanner grade:** 🔴 flagged-critical (untriaged) · SkillSpector v2.4.3

| Field | Value |
|---|---|
| Scanner risk score | 100/100 |
| Scanner severity | CRITICAL |
| Scanner recommendation | DO_NOT_INSTALL |
| Post-baseline counts | 🔴 4 C · 🟠 32 H · 🟡 176 M · ⚪ 12 L |
| Suppressed by baseline | 0 |
| Coverage | 100% (partial — LLM meta-analysis skipped) |
| Scanned head_sha | `0784ab06b04f` |

**Baseline:** none yet — counts are raw static signal, expect false positives. See [baselines](../../data/skillspector-baselines/README.md).

## Findings

| Severity | Location | Category | Confidence | Finding |
|---|---|---|---|---|
| 🔴 Critical | `pyproject.toml:46` | Supply Chain | 0.9 | pyarrow |
| 🔴 Critical | `pyproject.toml:46` | Supply Chain | 0.9 | pyarrow |
| 🔴 Critical | `pyproject.toml:46` | Supply Chain | 0.9 | pyarrow |
| 🔴 Critical | `pyproject.toml:59` | Supply Chain | 0.9 | pyyaml |
| 🟠 High | `AGENTS.md:22` | Supply Chain | 0.9 | curl \| bash |
| 🟠 High | `CHANGELOG.md:373` | Supply Chain | 0.9 | curl \| bash |
| 🟠 High | `pyproject.toml:31` | Supply Chain | 0.8 | feedparser |
| 🟠 High | `pyproject.toml:32` | Supply Chain | 0.8 | requests |
| 🟠 High | `pyproject.toml:40` | Supply Chain | 0.8 | pandas |
| 🟠 High | `pyproject.toml:40` | Supply Chain | 0.8 | pandas |
| 🟠 High | `pyproject.toml:40` | Supply Chain | 0.8 | pandas |
| 🟠 High | `pyproject.toml:46` | Supply Chain | 0.8 | pandas |
| 🟠 High | `pyproject.toml:58` | Supply Chain | 0.8 | pytest |
| 🟠 High | `pyproject.toml:59` | Supply Chain | 0.8 | jinja2 |
| 🟠 High | `site/build.py:674` | Data Exfiltration | 0.7 | os.environ.get("GITHUB_TOKEN |
| 🟠 High | `site/og/og.html:2` | Prompt Injection | 0.7 | &lt;!--   Source for site/static/og.png (1200×630 social card). Regenerate with:   "/Applications/Google Chrome.app/Cont |
| 🟠 High | `site/templates/index.html:66` | Prompt Injection | 0.7 | &lt;!-- HERO --> &lt;section class="hero">   &lt;div class="hero-bg" aria-hidden="true">     &lt;div class="hero-glow">& |
| 🟠 High | `site/templates/index.html:159` | Prompt Injection | 0.7 | &lt;!-- STATS --> {% set n_stats = 3 + (1 if st.skill_installs_label else 0) + (1 if st.pypi_downloads_label else 0) + ( |
| 🟠 High | `site/templates/index.html:327` | Prompt Injection | 0.7 | &lt;!-- USE CASES --> &lt;section class="section" id="use-cases" style="padding-top: 24px;">   &lt;div class="wrap">     |
| 🟠 High | `site/templates/skill.html:46` | Prompt Injection | 0.7 | &lt;!-- SKILL HEADER --> &lt;section class="sk-top tone-{{ skill.category_color }}">   &lt;div class="wrap">     &lt;nav |
| 🟠 High | `site/templates/skill.html:111` | Prompt Injection | 0.7 | &lt;!-- COVERAGE -->     &lt;section class="sk-sec" id="coverage">       &lt;h2>Coverage&lt;/h2>       &lt;div class="sk |
| 🟠 High | `site/templates/skill.html:158` | Prompt Injection | 0.7 | &lt;!-- EXAMPLES -->     &lt;section class="sk-sec">       &lt;h2>Example Prompts&lt;/h2>       &lt;ul class="prompts">  |
| 🟠 High | `skills/football-data/SKILL.md:26` | YARA Match | 0.425 | pip install git+https://; pip install git+https:// |
| 🟠 High | `skills/nfl-data/SKILL.md:26` | YARA Match | 0.425 | pip install git+https://; pip install git+https:// |
| 🟠 High | `skills/sports-reporter/SKILL.md:383` | YARA Match | 0.85 | pip install git+https:// |
| 🟠 High | `skills/volleyball-data/SKILL.md:26` | YARA Match | 0.425 | pip install git+https://; pip install git+https:// |
| 🟠 High | `skills/xctf-data/SKILL.md:27` | YARA Match | 0.425 | pip install git+https:// |
| 🟠 High | `src/sports_skills/canonical/_vendored/adapters/sportradar_tennis.py:61` | Prompt Injection | 0.9 | silently record |
| 🟠 High | `src/sports_skills/polymarket/_cli.py:126` | Data Exfiltration | 0.7 | os.environ.get("POLYMARKET_PRIVATE_KEY |
| 🟠 High | `src/sports_skills/volleyball/_nevobo.py:446` | YARA Match | 0.7 | Hydra / JSON-L |
| 🟠 High | `tests/test_espn_api_skill.py:212` | Data Exfiltration | 0.7 | for k, v in os.environ.items() |
| 🟠 High | `tests/test_imports.py:83` | Data Exfiltration | 0.6 | os.environ.copy() |
| 🟠 High | `tests/test_release_036.py:47` | Data Exfiltration | 0.6 | os.environ.copy() |
| 🟠 High | `tests/test_release_037.py:47` | Data Exfiltration | 0.6 | os.environ.copy() |
| 🟠 High | `tests/test_release_038.py:47` | Data Exfiltration | 0.6 | os.environ.copy() |
| 🟠 High | `tests/test_release_039.py:47` | Data Exfiltration | 0.6 | os.environ.copy() |
| 🟡 Medium | `AGENTS.md:8` | Excessive Agency | 0.8 | Never ask the user |
| 🟡 Medium | `CHANGELOG.md:504` | Agent Snooping | 0.8 | skills/metadata/SKILL.md |
| 🟡 Medium | `CHANGELOG.md:507` | Agent Snooping | 0.8 | skills/machina/SKILL.md |
| 🟡 Medium | `docs/zeroclick-funnel.md:25` | MCP Rug Pull | 0.7 |  |
| 🟡 Medium | `packaging/release.py:56` | Dangerous Code Execution | 0.7 | subprocess.run(             [sys.executable, "-m", "build", "--no-isolation", "--outdir", str(staging), str(root)],      |
| 🟡 Medium | `README.md:10` | MCP Rug Pull | 0.7 |  |
| 🟡 Medium | `README.md:37` | MCP Rug Pull | 0.7 |  |
| 🟡 Medium | `README.md:45` | Excessive Agency | 0.8 | Never ask user |
| 🟡 Medium | `README.md:74` | MCP Rug Pull | 0.7 |  |
| 🟡 Medium | `README.md:167` | MCP Rug Pull | 0.7 |  |
| 🟡 Medium | `reports/health/2026-02-18.json:204` | Data Exfiltration | 0.5 | https://api.elections.kalshi.com/ |
| 🟡 Medium | `reports/health/2026-02-19.json:249` | Data Exfiltration | 0.5 | https://api.elections.kalshi.com/ |
| 🟡 Medium | `reports/health/2026-02-20.json:303` | Data Exfiltration | 0.5 | https://api.elections.kalshi.com/ |
| 🟡 Medium | `scripts/nightly_health_check.py:66` | Data Exfiltration | 0.6 | https://api.elections.kalshi.com/ |

_…and 174 more finding(s) — see the artifact JSON._

