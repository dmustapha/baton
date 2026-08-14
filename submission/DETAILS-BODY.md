**Your XRP just sits there. Baton puts it to work on Flare, from the wallet you already own.**

Flare Summer Signal · Interoperable Asset Products

## The problem

An XRP holder who wants yield on Flare today has to cross two chains and five unfamiliar steps: bridge or mint a wrapped asset, create and fund an EVM wallet, buy that chain's gas token, approve a contract, and only then deposit. The asset is **interoperable on paper, but the user experience is not**. Most XRP never makes the trip, so it sits idle.

## The solution

Baton collapses those five steps into a single action from the wallet the user already has. It uses **Flare Smart Accounts**, where every XRPL address maps to a deterministic PersonalAccount contract on Flare and a hosted operator executes instructions carried in an XRPL payment memo. Baton composes the instruction that **mints real FXRP through FAssets and deposits it into a live Flare yield vault**. The user signs from their XRP Ledger wallet, the operator does the on-chain work and pays the Flare gas, and custody stays with the XRPL key. Baton deploys **no custom Solidity**: it reuses live Flare infrastructure end to end.

## How It Works

**1. Sign from your XRP Ledger wallet.** You send one XRPL payment whose memo carries the encoded instruction. No EVM wallet, no FLR gas.

**2. The Flare operator picks it up.** Flare's live hosted operator (`0x103b38…f437`, more than 50,000 executed transactions) reads the memo.

**3. FAssets mints real FXRP.** The operator runs the collateral reservation and mints FXRP to your deterministic PersonalAccount via `MasterAccountController.getPersonalAccount`.

**4. It deposits into a live vault.** In one Flare transaction (`executeDepositAfterMinting`), the FXRP lands in the Upshift or Firelight yield vault. Your position is now live.

**5. Baton reads it back, live.** Balances come straight from the vault, valued in real time through `FtsoV2.getFeedById`, decoupled so your balance still renders if the price feed goes quiet.

## Key Features

- **One signing flow, no EVM tooling:** sign on the XRP Ledger, keep custody, pay zero FLR gas.
- **Real FAssets lifecycle:** FXRP is genuinely minted through the collateral reservation flow, not faucet-funded.
- **Strategy picker:** allocate to the Upshift (lending) or Firelight (strategy) vault.
- **Honest live status:** the status strip reflects the real operator FDC round, not a fake spinner.
- **Live FTSO valuation:** positions are priced through Flare's FTSOv2 oracle, decoupled from balance reads.
- **Nothing hardcoded:** every mutable protocol address resolves through the Contract Registry at runtime.

## Live Now

- **Live app:** https://baton-flare.onrender.com (free tier, first load may cold start for about 30 seconds)
- **Repository:** https://github.com/dmustapha/baton
- **Real on-chain proof (Coston2, chainId 114):** one XRPL-driven flow minted `10 FXRP` and deposited it into the Upshift vault in a single Flare transaction.
- **Deposit transaction:** `0x5f4766e1bb83c34363d67f289e4ffdab0d8dd3c0903cea0b9d2c10df1c2ed6cb` (method `executeDepositAfterMinting`, 10 FXRP into the vault)
- **Mint transaction:** `0x0c33940aab2058c01bfaa1b4cb78f89479ad267c0e43445870648f673af38707` (10 FXRP minted to the PersonalAccount)
- **In-app proof route:** the `/proof` page links every real transaction to the explorer.

## Tech Stack

`Next.js 15` · `viem` (Coston2) · `Flare Smart Accounts` · `FAssets / FXRP` · `FTSOv2` · `Contract Registry` · the pinned Python `smart-accounts-cli` as the encode and bridge authority (subprocess) · `Node + Python` Docker on Render.

## Reused live infrastructure (Coston2, chainId 114)

- **MasterAccountController:** `0x434936d47503353f06750Db1A444DBDC5F0AD37c`
- **Hosted operator (EOA):** `0x103b384064ae85577127097A7cCadfd6fb13f437`
- **FXRP (FAsset) token:** `0x0b6A3645c240605887a5532109323A3E12273dc7`
- **Upshift vault:** `0xD91324A6e8884147F6425E9ddd60e11Aea060B5b`
- **Firelight vault:** `0xC90D6847747b85d1fa2E07859869fb9fB72c0361`
- **Contract Registry:** `0xaD67FE66660Fb8dFE9d6b1b4240d8650e30F6019`

## Hackathon Alignment

Primary track: **Interoperable Asset Products**. Baton takes XRP, an asset that lives on another chain, and makes it productive on Flare with the lowest possible friction, using the FAssets lifecycle as the load-bearing integration and Smart Accounts as the execution rail. The target user is a real XRP holder on XRPL mainnet using a wallet like Xaman. Testnet is a demo constraint: the mainnet path uses Xaman QR signing and mainnet FXRP.

## Honest note on scope

Baton's original design was a single-signature atomic multi-vault deposit through the Smart Accounts custom-instruction primitive. During the build we found that facet is present in the SDK but not yet deployed on Coston2, verified by a diamond `FunctionNotFound` on both the production and staging controllers. We pivoted to the live, operator-supported primitive: one signature per strategy, mint and deposit, which preserves the core value. Multi-vault in one signature returns as soon as that facet ships on-chain.

## Close

Every number above comes from a genuinely executed run. Try it live at https://baton-flare.onrender.com, read the code at https://github.com/dmustapha/baton, and verify the transactions on the Coston2 explorer.
