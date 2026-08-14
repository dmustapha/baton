# Baton

## Your XRP, working on Flare. In one signature.

Baton turns idle XRP into a live, yield-bearing Flare position with a single signature from the XRPL
wallet you already have. No EVM wallet. No FLR gas. No manual bridge. You sign on the XRP Ledger, and
Flare's Smart Accounts operator mints FXRP and deposits it into a live Flare yield vault for you,
while you keep custody of your key.

## The problem

An XRP holder who wants yield on Flare today faces five unfamiliar steps across two chains: bridge or
mint FXRP, create and fund an EVM wallet, hold FLR for gas, pick a vault, approve, and deposit. That
friction is why most XRP never reaches Flare DeFi at all. The asset is interoperable on paper, but the
user experience is not.

## The solution

Baton collapses those five steps into one signature. It uses Flare Smart Accounts, where every XRPL
address maps to a deterministic PersonalAccount contract on Flare and a hosted operator executes
instructions carried in an XRPL payment memo. Baton composes the instruction that mints FXRP through
FAssets and deposits it into a live yield vault. The user's only action is signing one payment from
their XRP wallet. The operator does the Flare work and pays the Flare gas. Custody stays with the
XRPL key.

## How it works

You sign one XRPL payment whose memo carries the encoded instruction. Flare's operator, a live EOA at
0x103b384064ae85577127097A7cCadfd6fb13f437 with more than fifty thousand executed transactions, picks
it up, runs the FAssets collateral reservation, mints FXRP, and deposits it into your chosen vault on
your Flare PersonalAccount. Baton reads the result live and shows an honest status: signed, reserved,
minting, deposited. The valuation is pulled from FTSOv2 in real time.

## Features

Single signature deposit with a strategy picker for the Upshift and Firelight vaults. An honest live
status strip that reflects the real operator FDC round instead of a fake spinner. A live portfolio
that converts real vault shares to FXRP and values them through FTSOv2. An on chain proof route with
explorer links to every real transaction. Reproducible proof scripts. Baton deploys no custom
Solidity and resolves every mutable protocol address through the Contract Registry at runtime.

## Proof cluster (real, on chain, Coston2 chainId 114)

FXRP minted to the PersonalAccount, 10.0 FXRP:
0x0c33940aab2058c01bfaa1b4cb78f89479ad267c0e43445870648f673af38707

One signature deposit resulting in 10.0 Upshift vault shares:
0x5f4766e1bb83c34363d67f289e4ffdab0d8dd3c0903cea0b9d2c10df1c2ed6cb

Operator collateral reservation:
0x97730bfc760e38cfba0ceaf12243f0e23b0805ecb6ffcd7aba8bf77bc95f57d9

PersonalAccount for the demo XRPL wallet rwLtfA6cn57VYjzaDetfCQi2z4cDgeNi8b:
0x27fBb63780AB83aE7CEcd69291AAbb0A769071f7

## Stack

Next.js 15 and viem for a typed Flare integration layer. The Flare smart-accounts-cli, pinned at
commit c8809b94, as the encoding and bridge authority, called as a Python subprocess. FAssets for the
real FXRP mint. Flare Smart Accounts for XRPL authorized execution. FTSOv2 for live valuation. The app
ships as a Node plus Python Docker image so the encode path runs anywhere.

## Contracts (reused live infrastructure, Coston2 chainId 114)

MasterAccountController: 0x434936d47503353f06750Db1A444DBDC5F0AD37c
Hosted operator EOA: 0x103b384064ae85577127097A7cCadfd6fb13f437
FXRP token: 0x0b6A3645c240605887a5532109323A3E12273dc7
Upshift vault: 0xD91324A6e8884147F6425E9ddd60e11Aea060B5b
Firelight vault: 0xC90D6847747b85d1fa2E07859869fb9fB72c0361
Contract Registry: 0xaD67FE66660Fb8dFE9d6b1b4240d8650e30F6019

## Alignment with the track

Interoperable Asset Products asks for products that make assets more useful across Flare and connected
ecosystems. Baton takes XRP, an asset that lives on another chain, and makes it productive on Flare
with the lowest possible friction, using the FAssets lifecycle as the load bearing integration and
Smart Accounts as the execution rail. The target user is a real XRP holder on XRPL mainnet using a
wallet like Xaman. Testnet is a demo constraint, and the mainnet path uses Xaman QR signing and
mainnet FXRP.

## Honest note on scope

Baton's original design was a single signature atomic multi vault deposit through the Smart Accounts
custom instruction primitive. During the build we found that facet is present in the SDK but not yet
deployed on Coston2, verified by a diamond FunctionNotFound on both the production and staging
controllers. We pivoted to the live, operator supported primitive, one signature per strategy, which
preserves the core value. Multi vault in one signature returns as soon as that facet ships on chain.

## Close

Every number above comes from a genuinely executed run. Sign once, and your XRP is working on Flare.
