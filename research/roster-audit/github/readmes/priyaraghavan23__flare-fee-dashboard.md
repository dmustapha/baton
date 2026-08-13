# Flare Fee Dashboard

Cross-chain gas fee dashboard (Ethereum / Base / Flare / Songbird) where **every USD price is an on-chain Flare FTSO v2 `getFeedById` read from browser JS** — zero CoinGecko, zero API keys, zero centralized price APIs.

- Live: https://flare-fee-dashboard.surge.sh
- Demo video (63s): https://flare-fee-dashboard-video.surge.sh/
- Built for **Flare Summer Signal, Bounty 1 (Interoperable Asset Products)**.

## Old work vs new work
- **Ported (old):** basegas gas-estimator shell (public at basegas.surge.sh since July 2026).
- **New:** FTSO v2 browser adapter (5 feeds, per-feed decimals), Flare + Songbird chain support, USD cost engine, cheapest-venue verdict, `contracts/FtsoFeePricer.sol` FTSO consumer (Coston2).

## FTSO integration
Feed id = `0x01 || ASCII "SYMBOL/USD"`, left-aligned in bytes21. Per-feed decimals vary (FLR=8, XRP=6, BTC=2, ETH=3, USDC=5) — read them from the oracle, never hardcode.
FtsoV2: mainnet `0x7bde3df0624114edb3a67dfe6753e62f4e7c1d20`, Coston2 `0xc4e9c78ea53db782e28f28fdf80baf59336b304d` (via on-chain registry `0xaD67FE66660Fb8dFE9d6b1b4240d8650e30F6019`).

## Coston2 deploy status
`contracts/FtsoFeePricer.sol` compiles clean under solc 0.8.30 (`contracts/FtsoFeePricer.compiled.json`, 1138 bytes bytecode, optimizer 200 runs). One-command deploy script at `scripts/deploy_coston2.py` — preflight-verified against the live Coston2 RPC (chainId 114, correct deployer, clean abort on zero gas). Deploy is queued behind the captcha-gated testnet faucet (C2FLR); the moment gas lands, deploy + on-chain self-verify (`priceUsd(ETH/USD)` round-trip) is a single command.
