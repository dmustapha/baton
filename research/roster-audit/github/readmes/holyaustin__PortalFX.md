# PortalFX

**One‑Click XRP to Yield** – powered by Flare Smart Accounts v1.3.

PortalFX is a Next.js application that lets XRP holders deposit into yield vaults (Upshift, Firelight, Monarq, Clearstar) with a **single signature**. No FLR gas tokens, no manual bridging, no complex steps. The Flare Data Connector verifies the XRP transaction, Smart Accounts mint FXRP and deposit into the vault automatically.

---

## 🚀 Features

- **One‑click onboarding** – sign one XRP transaction to mint FXRP and deposit into a vault
- **Vault selection** – choose from multiple ERC‑4626 vaults with different strategies
- **Real‑time status** – view vault APY, TVL, and your balance
- **Bidirectional flow** – deposit (XRP → FXRP → Vault) and redeem (Vault → FXRP → XRP)
- **Testnet ready** – works on Coston2 with test tokens
- **Wallet agnostic** – supports Xaman, Ledger, MetaMask, and injected EVM wallets

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Frontend** | React 19, TypeScript, Tailwind CSS 4 |
| **Blockchain** | wagmi 3, viem 2, @tanstack/react-query |
| **XRPL** | XRPL.js (xrpl) |
| **Flare** | Smart Accounts v1.3, FAssets, FDC |

---

## 🌐 Supported Networks

| Network | Chain ID |
|---------|----------|
| Flare Mainnet | 14 |
| Coston2 Testnet | 114 |
| Songbird | 19 |
| Coston Testnet | 16 |

---

## 📦 Installation

### Prerequisites

- Node.js 20+
- A browser with a wallet extension:
  - **For Flare**: MetaMask (or any injected EVM wallet)
  - **For XRP**: Xaman (formerly XUMM), Ledger, or any XRPL wallet

### Clone & Install

```bash
git clone <your-repo-url>
cd portalfx
npm install

### Environment Variables

Create `.env.local` in the project root:

```env
# Xaman API credentials (for direct minting via Xaman)
XAMAN_API_KEY=your_xaman_api_key
XAMAN_API_SECRET=your_xaman_api_secret

# Network configuration
NEXT_PUBLIC_FLARE_NETWORK=coston2   # or 'flare' for mainnet
```

> **Note:** For the hackathon demo, you can leave Xaman keys empty – the app will simulate transactions.

---

## 🏃 Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── xaman/           # Xaman payload creation & status endpoints
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout with providers
│   └── page.tsx             # Main page: vault selection + onboarding
├── components/
│   ├── OneClickOnboarding.tsx  # One‑click deposit flow
│   ├── VaultCard.tsx           # Vault selection card
│   └── WalletConnect.tsx       # Wallet connection component
├── config/
│   └── vaults.ts            # Vault definitions (addresses, tags, APY)
├── hooks/
│   ├── useFlareWallet.ts    # Flare wallet (wagmi)
│   ├── useVaultStatus.ts    # Vault status queries
│   └── useXRPLWallet.ts     # XRP wallet (Xaman/Ledger)
├── lib/
│   ├── chainUtils.ts        # Chain utilities
│   ├── clipboard.ts         # Clipboard helpers
│   ├── flareContracts.ts    # Flare contract address resolution
│   ├── portalfx.ts          # Core mint+deposit logic
│   ├── publicClient.ts      # Viem public client
│   ├── utils.ts             # General utilities
│   ├── vaults.ts            # Vault status queries
│   ├── wagmi.ts             # wagmi configuration
│   └── xrpUtils.ts          # XRPL utilities
└── providers/
    └── WagmiProvider.tsx    # Wagmi + React Query provider
```

---

## 🔄 How It Works

1. **User connects XRP wallet** – Xaman, Ledger, or any XRPL wallet.
2. **User selects a vault** – Upshift, Firelight, Monarq, or Clearstar.
3. **User enters amount** and clicks **Sign Once & Deposit**.
4. **User signs one XRP transaction** on the XRP Ledger.
5. **Flare Data Connector (FDC)** verifies the XRP transaction.
6. **Flare Smart Accounts v1.3**:
   - Mints FXRP 1:1 from the sent XRP.
   - Deposits the FXRP into the chosen vault.
7. **Vault starts earning yield** – automatically compounding rewards.

---

## 🏆 Hackathon Submission

This project is built for the **Flare Summer Signal Hackathon – Bounty 1: Interoperable Asset Products**.

### What makes PortalFX stand out:

| Criterion | How PortalFX Delivers |
|-----------|----------------------|
| **Product Usefulness** | Solves the real problem of complex XRP onboarding to DeFi |
| **Flare Integration** | Uses FAssets, Smart Accounts v1.3, FDC, and ERC‑4626 vaults |
| **Technical Execution** | Working demo on Coston2 testnet with full bidirectional flow |
| **New Work** | Built specifically for this hackathon on the latest v1.3 features |
| **Future Potential** | Clear path to mainnet, more vaults, and mobile app |

---

## 📚 Documentation References

- [FXRP Overview](https://dev.flare.network/fxrp/overview)
- [Smart Accounts Overview](https://dev.flare.network/smart-accounts/overview)
- [FXRP Address Guide](https://dev.flare.network/fxrp/token-interactions/fxrp-address)
- [Upshift Deposit Guide](https://dev.flare.network/fxrp/upshift/deposit)
- [Firelight Deposit Guide](https://dev.flare.network/fxrp/firelight/deposit)

---

## 📄 License

MIT License.

---

## 🙏 Acknowledgments

- [Flare Network](https://flare.network/) for providing the infrastructure
- [Xaman](https://xaman.app/) for XRPL wallet support
- All open source libraries used in this project

---

**Built with ❤️ for the Flare Summer Signal Hackathon**
```

---

Now run the final build:

```bash
npm run build
```

Everything should compile successfully. 🚀