# SkillSpector static scans

Automated **static** security-pattern scans ([NVIDIA SkillSpector](https://github.com/NVIDIA/SkillSpector)) of every in-scope repo in this atlas. These are **triage signals, not verdicts** — static analysis over-flags heavily (the atlas's safest curated repo scans as CRITICAL/100), so a scanner grade never feeds the curated safety scores in the [main README](../../README.md) or its ranked tables. Grades read `(untriaged)` until a human commits a reviewed [baseline](../../data/skillspector-baselines/README.md) that suppresses the false positives. See [methodology](../methodology.md).

## Scope

Scanned: category ∈ {`mcp-server`, `agent-framework`, `skill`}, no terminal hard-flag (`scam`/`key_exfil`/`archived`), and a `https://github.com/` source.

| Repo | Grade | Post-baseline C/H/M/L | Suppressed | Baseline? | Report |
|---|---|---|---|---|---|
| `9crusher/mcp-server-kalshi` | 🔴 flagged-critical (untriaged) | 3/4/4/2 | 0 | no | [report](9crusher__mcp-server-kalshi.md) |
| `alsk1992/CloddsBot` | 🔴 flagged-critical (untriaged) | 3/219/352/97 | 0 | no | [report](alsk1992__CloddsBot.md) |
| `artvandelay/polymarket-agents` | 🔴 flagged-critical (untriaged) | 2/4/2/1 | 0 | no | [report](artvandelay__polymarket-agents.md) |
| `austron24/kalshi-trader-plugin` | 🟠 needs-triage (untriaged) | 0/1/0/1 | 0 | no | [report](austron24__kalshi-trader-plugin.md) |
| `berlinbra/polymarket-mcp` | 🔴 flagged-critical (untriaged) | 1/1/1/1 | 0 | no | [report](berlinbra__polymarket-mcp.md) |
| `braedonsaunders/homerun` | 🔴 flagged-critical (untriaged) | 2/99/481/169 | 0 | no | [report](braedonsaunders__homerun.md) |
| `caiovicentino/polymarket-mcp-server` | 🔴 flagged-critical (untriaged) | 3/107/84/2 | 0 | no | [report](caiovicentino__polymarket-mcp-server.md) |
| `cejor6/kalshi-mcp-server` | 🟢 clean | 0/0/0/0 | 71 | yes | [report](cejor6__kalshi-mcp-server.md) |
| `demwick/polymarket-agent-mcp` | 🟠 needs-triage (untriaged) | 0/10/3/15 | 0 | no | [report](demwick__polymarket-agent-mcp.md) |
| `guangxiangdebizi/PolyMarket-MCP` | 🟠 needs-triage (untriaged) | 0/5/0/7 | 0 | no | [report](guangxiangdebizi__PolyMarket-MCP.md) |
| `JamesANZ/prediction-market-mcp` | 🟠 needs-triage (untriaged) | 0/3/3/7 | 0 | no | [report](JamesANZ__prediction-market-mcp.md) |
| `machina-sports/sports-skills` | 🔴 flagged-critical (untriaged) | 3/19/56/5 | 0 | no | [report](machina-sports__sports-skills.md) |
| `mjunaidca/polymarket-skills` | 🟠 needs-triage (untriaged) | 0/23/12/0 | 0 | no | [report](mjunaidca__polymarket-skills.md) |
| `newyorkcompute/kalshi` | 🔴 flagged-critical (untriaged) | 5/16/18/69 | 0 | no | [report](newyorkcompute__kalshi.md) |
| `ozgureyilmaz/polymarket-mcp` | 🟠 needs-triage (untriaged) | 0/5/2/1 | 0 | no | [report](ozgureyilmaz__polymarket-mcp.md) |
| `pab1it0/polymarket-mcp` | 🔴 flagged-critical (untriaged) | 2/7/1/0 | 0 | no | [report](pab1it0__polymarket-mcp.md) |
| `PlayAINetwork/Polymarket-mcp` | 🟠 needs-triage (untriaged) | 0/4/0/11 | 0 | no | [report](PlayAINetwork__Polymarket-mcp.md) |
| `Polymarket/agent-skills` | 🟠 needs-triage (untriaged) | 0/2/1/0 | 0 | no | [report](Polymarket__agent-skills.md) |

## Out of scanner scope

| Entry | Reason |
|---|---|
| `0xrsydn/polymarket-crypto-toolkit` | category `data-backtesting` — threat-model mismatch (out of scanner scope) |
| `agent-next/polymarket-paper-trader` | category `data-backtesting` — threat-model mismatch (out of scanner scope) |
| `ArshKA/pykalshi` | category `sdk-client` — threat-model mismatch (out of scanner scope) |
| `brodyautomates/polymarket-pipeline` | terminal (`scam`) — story already told by its flag |
| `casatrick/polymarket-arbitrage-bot-python` | terminal (`scam`) — story already told by its flag |
| `Cortex-AI-Network/polymarket-copy-trading-bot` | terminal (`scam`) — story already told by its flag |
| `cryptomoonday/polymarket-arbitrage-bot` | terminal (`scam`) — story already told by its flag |
| `guzus/dr-manhattan` | category `sdk-client` — threat-model mismatch (out of scanner scope) |
| `hanshaze/Awesome-Prediction-Market-Trading-Tools` | terminal (`scam`) — story already told by its flag |
| `HarrierOnChain/Prediction-Markets-Trading-Bot-Toolkits` | terminal (`scam`) — story already told by its flag |
| `kaktusesquire6rmu/ai-polymarket-agent` | terminal (`scam`) — story already told by its flag |
| `kalshi-python-sync` | registry-only (no GitHub source to clone) |
| `kalshi-typescript` | registry-only (no GitHub source to clone) |
| `Kalshi/kalshi-starter-code-python` | category `sdk-client` — threat-model mismatch (out of scanner scope) |
| `Oddpool/PredictionMarketBench` | category `data-backtesting` — threat-model mismatch (out of scanner scope) |
| `pmxt-dev/pmxt` | category `sdk-client` — threat-model mismatch (out of scanner scope) |
| `Polymarket/agents` | terminal (`archived`) — story already told by its flag |
| `Polymarket/polymarket-cli` | category `cli` — threat-model mismatch (out of scanner scope) |
| `Polymarket/py-clob-client-v2` | category `sdk-client` — threat-model mismatch (out of scanner scope) |
| `Polymarket/real-time-data-client` | category `sdk-client` — threat-model mismatch (out of scanner scope) |
| `Polymarket/ts-sdk` | category `sdk-client` — threat-model mismatch (out of scanner scope) |
| `radioman/polymarket-arbitrage-trading-bot` | terminal (`scam`) — story already told by its flag |
| `reunios2024/cortex-sentinel-trading-nexus` | terminal (`scam`) — story already told by its flag |
| `rmadev01/kalshi-rs` | category `sdk-client` — threat-model mismatch (out of scanner scope) |
| `SpartanLabsXyz/simmer-sdk` | category `sdk-client` — threat-model mismatch (out of scanner scope) |
| `TexasCoding/kalshi-python-sdk` | category `sdk-client` — threat-model mismatch (out of scanner scope) |

