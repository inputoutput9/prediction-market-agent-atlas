# Safety guide — LLM agents with trading keys

The threat model is unusual: you are giving a language model the ability to spend money through code written by strangers. Three independent layers have to hold: the venue account, the client repo, and the agent harness.

## Layer 1 — venue account

- **Use the demo environment first.** Kalshi has a demo API environment; Polymarket flows can be exercised with read-only data and paper simulators. An agent earns production access.
- **Trade from a sub-account holding only what the agent may lose.** A venue-side balance limit beats every client-side cap.
- **Scope keys minimally.** Read-only keys for research agents; trading keys only where a write path is genuinely needed.

## Layer 2 — the client repo

Checklist before trusting any repo with keys — each item is checkable in an hour:

| Check | How |
|---|---|
| Keys enter via env vars / files, never CLI args or URLs | grep the config/auth modules |
| Signing happens locally with a maintained official client | read the order path end-to-end |
| No hardcoded third-party endpoints on signed traffic | grep for `http` literals — a baked-in RPC/relay URL routes your activity through a stranger |
| No outbound calls beyond venue APIs | grep for fetch/request/webhook/telegram/discord |
| Write tools are separated and gated | look for confirm-first flows, trading-enable flags, caps |
| The code the README describes exists | READMEs are free; diff claims against `src/` |
| Dependencies are current-generation | both venues archived client generations; a dep on an archived client means unpatched signing code |

## Layer 3 — the agent harness

- **Separate read from write at the tool level** so the model can't "accidentally" trade while researching.
- **Confirm-first writes:** the tool returns a preview; a second explicit call places the order.
- **Hard caps below the client:** per-order size, daily spend, open-position count — enforced in code the LLM cannot edit at runtime.
- **Log every write** with the exact payload sent to the venue.
- **Prompt injection is live here:** market titles, descriptions, and comments are attacker-controlled text your agent will read. Treat all venue content as data, never instructions; never let it name the market to trade or the URL to call.

## Scam-repo signatures

Used for the 🚩 Flagged table. Flagging = the entry matched these patterns on the evidence date — a dated claim, not a verdict on intent (see the [appeal path](../CONTRIBUTING.md#corrections--appeals)).

- Stars ≫ watchers, or forks ≈ stars (organic repos have far more stargazers than forkers)
- Hundreds of stars within days of creation
- README-only or binary-blob "bots"; no detected code language
- New org/account with no other history; profile-photo-heavy fake contributor lists
- Copy-trading / "guaranteed arbitrage" pitches with download links
- Setup instructions that ask for a funded wallet's private key up front
- "Awesome list" wrappers whose links funnel to the above

## If a flagged repo was already run

1. Rotate every key it could have seen; revoke venue API keys.
2. Move funds out of any wallet whose private key touched the machine.
3. Audit shell history and crontabs for persistence; treat the machine as compromised until proven otherwise.
