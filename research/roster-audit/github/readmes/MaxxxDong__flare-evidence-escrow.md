# Evidence-Linked FXRP Escrow

A narrow Coston2 demo: lock test FXRP against a local evidence SHA-256 digest, release through an arbiter, or refund after timeout. The web app is deliberately read-only and preview-first: it has no signer and cannot broadcast transactions. Local evidence files are limited to 10 MiB.

Live demo: https://maxxxdong.github.io/flare-evidence-escrow/

Demo video: https://youtu.be/T8j0nkxI4oA

## Run

Requirements: Node.js 20+ / npm and Foundry with Solidity 0.8.34.

```bash
forge test
cd web
npm ci
npm test
npm run build
npm run dev -- --host 127.0.0.1
```

Open the local URL printed by Vite. Use only synthetic files. “Refresh Coston2 snapshot” performs public `eth_call` reads; it does not request a wallet or change chain state.

## Evidence and documents

- [Frozen Coston2 receipts](docs/receipts/coston2.json): public contract and six successful transaction hashes on chain ID 114. They belong to the frozen spike deployment; the later hardened source in this repository has not been redeployed.
- [Technical design](docs/technical.md)
- [Flare integration](docs/flare-integration.md)
- [Preexisting/new delta](docs/preexisting-delta.md)
- [Product and users](docs/product-summary.md)
- [Roadmap](docs/roadmap.md)
- [Submission draft](docs/submission-draft.md)
- [Final demo video](videos/evidence-escrow-demo/renders/flare-evidence-escrow-final.mp4)
- [Output trust boundary](docs/security/trust-boundary.md)
- Verification logs: [`security-red.log`](docs/verification/security-red.log), [`security-green.log`](docs/verification/security-green.log), [`real-sink.log`](docs/verification/real-sink.log)

## Boundaries

This is unaudited testnet software. A digest does not prove evidence truth or delivery. The public site is a read-only preview; there is no production identity, arbitration, privacy storage, Mainnet/Songbird support, real asset/data path, automatic transaction send, or FDC attestation.

## Third-party dependencies

The project is MIT licensed. It uses React, Vite, Vitest, TypeScript, viem, and the MIT-licensed Flare wagmi periphery package. Flare FAssets protocol semantics/interfaces were referenced at commit `6d5c103e4342f0fc7d3683a433a90349d544f774`; the protocol itself is not copied. The lockfile plus `axios 0.33.0`, `elliptic 6.6.1`, `ethers 5.8.0`, and `ws 8.21.3` overrides are part of the dependency security baseline. Remaining upstream `elliptic` low-severity advisories are documented residual risk.
