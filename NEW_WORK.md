# NEW_WORK.md — Baton

Clear separation of pre-existing work from what we built for Flare Summer Signal.

## Pre-existing (NOT ours)
- **Flare Smart Accounts protocol** — `MasterAccountController` diamond (`0x434936d47503353f06750Db1A444DBDC5F0AD37c`) and the hosted operator/executor EOA (`0x103b384064ae85577127097A7cCadfd6fb13f437`, 52k+ txs). Deployed and run by Flare.
- **FAssets / FXRP** — the FXRP token (`0x0b6A3645c240605887a5532109323A3E12273dc7`) and agent-vault minting infrastructure. Flare protocol.
- **The Upshift and Firelight yield vaults** (`0xD913…`, `0xC90D…`) — third-party ERC-4626 vaults live on Coston2.
- **`flare-foundation/smart-accounts-cli`** (commit `c8809b94`) — the reference Python encoder/bridge we call as a subprocess. Flare's tool.
- **FTSOv2** price feeds. Flare protocol.

We deployed **no custom Solidity**. Everything on-chain is reused, live Flare infrastructure.

## New (ours, built for this hackathon)
- **Baton the product** — the idea and UX of turning idle XRP into a live Flare yield position from a single XRPL signature, with no EVM wallet and no gas in the user path.
- **Typed viem integration layer** (`lib/`): live ContractRegistry resolution (`FtsoV2`, `AssetManagerFXRP.fAsset()`), PersonalAccount derivation (`getPersonalAccount`), FXRP-decimals-aware amount handling, FTSOv2 valuation via `getFeedById`.
- **The deposit orchestration** (`lib/deposit.ts`, `lib/jobs.ts`): encoding `{strategy}-cr-deposit` instructions, driving the FAssets collateral-reservation + mint + vault-deposit flow, and a detached job runner with honest live status derived from on-chain state (not fabricated).
- **The Next.js app**: strategy picker, one-signature deposit flow, live status strip that reflects the real operator FDC round, live portfolio valued through FTSOv2, and an on-chain `/proof` route.
- **Reproducible proof scripts** (`scripts/`) and the full on-chain evidence in `submission/proof.md`.

## Build-time discovery (honest note)
Our original thesis was a **single-signature atomic multi-vault** deposit via the SDK's `custom-instruction` (`executeUserOp(Call[])`) primitive. During Task-0 we discovered that facet is **not deployed** on Coston2 (diamond `FunctionNotFound` for `encodeCustomInstruction`; verified on both the production and staging MACs). We pivoted to the live, operator-supported primitive — one signature per strategy, mint + deposit — which preserves the core value (XRP → productive Flare position, no EVM wallet, no gas) using the FAssets lifecycle as the load-bearing integration. The pivot is recorded in `BUILD-REPORT.md` (DEV-007).

## Commit boundary
All application code was authored during the hackathon window (see git history from `pipeline/forge` onward). The reference CLI is pinned as an external sibling checkout and is not part of our repository.
