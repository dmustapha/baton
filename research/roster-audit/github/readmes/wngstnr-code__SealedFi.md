# SealedFi

> Sealed strategies. On-chain guardrails.

SealedFi is a Coston2 asset-management prototype where a strategist encrypts a
rule-based FXRP strategy for a Flare Compute Extension, followers receive vault
shares, and the vault contract enforces public risk limits on every signed
trade.

**Demo video:**
[SealedFi — confidential strategy on Flare, guardrails on-chain](https://youtu.be/dqRv75noWgo)

**Submission status:** Deployed and running on Coston2. The app is at
`https://app.sealedfi.xyz`, the landing page at `https://sealedfi.xyz`, and the
enclave answers at `https://tee.sealedfi.xyz`. Contracts are source-verified,
the Golden Flow has executed a real trade, and the repository is public.

One follower deposit exists from an address that is not the strategist. The
internal two-person pilot has still not been run, and neither the deposit nor
anything else here may be presented as traction.

## Who it is for

- A strategist who wants to run low-frequency FXRP rules on-chain without
  publishing the plaintext rule tree, periods, and thresholds.
- An FXRP holder who wants vault accounting and risk limits enforced by a
  contract instead of relying only on the strategist's promise.

These are target users, not evidence that the project has external users.
The only planned usability evidence is an internal two-person pilot with the
project owner and one friend.

## What it does

1. A strategist defines immutable vault guardrails and a `rule/v2` strategy.
2. The browser encrypts the strategy to the active machine key registered in
   Flare's TEE manager.
3. A public, unprivileged keeper requests evaluation. It cannot choose the
   signal, create an order, or withdraw vault assets.
4. The FCE reads FTSO prices and vault state, derives EMA or momentum signals,
   and signs an order only when the sealed rule matches.
5. Anyone may relay that order. `SealedVault` independently checks the machine
   signature, replay protection, halt state, asset pair, order size, cooldown,
   and FTSO-referenced slippage before executing.
6. Followers can inspect balances, guardrails, seal evidence, trades, and
   coarse indicator readiness without receiving the plaintext strategy.

## What remains public

SealedFi seals the strategy rules, not execution. The instruction identifier,
encrypted blob, pending signed order, and completed trade can be public. The
current proxy result endpoint is not authenticated, so a pending order can be
read before relay during its validity window. The slippage guard limits the
deviation accepted by the contract, but it is not a private relay and does not
eliminate front-running or a strategist's privileged knowledge.

Read the full [public-order and slippage disclosure](docs/disclosures/public-order-slippage.md).

## Flare integration

| Flare primitive | Structural role |
|---|---|
| Flare Confidential Compute and FCE | Decrypts and evaluates the strategy, then signs with the registered machine key. |
| FTSO | Supplies strategy input, vault valuation, and the contract's slippage reference. |
| FAssets, represented by FXRP on Coston2 | Provides the vault's base asset and the XRPFi use case. |

FDC deposit from XRPL is roadmap work and is not part of the hackathon build.

## Judge's Tour

Each row names the exact symbol to inspect, not just a file.

| Claim to inspect | Source |
|---|---|
| Machine-signed trade and layered contract gates | [`SealedVault.executeTrade`](contracts/src/SealedVault.sol) |
| Replay protection, machine identity, halt behavior, order size, and cooldown | `_validateOrder` and related helpers in [`SealedVault.sol`](contracts/src/SealedVault.sol) |
| FTSO-referenced price deviation | `_checkSlippage` in [`SealedVault.sol`](contracts/src/SealedVault.sol) |
| Guardrails freeze after first deposit | `everDeposited`, `guardrailsFrozen`, and `setGuardrail` in [`SealedVault.sol`](contracts/src/SealedVault.sol) |
| Proportional strategist co-investment | `MIN_STRATEGIST_BPS` and `_update` in [`SealedVault.sol`](contracts/src/SealedVault.sol) |
| High-water-mark performance fee | `_collectPerformanceFee` in [`SealedVault.sol`](contracts/src/SealedVault.sol) |
| Halt status and in-kind emergency exit | `haltStatus`, `emergencyExitAvailable`, and `emergencyRedeem` in [`SealedVault.sol`](contracts/src/SealedVault.sol) |
| Visible strategy recovery after key rotation | `resealStrategy` and `StrategyResealed` in [`SealedVault.sol`](contracts/src/SealedVault.sol) |
| Public trigger, sealed decision | [`keeper/internal/loop/loop.go`](keeper/internal/loop/loop.go) |
| Wire format and privacy boundary | [`PROTOCOL.md`](PROTOCOL.md) |
| `rule/v2`, cooldown, EMA, momentum, and readiness | [`extension/go/internal/extension/runtime`](extension/go/internal/extension/runtime) |
| Observation-backed inference estimate | [`extension/go/internal/inference`](extension/go/internal/inference) |
| Upstream versus project work | [`extension/FORK.md`](extension/FORK.md) |

## Golden Flow

The judge flow, all of it already executed on this deployment:

1. Create a Coston2 vault with reviewed guardrails.
2. Have the strategist supply the required proportional co-investment.
3. Encrypt and seal a `rule/v2` EMA or momentum strategy.
4. Deposit testnet FXRP as a follower.
5. Request evaluation through the public keeper.
6. Relay a machine-signed order and show the vault's contract checks.
7. Open Check the Seal and compare on-chain machine facts, readiness, and the
   independent inference report.
8. Show the liquid withdrawal path and explain that any non-liquid remainder
   waits for the strategy or a qualifying emergency path.

### Permanent evidence

- Demo vault: `0xf94f1D951600DBEdC1dc606fbEF4426C6c84d776`
- Seal transaction: `0x7916c264f62730be7a48fcb6d7215e60a324e14be9f44f6568fcbd906871545c`
- Strategist co-investment deposit: `0xd23eff1090f34cc0f712ca94a6f12c0973536e47b061086366aec5623a78e63c`
- Machine-signed trade: `0xad9cd09f2348d59a7dfa1df024bad5a0e3ddac385188afd81c934111657459b6`
- Follower deposit: `0xB9c2ed926A20Ceaf187202E2566050D82808259d` holds 2.0 FXRP
  of shares in the EMA vault — an address that is not the strategist, the
  keeper, or the proxy wallet.
- **Indicator-driven trade (EMA crossover):**
  `0x8206672431e7512357638210a5b12339d4e11f978df9b6160d9e924046f12296`
  Vault `0x02C40E712D3A2017EF2d084944bCE82a4Efc2287`, sealed with
  `ema(60s) crossesAbove ema(300s)`. It did not fire on 32 consecutive pokes
  and fired on the 33rd, when XRP/USD actually turned — which is the point.
  A threshold rule cannot produce that behaviour.
- **Follower withdrawal, executed:**
  `0xfb576f2ceb4a267fee617911a6f34759ff4e358ff9b1f1b0c26ca5eaa5b43abf`
  Address `0xb8FE5D450a2fBd9075BEfC727E898ccd3a2783AE`, who is not the
  strategist, withdrew 0.02 FXRP from vault
  `0xb13F207f7874dc3476Db10F7209593E7B5f73986`. That vault has two holders, so
  the withdrawal also shows the co-investment floor behaving as documented: the
  strategist's share rose from 28.57% to 40% because the floor is a ratio of a
  shrinking supply, not a fixed amount. A follower leaving can never make the
  strategist's invariant fail.
- Extension ID `65973`; registered machine `0xd72EB92bda92684C31d62d50a6e1601E58365A08`, status `2` and the only active one.
- Reproducible binary `9910c64285df8f0ad120c99d4e8b4cb65d68aca2ba2e52df3e89e8830f5f1fcc`.

No transaction hash or address should be copied from an older deployment and
presented as proof of this deployment.

## Try it on Coston2

The judge path is designed to take about five minutes:

1. Add Flare Coston2 to an EVM wallet.
2. Obtain testnet C2FLR and FXRP from the Flare faucet.
3. Open the app and browse the demo vault without connecting a wallet.
4. Open Check the Seal and review its on-chain and live evidence independently.
5. Connect only at the deposit action and use a small testnet amount.
6. Review the resulting share position and activity.

App: `https://app.sealedfi.xyz`. Vault:
`https://app.sealedfi.xyz/vaults/0xf94f1D951600DBEdC1dc606fbEF4426C6c84d776`.
Faucet: `faucet.flare.network`.

**Five minutes is a target, not a measured claim** — nobody has timed a stranger
walking this path. Replace it with a measured number after the internal pilot,
or drop the figure.

## Verification boundaries

- `SIMULATED_TEE` is sufficient for local and testnet integration work, but
  its reported `codeHash` is constant and does not identify the project
  binary. It must not be presented as proof of the code that ran.
- A reproducible Go binary hash identifies build content. It does not by
  itself prove that a remote machine is running that binary.
- The enclave signs its own measured binary hash with the registered TEE
  machine key. This is a claim bound to an on-chain identity, not a
  measurement: a modified binary could report any hash. Only hardware
  measurement closes that step, and we are not running on it.
- The Layer C analyzer returns the exact count of configurations consistent
  with a declared public trace and finite grid. It is not a probability,
  cryptographic proof, or proof that the actual sealed strategy belongs to
  that grid.
- Indicator readiness is independent from the Seal intact or Seal broken
  verdict.
- The encrypted strategy is stored on-chain for hackathon recovery. Private
  off-chain delivery is required before production use.

## Economic and exit boundaries

- The strategist must retain at least 10% of total vault shares under the
  current contract code. This is proportional co-investment. It is not a
  junior tranche, first-loss protection, or a promise that the strategist
  exits last.
- The contract blocks a direct strategist withdrawal of follower escrow. It
  does not eliminate market-level conflicts or prove the strategist cannot
  extract value around a known future trade.
- A follower can directly withdraw the currently liquid FXRP portion. Any
  remainder held in the quote asset waits for strategy-driven unwind or a
  qualifying emergency path.
- NAV, returns, alpha, and profit are never guaranteed.

## Built during the program

The contracts, keeper, frontend, and SealedFi wire protocol were written for
this project. The extension started from Flare's `fce-sign` baseline. SealedFi
kept the upstream HTTP server, deployment scripts, and reproducible Dockerfile,
then replaced the key-manager behavior with per-vault strategy routing,
FTSO-backed evaluation, machine-signed trade orders, rule runtimes, strategy
recovery, readiness reporting, and deterministic inference analysis.

See [`extension/FORK.md`](extension/FORK.md) for the file-level boundary.

## Local verification

Run each component independently. These commands do not deploy or transact.

```sh
cd contracts
forge build
forge test

cd ../extension/go
go test ./...

cd ../../keeper
go test ./...

cd ../frontend
npm ci
npm test
npm run lint
npm run build
```

Some contract fork tests require a Coston2 RPC and funded testnet state. A
skipped network-dependent test must be reported as skipped, not counted as
passing evidence.

### Verify the enclave binary

Two independent checks, answering two different questions. Neither requires
trusting us for the first one; the second one does, and says so.

**Did this binary come from this source?** The build is reproducible, confirmed
across two host architectures and two different build epochs — all three builds
produced `9910c642…`. You do not need to match our epoch.

```sh
cd extension
docker build --platform linux/amd64 --no-cache -f Dockerfile -t sealedfi-check .
container=$(docker create sealedfi-check)
docker cp "$container:/app/extension-tee" ./extension-tee
docker rm "$container"
sha256sum ./extension-tee
```

Or skip the rebuild and check GitHub's Sigstore attestation, which binds the
artifact to repository, workflow, and commit. This also works on a binary you
built yourself:

```sh
gh attestation verify extension-tee --repo wngstnr-code/SealedFi
```

Image digests are deliberately not part of this claim: two builds of identical
source yield different image IDs, because container metadata is not
deterministic even when the binary is.

**Is that binary the one running?** The enclave signs its own measured hash with
the on-chain-registered TEE machine key:

```sh
./scripts/verify-binary-attestation.sh
```

This confirms the holder of the registered key **stated** which binary it runs,
and that the signature matches the machine address read live from chain. It does
not confirm the statement is true — a modified binary can report any hash. Full
reasoning and the trust diagram: `docs/disclosures/binary-provenance.md`.

## Current status

| Item | Status |
|---|---|
| Local contracts and tests | Implemented and locally verified by the project workflow |
| A8 strategy runtime and analyzer | Implemented and locally verified by the project workflow |
| Frontend Create and Check the Seal surfaces | Implemented and locally verified by the project workflow |
| Coston2 deployment | Live; all contracts source-verified |
| Public demo | `https://app.sealedfi.xyz`, landing at `https://sealedfi.xyz` |
| Enclave | `https://tee.sealedfi.xyz`, machine registered and PRODUCTION |
| Golden Flow | Executed, transaction linked above |
| Indicator-driven trade | Executed after the EMA pair actually crossed |
| Follower deposit | One, from an address that is not the strategist |
| Withdrawal path | Exercised by a follower, transaction linked above |
| Internal pilot, n=2 | Planned, not yet run |
| Demo video | Published, 2:54, linked at the top |
| Production or mainnet readiness | Not claimed |

## Roadmap

1. Run the internal two-person pilot.
2. Move strategy delivery off-chain, harden key rotation and failure recovery,
   and commission smart-contract and TEE-flow reviews.
3. Expand testnet strategist participation before considering any mainnet
   deployment.
4. Follow FCC availability toward Songbird and Flare mainnet only after the
   required audits and operational controls exist.

## Links

- App: `https://app.sealedfi.xyz`
- Landing: `https://sealedfi.xyz`
- Enclave: `https://tee.sealedfi.xyz` — `/info`, `/state`, `/state?attest=1`
- Explorer: search any address above on
  `https://coston2-explorer.flare.network`
- Demo video: https://youtu.be/dqRv75noWgo
- Team: wngstnr-code and scientivan

SealedFi is a hackathon prototype on testnet. It has not been audited and is
not offered for production funds.
