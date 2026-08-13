# Smart Accounts — VERIFIED live on Coston2 (hands-on, 2026-08-13)

Verified by cloning `flare-foundation/smart-accounts-cli` + `flare-smart-accounts` and probing the live Coston2 chain with `cast`. This is the trust anchor for the build — real addresses, not assumptions.

## Architecture (from CLI source)
- Every XRPL address → deterministic `CREATE2` **PersonalAccount** contract on Flare, routed by **MasterAccountController**.
- User sends an **XRPL Payment** (fee + encoded instruction in memo) to a **provider XRPL wallet**. A **hosted operator/executor** (run by Flare) watches it, fetches the **FDC** proof, and submits `reserveCollateral`/`executeInstruction`/mint on Flare. **We do NOT build the executor — Flare runs it.**
- The CLI is a working reference: `encode` (fxrp-cr mint, fxrp-transfer, fxrp-redeem, upshift/firelight-cr-deposit, custom-instruction) → `bridge instruction` → `bridge mint-tx`.
- **Custom instructions** = atomic `Call[]` (EIP-4337 PackedUserOp, `executeUserOp(Call[])`) → call ANY contract(s) atomically as the PersonalAccount. This is the multi-vault "portfolio in one signature" primitive Flare's Xaman demo does NOT expose.

## Verified LIVE on Coston2 (chainId 114, block 34M+)
| Thing | Address | Evidence |
|---|---|---|
| MasterAccountController | `0x434936d47503353f06750Db1A444DBDC5F0AD37c` | has code; same on mainnet |
| **Operator/executor** | `0x103b384064ae85577127097A7cCadfd6fb13f437` | **nonce 52,581 (52k txs executed) + 1,965 C2FLR funded → live, active, battle-tested** |
| Provider XRPL wallet | `rEyj8nsHLdgt79KJWzXR5BgF7ZbaohbXwq` | `getXrplProviderWallets()` returns this string; send instructions here |
| Vault 1 (Upshift) | `0xD91324A6e8884147F6425E9ddd60e11Aea060B5b` | `getVaults()` type 2 |
| Vault 2 (Upshift) | `0x9E63a5D282F2fBb7DcE822B98e363b2719D28319` | type 2 |
| Vault 3 (Upshift) | `0x4066A1363a04ce3B23eEcB53dEfa65f94A24355E` | type 2 |
| Vault 4 (Firelight) | `0xC90D6847747b85d1fa2E07859869fb9fB72c0361` | type 1 |
| FAssets agent vault (minting) | `0x55c815260cBE6c45Fe5bFe5FF32E3C7D746f14dC` | `getAgentVaults()` → real FXRP direct-mint possible |
| Executor fee | 1e11 | `getExecutorInfo()` |

## Feasibility verdict: GO
- The exact trap that killed prior ideas (assumed builder path) is CLEARED: public callable controller + live operator + audited contracts + reference CLI, all on Coston2.
- Depth-8 path (real FXRP mint via agent) is available; depth-7 fallback (faucet FXRP) if minting proves heavy.
- Gotchas: FDC round ~90–180s per action (demo pacing); `getXrplProviderWallets()` returns XRPL address STRINGS not EVM addresses; resolve everything via ContractRegistry; the user needs only XRPL testnet XRP (operator pays Flare gas).

## Build gates (fail-fast)
- **Task 0 (hr ~2):** funded e2e — `encode fxrp-transfer | bridge instruction -` with a faucet-funded XRPL testnet seed; confirm the operator executes it on Coston2. PASS → continue; FAIL → fall back to plain FDC checkout.
- **Gate 1 (hr ~5–6):** real direct-mint works → ship depth-8; else faucet FXRP → depth-7.
