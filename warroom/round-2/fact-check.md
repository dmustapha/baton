# Round 2 Finalist Fact Check

Checked against primary Flare documentation, primary standards/research where available, the live Coston2 RPC, and the frozen prior-art registry.

## Live network verification

Commands run against `https://coston2-api.flare.network/ext/C/rpc` on 2026-08-13:

- `eth_chainId` returned `0x72`, decimal **114**.
- Contract Registry `getContractAddressByName("AssetManagerFXRP")` returned `0xc1Ca88b937d0b528842F95d5731ffB586f4fbDFA`.
- Calling `fAsset()` on that AssetManager returned current Coston2 FXRP `0x0b6A3645c240605887a5532109323A3E12273dc7`.
- Contract Registry `getContractAddressByName("FdcVerification")` returned `0x906507E0B64bcD494Db73bd0459d1C667e14B933`.
- Contract Registry `getContractAddressByName("MasterAccountController")` returned `0x434936d47503353f06750Db1A444DBDC5F0AD37c`.
- `eth_getCode` confirmed deployed bytecode at the dynamically resolved FXRP address.

The static Coston2 FXRP address in one official reference page returned no code, while the current official address guide and Contract Registry resolved `0x0b6A...`. Any later build must resolve dynamically rather than copy a static table.

## Exit Relay

### Verified claims

- Coston2 has a live ERC-20 FXRP contract discoverable from AssetManager via `fAsset()`. Project contracts can hold and transfer it.
- A project router can implement its own `recordBatchResult`, cap state, and `IERC20.transfer` routing with explorer-visible events.
- FCC examples support typed EIP-191-style result verification from an identified extension signer. Simulated TEE status must be shown honestly.
- Private inclusion can be implemented as an application commitment/result protocol; the project must define deterministic batch-root, monotonic ID, expiry, and omission rules.

### Corrections and limits

- The router cannot change FAssets agent capacity, protocol redemption queues, or native routing.
- A fixture fulfillment receipt is not FDC proof. The demo may label it reproducible/simulated, while keeping FXRP cap change and reroute live.
- General performance-based capacity allocation is established prior art. Novelty survives only in the direct private-inclusion → same-provider next-cap → immediate FXRP-reroute transition.

### Exact joined proof path

Live FXRP funds application router → hidden requests produce commitments → simulated or registered FCC/FCE worker emits typed inclusion/fulfillment result → router verifies signer/root/batch/expiry → application cap changes → allowed FXRP transfers to provider and withheld FXRP transfers to fallback → events and explorer receipts show both paths.

Fact-check status: **PASS WITH APPLICATION-ROUTER BOUNDARY**.

## Forget-to-Redeem

### Verified claims

- Official FAssets supports `redeem`, `redeemAmount`, and `redeemWithTag` on Coston2; redemption produces request and completion events.
- FDC `IXRPPayment` supports XRPL/TestXRP payment evidence with amount, source, receiver, memo, destination tag, and status.
- A project contract can hold a separate privacy bond and release it after verifying a typed FCC/FCE result bound to payout hash, capsule commitment, machine epoch, and nullifier.

### Corrections and limits

- The project cannot delay, close, or redefine FAssets redemption finality. XRP payout occurs before the application privacy bond releases.
- FCC attestation establishes that identified measured code ran; it does not prove information-theoretic deletion or absence of copies outside that boundary.
- Proof of secure erasure, certified deletion, erasure certificates, nullifiers, and bonded claims are prior art. Novelty survives only in the payout-bound residual liability released by an attested capsule-consumption claim.
- The actor posting the application bond and the loss/beneficiary model are not yet validated by user evidence. This is the main product risk.

### Exact joined proof path

Call live `IAssetManager.redeem` → observe redemption and XRPL payout/FDC evidence → FCC/FCE worker consumes the payout-bound capsule and signs typed result → application verifier checks machine, payout, commitment, epoch, and unused nullifier → privacy bond releases → replay fails with visible events.

Fact-check status: **PASS WITH MANDATORY CLAIM CORRECTIONS AND HIGHER DELIVERY RISK**.

## Primary evidence

- [FAssets redemption](https://dev.flare.network/fassets/redemption)
- [Redeem FAssets guide](https://dev.flare.network/fassets/developer-guides/fassets-redeem)
- [FAssets Contract Registry guide](https://dev.flare.network/fassets/developer-guides/fassets-asset-manager-address-contracts-registry)
- [Current FXRP address guide](https://dev.flare.network/fxrp/token-interactions/fxrp-address)
- [IXRPPayment reference](https://dev.flare.network/fdc/reference/IXRPPayment)
- [FCC signed-result example](https://dev.flare.network/fcc/guides/weather-insurance-extension)
- [FCC sign extension and simulation boundary](https://dev.flare.network/fcc/guides/sign-extension)
- [Confidential Computing Consortium on attestation](https://confidentialcomputing.io/2023/04/06/why-is-attestation-required-for-confidential-computing/)
- [RFC 9397 TEE attestation model](https://www.rfc-editor.org/info/rfc9397/)
- [Proof of secure erasure research lineage](https://eprint.iacr.org/2010/318)

## Final fact-adjusted order

1. Exit Relay: **7.40/10**, MEDIUM risk.
2. Forget-to-Redeem: **6.97/10**, HIGH risk.

No winner is selected by this document.
