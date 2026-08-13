# Chain Guarantee Smart Contract Suite

**Arc (EVM) Implementation | Hackathon Build v1**

---

## Deployed Contracts (Arc Testnet Chain ID 5042002)

### Core Protocol
| Contract | Address |
|---|---|
| CGRegistry (ZK-gated) | `0xC7f8DF7E7ad7Db34E2f6BF12a0dD6Ac337e40F63` |
| ChainGuarantee | `0x3f9356Aa3dF05d349B7B38D8cA8770621B902A0D` |
| RevolvingCredit | `0x5b295C759affd51Df1620988944c9007292b97d3` |

### Maat ZK Compliance Layer
| Contract | Address |
|---|---|
| RiscZeroGroth16Verifier | `0xfF845211d38d30f8411ae4e245f68f8feC8f64b8` |
| MaatVerifier | `0x4b13677EDF4131925ad7545F271319A6c08c2c36` |

Explorer: https://testnet.arcscan.app

---

## What is the Maat ZK Compliance Layer

SME approval traditionally requires admin discretion, a human checks the DUNS number off-chain and approves manually. Trust the admin.

With Maat, SME approval is ZK-gated: a cryptographic proof that the SME's DUNS is unique and has never been registered before, without revealing the underlying data to anyone.

**Two approval paths in CGRegistry:**
- `approveSME()` — legacy admin path
- `approveSMEWithProof()` — ZK-gated path via Maat Rule 1 uniqueness proof

ChainGuarantee is the first protocol on Arc with ZK-gated compliance. RISC Zero's Groth16 verifier was deployed on Arc testnet specifically for this integration.

---

## Contracts

| Contract | File | Purpose |
|---|---|---|
| CGRegistry | `contracts/CGRegistry.sol` | Verifier whitelist + ZK-gated SME registry |
| ChainGuarantee | `contracts/ChainGuarantee.sol` | CG NFT (ERC-721), 2-of-2 multisig |
| RevolvingCredit | `contracts/RevolvingCredit.sol` | USDC RC facility, draw/repay/default |
| MaatVerifier | `contracts/MaatVerifier.sol` | ZK proof verifier, wraps RISC Zero Groth16 |

**Deploy order: CGRegistry → ChainGuarantee → RevolvingCredit → wire RC into CG → set MaatVerifier**

---

## Protocol Constants (hardcoded, immutable)

| Parameter | Value |
|---|---|
| LTV | 80% |
| Protocol fee | 0.5% of credit limit |
| USDC address (Arc testnet) | `0x3600000000000000000000000000000000000000` |
| Interest accrual | Per block (BLOCKS_PER_YEAR = 31,536,000) |
| Treasury | `0xB0786281E5C6c6a0Df4d124dAa91a835FC15052C` |

---

## Setup

### Prerequisites

- [Foundry](https://book.getfoundry.sh/getting-started/installation) installed
- Arc testnet RPC access
- Deployer wallet funded with Arc testnet USDC (for gas)

### Install Foundry dependencies

```bash
forge install foundry-rs/forge-std
```

### Set environment variable

```bash
export PRIVATE_KEY=your_private_key_here
```

### Deploy (all 3 contracts + wiring in one command)

```bash
forge script Script/Deploy.s.sol \
  --rpc-url https://rpc.testnet.arc.io \
  --broadcast \
  --private-key $PRIVATE_KEY
```

---

## Post-Deployment Steps (Admin)

### 1. Add a verifier

```bash
cast send 0xC7f8DF7E7ad7Db34E2f6BF12a0dD6Ac337e40F63 \
  "addVerifier(address,string)" \
  <verifier_wallet> "ABC Law Firm" \
  --rpc-url https://rpc.testnet.arc.io \
  --private-key $PRIVATE_KEY
```

### 2. Set MaatVerifier (ZK compliance layer)

```bash
cast send 0xC7f8DF7E7ad7Db34E2f6BF12a0dD6Ac337e40F63 \
  "setMaatVerifier(address)" \
  0x4b13677EDF4131925ad7545F271319A6c08c2c36 \
  --rpc-url https://rpc.testnet.arc.io \
  --private-key $PRIVATE_KEY
```

### 3. Approve an SME — legacy path

```bash
# SME self-registers first:
cast send 0xC7f8DF7E7ad7Db34E2f6BF12a0dD6Ac337e40F63 \
  "registerSME(string)" "123456789" \
  --rpc-url https://rpc.testnet.arc.io \
  --private-key $PRIVATE_KEY

# Admin approves:
cast send 0xC7f8DF7E7ad7Db34E2f6BF12a0dD6Ac337e40F63 \
  "approveSME(address)" <sme_wallet> \
  --rpc-url https://rpc.testnet.arc.io \
  --private-key $PRIVATE_KEY
```

### 4. Approve an SME — ZK-gated path (Maat)

```bash
cast send 0xC7f8DF7E7ad7Db34E2f6BF12a0dD6Ac337e40F63 \
  "approveSMEWithProof(address,bytes,bytes32,bytes32)" \
  <sme_wallet> \
  <zk_seal_bytes> \
  <journal_digest> \
  <duns_hash> \
  --rpc-url https://rpc.testnet.arc.io \
  --private-key $PRIVATE_KEY
```

---

## Full Protocol Flow (with cast commands)

### Step 1 — SME mints a CG NFT

```bash
cast send 0x3f9356Aa3dF05d349B7B38D8cA8770621B902A0D \
  "mint(address,uint256,uint256,string,string,bytes32)" \
  <verifier_wallet> \
  1000000000000 \
  1783000000 \
  "123456789" \
  "India" \
  0x0000000000000000000000000000000000000000000000000000000000000001 \
  --rpc-url https://rpc.testnet.arc.io \
  --private-key $PRIVATE_KEY
```

### Step 2 — SME signs

```bash
cast send 0x3f9356Aa3dF05d349B7B38D8cA8770621B902A0D \
  "signAsSME(uint256)" 1 \
  --rpc-url https://rpc.testnet.arc.io \
  --private-key $PRIVATE_KEY
```

### Step 3 — Verifier signs (CG activates on this call)

```bash
cast send 0x3f9356Aa3dF05d349B7B38D8cA8770621B902A0D \
  "signAsVerifier(uint256)" 1 \
  --rpc-url https://rpc.testnet.arc.io \
  --private-key $PRIVATE_KEY
# CG status is now ACTIVE
```

### Step 4 — Lender approves USDC + opens RC facility

```bash
cast send 0x3600000000000000000000000000000000000000 \
  "approve(address,uint256)" \
  0x5b295C759affd51Df1620988944c9007292b97d3 800000000000 \
  --rpc-url https://rpc.testnet.arc.io \
  --private-key $PRIVATE_KEY

cast send 0x5b295C759affd51Df1620988944c9007292b97d3 \
  "openFacility(uint256,uint256,uint256)" 1 1000 604800 \
  --rpc-url https://rpc.testnet.arc.io \
  --private-key $PRIVATE_KEY
```

### Step 5 — SME draws USDC

```bash
cast send 0x5b295C759affd51Df1620988944c9007292b97d3 \
  "draw(uint256,uint256)" 1 200000000000 \
  --rpc-url https://rpc.testnet.arc.io \
  --private-key $PRIVATE_KEY
```

### Step 6 — SME repays

```bash
cast send 0x3600000000000000000000000000000000000000 \
  "approve(address,uint256)" \
  0x5b295C759affd51Df1620988944c9007292b97d3 202000000000 \
  --rpc-url https://rpc.testnet.arc.io \
  --private-key $PRIVATE_KEY

cast send 0x5b295C759affd51Df1620988944c9007292b97d3 \
  "repay(uint256,uint256)" 1 202000000000 \
  --rpc-url https://rpc.testnet.arc.io \
  --private-key $PRIVATE_KEY
```

### Step 7 — Close facility

```bash
cast send 0x5b295C759affd51Df1620988944c9007292b97d3 \
  "closeFacility(uint256)" 1 \
  --rpc-url https://rpc.testnet.arc.io \
  --private-key $PRIVATE_KEY
# CG NFT returned to SME. USDC returned to lender.
```

---

## Default Scenario

```bash
cast send 0x5b295C759affd51Df1620988944c9007292b97d3 \
  "triggerDefault(uint256)" 1 \
  --rpc-url https://rpc.testnet.arc.io \
  --private-key $PRIVATE_KEY
# CG NFT transferred to lender. Lender redeems off-chain against BG issuer.
```

---

## Key View Calls

```bash
# Total owed (principal + interest)
cast call 0x5b295C759affd51Df1620988944c9007292b97d3 \
  "totalOwed(uint256)" 1 \
  --rpc-url https://rpc.testnet.arc.io

# Available credit remaining
cast call 0x5b295C759affd51Df1620988944c9007292b97d3 \
  "availableCredit(uint256)" 1 \
  --rpc-url https://rpc.testnet.arc.io

# Is facility defaultable right now?
cast call 0x5b295C759affd51Df1620988944c9007292b97d3 \
  "isDefaultable(uint256)" 1 \
  --rpc-url https://rpc.testnet.arc.io

# Full CG data
cast call 0x3f9356Aa3dF05d349B7B38D8cA8770621B902A0D \
  "getGuarantee(uint256)" 1 \
  --rpc-url https://rpc.testnet.arc.io

# Is SME ZK verified?
cast call 0xC7f8DF7E7ad7Db34E2f6BF12a0dD6Ac337e40F63 \
  "isSMEZKVerified(address)" <sme_wallet> \
  --rpc-url https://rpc.testnet.arc.io
```

---

## Security Notes (Mainnet Pre-requisites)

Before Arc mainnet deployment:

- Add `ReentrancyGuard` (OpenZeppelin) to `draw`, `repay`, `triggerDefault`, `closeFacility`
- Replace raw `IERC20` calls with `SafeERC20`
- Replace deployer address as admin with Nth Moment multi-sig
- Complete RUYI microdot audit on all three contracts
- Set `TREASURY` in Deploy.s.sol to actual Nth Moment treasury multi-sig

---

## Repository Structure
