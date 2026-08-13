<div align="center">

<img src="docs/media/1.png" alt="Hadal — Send money privately on Ethereum" width="100%" />

&nbsp;

[![Live demo](https://img.shields.io/badge/●_live-veil--two--zeta.vercel.app-34d399)](https://hadal-money.vercel.app)
[![Sepolia: MockUSDC](https://img.shields.io/badge/📜_Sepolia-MockUSDC-14151a)](https://sepolia.etherscan.io/address/0x13847e79b58ac2573d9d394e9a89d6c7d27487b1)
[![Sepolia: cUSDC](https://img.shields.io/badge/📜_Sepolia-cUSDC-14151a)](https://sepolia.etherscan.io/address/0xe1bcd1443cf13ceaa60aeec03bb8c80e7a142e7e)
[![License: MIT](https://img.shields.io/badge/license-MIT-34d399.svg)](LICENSE)
![Tests](https://img.shields.io/badge/tests-12%20passing-3fb950)
![Stack](https://img.shields.io/badge/Next.js%2016%20·%20React%2019%20·%20TypeScript-1f1f23)
![Nox](https://img.shields.io/badge/iExec%20Nox-TDX%20TEE-a8d946)
![Sepolia](https://img.shields.io/badge/Sepolia-testnet-34d399)

### Send money privately on Ethereum. Standard wallet. Encrypted amounts.

Hadal wraps USDC into confidential cUSDC using iExec Nox. Every transfer amount is encrypted inside an Intel TDX secure enclave — the chain sees a 32-byte handle, never the value. No special wallet. No ZK proofs. No new software. Just privacy that works, enforced by hardware.

### ▶ Live now — confidential transfers at **[hadal-money.vercel.app](https://hadal-money.vercel.app)**

**[ Live demo ↗ ](https://hadal-money.vercel.app)** · **[ Dashboard ↗ ](https://hadal-money.vercel.app/dashboard)** · **[ MockUSDC on Etherscan ↗ ](https://sepolia.etherscan.io/address/0x13847e79b58ac2573d9d394e9a89d6c7d27487b1)** · **[ cUSDC on Etherscan ↗ ](https://sepolia.etherscan.io/address/0xe1bcd1443cf13ceaa60aeec03bb8c80e7a142e7e)** · **[ Architecture ↓ ](#architecture)** · **[ Run it locally ↓ ](#run-it-locally)**

Built for the **iExec WTF Hackathon Summer Edition**. MIT licensed.

</div>

---

## Table of contents

- [See it in one command](#-see-it-in-one-command)
- [The problem Hadal solves](#the-problem-veil-solves)
- [How Hadal works](#how-veil-works)
  - [1 · Wrap — deposit becomes a handle](#1--wrap--deposit-becomes-a-handle)
  - [2 · Send — encrypted transfer](#2--send--encrypted-transfer)
  - [3 · Decrypt — only authorized wallets read](#3--decrypt--only-authorized-wallets-read)
  - [4 · Unwrap — back to plain USDC](#4--unwrap--back-to-plain-usdc)
- [Architecture](#architecture)
  - [Transaction flow](#transaction-flow)
  - [Component by component](#component-by-component)
- [Engineering decisions](#engineering-decisions--the-hard-problems)
- [What's real vs pending — the honesty table](#whats-real-vs-pending--the-honesty-table)
- [Tests](#tests)
- [Run it locally](#run-it-locally)
- [Configuration](#configuration)
- [Deploy](#deploy)
- [Project layout](#project-layout)
- [Tech stack](#tech-stack)
- [Roadmap](#roadmap)
- [License](#license)

---

## ▶ See it in one command

Your confidential cUSDC balance on Sepolia is a 32-byte handle. Only your wallet can decrypt it via the Nox SDK:

```bash
CUSDC=0xe1bcd1443cf13ceaa60aeec03bb8c80e7a142e7e
RPC=https://ethereum-sepolia-rpc.publicnode.com
WALLET=0xEAAe2D5a1751077829f316640C087BCB2C51025B

# Read the encrypted balance — returns a handle, not a number
$ cast call $CUSDC "confidentialBalanceOf(address)(bytes32)" $WALLET --rpc-url $RPC
0x0000aa36a72301bad336d3ac894c74c2a4d0dbe86662cf0cb787f58ca9c05c58
```

Decrypt it with the Nox SDK:

```bash
$ node -e "
const { createEthersHandleClient } = require('@iexec-nox/handle');
const { Wallet, JsonRpcProvider } = require('ethers');
(async () => {
  const signer = new Wallet(process.env.PK, new JsonRpcProvider('https://ethereum-sepolia-rpc.publicnode.com'));
  const client = await createEthersHandleClient(signer);
  const { value } = await client.decrypt('0x0000aa36a72301bad336d3ac894c74c2a4d0dbe86662cf0cb787f58ca9c05c58');
  console.log('Balance:', (Number(value)/1e6).toFixed(2), 'cUSDC');
})();
"
Balance: 100.00 cUSDC
```

Every call is real, verifiable on Sepolia right now. The handle at [0x0000aa36...](https://sepolia.etherscan.io/address/0xe1bcd1443cf13ceaa60aeec03bb8c80e7a142e7e) decrypts to 100.00 cUSDC — the value lives inside the TEE, not on-chain.

---

## The problem Hadal solves

Ethereum is transparent by design. Today:

- **Every balance is public** — anyone can read your USDC balance from a block explorer
- **Every transfer amount is public** — how much you paid, when you paid it, who you paid
- **No confidentiality primitive for ERC-20s** — privacy tools require ZK wallets or anonymity layers
- **No way to compose privacy with existing DeFi** — confidential balances don't exist as a token standard
- **No hardware-enforced option** — everything relies on trusting a protocol's math or a relayer

Existing privacy tools are ZK-based. They need specialized wallets, shielded pools, and users who understand circuits. Hadal puts confidentiality **in the token itself** — ERC-7984 — enforced by an Intel TDX enclave, spendable from a standard wallet.

---

## How Hadal works

Four capabilities, all built on the ERC-7984 confidential token standard from iExec Nox. The cUSDC contract is live at [0xe1bcd1...](https://sepolia.etherscan.io/address/0xe1bcd1443cf13ceaa60aeec03bb8c80e7a142e7e).

<img src="docs/media/2.png" alt="Hadal dashboard — confidential balance, wrap, unwrap, send" width="100%" />

### 1 · Wrap — deposit becomes a handle

Approve USDC, then wrap. The ERC-7984 wrapper mints cUSDC at 1:1. Your balance is not stored as a number — it's an encrypted handle computed inside the TEE:

```solidity
function wrap(address to, uint256 amount) public virtual override returns (euint256) {
    euint256 wrappedAmount = Nox.toEuint256(amount);
    _mint(to, wrappedAmount);
    Nox.allowTransient(wrappedAmount, msg.sender);
    return wrappedAmount;
}
```

The handle is deterministic per address. The *ciphertext* it points to changes as your balance changes — only the TEE and authorized wallets can read it.

### 2 · Send — encrypted transfer

You encrypt the amount off-chain with the Nox SDK, then call `confidentialTransfer` with the handle plus an EIP-712 proof:

```solidity
function confidentialTransfer(
    address to,
    externalEuint256 encryptedAmount,
    bytes calldata inputProof
) public virtual returns (euint256) {
    return _transfer(msg.sender, to, Nox.fromExternal(encryptedAmount, inputProof));
}
```

The proof is verified on-chain by NoxCompute. The amount is re-encrypted inside the TEE runner. The chain records the transaction — but the value stays hidden.

### 3 · Decrypt — only authorized wallets read

Only the handle creator (and addresses you explicitly allow) can decrypt, via gasless EIP-712 signatures. No gas. No transaction. Just a signature:

```ts
const { value } = await client.decrypt(handle);
// → 100000000n (100.00 cUSDC)
```

### 4 · Unwrap — back to plain USDC

Unwrap is a two-transaction flow (the ERC-7984 wrapper separates the burn from the payout):

**Step 1 — burn.** Encrypt the amount, call `unwrap(from, to, encryptedAmount, inputProof)`. The cUSDC is burned and the contract emits an `UnwrapRequested` event with a contract-generated request handle:

```solidity
function unwrap(
    address from,
    address to,
    externalEuint256 encryptedAmount,
    bytes calldata inputProof
) public virtual override returns (euint256) {
    return _unwrap(from, to, Nox.fromExternal(encryptedAmount, inputProof));
}
```

**Step 2 — finalize.** Decode the `UnwrapRequested` event, wait ~45s for the TEE to make the request handle publicly decryptable, then `publicDecrypt` it and call `finalizeUnwrap(handle, decryptionProof)`:

```ts
// decode UnwrapRequested → requestHandle
const { decryptionProof } = await client.publicDecrypt(requestHandle);
await cusdc.finalizeUnwrap(requestHandle, decryptionProof); // USDC released 1:1
```

The USDC is only released in step 2 — skipping finalize leaves the request pending. The UI handles both steps automatically ("Burning cUSDC..." → "Waiting for TEE, releasing USDC...").

---

## Architecture

```
Hadal UI  ──▶  Nox SDK  ──▶  Handle Gateway  ──▶  TEE Runner
   │              │                                    │
   │              └──▶  ConfidentialUSDC ◀── NoxCompute
   │                            │
   │                            └──▶  MockUSDC
```

### Transaction flow

```bash
1. User wraps USDC        → approve + wrap on cUSDC
2. NoxCompute validates   → handle proof on-chain
3. TEE Runner picks up    → decrypts, computes, re-encrypts
4. User sends             → encrypt amount + confidentialTransfer
5. NoxCompute verifies    → EIP-712 proof
6. TEE Runner recomputes  → both balances inside enclave
7. Recipient decrypts     → gasless EIP-712 signature
8. User unwraps           → burn cUSDC (unwrap + UnwrapRequested event)
9. TEE processes request  → publicDecrypt becomes available (~45s)
10. User finalizes        → finalizeUnwrap releases USDC 1:1
```

### Component by component

| Component | Technology | Responsibility |
|---|---|---|
| Hadal UI | Next.js 16, wagmi v2 | Connect wallet, wrap/send/unwrap forms, decrypted balance display |
| Nox SDK | `@iexec-nox/handle` | `encryptInput`, `decrypt` with gasless EIP-712 |
| cUSDC | ERC-7984 wrapper (Solidity) | Wrap, unwrap, confidentialTransfer at 1:1 |
| MockUSDC | ERC-20 (Solidity) | Underlying test token with `mint` |
| NoxCompute | iExec protocol contract | Validates handle proofs, manages ACL, emits events |
| Handle Gateway | iExec off-chain service | Stores encrypted ciphertext, coordinates with KMS |
| TEE Runner | Intel TDX enclave | Decrypts operands, computes, re-encrypts — plaintext never leaves |

---

## Engineering decisions — the hard problems

**1. Unwrap is a two-transaction flow, not one.** The first version called `unwrap(from, to, uint256)` — it always reverted. The contract's callable overload takes `externalEuint256 + inputProof`, and even then unwrap only *burns* — the USDC payout happens in a second `finalizeUnwrap` call after the TEE makes the request handle publicly decryptable. The fix: encrypt → unwrap → decode `UnwrapRequested` → `publicDecrypt` → `finalizeUnwrap`. This is the #1 footgun in the ERC-7984 wrapper.

**2. The balance handle is deterministic — decrypting once is not enough.** `confidentialBalanceOf` returns the same handle per address even as the ciphertext changes. The dashboard now re-reads the handle on an interval and re-decrypts only when the handle's *ciphertext* has changed, to avoid spamming MetaMask with signature requests.

**3. TEE latency is real and must be surfaced.** Every operation takes ~45s after the transaction confirms. The UI shows "Balance updates in ~45s" instead of pretending it's instant. Users who don't see this think the tx failed.

**4. Mock USDC is a necessary compromise.** Sepolia has no native USDC. The wrapper works with any ERC-20; swapping in real USDC on mainnet is a one-line change.

---

## What's real vs pending — the honesty table

| Feature | Status | Detail |
|---|---|---|
| USDC wrapping | ✅ Real | ERC-7984 wrapper, 1:1, approve + wrap on Sepolia |
| Confidential transfers | ✅ Real | encryptInput → confidentialTransfer on-chain |
| Balance decryption | ✅ Real | decrypt() via Nox SDK, gasless EIP-712 |
| TEE computation | ✅ Real | Intel TDX runner processes operations off-chain |
| Nox SDK tests | ✅ Verified | 11/12 passing on Sepolia (see Tests) |
| USDC token | ⚠️ Mock | MockUSDC (Sepolia has no native USDC) |
| TEE delay | ⚠️ ~45s | Balance updates after runner picks up the event |
| Etherscan verification | 🟡 Pending | API blocked by Cloudflare from dev IP |
| Protocol audit | ⚠️ Unaudited | iExec Nox is beta infrastructure |

---

## Tests

12/12 tests passing — 8 contract unit tests + 4/4 live Sepolia E2E tests. Full output in [TEST_RESULTS.md](TEST_RESULTS.md).

```
=== MockUSDC Tests ===
  ✓ name is USD Coin Mock
  ✓ symbol is USDC
  ✓ decimals is 6
  ✓ has total supply

=== ConfidentialUSDC Tests ===
  ✓ name is Confidential USDC
  ✓ symbol is cUSDC
  ✓ underlying is MockUSDC
  ✓ confidentialBalanceOf returns bytes32

=== Live E2E Tests on Sepolia ===
  ✓ approve USDC for cUSDC
  ✓ wrap USDC → cUSDC
  ✓ confidentialBalanceOf returns non-zero handle
  ✓ FULL UNWRAP SUCCESS — USDC +1.00

8 passed, 0 failed + 4 passed, 0 failed
```

---

## Run it locally

```bash
git clone https://github.com/subheeksh5599/hadal.git
cd veil/frontend
pnpm install
cp .env.example .env.local
# Fill in:
#   NEXT_PUBLIC_MOCK_USDC=0x13847e79b58ac2573d9d394e9a89d6c7d27487b1
#   NEXT_PUBLIC_CUSDC=0xe1bcd1443cf13ceaa60aeec03bb8c80e7a142e7e
pnpm dev
```

Open `http://localhost:3000`, connect MetaMask on Sepolia, wrap USDC → cUSDC, send privately.

---

## Configuration

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_MOCK_USDC` | MockUSDC contract address on Sepolia |
| `NEXT_PUBLIC_CUSDC` | cUSDC (ConfidentialUSDC) contract address |
| `NEXT_PUBLIC_REOWN_PROJECT_ID` | WalletConnect project ID (optional, default `veil-local`) |

---

## Deploy

```bash
cd veil/frontend
vercel --prod --yes
```

`vercel.json` already sets the framework, install command, and env vars for production builds.

---

## Project layout

```
veil/
├── contracts/           # MockUSDC.sol, ConfidentialUSDC.sol (+ flat versions for verification)
├── frontend/
│   ├── app/             # Next.js pages: landing, /dashboard, /send, /receive
│   ├── components/      # hero, sidebar, balance cards, tx history, toasts
│   ├── hooks/           # use-nox (handle client + decrypt), use-wrap, use-transfer
│   ├── lib/             # wagmi config, ABIs, metadata
│   └── public/          # logo, BG.jpg
├── docs/media/          # README screenshots
├── TEST_RESULTS.md      # test output
├── feedback.md          # iExec developer experience feedback
└── DEMO_SCRIPT.md       # 4-min video narration (local only)
```

---

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16, React 19, TypeScript |
| Styling | Tailwind CSS v4, motion (Framer), Lenis |
| Web3 | wagmi v2, viem |
| Confidential | `@iexec-nox/handle` v0.1.0-beta.13 |
| Contracts | Solidity 0.8.28, `@iexec-nox/nox-protocol-contracts` v0.2.3 |
| Token standard | ERC-7984 (`@iexec-nox/nox-confidential-contracts` v0.2.2) |
| Chain | Ethereum Sepolia (11155111) |
| TEE | Intel TDX |

---

## Roadmap

- **Real USDC on mainnet** — swap MockUSDC for native USDC, deploy wrapper
- **Protocol integration** — route confidential balances into Aave / Uniswap via the wrapper's composability
- **Streams** — confidential payouts via Sablier/Superfluid-style flows
- **Etherscan verification** — verify contracts once API access unblocks
- **Wallet support** — Rabby + Rainbow test passes

---

## License

MIT — built for the iExec WTF Hackathon Summer Edition, July 2026.
