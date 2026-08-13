# SchoolSave

SchoolSave is a blockchain based savings vault for school fees. Parents and guardians can lock funds toward a goal, track their progress, and release the funds once the target is met or the deadline passes.

Originally built for the BOTChain Africa Builder Challenge, then extended with Flare's FTSOv2 price oracle for the Flare Summer Signal hackathon.

## What's Existing vs. What's New for Flare

**Built before, for BOTChain:**
- The core SchoolSaveVault contract (goals, contributions, deadlines, release logic)
- The React/Vite frontend and wallet integration
- The AI-powered pacing nudges via Backboard

**New for the Flare hackathon:**
- FtsoPriceHelper.sol — reads Flare's FTSOv2 FLR/USD price feed directly on-chain
- getProgressUsd() added to SchoolSaveVault — converts saved/target amounts into real-time USD, using live oracle data instead of a hardcoded rate
- Deployed to Flare Testnet Coston2, alongside the existing BOT Chain mainnet deployment
- Frontend updated to display the live USD figure on the Progress card

## AI Powered Pacing Nudges

SchoolSave uses the Backboard API to generate encouraging, personalized pacing messages on the Progress card. Every time a goal loads, the app sends the current saved amount, target amount, and time remaining to Backboard, and the API returns a short message based on how the saving is tracking.

The Backboard API key is stored as an environment variable and is never exposed in the frontend code.

## Why SchoolSave

Growing up, my father did not have much, but one thing he never missed was saving for our school fees. SchoolSave exists so more families can keep that same promise, a little at a time.

## How It Works

1. Connect your wallet
2. Create a savings goal with a label, target amount, deadline, and payout address
3. Contribute FLR (or BOT, on the original deployment) toward the goal over time
4. Track progress in both native token and live USD terms, powered by Flare's FTSOv2 oracle
5. Once the target is met or the deadline passes, release the saved funds to the payout address

## Tech Stack

- Solidity smart contracts, deployed on both BOT Chain Mainnet and Flare Testnet Coston2
- Flare's FTSOv2 oracle (via @flarenetwork/flare-periphery-contracts) for live price data
- Hardhat for contract development and testing
- React and Vite for the frontend
- Ethers.js for wallet and contract interaction
- Backboard API for AI generated pacing messages

## Deployments

- BOT Chain Mainnet: `0x9Be792Fc6bd54F4AeC95e53cC7BfBD328f6D8510`
- Flare Testnet Coston2 — SchoolSaveVault: `0xd82378cD929036AfC32db97DFe86b9fCF2e46258`
- Flare Testnet Coston2 — FtsoPriceHelper: `0x693Bc0c1dfD250e0DD78DD97f92aCF95221fE33E`
- Live app (BOT Chain version): https://schoolsave-six.vercel.app