# Signal — XRP Yield Router

**One-tap yield for XRP holders, built on Flare.**
Deposit XRP → FXRP via FAssets → routed across Flare DeFi by an FTSO-gated ERC-4626 vault.

Built for **Flare Summer Signal — Bounty 1: Interoperable Asset Products**.

## Architecture

```
 XRP (XRPL)                Flare (Coston2 / mainnet)
 ┌──────────┐   FAssets    ┌──────────────────────────────────────────┐
 │  User    │─────────────▶│  FXRP                                    │
 │  wallet  │  agent mint  │    │                                     │
 └──────────┘              │    ▼                                      │
                           │  XrpZap ──▶ SignalVault (ERC-4626)        │
                           │                 │                         │
                           │        ┌────────┼───────────┐             │
                           │        ▼        ▼           ▼             │
                           │   Lending    Stable      FXRP LP          │
                           │   (tier 0)   Carry       (tier 2)         │
                           │               (tier 1)                    │
                           │        ▲                                  │
                           │   FlareOracle ◀── FTSOv2 (enshrined)      │
                           │        ▲        via Contract Registry     │
                           │   Keeper bot ── rebalance() on drift      │
                           └──────────────────────────────────────────┘
```

- **`SignalVault`** — ERC-4626 over FXRP. 10% idle buffer for instant withdrawals,
  90% routed to lanes at target weights (40/35/25). `rebalance()` is
  permissionless; de-risks the LP lane when XRP/USD (FTSO) moves >10% from the
  rebalance snapshot. Oracle staleness never blocks user funds (liveness-first).
- **`FlareOracle`** — FTSOv2 wrapper via the Flare Contract Registry
  (`0xaD67…6019`), with staleness enforcement for rebalancing.
- **`XrpZap`** — one-tap FXRP→shares (single approval, single tx thereafter),
  plus agent-friendly `zapDepositFor` for mint+deposit flows.
- **Strategies** — `IStrategy` adapters. Demo uses self-solvent `MockYieldStrategy`
  lanes; real adapters (lending market, DEX LP, stable minter) implement the same
  8-function interface.

## Quickstart

```bash
# 1. contracts — build & test (11 tests)
cd contracts && forge build && forge test

# 2. deploy to Coston2 (needs C2FLR gas — https://faucet.flare.network/coston2)
cd contracts
PRIVATE_KEY=0x… forge script script/Deploy.s.sol --rpc-url coston2 --broadcast
# → writes deployments/coston2.json

# 3. wire up the frontend
cp contracts/deployments/coston2.json web/src/deployment.local.json
cd web && pnpm install && pnpm dev        # http://localhost:5173

# 4. run the keeper (permissionless — anyone can)
cd keeper && pnpm install
PRIVATE_KEY=0x… pnpm start
```

In demo mode (`isMockAsset: true`) the UI has a **“Get test FXRP”** faucet button,
so judges can try the full flow without touching XRPL. To run against real FXRP,
set `FXRP_ADDRESS` when deploying.

## Repo layout

| Path | What |
|---|---|
| `contracts/` | Foundry project — vault, oracle, zap, strategies, mocks, 11 tests, deploy script |
| `keeper/`   | Node/viem rebalance bot (drift watcher) |
| `web/`      | Vite + React + wagmi dashboard |
| `docs/SUBMISSION.md` | Hackathon submission draft |

## Security notes

Demo code, not audited. Mock strategies are for Coston2 demonstration only.
Liveness-first design: FTSO staleness blocks `rebalance()` but never user
deposits/withdrawals. Rebalancer is permissionless by design.
# fxrproute
