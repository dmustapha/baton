# smart-accounts-cli — Real Interface (pinned by build Task 0.1)

**Repo:** https://github.com/flare-foundation/smart-accounts-cli
**Pinned commit:** `c8809b94bcda3d0855ca762707f54483a9181e9d`
**Location:** `../smart-accounts-cli` (sibling of the app root)
**Entry:** `./smart_accounts.py` (NOT `-m smart_accounts_cli` — the ARCHITECTURE §6 assumption was wrong → DEV-001)
**Python:** must be the repo venv `../smart-accounts-cli/venv/bin/python` (Python 3.12; system python3.14 has no wheels for web3 7.14). Deps: `requirements.txt` (web3 7.14.0, xrpl-py 4.3.1, py-flare-common 0.1.10, python-dotenv).
**CLI env:** `../smart-accounts-cli/.env` needs `XRPL_SECRET`, `FLR_PRIVATE_KEY`, `FLR_RPC_URL`, `XRPL_RPC_URL` (all four required at boot via `os.environ`). `FLR_PRIVATE_KEY` is only *used* for signing in `custom register` / `bridge mint-tx` — a dummy non-zero key works for `encode` + `bridge instruction`.

## Commands (authoritative `--help`)

### encode  (prints `0x<hex>` instruction to stdout)
- `encode fxrp-cr -w <wallet-id> -v <lots> -a <agent-vault-id>` — mint FAssets (collateral reservation). INSTRUCTION_ID 0x00.
- `encode fxrp-transfer -w <wallet-id> -v <drops> -r <evm-recipient>` — transfer FXRP from PersonalAccount. 0x01.
- `encode fxrp-redeem`, `encode firelight-cr-deposit`, `encode firelight-deposit`, `encode firelight-redeem`, `encode firelight-claim-withdraw`, `encode upshift-cr-deposit`, `encode upshift-deposit`, `encode upshift-request-redeem`, `encode upshift-claim`
- `encode custom-instruction -w <wallet-id> -c <call-hash>` — reference a REGISTERED custom Call[] by its hash.

> NOTE: `-w/--wallet-id` is required by argparse but the handler OVERRIDES it with the chain's real `wallet_id` (Coston2 → **248**). Pass any int; 248 is canonical.

### bridge  (sends real XRPL Payment; prints XRPL tx hash to stdout, log to stderr)
- `bridge instruction <hex | ->` — send the instruction as an XRPL memo Payment to the provider wallet. Amount = `getInstructionFee(id)` (+ 2× CR-fee for CR-type instructions). This is the ONLY user-signature step.
- `bridge mint-tx [-w] <xrpl_hash | ->` — after a CR instruction, send the underlying mint Payment. `-w` waits (12×5s) for the operator's `CollateralReserved` event first.

### custom
- `custom register '<calls-json> | -'` — register an atomic `Call[]` on-chain (Flare tx signed by `FLR_PRIVATE_KEY`), prints the call-hash hex. `Call[]` JSON = `list[dict]` matching the contract `Call` struct (target/value/data). Idempotent (already-registered swallowed).

### decode
- `decode instruction <hex | ->` — decode an instruction hex back to fields.

## The atomic multi-vault flow (Phase 2)
ARCHITECTURE §6 assumed one-shot `encode custom-instruction --calls <json>`. **Reality (DEV-002):** two steps —
1. `custom register '<calls-json>'` → prints `<call-hash>` (backend infra Flare tx; NOT the user path).
2. `encode custom-instruction -w 248 -c <call-hash>` → instruction hex.
3. `bridge instruction -` → the single XRPL user signature.

## Live-chain facts (Coston2 chainId 114, pinned by probe)
- wallet_id: **248** · MasterAccountController `0x434936d47503353f06750Db1A444DBDC5F0AD37c`
- provider XRPL wallet: `rEyj8nsHLdgt79KJWzXR5BgF7ZbaohbXwq` · executor fee 1e11 · instruction fee 1000 drops
- agent vault: id **1** → `0x55c815260cBE6c45Fe5bFe5FF32E3C7D746f14dC` (real FXRP direct-mint available)
- vaults: id 4 `0xD913…` (Upshift, Vault A) · id 1 `0xC90D…` (Firelight, Vault B) · id 2 `0x9E63…` · id 3 `0x4066…` (Upshift)
- lot size 10,000,000 UBA · assetMintingDecimals 6 → **1 lot = 10 testXRP** · CR fee(1 lot) ≈ 1.68 FLR ≈ 10,007 drops · asset symbol `testXRP` · not emergency-paused
- demo PersonalAccount (for `rwLtfA6c…`): `0x27fBb63780AB83aE7CEcd69291AAbb0A769071f7`

## PINNED CHAIN-FACTS (build Task 0.1/1 probes — reconcile ARCHITECTURE against these)
- **Registry** (`getContractAddressByName`): `FtsoV2`=`0xC4e9c78EA53db782E28f28Fdf80BaF59336B304d`, `AssetManagerFXRP`=`0xc1Ca88b937d0b528842F95d5731ffB586f4fbDFA`, `MasterAccountController`=`0x434936d47503353f06750Db1A444DBDC5F0AD37c`. **There is NO `FXRP` name** (DEV-003).
- **FXRP token** = `AssetManagerFXRP.fAsset()` → `0x0b6A3645c240605887a5532109323A3E12273dc7`, `decimals()` = **6**.
- **FTSO getter (DEV-004):** use **`getFeedById(bytes21 feedId)`** — it returns `(uint256 value,int8 decimals,uint64 ts)` via `eth_call` (works read-only). ARCHITECTURE §9's `getFeedByIdView` **REVERTS ("no data")** — do NOT use it. XRP/USD feed id `0x015852502f55534400000000000000000000000000`.
- **PersonalAccount getter:** `MasterAccountController.getPersonalAccount(string xrplAddress)` → the PersonalAccount EVM address (demo `rwLtfA6c…` → `0x27fBb63780AB83aE7CEcd69291AAbb0A769071f7`). Not `getAccountAddress`.
- **Vaults expose ERC-4626-ish**; confirm exact `deposit` signature per vault in Phase 2 via the CLI's `clients/flare/upshift.py` + `firelight.py` (authoritative) before encoding deposit legs.
