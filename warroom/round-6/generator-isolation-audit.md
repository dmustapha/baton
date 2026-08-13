# Round 6 Generator Isolation Audit

## Audit boundary

- Inspected only the three round-5 safe-map filenames, the active brief section headings for §§2, 3, 5, 8, and 9, and round-6 generator filenames/structural labels and counts.
- Did not inspect or compare candidate idea prose.
- No web sources or other project files were used.

## Allowed source set

1. `round-5/generator-safe-demand-map.md`
2. `round-5/generator-safe-opportunity-map.md`
3. `round-5/generator-safe-primitives.md`
4. Active brief §§2, 3, 5, 8, and 9 only

All three safe-map files exist. All five required brief section headings exist.

## Isolation and structure matrix

| Generator | Assigned lens | File | Candidate count | Fields per candidate | Single-track label | Structural result |
|---|---|---:|---:|---:|---|---|
| A | Holder novel state machine | `raw/generator-a.md` | 4 | 17 | `single-track` | Pass |
| B | Participant economics | `raw/generator-b.md` | 4 | 17 | `single-track contract` | Pass with label normalization note |
| C | Acquisition + DeFi + exit | `raw/generator-c.md` | 4 | 17 | `single-track` | Pass |
| D | Non-crypto mechanism adaptation | `raw/generator-d.md` | 4 | 17 | `single-track` | Pass |
| E | Collateral/challenger economics | `raw/generator-e.md` | 4 | 17 | `single-track contract` | Pass with label normalization note |

## Required field set

Each file contains four occurrences of every required semantic field: Name, Problem, Market Anchor, Named Buyer, Existing Workflow, Current Substitute, Mechanism, Chain-Native Angle, Sponsor Fit, Demo Hook, Competitor-Derived Insight, Missing Outcome, Multi-Track Architecture, Per-Track Load-Bearing Test, Proof Path, Authority and Integration Map, and Adaptation Note.

Generators B and E spell the thirteenth label `Multi-Track Architecture (single-track contract)` rather than `Multi-Track Architecture (single-track)`. This does not change the 17-field structure, but normalize the parenthetical before strict machine ingestion if exact label equality is required.

## Verdict

**PASS — structurally isolated round.** Five generator files are present, lenses are separately assigned, every generator supplies exactly four candidates with the complete 17-field schema, and every architecture field declares a single-track contract. Source-use compliance is bounded to the declared isolation protocol; this audit intentionally makes no prose-level novelty or collision judgment.
