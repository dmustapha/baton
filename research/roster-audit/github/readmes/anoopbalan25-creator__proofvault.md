# ProofVault

ProofVault creates immutable, privacy-preserving proof that a document existed in a particular form at a particular time. The document never leaves the browser: only its SHA-256 fingerprint is registered on **Flare Coston2**.

## What it does

- Connects MetaMask and guides users to Flare Coston2 (chain ID `114`)
- Hashes PDF, PNG, JPG, and DOCX files locally with SHA-256 (up to 20MB)
- Anchors a unique fingerprint using `ProofVault.registerDocument(bytes32)`
- Verifies ownership, timestamp, and transaction proof directly from the contract
- Shows recent registration/verification records and Coston2 explorer links
- Provides light/dark responsive UI, toasts, loading states, client validation, and API safety headers

## Architecture

```
File → Browser SHA-256 → MetaMask → ProofVault.sol → Flare Coston2
                  │                           │
                  └── local dashboard          └── event index API → document list
```

The frontend is the source of truth for document hashing and on-chain reads/writes. The optional Express service only indexes public `DocumentRegistered` events; it accepts neither files nor private keys.

## Repository layout

| Directory | Purpose |
| --- | --- |
| `contracts/` | Hardhat configuration, ProofVault Solidity source, tests, deploy script |
| `frontend/` | React, Vite, TypeScript and Tailwind application |
| `backend/` | Optional Express event-indexing API |
| `docs/` | Integration and submission notes |

## Local setup

Requirements: Node.js 20+, npm, and MetaMask.

```bash
npm install
copy frontend\.env.example frontend\.env
copy backend\.env.example backend\.env
copy contracts\.env.example contracts\.env
npm run compile
npm run dev
```

In another terminal, optionally run the public event API:

```bash
npm run dev:api
```

The UI works in a clear demo state without a deployed address, allowing hashing and the local dashboard. Add `VITE_CONTRACT_ADDRESS` after deployment to enable Coston2 reads and writes.

## Deploy to Flare Coston2

1. Fund a dedicated deployer wallet with C2FLR from the [Coston2 faucet](https://faucet.flare.network/coston2).
2. In `contracts/.env`, set `DEPLOYER_PRIVATE_KEY` (never commit it).
3. Deploy:

   ```bash
   cd contracts
   npm run deploy:coston2
   ```

4. Copy the printed address to `frontend/.env` as `VITE_CONTRACT_ADDRESS` and to `backend/.env` as `CONTRACT_ADDRESS`.
5. Configure `FRONTEND_ORIGIN` for production and deploy the frontend to a static host and backend to a Node host.

## Flare integration

ProofVault targets Flare Coston2 using RPC `https://coston2-api.flare.network/ext/C/rpc`, chain ID `114`, and the Coston2 explorer. The contract stores exactly three public values per fingerprint: its owner address and its block timestamp keyed by the `bytes32` SHA-256 digest. `DocumentRegistered` supplies a durable indexed event for explorer and dashboard integrations.

## Security notes

- Original documents are never uploaded by this application or placed on-chain.
- Client-side validation restricts types and size; the browser calculates the hash using Web Crypto.
- The contract blocks zero hashes and duplicate registrations.
- The backend has CORS, Helmet headers, bounded event queries, and no write endpoints.
- Use a hardware wallet or restricted deployment key for production deployments.

## Hackathon submission guide

1. Deploy the contract and verify it on the Coston2 explorer.
2. Configure the deployed address, then register and verify a sample document.
3. Submit the live URL, contract address, explorer transaction, this repository, and a short demo showing that edited files fail verification.
4. Explain the privacy model: public proof, private source document.

## License

MIT
