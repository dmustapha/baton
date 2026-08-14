# Baton

**Your XRP, working on Flare. In one signature.**

Baton lets an XRP holder turn idle XRP into a live, yield-bearing Flare position with a single
signature from their existing XRPL wallet. No EVM wallet, no FLR gas, no manual bridge. You sign
on the XRP Ledger; Flare's Smart Accounts operator mints FXRP and deposits it into a live Flare
yield vault on your behalf, while you keep custody.

- **Track:** Interoperable Asset Products
- **Network:** Coston2 (Flare testnet, chainId `114`)
- **Demo wallet (testnet):** `rwLtfA6cn57VYjzaDetfCQi2z4cDgeNi8b`
- **On-chain proof:** [`submission/proof.md`](submission/proof.md) or the in-app `/proof` route

## The problem

An XRP holder who wants DeFi yield on Flare today has to: bridge or mint FXRP manually, create and
fund an EVM wallet, hold FLR for gas, find a vault, approve, and deposit. That is five unfamiliar
steps across two chains before earning a cent. Most never start.

## What Baton does

One XRPL signature drives the whole thing. Baton uses **Flare Smart Accounts**: every XRPL address
maps to a deterministic PersonalAccount contract on Flare, and Flare's hosted operator executes
instructions carried in an XRPL payment memo. Baton composes the instruction that **mints FXRP via
FAssets and deposits it into a live yield vault** — so the user's only action is signing a payment
from the XRP wallet they already have.

- No EVM wallet in the user path.
- No FLR gas paid by the user (the operator pays Flare gas).
- Custody stays with the XRPL key.

## How it works

```
You (XRPL wallet)  --sign one payment-->  Provider wallet (memo = instruction)
                                              |
                              Flare operator (0x103b38…f437) picks it up
                                              |
              FAssets collateral reservation -> mint FXRP -> deposit into vault
                                              |
                         Live yield position on your Flare PersonalAccount
```

- **Smart Accounts** — PersonalAccount derivation via `MasterAccountController.getPersonalAccount`.
- **FAssets / FXRP** — real FXRP minted through the agent-vault collateral-reservation flow.
- **Yield vaults** — deposits into the live Upshift and Firelight ERC-4626 vaults on Coston2.
- **FTSOv2** — live XRP/USD valuation via `getFeedById`, decoupled so balances render even if the feed is down.
- **Contract Registry** — every mutable protocol address resolved at runtime, nothing hardcoded.

Baton deploys **no custom Solidity**. It reuses live Flare infrastructure and the reference
`smart-accounts-cli` (pinned) as the encoding authority, wrapped in a typed viem + Next.js app.

## Features

- One-signature deposit flow with a strategy picker (Upshift / Firelight).
- Honest live status strip that reflects the real operator FDC round (signed → reserved → minting → deposited), not a fake spinner.
- Live portfolio: real vault shares converted to FXRP and valued through FTSOv2.
- On-chain `/proof` route with explorer links to every real transaction.
- Reproducible proof scripts.

## Proof (real, on-chain)

| What | Chain | Tx |
|---|---|---|
| FXRP minted (10.0) to PersonalAccount | Coston2 | `0x0c33940aab2058c01bfaa1b4cb78f89479ad267c0e43445870648f673af38707` |
| One-signature deposit → 10.0 Upshift vault shares | Coston2 | `0x5f4766e1bb83c34363d67f289e4ffdab0d8dd3c0903cea0b9d2c10df1c2ed6cb` |
| Operator reserveCollateral | Coston2 | `0x97730bfc760e38cfba0ceaf12243f0e23b0805ecb6ffcd7aba8bf77bc95f57d9` |

Full evidence, including the XRPL payment hashes, is in [`submission/proof.md`](submission/proof.md).

## Contracts (reused live infrastructure — Coston2, chainId 114)

| Contract | Address |
|---|---|
| MasterAccountController | `0x434936d47503353f06750Db1A444DBDC5F0AD37c` |
| Hosted operator (EOA) | `0x103b384064ae85577127097A7cCadfd6fb13f437` |
| FXRP (FAsset) token | `0x0b6A3645c240605887a5532109323A3E12273dc7` |
| Upshift vault | `0xD91324A6e8884147F6425E9ddd60e11Aea060B5b` |
| Firelight vault | `0xC90D6847747b85d1fa2E07859869fb9fB72c0361` |
| Contract Registry | `0xaD67FE66660Fb8dFE9d6b1b4240d8650e30F6019` |

## Run it

Baton needs Node and Python at runtime (the encode/bridge path shells the Python CLI), so it runs
via Docker (not Vercel).

```bash
# 1) provide a funded XRPL testnet seed in .env (see .env.example)
cp .env.example .env   # then fill DEMO_XRPL_SEED

# 2) build + run (Node + Python, pins the CLI commit)
docker build --build-arg CLI_COMMIT=c8809b94bcda3d0855ca762707f54483a9181e9d -t baton .
docker run -p 3000:3000 --env-file .env baton
# open http://localhost:3000
```

Local dev:

```bash
git clone https://github.com/flare-foundation/smart-accounts-cli ../smart-accounts-cli
# set up its venv per baton/CLI-INTERFACE.md, then:
bun install   # or npm install
npm run dev
```

## Target user

An XRP holder on XRPL mainnet using a wallet like Xaman who wants Flare DeFi yield without learning
EVM tooling. Testnet (Coston2) is a demo constraint; the mainnet path uses Xaman QR signing and
mainnet FXRP (see roadmap).

## Roadmap

- Mainnet FXRP + Xaman QR signing for the real one-signature UX.
- Multi-vault portfolio in a single signature once the Smart Accounts custom-instruction facet ships on-chain (it is present in the SDK but not yet deployed on Coston2 — see `BUILD-REPORT.md` DEV-007).
- Withdrawal / redeem flows and position history.
- More strategies as vaults are added.

## New vs pre-existing work

See [`NEW_WORK.md`](NEW_WORK.md). Short version: all Flare protocol, the operator, and the vaults are
pre-existing; Baton's product, integration layer, deposit orchestration, and app are new.
