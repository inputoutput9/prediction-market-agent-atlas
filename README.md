<div align="center">

![Prediction Market Agent Atlas](assets/banner.svg)

</div>

<!-- Prediction Market Agent Atlas -->

[![Weekly scan](../../actions/workflows/scan.yml/badge.svg)](../../actions/workflows/scan.yml)&nbsp;&nbsp;[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)&nbsp;&nbsp;[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square&labelColor=2b2b2b)](CONTRIBUTING.md)

_A verified, continuously-rescanned map of the best — and safest — open-source tooling for connecting LLM agents to prediction markets. MCP servers, SDKs, agent skills, CLIs, and backtesting harnesses for **[Kalshi](https://kalshi.com)** and **[Polymarket](https://polymarket.com)** (more venues welcome), scored on a safety-weighted rubric with dated evidence per entry, and auto-decayed when repos go stale — so a dead repo can't keep a live recommendation. Suitable for builders and traders, with an emphasis on key safety, provenance, and code that actually exists._

<br>

<div align="center">

<img src="assets/overview.svg" alt="What the atlas does: an LLM agent harness, the atlas ranking 40+ repos into tiers with scam flags, connecting safely to Kalshi and Polymarket" width="100%">

</div>

<br>

# Table of Contents

- [Why this exists](#why-this-exists)
- [How the ranking works](#how-the-ranking-works)
- [The Rankings](#the-rankings)
  - [Kalshi](#kalshi)
  - [Polymarket](#polymarket)
  - [Cross-venue](#cross-venue)
  - [Deprecated / reference-only](#deprecated--reference-only)
  - [🚩 Flagged — do not run](#-flagged--do-not-run)
- [Safety essentials](#safety-essentials)
- [Diagrams](#diagrams)
- [Adding a venue or repo](#adding-a-venue-or-repo)
- [Honesty notes](#honesty-notes)
- [License](#license)

## Why this exists

Anyone wiring an LLM into a prediction market hits the same three problems:

1. **The ecosystem churns fast.** Both venues replaced their client generations recently — Kalshi's original `kalshi-python` is deprecated in favor of registry-published SDKs; Polymarket archived its v1 CLOB clients and its once-flagship `agents` framework. Third-party writeups routinely recommend the dead generation. *(As of 2026-07-23; the weekly scan keeps the tables below current.)*
2. **Neither venue ships an official MCP server** *(as of 2026-07-23)* — the MCP layer is entirely community-built, so provenance and key-handling vary wildly.
3. **Trading repos are a scam magnet.** Star-farmed "arbitrage bots" and README-only "AI agents" sit next to legitimate tools in every search. Popularity is not a safety signal here — which is why stars are displayed but **never scored**.

The atlas answers: *which repo do I hand my agent — and my API keys — to?*

## How the ranking works

Each entry is scored 0–5 on four **curated** axes (with dated evidence in [`data/repos.yaml`](data/repos.yaml)) plus one **computed** axis:

| Axis | Weight | What it measures |
|---|---|---|
| **Safety** | ×3 | Key handling, demo-by-default, write gating, spend caps, no exfil/telemetry |
| **Provenance** | ×2 | Official org > established maintainer > unknown; inorganic engagement penalized |
| **Capability** | ×2 | Venue API surface: data · WebSocket · orders · portfolio/settlement |
| **Agent fit** | ×2 | MCP/skill-native quality, tool schemas, structured output, agent docs |
| **Maintenance** | ×2 | **Computed** from `max(last push, last release)` — never hand-assigned |

Weighted total → tier: **S** (≥80%) · **A** (≥65%) · **B** (≥45%) · **C**. Hard overrides beat scores: scam/key-exfil flags → 🚩 Flagged; archived → Deprecated; idle >180 days caps the tier at B (unless an official surface is deliberately accepted as dormant). Full rubric with per-level anchors: [docs/methodology.md](docs/methodology.md); the pipeline as a diagram: [scoring-pipeline](diagrams/scoring-pipeline.md).

# The Rankings

**Read the ranking like this:** pick from **🟢 S / 🟡 A** for anything touching real keys; **🔵 B** = usable with eyes open; **⚪ C** = notable but not recommended; **📦 Deprecated** = read the code, never depend on it; **🚩 Flagged** = do not clone, do not run. Health badges under each entry are live (rendered by GitHub on view); tiers and decay compute from the committed weekly scan.

<!-- BEGIN GENERATED RANKINGS (bun scripts/generate-readme.ts) -->

> **44 entries** · curated scores last human-reviewed **2026-07-23** · liveness data as of **2026-07-23** (auto-refreshed weekly by the [scan workflow](.github/workflows/scan.yml)). Each entry leads with **tier · weighted score / 55**; the sub-line gives the per-axis breakdown (0–5 each; maintenance is computed from activity, see [methodology](docs/methodology.md)); the badge strip is live GitHub/registry health.

### Kalshi

- 🟢 **S** · **47 / 55** · [`cejor6/kalshi-mcp-server`](https://github.com/cejor6/kalshi-mcp-server)  
  Strongest safety model surveyed on either venue. Bus factor 1 (single human contributor, self-labeled alpha) — read the code before trusting it with keys; pin the PyPI version. <sub>provenance 2 · capability 4 · safety 5 · agent-fit 5 · category: mcp-server</sub>  
  <img src="https://img.shields.io/github/last-commit/cejor6/kalshi-mcp-server?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="last-commit"> <img src="https://img.shields.io/github/stars/cejor6/kalshi-mcp-server?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="stars"> <img src="https://img.shields.io/github/license/cejor6/kalshi-mcp-server?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="license"> <img src="https://img.shields.io/pypi/v/kalshi-mcp-server?style=flat-square&labelColor=2b2b2b&color=6b6b6b&label=pypi" alt="pypi">

- 🟡 **A** · **43 / 55** · [`kalshi-python-sync`](https://pypi.org/project/kalshi-python-sync/)  
  Official REST ground truth (async variant: kalshi-python-async). The deprecated `kalshi-python` package is its predecessor — do not confuse them. <sub>provenance 5 · capability 4 · safety 3 · agent-fit 3 · category: sdk-client</sub>  
  <img src="https://img.shields.io/pypi/v/kalshi-python-sync?style=flat-square&labelColor=2b2b2b&color=6b6b6b&label=pypi" alt="pypi">

- 🟡 **A** · **43 / 55** · [`kalshi-typescript`](https://www.npmjs.com/package/kalshi-typescript)  
  Official TS ground truth. <sub>provenance 5 · capability 4 · safety 3 · agent-fit 3 · category: sdk-client</sub>  
  <img src="https://img.shields.io/npm/v/kalshi-typescript?style=flat-square&labelColor=2b2b2b&color=6b6b6b&label=npm" alt="npm">

- 🟡 **A** · **42 / 55** · [`TexasCoding/kalshi-python-sdk`](https://github.com/TexasCoding/kalshi-python-sdk)  
  Most complete Kalshi client surveyed. Pin the version; budget upgrade time per major. <sub>provenance 2 · capability 5 · safety 4 · agent-fit 3 · category: sdk-client</sub>  
  <img src="https://img.shields.io/github/last-commit/TexasCoding/kalshi-python-sdk?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="last-commit"> <img src="https://img.shields.io/github/stars/TexasCoding/kalshi-python-sdk?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="stars"> <img src="https://img.shields.io/github/license/TexasCoding/kalshi-python-sdk?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="license"> <img src="https://img.shields.io/pypi/v/kalshi-sdk?style=flat-square&labelColor=2b2b2b&color=6b6b6b&label=pypi" alt="pypi">

- 🟡 **A** · **40 / 55** · [`9crusher/mcp-server-kalshi`](https://github.com/9crusher/mcp-server-kalshi)  
  Lighter fallback MCP — fewer tools, sane defaults. <sub>provenance 2 · capability 3 · safety 4 · agent-fit 4 · category: mcp-server</sub>  
  <img src="https://img.shields.io/github/last-commit/9crusher/mcp-server-kalshi?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="last-commit"> <img src="https://img.shields.io/github/stars/9crusher/mcp-server-kalshi?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="stars"> <img src="https://img.shields.io/github/license/9crusher/mcp-server-kalshi?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="license">

- 🟡 **A** · **39 / 55** · [`ArshKA/pykalshi`](https://github.com/ArshKA/pykalshi)  
  Ergonomics layer — pairs well with a spec-first SDK as source of truth. <sub>provenance 3 · capability 4 · safety 3 · agent-fit 3 · category: sdk-client</sub>  
  <img src="https://img.shields.io/github/last-commit/ArshKA/pykalshi?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="last-commit"> <img src="https://img.shields.io/github/stars/ArshKA/pykalshi?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="stars"> <img src="https://img.shields.io/github/license/ArshKA/pykalshi?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="license"> <img src="https://img.shields.io/pypi/v/pykalshi?style=flat-square&labelColor=2b2b2b&color=6b6b6b&label=pypi" alt="pypi">

- 🟡 **A** · **39 / 55** · [`newyorkcompute/kalshi`](https://github.com/newyorkcompute/kalshi)  
  Both MCP and skill in one TS stack. Prefer running from source over the stale npm publishes. <sub>provenance 2 · capability 4 · safety 3 · agent-fit 4 · category: mcp-server</sub>  
  <img src="https://img.shields.io/github/last-commit/newyorkcompute/kalshi?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="last-commit"> <img src="https://img.shields.io/github/stars/newyorkcompute/kalshi?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="stars"> <img src="https://img.shields.io/github/license/newyorkcompute/kalshi?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="license"> <img src="https://img.shields.io/npm/v/%40newyorkcompute%2Fkalshi-mcp?style=flat-square&labelColor=2b2b2b&color=6b6b6b&label=npm" alt="npm">

- 🔵 **B** · **33 / 55** · [`austron24/kalshi-trader-plugin`](https://github.com/austron24/kalshi-trader-plugin)  
  Only surveyed Kalshi tool natively shaped as an agent-harness plugin. <sub>provenance 2 · capability 3 · safety 3 · agent-fit 5 · category: agent-framework</sub>  
  <img src="https://img.shields.io/github/last-commit/austron24/kalshi-trader-plugin?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="last-commit"> <img src="https://img.shields.io/github/stars/austron24/kalshi-trader-plugin?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="stars"> <img src="https://img.shields.io/github/license/austron24/kalshi-trader-plugin?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="license">

- 🔵 **B** · **31 / 55** · [`rmadev01/kalshi-rs`](https://github.com/rmadev01/kalshi-rs)  
  Low-latency niche. Unproven; name collision invites dependency mistakes. <sub>provenance 2 · capability 4 · safety 3 · agent-fit 2 · category: sdk-client</sub>  
  <img src="https://img.shields.io/github/last-commit/rmadev01/kalshi-rs?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="last-commit"> <img src="https://img.shields.io/github/stars/rmadev01/kalshi-rs?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="stars"> <img src="https://img.shields.io/github/license/rmadev01/kalshi-rs?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="license">

- 🔵 **B** · **29 / 55** · [`Kalshi/kalshi-starter-code-python`](https://github.com/Kalshi/kalshi-starter-code-python)  
  Reference snippets only — the maintained official surface is the registry SDKs. <sub>provenance 5 · capability 2 · safety 3 · agent-fit 2 · category: sdk-client</sub>  
  <img src="https://img.shields.io/github/last-commit/Kalshi/kalshi-starter-code-python?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="last-commit"> <img src="https://img.shields.io/github/stars/Kalshi/kalshi-starter-code-python?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="stars"> <img src="https://img.shields.io/github/license/Kalshi/kalshi-starter-code-python?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="license">

### Polymarket

- 🟢 **S** · **48 / 55** · [`Polymarket/agent-skills`](https://github.com/Polymarket/agent-skills)  
  The official agent-integration path. Apply a v1→v2 client substitution when following its samples: @polymarket/clob-client-v2 / py-clob-client-v2. <sub>provenance 5 · capability 5 · safety 4 · agent-fit 5 · category: skill</sub>  
  <img src="https://img.shields.io/github/last-commit/Polymarket/agent-skills?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="last-commit"> <img src="https://img.shields.io/github/stars/Polymarket/agent-skills?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="stars"> <img src="https://img.shields.io/github/license/Polymarket/agent-skills?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="license">

- 🟡 **A** · **43 / 55** · [`Polymarket/polymarket-cli`](https://github.com/Polymarket/polymarket-cli)  
  Agent harnesses can drive it via shell with zero MCP plumbing. <sub>provenance 5 · capability 4 · safety 3 · agent-fit 4 · category: cli</sub>  
  <img src="https://img.shields.io/github/last-commit/Polymarket/polymarket-cli?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="last-commit"> <img src="https://img.shields.io/github/stars/Polymarket/polymarket-cli?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="stars"> <img src="https://img.shields.io/github/license/Polymarket/polymarket-cli?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="license">

- 🟡 **A** · **43 / 55** · [`Polymarket/py-clob-client-v2`](https://github.com/Polymarket/py-clob-client-v2)  
  TS sibling: @polymarket/clob-client-v2; Rust: rs-clob-client-v2. <sub>provenance 5 · capability 4 · safety 3 · agent-fit 3 · category: sdk-client</sub>  
  <img src="https://img.shields.io/github/last-commit/Polymarket/py-clob-client-v2?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="last-commit"> <img src="https://img.shields.io/github/stars/Polymarket/py-clob-client-v2?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="stars"> <img src="https://img.shields.io/github/license/Polymarket/py-clob-client-v2?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="license"> <img src="https://img.shields.io/pypi/v/py-clob-client-v2?style=flat-square&labelColor=2b2b2b&color=6b6b6b&label=pypi" alt="pypi">

- 🟡 **A** · **43 / 55** · [`Polymarket/ts-sdk`](https://github.com/Polymarket/ts-sdk)  
  Python sibling: Polymarket/py-sdk. Check the registry for the actual published package name before adding a dependency. <sub>provenance 5 · capability 4 · safety 3 · agent-fit 3 · category: sdk-client</sub>  
  <img src="https://img.shields.io/github/last-commit/Polymarket/ts-sdk?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="last-commit"> <img src="https://img.shields.io/github/stars/Polymarket/ts-sdk?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="stars"> <img src="https://img.shields.io/github/license/Polymarket/ts-sdk?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="license">

- 🟡 **A** · **42 / 55** · [`caiovicentino/polymarket-mcp-server`](https://github.com/caiovicentino/polymarket-mcp-server)  
  Functional and safety-conscious in code, but treat as a reference implementation rather than a trust anchor until provenance concerns age out. <sub>provenance 1 · capability 5 · safety 4 · agent-fit 4 · category: mcp-server</sub>  
  <img src="https://img.shields.io/github/last-commit/caiovicentino/polymarket-mcp-server?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="last-commit"> <img src="https://img.shields.io/github/stars/caiovicentino/polymarket-mcp-server?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="stars"> <img src="https://img.shields.io/github/license/caiovicentino/polymarket-mcp-server?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="license">

- 🟡 **A** · **42 / 55** · [`demwick/polymarket-agent-mcp`](https://github.com/demwick/polymarket-agent-mcp)  
  Best engineering posture among community Polymarket MCPs; depth of the advanced tools (copy-trading, backtest) not independently audited. <sub>provenance 2 · capability 4 · safety 4 · agent-fit 4 · category: mcp-server</sub>  
  <img src="https://img.shields.io/github/last-commit/demwick/polymarket-agent-mcp?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="last-commit"> <img src="https://img.shields.io/github/stars/demwick/polymarket-agent-mcp?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="stars"> <img src="https://img.shields.io/github/license/demwick/polymarket-agent-mcp?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="license">

- 🟡 **A** · **38 / 55** · [`Polymarket/real-time-data-client`](https://github.com/Polymarket/real-time-data-client)  
  Pair with a CLOB client when you need writes. <sub>provenance 5 · capability 2 · safety 4 · agent-fit 3 · category: sdk-client</sub>  
  <img src="https://img.shields.io/github/last-commit/Polymarket/real-time-data-client?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="last-commit"> <img src="https://img.shields.io/github/stars/Polymarket/real-time-data-client?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="stars"> <img src="https://img.shields.io/github/license/Polymarket/real-time-data-client?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="license"> <img src="https://img.shields.io/npm/v/%40polymarket%2Freal-time-data-client?style=flat-square&labelColor=2b2b2b&color=6b6b6b&label=npm" alt="npm">

- 🟡 **A** · **37 / 55** · [`artvandelay/polymarket-agents`](https://github.com/artvandelay/polymarket-agents)  
  Narrow domain, honest scope — a good template for domain-specific paper agents. <sub>provenance 2 · capability 2 · safety 5 · agent-fit 4 · category: agent-framework</sub>  
  <img src="https://img.shields.io/github/last-commit/artvandelay/polymarket-agents?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="last-commit"> <img src="https://img.shields.io/github/stars/artvandelay/polymarket-agents?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="stars"> <img src="https://img.shields.io/github/license/artvandelay/polymarket-agents?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="license">

- 🟡 **A** · **36 / 55** · [`mjunaidca/polymarket-skills`](https://github.com/mjunaidca/polymarket-skills)  
  Community alternative to the official skill pack, paper-first. <sub>provenance 2 · capability 3 · safety 4 · agent-fit 4 · category: skill</sub>  
  <img src="https://img.shields.io/github/last-commit/mjunaidca/polymarket-skills?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="last-commit"> <img src="https://img.shields.io/github/stars/mjunaidca/polymarket-skills?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="stars"> <img src="https://img.shields.io/github/license/mjunaidca/polymarket-skills?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="license">

- 🔵 **B** · **35 / 55** · [`ozgureyilmaz/polymarket-mcp`](https://github.com/ozgureyilmaz/polymarket-mcp)  
  Clean read-only research server. <sub>provenance 2 · capability 2 · safety 5 · agent-fit 4 · category: mcp-server</sub>  
  <img src="https://img.shields.io/github/last-commit/ozgureyilmaz/polymarket-mcp?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="last-commit"> <img src="https://img.shields.io/github/stars/ozgureyilmaz/polymarket-mcp?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="stars"> <img src="https://img.shields.io/github/license/ozgureyilmaz/polymarket-mcp?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="license">

- 🔵 **B** · **31 / 55** · [`0xrsydn/polymarket-crypto-toolkit`](https://github.com/0xrsydn/polymarket-crypto-toolkit)  
  Solid architecture to mine for backtesting patterns; not a maintained dependency. <sub>provenance 2 · capability 3 · safety 3 · agent-fit 3 · category: data-backtesting</sub>  
  <img src="https://img.shields.io/github/last-commit/0xrsydn/polymarket-crypto-toolkit?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="last-commit"> <img src="https://img.shields.io/github/stars/0xrsydn/polymarket-crypto-toolkit?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="stars"> <img src="https://img.shields.io/github/license/0xrsydn/polymarket-crypto-toolkit?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="license">

- 🔵 **B** · **30 / 55** · [`guangxiangdebizi/PolyMarket-MCP`](https://github.com/guangxiangdebizi/PolyMarket-MCP)  
  Analytics niche (holders/positions). Hygiene tells; read-only limits the blast radius. <sub>provenance 1 · capability 3 · safety 4 · agent-fit 3 · category: mcp-server</sub>  
  <img src="https://img.shields.io/github/last-commit/guangxiangdebizi/PolyMarket-MCP?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="last-commit"> <img src="https://img.shields.io/github/stars/guangxiangdebizi/PolyMarket-MCP?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="stars"> <img src="https://img.shields.io/github/license/guangxiangdebizi/PolyMarket-MCP?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="license">

- 🔵 **B** · **29 / 55** · [`pab1it0/polymarket-mcp`](https://github.com/pab1it0/polymarket-mcp)  
  Simple self-host reference; data-only despite some directories' descriptions. <sub>provenance 2 · capability 2 · safety 3 · agent-fit 3 · category: mcp-server</sub>  
  <img src="https://img.shields.io/github/last-commit/pab1it0/polymarket-mcp?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="last-commit"> <img src="https://img.shields.io/github/stars/pab1it0/polymarket-mcp?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="stars"> <img src="https://img.shields.io/github/license/pab1it0/polymarket-mcp?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="license">

- 🔵 **B** · **26 / 55** · [`berlinbra/polymarket-mcp`](https://github.com/berlinbra/polymarket-mcp)  
  Minimal demo-grade server. <sub>provenance 2 · capability 1 · safety 4 · agent-fit 3 · category: mcp-server</sub>  
  <img src="https://img.shields.io/github/last-commit/berlinbra/polymarket-mcp?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="last-commit"> <img src="https://img.shields.io/github/stars/berlinbra/polymarket-mcp?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="stars"> <img src="https://img.shields.io/github/license/berlinbra/polymarket-mcp?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="license">

- ⚪ **C** · **19 / 55** · [`PlayAINetwork/Polymarket-mcp`](https://github.com/PlayAINetwork/Polymarket-mcp)  
  Works, but the hardcoded RPC endpoint is disqualifying for real keys. If you must, replace the RPC URL before use. <sub>provenance 1 · capability 3 · safety 1 · agent-fit 3 · category: mcp-server</sub>  
  <img src="https://img.shields.io/github/last-commit/PlayAINetwork/Polymarket-mcp?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="last-commit"> <img src="https://img.shields.io/github/stars/PlayAINetwork/Polymarket-mcp?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="stars"> <img src="https://img.shields.io/github/license/PlayAINetwork/Polymarket-mcp?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="license">

### Cross-venue

- 🟡 **A** · **43 / 55** · [`machina-sports/sports-skills`](https://github.com/machina-sports/sports-skills)  
  Cleanest pattern for a read-only skill safety contract. <sub>provenance 3 · capability 2 · safety 5 · agent-fit 4 · category: skill</sub>  
  <img src="https://img.shields.io/github/last-commit/machina-sports/sports-skills?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="last-commit"> <img src="https://img.shields.io/github/stars/machina-sports/sports-skills?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="stars"> <img src="https://img.shields.io/github/license/machina-sports/sports-skills?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="license">

- 🟡 **A** · **41 / 55** · [`agent-next/polymarket-paper-trader`](https://github.com/agent-next/polymarket-paper-trader)  
  The dev harness: let agents trade risk-free against live books before any real key exists. <sub>provenance 2 · capability 3 · safety 5 · agent-fit 5 · category: data-backtesting</sub>  
  <img src="https://img.shields.io/github/last-commit/agent-next/polymarket-paper-trader?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="last-commit"> <img src="https://img.shields.io/github/stars/agent-next/polymarket-paper-trader?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="stars"> <img src="https://img.shields.io/github/license/agent-next/polymarket-paper-trader?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="license"> <img src="https://img.shields.io/pypi/v/polymarket-paper-trader?style=flat-square&labelColor=2b2b2b&color=6b6b6b&label=pypi" alt="pypi">

- 🟡 **A** · **41 / 55** · [`pmxt-dev/pmxt`](https://github.com/pmxt-dev/pmxt)  
  The cross-venue abstraction layer. Self-host for anything involving real keys. <sub>provenance 3 · capability 4 · safety 3 · agent-fit 4 · category: sdk-client</sub>  
  <img src="https://img.shields.io/github/last-commit/pmxt-dev/pmxt?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="last-commit"> <img src="https://img.shields.io/github/stars/pmxt-dev/pmxt?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="stars"> <img src="https://img.shields.io/github/license/pmxt-dev/pmxt?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="license"> <img src="https://img.shields.io/npm/v/%40pmxt%2Fmcp?style=flat-square&labelColor=2b2b2b&color=6b6b6b&label=npm" alt="npm">

- 🟡 **A** · **37 / 55** · [`braedonsaunders/homerun`](https://github.com/braedonsaunders/homerun)  
  Architecture reference for cross-venue strategy infra. AGPL — read it, don't vendor it into proprietary code. <sub>provenance 2 · capability 4 · safety 3 · agent-fit 3 · category: agent-framework</sub>  
  <img src="https://img.shields.io/github/last-commit/braedonsaunders/homerun?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="last-commit"> <img src="https://img.shields.io/github/stars/braedonsaunders/homerun?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="stars"> <img src="https://img.shields.io/github/license/braedonsaunders/homerun?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="license">

- 🟡 **A** · **37 / 55** · [`guzus/dr-manhattan`](https://github.com/guzus/dr-manhattan)  
  **⚠️ no license.** Fully self-hosted pmxt alternative. Resolve the license question before shipping it inside anything. <sub>provenance 2 · capability 4 · safety 3 · agent-fit 3 · category: sdk-client</sub>  
  <img src="https://img.shields.io/github/last-commit/guzus/dr-manhattan?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="last-commit"> <img src="https://img.shields.io/github/stars/guzus/dr-manhattan?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="stars"> <img src="https://img.shields.io/github/license/guzus/dr-manhattan?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="license">

- 🟡 **A** · **37 / 55** · [`SpartanLabsXyz/simmer-sdk`](https://github.com/SpartanLabsXyz/simmer-sdk)  
  Young; watch. <sub>provenance 2 · capability 3 · safety 3 · agent-fit 4 · category: sdk-client</sub>  
  <img src="https://img.shields.io/github/last-commit/SpartanLabsXyz/simmer-sdk?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="last-commit"> <img src="https://img.shields.io/github/stars/SpartanLabsXyz/simmer-sdk?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="stars"> <img src="https://img.shields.io/github/license/SpartanLabsXyz/simmer-sdk?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="license">

- 🔵 **B** · **35 / 55** · [`Oddpool/PredictionMarketBench`](https://github.com/Oddpool/PredictionMarketBench)  
  Unique replay dataset angle; small. <sub>provenance 2 · capability 2 · safety 5 · agent-fit 3 · category: data-backtesting</sub>  
  <img src="https://img.shields.io/github/last-commit/Oddpool/PredictionMarketBench?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="last-commit"> <img src="https://img.shields.io/github/stars/Oddpool/PredictionMarketBench?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="stars"> <img src="https://img.shields.io/github/license/Oddpool/PredictionMarketBench?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="license">

- 🔵 **B** · **34 / 55** · [`alsk1992/CloddsBot`](https://github.com/alsk1992/CloddsBot)  
  Ambitious scope = large key blast radius. Mine for patterns; run nothing with real keys without an audit. <sub>provenance 2 · capability 4 · safety 2 · agent-fit 3 · category: agent-framework</sub>  
  <img src="https://img.shields.io/github/last-commit/alsk1992/CloddsBot?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="last-commit"> <img src="https://img.shields.io/github/stars/alsk1992/CloddsBot?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="stars"> <img src="https://img.shields.io/github/license/alsk1992/CloddsBot?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="license">

- 🔵 **B** · **32 / 55** · [`JamesANZ/prediction-market-mcp`](https://github.com/JamesANZ/prediction-market-mcp)  
  Multi-venue read-only scanner. <sub>provenance 2 · capability 2 · safety 4 · agent-fit 4 · category: mcp-server</sub>  
  <img src="https://img.shields.io/github/last-commit/JamesANZ/prediction-market-mcp?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="last-commit"> <img src="https://img.shields.io/github/stars/JamesANZ/prediction-market-mcp?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="stars"> <img src="https://img.shields.io/github/license/JamesANZ/prediction-market-mcp?style=flat-square&labelColor=2b2b2b&color=6b6b6b" alt="license">

### Deprecated / reference-only

Dead or archived code that is still instructive to read — never a dependency.

| Repo | Status | Last activity | Why it's here |
|---|---|---|---|
| [`Polymarket/agents`](https://github.com/Polymarket/agents) | 📦 archived | 2024-11-05 | Historically influential official agent framework — instructive to read, unsafe to build on. Third-party writeups still recommend it as active; they are wrong. |

### 🚩 Flagged — do not run

Entries matching known scam-repo signatures (buying stars, README-only "bots", drainer patterns — the signature list is in [docs/safety.md](docs/safety.md)). Flags are evidence-dated claims, not verdicts on intent; corrections welcome via the [appeal path](CONTRIBUTING.md#corrections--appeals).

| Repo | Status | Evidence |
|---|---|---|
| `brodyautomates/polymarket-pipeline` | 🚩 flagged | 2026-07-23: matches signatures — 367★ four days after creation |
| `casatrick/polymarket-arbitrage-bot-python` | 🚩 flagged | 2026-07-23: matches signatures — arbitrage-bot pitch, engagement pattern inconsistent with history |
| `Cortex-AI-Network/polymarket-copy-trading-bot` | 🪦 taken down since flagging | 2026-07-23: matches signatures — copy-trading pitch, org pattern typical of drainer campaigns |
| `cryptomoonday/polymarket-arbitrage-bot` | 🚩 flagged | 2026-07-23: matches signatures — arbitrage-bot pitch, low-provenance account |
| `hanshaze/Awesome-Prediction-Market-Trading-Tools` | 🚩 flagged | 2026-07-23: matches signatures — awesome-list wrapper funneling to flagged bot repos |
| `HarrierOnChain/Prediction-Markets-Trading-Bot-Toolkits` | 🚩 flagged | 2026-07-23: matches signatures — new org, stars(359)≫watchers, forks≈stars, toolkit pitch without inspectable code provenance |
| `kaktusesquire6rmu/ai-polymarket-agent` | 🚩 flagged | 2026-07-23: matches signatures — 218★ with no detected code language (README/binary only) |
| `radioman/polymarket-arbitrage-trading-bot` | 🚩 flagged | 2026-07-23: matches signatures — arbitrage-bot pitch, low-provenance account |
| `reunios2024/cortex-sentinel-trading-nexus` | 🚩 flagged | 2026-07-23: matches signatures — buzzword pitch, throwaway account pattern |

<!-- END GENERATED RANKINGS -->

## Safety essentials

The five rules that survive every venue and every repo (full checklist + scam-signature list: [docs/safety.md](docs/safety.md)):

1. **Demo/paper first.** Both venues have demo environments; several tools are demo-by-default. An agent should earn prod access, not start with it.
2. **Keys live in env vars or a keychain — never in code, config commits, or URLs.** Any repo with a hardcoded third-party endpoint for signed traffic is disqualified from real keys.
3. **Write paths need explicit gates.** Separate read/write tools; require confirm-first order tools or an explicit trading-enable flag; cap order size and daily spend *below* the client if the tool supports it.
4. **Never grant an LLM more than the sub-account it trades can lose.** Venue-side sub-accounts/limits beat any in-repo cap.
5. **Stars are not diligence.** Scam repos buy them. Check contributor history, commit cadence, and whether the code the README describes actually exists.

## Diagrams

Kept in [`diagrams/`](diagrams/) so this page stays scannable — all render on GitHub:

| Diagram | Shows |
|---|---|
| [Scoring pipeline](diagrams/scoring-pipeline.md) | How a repo becomes a tier: scan → score → sort / flag |
| [Choosing your stack](diagrams/choosing-your-stack.md) | Which kind of tool for which need |
| [Reference architecture](diagrams/reference-architecture.md) | The venue-agnostic layers an agent stacks |

## Adding a venue or repo

The data model is venue-agnostic: add entries with a new `venue` value in [`data/repos.yaml`](data/repos.yaml) (Limitless, Predict.fun, Drift BET, … — see [CONTRIBUTING.md](CONTRIBUTING.md)). Every entry needs dated evidence; every score needs to match the [methodology anchors](docs/methodology.md). The weekly scan and decay rules apply automatically to anything with a GitHub URL or package ref.

## Honesty notes

- **Curated vs automated:** qualitative scores are human judgments with dated evidence; only liveness (pushed/released/archived/stars) auto-refreshes weekly. The generated tables state both dates.
- **Negative claims rot.** Statements like "no official MCP exists" are dated in place; treat any undated absence claim (here or anywhere) as unverified.
- **Corrections welcome** — especially for 🚩 flags: see the [appeal path](CONTRIBUTING.md#corrections--appeals).

## License

[MIT](LICENSE). Rankings are opinions based on the cited evidence, provided as-is; nothing here is financial advice, and flagged-repo entries are dated pattern-match claims, not assertions about any person's intent.
