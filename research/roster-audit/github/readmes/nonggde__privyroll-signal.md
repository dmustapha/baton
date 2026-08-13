# PrivyRoll Signal

Privacy-aware, interoperable payroll settlement on Flare. PrivyRoll Signal lets a sponsor fund an FXRP payroll batch while keeping the complete contributor roster offchain. Flare FTSOv2 snapshots the XRP/USD value at funding time, and each contributor later proves only their own Merkle claim.

Built for the **Interoperable Asset Products** bounty in Flare Summer Signal 2026.

- Live app: https://nonggde.github.io/privyroll-signal/
- Product demo: https://nonggde.github.io/privyroll-signal/demo/

## Product

- **Offchain roster:** names, roles, and the complete payroll table never need to be published onchain.
- **Merkle claims:** the contract stores one root; each contributor reveals only the address and amount required for their claim.
- **Interoperable settlement:** any ERC-20 can be funded, with FXRP as the primary product path.
- **Flare budget signal:** the contract reads Coston2 FTSOv2 block-latency feeds and records the batch's USD value.
- **Budget ceiling:** a sponsor-provided maximum prevents a sudden oracle move from funding a batch above policy.
- **Recovery path:** unclaimed funds can be recovered by the sponsor after 30 days.

## What is new for Flare Summer Signal

PrivyRoll previously existed as an iExec Nox payroll interface and encrypted-state proof of concept. The following work was created for this Flare program:

- a new `SignalPayroll` smart contract and claim protocol;
- Merkle manifest generation compatible with OpenZeppelin verification;
- FTSOv2 XRP/USD price consumption through Flare's Coston2 contract registry;
- FXRP-oriented batch funding and USD budget guards;
- a redesigned Flare-native product interface and Coston2 wallet onboarding;
- Hardhat deployment configuration and contract tests.

No claim is made that the earlier Nox contract runs on Flare. Flare Confidential Compute is not used because the public FCC developer documentation currently states that the infrastructure is not yet publicly available.

## Architecture

1. The sponsor creates a payroll roster locally.
2. The app hashes each `(index, account, amount)` claim and builds a Merkle root.
3. `createBatch` records the root, escrows the token budget, and snapshots its FTSOv2 USD value.
4. Each contributor submits their leaf and Merkle proof to `claim`.
5. The contract prevents duplicate claims with a bitmap and transfers the exact allocation.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Coston2 deployment

- Contract: [`0xe4Cf2258f19aaeAa89084f1EE82bbE74d811B8fe`](https://coston2-explorer.flare.network/address/0xe4Cf2258f19aaeAa89084f1EE82bbE74d811B8fe)
- Verified source: [Coston2 Blockscout](https://coston2-explorer.flare.network/address/0xe4Cf2258f19aaeAa89084f1EE82bbE74d811B8fe#code)
- Deployment transaction: [`0xb18b...e5ca`](https://coston2-explorer.flare.network/tx/0xb18b2d916c624955c4af7cb43ba5ba115bab9d0a330d628f6083f44be3c2e5ca)
- Deployer: `0x8b58A7B0CA52696BBc5934D1F9ae55224E8bdd18`
- Machine-readable record: [`deployments/coston2.json`](deployments/coston2.json)

## Verify

```bash
npm run lint
npm run build
npm run contracts:compile
npm run contracts:test
```

## Deploy to Coston2

```bash
set COSTON2_PRIVATE_KEY=0x...
npx hardhat run scripts/deploy.js --network coston2
```

Network configuration:

- Chain ID: `114`
- RPC: `https://coston2-api.flare.network/ext/C/rpc`
- Explorer: `https://coston2-explorer.flare.network`
- XRP/USD feed ID: `0x015852502f55534400000000000000000000000000`

The deployment key must contain testnet C2FLR only. Never use a mainnet private key.

## Repository map

- `src/app` - interactive payroll manifest and Coston2 wallet UI
- `contracts/SignalPayroll.sol` - FTSOv2-aware Merkle payroll vault
- `contracts/test` - deterministic test doubles
- `test/SignalPayroll.js` - funding, claim, replay, and budget tests
- `scripts/deploy.js` - Coston2 deployment script
- `deployments/coston2.json` - deployed address and transaction evidence
- `videos/privyroll-signal` - HyperFrames demo source, narration, and captured product assets

## Current status

- Frontend: working static application
- Contract: compiled and tested locally
- Coston2 deployment: live and confirmed
- Demo video: rendered and published with live contract evidence

## Roadmap

- publish employee-side claim links and proofs;
- support FAssets beyond FXRP with asset-specific feed policies;
- add Safe multisig sponsorship and scheduled recurring batches;
- evaluate a Flare Compute Extension when FCC becomes publicly available.

## License

MIT
