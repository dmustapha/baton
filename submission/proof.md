# Baton — On-Chain Proof

Network: **Coston2** (Flare testnet, chainId **114**) · XRPL **Testnet**
Explorer (Flare): https://coston2-explorer.flare.network · Explorer (XRPL): https://testnet.xrpl.org

All hashes below are from genuinely executed runs. No fabricated values.

## Reused live infrastructure (not deployed by us)
| Contract | Address |
|---|---|
| MasterAccountController | `0x434936d47503353f06750Db1A444DBDC5F0AD37c` |
| Hosted operator/executor (EOA) | `0x103b384064ae85577127097A7cCadfd6fb13f437` |
| FXRP (FAsset) token | `0x0b6A3645c240605887a5532109323A3E12273dc7` |
| Agent vault (FXRP mint) | `0x55c815260cBE6c45Fe5bFe5FF32E3C7D746f14dC` (id 1) |
| Vault A — Upshift | `0xD91324A6e8884147F6425E9ddd60e11Aea060B5b` (id 4) |
| Vault B — Firelight | `0xC90D6847747b85d1fa2E07859869fb9fB72c0361` (id 1) |
| Contract Registry | `0xaD67FE66660Fb8dFE9d6b1b4240d8650e30F6019` |
| Provider XRPL wallet | `rEyj8nsHLdgt79KJWzXR5BgF7ZbaohbXwq` |

## Task-0 — Go/No-Go: the live operator executes an instruction sent from a funded XRPL payment
**Result: GO.** One funded XRPL Testnet Payment (no EVM wallet, no FLR gas from the user) caused
Flare's hosted operator to deploy the derived PersonalAccount and reserve collateral on Coston2 —
then mint FXRP (depth-8). Demo XRPL account `rwLtfA6cn57VYjzaDetfCQi2z4cDgeNi8b` (100 testXRP).

| Step | Chain | Tx / value |
|---|---|---|
| 1. CR request (user signs) | XRPL | `7EC5DFA71A7D851C534D043CC822FAF278A9C57930A5B1D89083B7CD32D57CAB` |
| 2. Operator reserveCollateral | Coston2 | `0x97730bfc760e38cfba0ceaf12243f0e23b0805ecb6ffcd7aba8bf77bc95f57d9` (block 34025107) |
| — PersonalAccount deployed by operator | Coston2 | `0x27fBb63780AB83aE7CEcd69291AAbb0A769071f7` (has bytecode) |
| — CollateralReserved | Coston2 | crid `48947455`, value 10,000,000 UBA (10 testXRP), fee 25,000 UBA |
| 3. Mint payment (user signs) | XRPL | `F4EEDF56C8CED1D4BA6EB4F5873CEED2D6F3249D4BF52B1231636885E9FF43F9` |
| 4. FXRP minted to PersonalAccount | Coston2 | `0x0c33940aab2058c01bfaa1b4cb78f89479ad267c0e43445870648f673af38707` (block 34025166) — **10.0 FXRP** |

**Depth-8 achieved (critique E-1):** real FXRP direct-mint via the FAssets agent composes and executes.
Final FXRP balance of PersonalAccount `0x27fBb63780AB83aE7CEcd69291AAbb0A769071f7` = **10.0 FXRP**.
The FAssets primitive is genuinely load-bearing — not a faucet-prefunded balance.

Instruction encoded (fxrp-cr, 1 lot, agent 1, wallet 248): `0x00f8000000000000000000010001000000000000000000000000000000000000`

## Phase 2 — Atomic multi-vault deposit (the differentiator)
_pending — one XRPL signature → one atomic Coston2 tx → two vault balances > 0._

## FTSO valuation
_pending — live XRP/USD from FtsoV2._
