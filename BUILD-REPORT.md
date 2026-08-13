# Build Report — Baton
Generated: 2026-08-13
Builder: hackathon-build skill

Project: Baton — one XRPL signature drives an atomic multi-vault Flare DeFi portfolio (Smart Accounts).
Track: Interoperable Asset Products · Coston2 (chainId 114) · NO custom Solidity (reuses live infra).

## Summary
| Phase | Steps | Status | Notes |
|-------|-------|--------|-------|
| 0 Task-0 go/no-go | 0.1, 0.2 | ✅ complete | **GO + depth-8**. Live operator executed our XRPL-signed instruction on Coston2; real FXRP minted (10.0). |

## Deviations from Architecture

| ID | Component | ARCHITECTURE Said | ACTUAL | Reason | Class | Downstream Impact |
|----|-----------|-------------------|--------|--------|-------|-------------------|
| DEV-001 | §6 CLI wrapper / .env | `CLI_ENTRY=-m smart_accounts_cli`, `CLI_PYTHON=python3` | Entry is `smart_accounts.py`; python MUST be the repo venv (`../smart-accounts-cli/venv/bin/python`, 3.12 — system 3.14 lacks web3 wheels) | The `-m` module path was an assumption; real repo exposes `./smart_accounts.py` and needs its own deps venv | COSMETIC | `.env` fixed; `lib/cli.ts` in Phase 1 reads CLI_ENTRY/CLI_PYTHON from .env — will resolve correctly |
| DEV-002 | §6 `encode custom-instruction` | one-shot `encode custom-instruction --xrpl-address X --calls <json>` | Two steps: `custom register '<calls-json>'` (Flare infra tx → call-hash) then `encode custom-instruction -w 248 -c <call-hash>` | Real CLI references a registered Call[] by hash, not inline calls; registration is a backend infra Flare tx (NOT the user path — user still signs only XRPL) | DEGRADED | Phase 1/2: `lib/encode.ts` must add a `custom register` step + a backend FLR infra key. Self-custody invariant preserved. Documented in CLI-INTERFACE.md. |

## Failed Attempts & Resolutions
| Step | Error | Attempts | Resolution |
|------|-------|----------|------------|
| 0.1 venv | `uv pip install` timed out on eth-typing (flaky network); wrapper masked non-zero rc | 2 | Re-ran with `UV_HTTP_TIMEOUT=120`; all deps installed, imports verified |
| 0.1 venv | system python 3.14 `ensurepip` failed; no 3.11/3.12 on PATH | 1 | Used `uv venv --python 3.12` (uv fetched CPython 3.12.12) |

## Verification Results
| Phase | Command | Expected | Actual | Pass? |
|-------|---------|----------|--------|-------|
| 0.1 | `smart_accounts.py --version` | version string | `smart_accounts v0.1.0` | ✅ |
| 0.1 | live clients probe (agent vaults, fees, personal account) | live reads | wallet_id 248, agent id 1, PA `0x27fBb6…`, not paused | ✅ |
| 0.2 | `encode fxrp-cr -w 248 -v 1 -a 1` | hex instruction | `0x00f80000…0001 0001 …` | ✅ |
| 0.2 | `bridge instruction -` | XRPL tesSUCCESS hash | XRPL `7EC5DFA71A…` | ✅ |
| 0.2 | operator reserveCollateral on Coston2 | a Coston2 tx on the PersonalAccount | `0x97730bfc…` blk 34025107, PA deployed (291 bytes code), crid 48947455 | ✅ |
| 0.2 | `bridge mint-tx -w -` | XRPL mint hash | XRPL `F4EEDF56…` | ✅ |
| 0.2 | FXRP minted (depth-8) | balance > 0 | `0x0c33940a…` blk 34025166 → **10.0 FXRP** on PA | ✅ |

## Known Risks (for debug)
- The atomic multi-vault Call[] (Phase 2) needs a `custom register` Flare tx signed by a **backend FLR infra key** with C2FLR gas (DEV-002). This key is infra, never the user's; must be funded before Phase 2. Currently the CLI `.env` has a dummy `FLR_PRIVATE_KEY` (fine for encode/bridge-instruction only).
- Operator FDC rounds take ~90–180s per action (CR reserve, then mint). Demo pacing must account for this (PRD §6 already notes it).
- FXRP `decimals()` = 6 (confirmed) — Phase 1 `getFxrpDecimals()` must read this live, not assume 18.

## Contract Addresses
(No contracts deployed by us — Baton reuses live Coston2 infra. See submission/proof.md for the full reused-infra table + Task-0 execution hashes.)

## Environment Variables Added
| Key | Source Step | Value/Description |
|-----|-----------|-------------------|
| CLI_PYTHON | 0.1 | `../smart-accounts-cli/venv/bin/python` (was `python3`) |
| CLI_ENTRY | 0.1 | `smart_accounts.py` (was `-m smart_accounts_cli`) |
| CLI_WALLET_ID | 0.1 | `248` (Coston2 chain wallet_id) |
| AGENT_VAULT_ID / VAULT_A_ID / VAULT_B_ID | 0.1 | `1` / `4` / `1` (from live getAgentVaults/getVaults) |
| DEMO_PERSONAL_ACCOUNT | 0.1 | `0x27fBb63780AB83aE7CEcd69291AAbb0A769071f7` |
| BATON_DEPTH | 0.2 Gate-1 | `depth-8` (real FXRP mint proven) |
