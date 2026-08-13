# concerns.md — Baton (GENERATED-STUB, expand in PRD)

[C] Task-0 gate: funded XRPL-testnet e2e must confirm the LIVE operator executes one instruction on Coston2 before building further; if it fails, fall back to the FDC-Payment checkout
[C] Self-custody invariant: the user must drive everything from an XRPL wallet only — never require FLR gas or an EVM wallet in the hero flow
[C] Atomic multi-call: the custom Call[] multi-vault deposit (the differentiator vs Flare's single-vault demo) must be in the demo, working
[C] Demo pacing: FDC round ~90-180s per action — status UI must show honest live progress, not a fake instant result
[I] Mint depth: real FXRP direct-mint (depth-8) is the target; faucet FXRP (depth-7) is the honest documented fallback if minting is too heavy
[I] Real values only: build against verified live addresses (controller/operator/vaults/agent) via ContractRegistry; no hardcoded mutable addresses
[A] Competitor check: eyeball DoraHacks BUIDL list for an existing one-signature-multi-vault product before final submission
