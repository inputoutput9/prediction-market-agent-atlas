# Scoring pipeline

How a repo becomes a tier. Curated scores + a weekly liveness scan feed one engine; hard flags divert dangerous or dead repos out of the ranked tiers. Full rubric: [docs/methodology.md](../docs/methodology.md).

```mermaid
flowchart LR
  R["repos.yaml<br/>scores + evidence"] --> E["scoring<br/>engine"]
  S["weekly scan<br/>GitHub · PyPI · npm"] --> E
  E --> T["tiers<br/>S / A / B / C"]
  E --> F["🚩 flagged<br/>🪦 deprecated"]
```

[← back to README](../README.md)
