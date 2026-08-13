# haircut

FTSO publishes the price. haircut publishes whether that price is reachable.

Live: https://haircut.ochinimus.app

## What it measures

FAssets is an over-collateralised bridge. Agents post collateral, FXRP is minted against it, and every collateral ratio you can read on chain is computed at the oracle price. That price is correct. The question nobody answers is a different one: if the collateral actually had to be sold, what would it fetch?

Flare's own OpenZeppelin audit says liquidation is not guaranteed to be profitable and that liquidators must independently assess whether a liquidation is in their interest. The data needed for that assessment has never been published. This publishes it, every five minutes, dated.

## What it found on 5 August 2026

Marked collateral 11.1 million dollars, split 48 percent FLR pool collateral and 52 percent USDT0 vault collateral, against 1.9 million dollars of FXRP. Marked collateral ratio 588 percent.

Price the pool leg at what SparkDEX would actually pay and it recovers 0.09 percent of its marked value. Agents whose pool collateral ratio reads between 209 and 650 percent land between 0.20 and 0.61 percent once repriced, against a 150 percent minimum.

This is not a solvency warning and the tool refuses to be read as one. The vault leg is a stablecoin and covers the liability more than three times over on its own. The Core Vault holds 7.4 million XRP available against 1.77 million FXRP outstanding, and every agent's underlying backing is at or above 100 percent. FXRP holders redeem to XRP on the XRPL and are fine.

The exposed party is the collateral pool providers. They hold 48 percent of system collateral in an asset that recovers 0.09 percent of its marked value if it ever has to be sold.

## Evidence, not output

Every fact carries one of three states.

Measured means we asked and got a real answer. Absent means we asked and the world genuinely has none. Unmeasured means our own lookup broke, and it never becomes data. Unmeasured is contagious: any figure derived from an unmeasured input is itself unmeasured, never a number.

This exists because the project it grew out of found eight bugs of one family across seven live collectors. A rate limit recorded as "no exit exists". A health check reporting healthy on a database it could not read. A division by null that came out as zero and read as "no shortfall". None of them threw. Every one produced a number.

## Two depth figures, and they are not the same claim

The hard ceiling is the output token balance held by the pool. You cannot take more out than is in it. No assumptions.

The constant liquidity figure is the exact swap output if liquidity does not change as price moves. In a shallow pool it does change, so this is optimistic and is labelled that way in every response.

Neither is a quote. A quote needs a quoter contract, and SparkDEX has not published one that this project could find.

## Endpoints

    GET /            what this is and who it is for
    GET /health      liveness and tape freshness, 503 when stale
    GET /latest      the most recent reading
    GET /history     the tape, ?hours=24
    GET /agents      per agent, marked and repriced collateral ratios

Every payload carries asOf, ageSeconds and a stale flag. A number served without its age is a number pretending to be current.

## Run it

    npm i
    npm test
    node collect.mjs
    node collect.mjs --db haircut.db
    HAIRCUT_DB=./haircut.db PORT=3013 node start.mjs

Read only. No keys, no writes to any chain, no funds.

## How it uses Flare

FlareContractsRegistry resolves AssetManagerFXRP, FtsoV2 and WNat, so no address is hardcoded. AssetManager supplies agent enumeration, per agent collateral and liquidation payment factors, the collateral type thresholds, the redemption queue and the Core Vault manager. FtsoV2 supplies the marked prices, read with staticCall because getFeedsById is declared payable. SparkDEX supplies the realisable side, discovered through the router's own factory rather than a hardcoded address.

## On chain

    Flare mainnet, chain 14
    HaircutRegistry  0xFc581C88045608A1E6fb1C171cE1999AF039f212
    deploy tx        0x02215a9bc6cb1551d320926fd5c5b86b4cd32983880220ae17d0e067f8002f18

The registry is append only. Nothing can be edited or deleted, including by the owner, and readings must move forward in time so history cannot be back filled. A reading that turns out to be wrong stays, and is corrected by a later reading rather than by rewriting the record.

The design point is publishUnmeasured. The contract stores a refusal as a first class reading. An oracle that can only write numbers will eventually write one it does not have, and a gap in the record is otherwise indistinguishable from a period when nobody looked. latestMeasured returns the newest real figure together with how many refusals sit above it, so a consumer sees the silence as well as the number.

The five minute tape lives off chain and is served by the API. The registry takes a daily attestation. Proving the mechanism does not need a chain write every five minutes, and a write costs about 0.138 FLR at current mainnet gas.

## Built during Flare Summer Signal

What existed before. A measurement engine from two Solana collectors, overhang and markgap, which price lending collateral against what it could actually be sold for. The evidence algebra from abstain, a pre flight execution guard for onchain agents. Both are prior work and neither touched Flare.

What is new. Everything in this repository. The FAssets decode, the collateral type and threshold reads, the Core Vault and underlying backing reads, the FTSO integration, the SparkDEX pool discovery and depth measurement, the Uniswap V3 arithmetic, the liquidator economics including the break even recovery fraction, the HTTP API, and 40 tests that run with no network.

What was ported. The idea that collateral has two prices and only one of them is published, and the discipline that a failed lookup is never a finding. The code is new.

Why it matters here. Flare's collateral design puts roughly half of FAssets backing in the native token, and the native token's exit depth is a fraction of what the marked value assumes. That gap is measurable, nobody was measuring it, and the audit already told liquidators they would have to work it out themselves.

## Licence

MIT.
