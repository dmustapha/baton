# Confidential Payroll

## Selected Bounty
Private applications built with Flare Confidential Compute (FCC)

## Short Product Description
Confidential Payroll is a decentralized application designed for Web3 organizations and DAOs to distribute employee compensation securely and privately. While the total payroll output from the treasury is public on the blockchain, individual salary amounts and recipient addresses remain entirely confidential by executing the batch distribution within a Trusted Execution Environment (TEE).

## Target User
Web3 companies, DAOs, and crypto-native organizations who need to pay their contributors on-chain without broadcasting individual compensation details and salary hierarchies to the world.

## How to Run Locally

### 1. Smart Contracts
The smart contract relies on the Flare Confidential Compute (FCC) infrastructure. 

```bash
cd contracts
npm install
npx hardhat compile
```
To deploy to the Coston2 testnet:
```bash
npx hardhat run scripts/deploy.js --network coston2
```

### 2. Frontend
The frontend is a modern React application built with Vite.

```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser. Ensure your `.env` file contains the correct `VITE_CONTRACT_ADDRESS` and you have MetaMask installed.

## Explanation of how the project uses Flare
The smart contract `ConfidentialPayroll.sol` acts as the treasury holding the funds (native FLR). A Flare Confidential Compute (TEE) enclave securely decrypts payroll instructions (like a CSV) off-chain, calculates the individual payouts, and calls the `executeConfidentialBatch` function to distribute the tokens. The contract authorizes only the official `FlareTeeManager` to submit these transactions. This ensures the inputs (individual salaries) are never exposed on-chain.

## What was newly built, ported, integrated, or improved
- **Smart Contracts**: `ConfidentialPayroll.sol` was designed to accept native FLR and integrated directly with the live Coston2 Flare Confidential Compute ecosystem.
- **Frontend UI**: A completely new, modern UI was built from scratch using React, Vite, and React-Router. It allows employers to initiate payroll batches and view on-chain historical distributions.
- **Integration Architecture**: Connected the smart contract to the newly redeployed `FlareTeeManager` on Coston2 to authorize live TEE machines.

## Smart Contract Addresses
- **Flare Coston2 Testnet**: `0x4c04D59c26a448E3faF9dae2459b7F48fB8550B4`
- **FlareTeeManager (Relayer)**: `0x1a9C4A0f9D76c0b1D91d22E24E573a9b377618aE`

## Short Roadmap / Next Steps
1. **Live Enclave Execution**: Finish integration with the `fce-sign` TEE extension scaffold to pass encrypted CSVs to the TEE.
2. **Employee Dashboard**: Complete the employee dashboard for individuals to privately view and prove their payment history.
3. **Confidential AI Integration**: Leverage AI models running *inside* the Flare TEE to analyze encrypted payroll data. The AI can detect payroll fraud, flag unusual salary spikes, and generate private financial burn-rate reports for DAO admins—all without exposing the raw salary data to the public.
4. **Mainnet Deployment**: Deploy on Flare Mainnet.
