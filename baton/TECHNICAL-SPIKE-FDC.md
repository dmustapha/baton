# CLAUSE — Technical Spike (VERIFIED against dev.flare.network + flare-foundation, 2026-08-13)

## What is REAL and buildable on Coston2 (VERIFIED)
- **FDC `Payment` attestation** of a real **XRPL Testnet** payment. Struct fields (from `songbird-state-connector-protocol/.../Payment.sol`): `blockNumber, blockTimestamp, sourceAddressHash, receivingAddressHash, spentAmount, receivedAmount, standardPaymentReference (=XRPL DestinationTag/memo, 32-byte), oneToOne, status(0=ok)`. **Addresses arrive as keccak HASHES, not raw strings.**
- Source id `testXRP` → Coston2 (testnets↔testnets). XRPL closes ledgers ~3–5s; the binding delay is the **FDC voting round ~90–180s**.
- Solidity verify: `ContractRegistry.getFdcVerification().verifyPayment(proof)` → bool. Imports `flare-periphery/src/coston2/{ContractRegistry,IFdcVerification,IPayment}.sol`. Fee = query at runtime `FdcRequestFeeConfigurations.getRequestFee(...)`, pay `FdcHub`.
- **FXRP on Coston2**: ERC-20, resolve via `ContractRegistry` (never hardcode). **FTestXRP is available DIRECTLY from the Coston2 faucet — NO minting, NO agent, NO collateral flow.** Escrow can hold/transfer it as a normal ERC-20.
- **FCE signature-verify path**: extension signs a result with a registered TEE identity; a contract verifies against a registered code-hash (`TeeExtensionRegistry`/`TeeMachineRegistry`, gated by `InstructionSender`). The **on-chain verify path is real and identical to production**.

## What is NOT real / must be labeled (VERIFIED)
- **FCC hardware TEE is pre-production.** Coston2 = SIMULATED mode (`MODE=0`). Songbird real-TEE is only an STP.13 canary (vote Jul 6–13 2026), "not yet a fully public production system." Mainnet: none.
- Consequence: on Coston2 the **confidentiality is not hardware-enforced** — only the signing/verification path is real. Honest label required: *"TEE confidentiality SIMULATED on Coston2; identical Intel TDX path ships on Songbird (STP.13)."* (Competitor VeriFlow ships the same caveat; AegisFlow used Phala, a non-Flare TEE.)
- Exact FCE Solidity verify bytes = in scaffold repos (`fce-extension-scaffold`, `fce-sign`), not doc excerpts — reverse-engineer or use a registered-ECDSA-signer stand-in (labeled).

## Feasibility verdict (26h solo)
- **Riskiest = real hardware TEE. Do not attempt.** Ship FCE in simulated mode with a real signature the contract verifies.
- **Minimal REAL path:** (1) FDC Payment round-trip [BUILD FIRST — the trust anchor], (2) FXRP faucet + ERC-20 escrow release, (3) FCE sim-mode confidential formula that signs a verdict the Clause contract verifies.
- **Gotchas:** addresses are hashes (match keccak); resolve everything via ContractRegistry; query FDC fee at runtime; pace demo for a ~90–180s attestation round (pre-warm).
