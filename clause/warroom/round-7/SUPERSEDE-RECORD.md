# Round 7 — Strategy Supersede Record

Date: 2026-08-13
Authorized by: Dami (user authority)
Scope: **iteration 7 only.** All Round 1-6 artifacts, decisions, and state are preserved unchanged as history.

## What was superseded

| Surface | Former (Rounds 5-6) | Round 7 |
|---|---|---|
| `config.json` → `warroom_strategy.track_strategy` | `single-track` | `dual-track-workflow-first` |
| `config.json` → `required_tracks` | `[Interoperable Asset Products]` | `[Interoperable Asset Products, Confidential Compute Apps]` |
| Active brief §11 Warroom strategy line | "single-track targeting Interoperable Asset Products; FCC optional" | dual-track workflow-first; FCC necessary and non-removable |
| PULSE Active Facts | W13 (mandatory dual → single) | W16 + W17 (single → dual-track workflow-first) |
| PULSE Decisions Log | D-11, D-12, D-13 (single-track pivot + stop) | D-14, D-15 (dual-track workflow-first reset + finalist checkpoint) |
| `.warroom-state.json` | v6 `complete_with_blockers`, single-track | v7 `in-progress`, `round7` block |

## Binding Round 7 contract

1. **Interoperable Asset Products** — the concept must perform a *real controlled asset-lifecycle transition* (FAssets/FXRP mint/redeem/collateral, Smart Account XRPL-authorized execution, PMW external-asset action, or FDC-verified asset transition). A balance read or an isolated ERC-20 transfer fails.
2. **Confidential Compute Apps** — the concept must perform computation that is *necessary* over data that is *already naturally private in the observed workflow* (not invented, not already-public-on-chain data being "hidden"). Explicit disclosure boundary, machine/attestation status, signed result, contract verification.
3. **Two independent removal tests** — remove either primitive and a necessary economic action, safety guarantee, or product outcome must break.
4. **One joined causal proof path** — user trigger → interoperable asset action/state → necessary confidential operation → verified result → asset consequence → exact judge-visible receipt + failure safeguard.

## Why a reset, not more volume

Rounds 3-6 exhausted blind recombination over the same evidence (0/40 twice, then 0/40 single-track). The market-reality-checkpoint "missing join" finding stands: broad users do not demonstrably demand *attested confidential computation*, and FCC cannot control incumbent wallets, agent signers, exchange ledgers, or custodians without their integration.

**Round 7's escape hatch:** admit only workflows where a *single actor already holds authority over BOTH the naturally-private data AND the asset action* — self-sovereign / self-operated workflows — so FCC becomes causally necessary without requiring a hypothetical partner's integration. This is enforced by the workflow evidence map BEFORE any generator runs.

## Preserved history (do not alter)

- `warroom/round-1-verdict.md`, `warroom/round-2/`, `warroom/round-3/`, `warroom/round-4/`, `warroom/round-5/`, `warroom/round-6/`
- `warroom/market-reality-checkpoint.md`, `warroom/single-track-checkpoint.md`
- `.warroom-state.json` `killed[]`, `scores[]`, `phase_ledger`, `round7.history_*`
