# TRAIDE on Flare

**Flare Summer Signal 2026 - Bounty 1 (Interoperable Asset Products)**

TRAIDE is a non-custodial multi-chain DEX built by a solo founder (crypto class of 2017, building patiently since 2025, no token sales, no anonymity). This repo contains the Flare-specific work: the Coston2 port of the full 11-contract suite and a new FTSOv2 integration layer, both completed during the hackathon window.

Demo video: https://youtu.be/B6tX4FRZMRU
Site: https://traidedefi.com

## What existed BEFORE the hackathon

- The TRAIDE protocol: an 11-contract suite (Token, AMM, Staking, Factory, Router, Governance, Timelock, FeeDistribution, Bridge, Multicall, Oracle) deployed across 22 EVM testnets plus Mantle - 231 contracts total
- Deterministic deployment discipline: fresh-nonce deploys from a single deployer so core contracts land at identical addresses across chains
- Winner, Project Deployment Awards, Mantle Turing Test Hackathon 2026 ("TRAIDE on Mantle plus NoEnterprise multi-agent AMM")

## What was built DURING Flare Summer Signal

1. **Coston2 port (chain 23).** All 11 contracts deployed to Flare Testnet Coston2 (chainId 114) on 2026-07-22. The deterministic foundation held: Token, AMM, and Staking landed at the same addresses they occupy across the whole fleet. Full addresses in `flare-coston2-deployment.json`; deploy scripts in `scripts/`.

2. **FtsoV2AggregatorAdapter (`contracts/FtsoV2AggregatorAdapter.sol`) - new Flare-native code.** A small adapter that exposes any FTSOv2 feed through Chainlink's `AggregatorV3Interface`, with decimal normalization to the 8-decimal Chainlink USD convention. This let TRAIDE's pre-existing Chainlink-style Oracle consume Flare's enshrined oracle with zero changes to TRAIDE core - and any other AggregatorV3 consumer in the ecosystem can reuse it the same way.

3. **Live wiring, verified onchain.** The FLR/USD adapter (`0x6BF75E497c778b2663b5444b9c3481dBDCe577a3`) is registered in TRAIDEOracle via `addPriceFeed` with a 3600s staleness heartbeat. `TRAIDEOracle.getPrice(WC2FLR)` returns the live FTSOv2 price (block-latency feeds, ~1.8s updates).

3b. **FXRP integration (added 2026-07-22 night, within the hackathon window).** An XRP/USD adapter (`0x4A8ac01265a030Aad32fb9B7bD5f89Be18f21858`) is registered in TRAIDEOracle keyed by the official FXRP (FTestXRP) token (`0x0b6A3645c240605887a5532109323A3E12273dc7`), resolved live from Flare's ContractRegistry via `AssetManagerFXRP.fAsset()` - never hardcoded, per Flare's own guidance. `TRAIDEOracle.getPrice(FXRP)` returns the live FTSOv2 XRP/USD price (registration tx `0x51e0abf60ad98aaee7ce8bd7f33cd6872e95a6bf4085f658030160884d815714`). Flare's flagship interoperable asset, priced by Flare's enshrined oracle, through the Chainlink interface the rest of DeFi already speaks - the bounty thesis in one call. Script: `scripts/register-fxrp-feed.cjs`.

4. **Frontend registration.** Flare Coston2 added to the TRAIDE app's chain configs.

## Why this matters for Flare

Interoperable asset products need two things: predictable deployments (audits and integrations that port across chains) and native oracle access without vendor lock-in. This port demonstrates both: the same DEX resolving at known addresses on Flare as on 22 other networks, and a reusable shim that lets the large ecosystem of Chainlink-interface consumers read FTSOv2 directly.

## Key addresses (Coston2, chainId 114)

| Contract | Address |
|---|---|
| TRAIDEToken | `0x1b781833Eb8EB82FDaaD5c4aAe28232980A8c759` |
| TRAIDEAMM | `0x14335714Ebd1b208212F4827bcE8d3b605543eb5` |
| TRAIDEStaking | `0xA7A7A397D0396C99460F66568cCE6f9664fEA929` |
| TRAIDEFactory | `0x1ca6fcDA8D49d13E2a93E634d60e51B7278c9b92` |
| TRAIDERouter | `0x47479496a62faaD8F69998486681Bb31e66cB0c0` |
| TRAIDEGovernance | `0xfB1DFA5b55Ad5269e08a1ECA585f6eB7a0Ba01E9` |
| TRAIDETimelock | `0x91C8f839b5C691044141FDD6Cf7F172370C44Dd8` |
| TRAIDEFeeDistribution | `0x35B90dDc4939Bc62Aa2Cf4EAb613a1300C18B971` |
| TRAIDEBridge | `0xbf978C24D41dCe230b63A0567497EdFce2D30Cfe` |
| TRAIDEMulticall | `0x32D6d342AC73Eb49f0D6176d84f8eE7A3F6691c9` |
| TRAIDEOracle | `0x9235A774475c2749F88BD5dd4bb06cf8E8881Bce` |
| FtsoV2AggregatorAdapter (FLR/USD) | `0x6BF75E497c778b2663b5444b9c3481dBDCe577a3` |
| FtsoV2AggregatorAdapter (BTC/USD) | `0xdA6183f45c8EBc51D08AD1cf144D755C28d95C4C` |
| FtsoV2AggregatorAdapter (ETH/USD) | `0x7B1A69303a2853a0e37D4709c613126DE1614408` |
| FtsoV2AggregatorAdapter (XRP/USD) | `0x4A8ac01265a030Aad32fb9B7bD5f89Be18f21858` |
| FXRP (FTestXRP, official Flare FAsset) | `0x0b6A3645c240605887a5532109323A3E12273dc7` |

Explorer: https://coston2-explorer.flare.network

## Honest notes

- The adapter uses `TestFtsoV2Interface` (view methods), which is correct for Coston2. A Flare or Songbird mainnet deployment swaps to `FtsoV2Interface` plus the fee flow; that change is isolated to the adapter by design.
- The main TRAIDE codebase is private pre-launch; this repo contains the complete Flare-specific additions. Read access to the full suite is available to judges on request.
- Two of the 23 chains in the wider fleet have historically drifted addresses from early deploy-order mistakes; the deterministic claim here is receipts-backed for the chains shown in the demo (Base, BSC, Arbitrum, Flare) and is the standing design discipline.

## Roadmap / next steps

- DONE 2026-07-22: FXRP priced through TRAIDEOracle via FTSOv2 (see 3b above)
- DONE 2026-07-22: BTC/USD and ETH/USD adapters deployed and live (AggregatorV3-readable standalone); oracle registration follows when honest token representations for BTC/ETH exist on Coston2 (FAssets currently ships FXRP only)
- FXRP/USDT0 pool on the TRAIDE AMM (oracle feed now in place)
- Mainnet deployment at deterministic addresses when the protocol exits testnet phase

MIT licensed. Built by Ryan Hammer (NoBanks Nearby) - https://github.com/NoBanks
