# FAsset Sentry

FAsset Sentry is permissionless challenger infrastructure for Flare FAssets.

FAssets depend on external challengers to detect illegal movements from an agent's underlying address. Sentry discovers registered Coston2 agents, watches their XRPL Testnet activity, correlates outgoing payments with valid protocol references, acquires the required Flare Data Connector proof, and submits an idempotent `illegalPaymentChallenge` after a successful simulation.

## Current status

Research and product scope are complete. Implementation has not started. The next step is a lean design phase, followed by a real-network technical preflight before feature code.

## Locked first release

The first release supports:

- one official FAssets AssetManager on Coston2
- registered agent discovery
- XRPL Testnet monitoring
- illegal-payment detection only
- real FDC `BalanceDecreasingTransaction` proof acquisition
- exact challenge simulation and idempotent submission
- a durable receipt connecting the XRPL transaction, FDC proof, Coston2 challenge, liquidation result, and reward

Double-payment challenges, negative-balance challenges, abandoned confirmations, mainnet, multiple FAssets, alerts, analytics, and shared reward pools are outside the first release.

## Why Flare is central

The product exists because FAssets connects an underlying chain to Flare contracts and deliberately relies on permissionless challengers for some safety checks. XRPL supplies the observed transaction, FDC supplies the cryptographic proof, and the FAssets challenge contract decides whether the agent should enter full liquidation and whether the challenger receives a reward.

See [the final scope](research/fasset-sentry-scope.md) and [the domain research](research/domain-knowledge.md).
