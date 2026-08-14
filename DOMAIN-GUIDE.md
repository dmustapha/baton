# Baton — Domain Guide

Generated from `ARCHITECTURE.md §12` + ground truth pinned by build Task 0.1 (`baton/CLI-INTERFACE.md`).
One XRPL signature drives an atomic multi-vault Flare DeFi portfolio via Flare Smart Accounts.

## Core concepts

| Term | Definition | Source |
|---|---|---|
| Smart Account / PersonalAccount | Deterministic CREATE2 Flare contract controlled by an XRPL address, routed by MasterAccountController. Derived on-chain via `getPersonalAccount(string xrplAddress)`. | SMART-ACCOUNTS-SPIKE |
| Custom instruction / `Call[]` | The account's atomic multi-call. On Flare it is a `CustomInstructions.CustomCall[]` — each call is `(address targetContract, uint256 value, bytes data)`. Baton's differentiator: one signature = many vault deposits. | SPIKE line 9 |
| Provider XRPL wallet | XRPL address the user pays; the operator watches it. `rEyj8nsHLdgt79KJWzXR5BgF7ZbaohbXwq` on Coston2. | SPIKE (`getXrplProviderWallets`) |
| Operator / executor | Flare-run service that fetches the FDC proof and submits execution. We do NOT build it (52,581 txs on `0x103b38…`). | SPIKE |
| FDC Payment attestation | Proof of the XRPL payment; addresses arrive as keccak hashes; round ~90–180s. | TECHNICAL-SPIKE-FDC |
| FXRP | Programmable XRP on Flare (ERC-20). Resolved via `AssetManagerFXRP.fAsset()` → `0x0b6A3645c240605887a5532109323A3E12273dc7`, decimals **6**. FTestXRP faucet-available on Coston2 (depth-7). | FDC-SPIKE line 7 |
| FTSOv2 | Decentralized price feed; XRP/USD used to value FXRP. Read read-only via `getFeedById(bytes21)` (NOT `getFeedByIdView`, which reverts). | brief §5 |
| Depth-8 / Depth-7 | Real FXRP direct-mint vs faucet FXRP. Both preserve the atomic multi-vault composition. Task-0 locked **depth-8** (real FXRP minted). | WINNER-BRIEF |

## Business rules / invariants the code must enforce

- The user is **XRPL-only**: no FLR/EVM key is required client-side or server-side for the user path.
  (The backend infra key `FLR_PRIVATE_KEY` signs the one-time `custom register` tx — that is infra, not the user.)
- The multi-vault deposit is **one atomic `Call[]`** — either all legs land or none do.
- Every mutable protocol address (FXRP, FTSO, AssetManager) is **resolved via ContractRegistry** — never hardcoded.
- **No fabricated positions**: balances come from real vault `balanceOf` reads; USD from live FTSO.
- Honest depth + latency labels (FDC round is ~90–180s; that is a real attestation, not a hang).

## The real CLI flow (pinned Task 0.1 — supersedes ARCHITECTURE §6 assumptions)

The atomic multi-vault instruction is produced by the official `smart-accounts-cli` in **three** steps:

1. `custom register '<calls-json>'` → prints the **30-byte call-hash** (registers the `CustomCall[]` mapping
   on-chain via a Flare tx signed by the backend `FLR_PRIVATE_KEY`; idempotent). Backend infra, not the user path.
2. `encode custom-instruction -w 248 -c <call-hash>` → prints the **instruction hex** (32 bytes).
3. `bridge instruction -` (stdin = instruction hex) → sends the XRPL Payment, prints the **XRPL tx hash**.
   This is the single **user signature** step.

`<calls-json>` is a JSON array of `{ "targetContract": "0x…", "value": "0", "data": "0x…" }`.

- CLI entry: `smart_accounts.py` run with the repo venv python `../smart-accounts-cli/venv/bin/python`.
- Coston2 `wallet_id` = **248** (argparse requires `-w`; the handler overrides it with the chain value anyway).

## Per-leg Call construction

Each vault leg emits **two** calls, in order:

1. `FXRP.approve(vault, assets)` — an ERC-4626 `deposit` does `transferFrom` and reverts without allowance.
2. `vault.deposit(assets, receiver)` — both Upshift and Firelight are ERC-4626: `deposit(uint256 assets, address receiver)`.

`assets = total * weightBps / 10000`, where `total = parseUnits(fxrpAmount, 6)` (FXRP decimals = 6).
