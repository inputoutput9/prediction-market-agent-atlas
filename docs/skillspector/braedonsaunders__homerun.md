# SkillSpector scan — [`braedonsaunders/homerun`](https://github.com/braedonsaunders/homerun)

> **Static pattern-match signals, pending human triage** — NOT verdicts, and NOT the curated safety score.
> SkillSpector runs static analysis only here (`--no-llm`), which over-flags heavily: the atlas's *safest* curated repo scans as CRITICAL. These signals are triage input, never a ranking. For the human-reviewed safety score of `braedonsaunders/homerun`, see the [main README](../../README.md) and [methodology](../methodology.md).

**Scanner grade:** 🔴 flagged-critical (untriaged) · SkillSpector v2.3.7

| Field | Value |
|---|---|
| Scanner risk score | 100/100 |
| Scanner severity | CRITICAL |
| Scanner recommendation | DO_NOT_INSTALL |
| Post-baseline counts | 🔴 2 C · 🟠 99 H · 🟡 481 M · ⚪ 169 L |
| Suppressed by baseline | 0 |
| Coverage | 100% (partial — LLM meta-analysis skipped) |
| Scanned head_sha | `389d24699479` |

**Baseline:** none yet — counts are raw static signal, expect false positives. See [baselines](../../data/skillspector-baselines/README.md).

## Findings

| Severity | Location | Category | Confidence | Finding |
|---|---|---|---|---|
| 🔴 Critical | `backend/requirements.txt:84` | Supply Chain | 0.9 | jinja2==3.1.0 |
| 🔴 Critical | `logo.png:1061` | YARA Match | 0.9 | Wso |
| 🟠 High | `backend/alembic/versions/202604300002_drop_paper_mode.py:51` | Tool Misuse | 0.95 | execute(f"ALTER TABLE {table} DROP |
| 🟠 High | `backend/alembic/versions/202604300002_drop_paper_mode.py:61` | Tool Misuse | 0.2375 | execute(f"ALTER TABLE {table} DROP |
| 🟠 High | `backend/alembic/versions/202606160002_trade_signals_unlogged.py:69` | Tool Misuse | 0.95 | execute(f'ALTER TABLE {child} DROP |
| 🟠 High | `backend/api/routes_data_sources.py:660` | Tool Misuse | 0.9 | DELETE /data-sources/{id} |
| 🟠 High | `backend/api/routes_strategies.py:2007` | Tool Misuse | 0.9 | DELETE /strategy-manager/{id} |
| 🟠 High | `backend/api/websocket.py:195` | Prompt Injection | 0.9 | Send message to |
| 🟠 High | `backend/api/websocket.py:227` | Prompt Injection | 0.9 | Send message to |
| 🟠 High | `backend/main.py:43` | Data Exfiltration | 0.7 | os.environ.get("HF_TOKEN |
| 🟠 High | `backend/main.py:1953` | Output Handling | 0.95 | subprocess.run(["lsof", "-ti", f":{port}"], capture_output |
| 🟠 High | `backend/main.py:1972` | Output Handling | 0.95 | subprocess.run(["fuser", f"{port}/tcp"], capture_output |
| 🟠 High | `backend/main.py:1975` | Output Handling | 0.95 | subprocess.run(["fuser", "-k", f"{port}/tcp"], capture_output |
| 🟠 High | `backend/requirements-trading.txt:7` | Supply Chain | 0.8 | web3==6.0.0 |
| 🟠 High | `backend/requirements.txt:2` | Supply Chain | 0.7 | uvicorn |
| 🟠 High | `backend/requirements.txt:7` | Supply Chain | 0.8 | mcp==1.27.0 |
| 🟠 High | `backend/requirements.txt:9` | Supply Chain | 0.8 | python-multipart==0.0.27 |
| 🟠 High | `backend/requirements.txt:35` | Supply Chain | 0.8 | cryptography==42.0.0 |
| 🟠 High | `backend/requirements.txt:43` | Supply Chain | 0.8 | pyarrow==15.0 |
| 🟠 High | `backend/requirements.txt:53` | Supply Chain | 0.8 | urllib3==1.26.0 |
| 🟠 High | `backend/requirements.txt:57` | Supply Chain | 0.8 | markdown==3.5 |
| 🟠 High | `backend/requirements.txt:83` | Supply Chain | 0.8 | weasyprint==60.0 |
| 🟠 High | `backend/services/backtest/unified_runner.py:111` | Anti-Refusal | 0.8 | no warning |
| 🟠 High | `backend/services/credential_manager.py:5` | Privilege Escalation | 0.7 | copy API keys from |
| 🟠 High | `backend/services/data_source_loader.py:354` | Dangerous Code Execution | 0.85 | exec(compiled, module.__dict__) |
| 🟠 High | `backend/services/discovery_profile_loader.py:525` | Dangerous Code Execution | 0.85 | exec(code, module.__dict__)  # noqa: S102 |
| 🟠 High | `backend/services/market_data_ingestor.py:325` | Memory Poisoning | 0.8 | clear state |
| 🟠 High | `backend/services/recorder_subscription_service.py:64` | Data Exfiltration | 0.7 | os.environ.get("HOMERUN_RECORDER_MAX_TOKEN |
| 🟠 High | `backend/services/recorder_subscription_service.py:72` | Data Exfiltration | 0.7 | os.environ.get("HOMERUN_RECORDER_WS_MAX_TOKEN |
| 🟠 High | `backend/services/strategy_loader.py:749` | Dangerous Code Execution | 0.85 | exec(code, module.__dict__)  # noqa: S102 |
| 🟠 High | `backend/services/trader_cycle_context.py:297` | Memory Poisoning | 0.8 | clear state |
| 🟠 High | `backend/tests/test_alembic_roundtrip.py:280` | Output Handling | 0.95 | subprocess.run(         [sys.executable, "-m", "alembic", "-c", "alembic.ini",          "upgrade", "head"],         env= |
| 🟠 High | `backend/tests/test_backtest_crypto_on_event_dispatch.py:192` | Prompt Injection | 0.225 | silently send |
| 🟠 High | `backend/tests/test_backtest_crypto_on_event_dispatch.py:349` | Anti-Refusal | 0.8 | no warning |
| 🟠 High | `backend/tests/test_backtest_live_input_parity.py:224` | Anti-Refusal | 0.8 | no warning |
| 🟠 High | `backend/tests/test_backtest_live_input_parity.py:304` | Anti-Refusal | 0.8 | no     warning |
| 🟠 High | `backend/tests/test_graceful_timeout_cancels.py:55` | System Prompt Leakage | 0.85 | return prompt |
| 🟠 High | `backend/tests/test_recorded_event_bus.py:448` | Tool Misuse | 0.95 | shutil.rmtree(topic_dir / |
| 🟠 High | `backend/workers/host.py:65` | Data Exfiltration | 0.7 | os.environ.get(f"HOMERUN_DEBUG_LOG_FILE_{plane_token |
| 🟠 High | `backend/workers/host.py:72` | Data Exfiltration | 0.7 | os.environ.get("HF_TOKEN |
| 🟠 High | `docker-compose.yml:11` | Privilege Escalation | 0.6 | .env |
| 🟠 High | `frontend/Dockerfile:17` | Privilege Escalation | 0.7 | .npmrc |
| 🟠 High | `frontend/Dockerfile:19` | Privilege Escalation | 0.7 | .npmrc |
| 🟠 High | `frontend/Dockerfile:20` | Privilege Escalation | 0.7 | .npmrc |
| 🟠 High | `frontend/package.json:43` | Supply Chain | 0.8 | axios==1.6.0 |
| 🟠 High | `frontend/package.json:72` | Supply Chain | 0.8 | vite==5.0.0 |
| 🟠 High | `frontend/src/components/ai/CortexView.tsx:280` | Memory Poisoning | 0.8 | Clear history |
| 🟠 High | `frontend/src/components/AICommandBar.tsx:917` | Output Handling | 0.65 | dangerouslySetInnerHTML={ |
| 🟠 High | `frontend/src/components/BacktestStudio.tsx:1260` | Output Handling | 0.65 | dangerouslySetInnerHTML={ |
| 🟠 High | `frontend/src/components/BacktestStudio.tsx:2988` | Output Handling | 0.65 | dangerouslySetInnerHTML={ |

_…and 701 more finding(s) — see the artifact JSON._

