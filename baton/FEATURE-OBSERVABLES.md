# Baton — Feature Observables

One verifiable observable per P0/P1 feature. Sentinel-fail strings catch "exists but fake".

| feature_id | feature | observable | test_command | sentinel_fail | verified_by |
|---|---|---|---|---|---|
| F-001 | One signature → multi-vault (P0, the thesis) | After ONE XRPL Payment, BOTH vault balances > 0 from a SINGLE Coston2 `executeUserOp` tx | `cast call <vaultA> "balanceOf(address)(uint256)" <pa> --rpc-url $COSTON2_RPC_URL` and same for vaultB → both > 0; explorer shows one tx | only one vault increases, or two separate txs | stress_test.atomic_multivault |
| F-002 | Self-custody / XRPL-only (P0) | Full flow completes with only an XRPL wallet; no EVM wallet or FLR ever requested in the user path | grep the client bundle + manual run: no `walletClient`/`window.ethereum`/FLR prompt on the sign path | any EVM signer or FLR-gas prompt on user path | stress_test.self_custody_smoke |
| F-003 | Atomic Call[] (P0) | The multi-vault deposit is all-or-nothing: a forced-revert leg leaves BOTH vault balances unchanged | run instruction with a deliberately failing leg → both balances == pre-state | one vault deposited while the other failed | stress_test.atomicity |
| F-004 | Honest live status (P1) | `/api/status` returns `attesting` with the real FDC latency message, not an instant `executed` | `curl "/api/status?personalAccount=<pa>&submittedAt=<now>"` within 30s → `stage:"attesting"` | instant `executed` before ~90s / hardcoded stage | stress_test.status_honesty |
| F-005 | FTSO valuation (P1) | Portfolio USD = live FTSO XRP/USD × balances; price changes between calls | `curl "/api/positions?xrplAddress=<r>"` twice spaced → `ftsoPrice` is a live non-zero value | `ftsoPrice` == 0 or a hardcoded constant | stress_test.ftso_live |
| F-006 | Proof surface (P1) | `/proof` and `submission/proof.md` contain explorer-resolvable real tx hashes | open `/proof`; each Flare tx hash resolves on coston2-explorer | placeholder/`0x000…` hashes | livetest.proof_resolves |

**Sentinel principle:** every observable proves the feature *did the real thing on-chain*, not that a function exists. F-001/F-003 are the differentiator — if either fails, the demo has no thesis (see PLAN Task 2.3 VERIFY-MILESTONE).
