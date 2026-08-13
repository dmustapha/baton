# BM Denarii Web3 Builder Platform

A comprehensive React application for the BM Denarii 1 Million No-Code Web3 Developers Program, featuring AI-powered tools, multi-chain support (XRPL, Algorand, Hedera), and a stunning cyberpunk aesthetic.

![BM Denarii](https://pbs.twimg.com/media/G7FCvGBXQAAEGIQ?format=jpg&name=large)

## ✨ Features

### 🤖 7 AI-Powered Builder Tools
1. **AI Idea Generator** - Generate viable Web3 app concepts
2. **AI Architect** - Tech stack planning and design
3. **Asset Alchemist** - Token utility and governance models
4. **Whitepaper Weaver** - Professional documentation generation
5. **Code Catalyst** - Smart contract snippets and transaction payloads
6. **Risk Radar** - Security and economic vulnerability analysis
7. **Grant Guardian** - Foundation-ready grant proposals

### 🎨 Visual Excellence
- Animated Tron-style grid background
- Cyberpunk neon aesthetic
- Fully responsive mobile-first design
- Smooth animations and micro-interactions

### ⛓️ Multi-Chain Ready
- XRPL integration guides
- Algorand support
- Hedera/HBAR compatibility
- Xaman wallet integration examples

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔑 Environment Variables

Create a `.env` file in the project root:

```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

**Get your OpenAI API key:** [OpenAI Platform](https://platform.openai.com/api-keys)

## 📦 Netlify Deployment

### Method 1: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

### Method 2: Netlify Dashboard

1. Push your code to GitHub
2. Go to [Netlify](https://app.netlify.com/)
3. Click "Add new site" → "Import an existing project"
4. Select your repository
5. Build settings are already configured in `netlify.toml`
6. Add environment variable:
   - Key: `VITE_OPENAI_API_KEY`
   - Value: Your OpenAI API key
7. Deploy!

### Method 3: Drag & Drop

```bash
# Build the project
npm run build

# Drag the 'dist' folder to https://app.netlify.com/drop
```

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **AI Integration**: OpenAI API (GPT-3.5-turbo)
- **Deployment**: Netlify
- **Animations**: CSS animations + Tailwind utilities

## 📁 Project Structure

```
BM Denarii/
├── public/
│   └── _redirects           # SPA routing for Netlify
├── src/
│   ├── App.jsx             # Main application component
│   ├── index.css           # Global styles + Tailwind
│   └── main.jsx            # React entry point
├── index.html              # HTML template
├── netlify.toml            # Netlify configuration
├── tailwind.config.js      # Tailwind configuration
├── vite.config.js          # Vite configuration
└── package.json            # Dependencies
```

## 🎯 Key Sections

- **Hero** - Tron grid animated background
- **Video Showcase** - YouTube embed integration
- **Mission** - 3-pillar value proposition
- **How It Works** - 5-step builder flow
- **AI Tools** - 7 interactive AI generators
- **XRPL Guide** - Technical integration code examples
- **Build Examples** - Community showcase
- **Training** - Free curriculum
- **Community** - Daily X Spaces schedule
- **Footer** - Comprehensive resource links

## 🔗 Important Links

- **Main Website**: [denarii.cc](https://denarii.cc/)
- **Twitter/X**: [@Denarii_DFI](https://x.com/Denarii_DFI)
- **YouTube**: [Denarii Build Channel](https://youtube.com/@denarii_dfi_build)
- **Telegram**: [MoonBoi MB589](https://t.me/moonboiMB589)

### 💰 Trade DFi
- [XPMarket](https://xpmarket.com/token/DFI-rUY6tjGN8PJDVyVFLztRZLmPZ8uTBUfa2Z)
- [Sologenic DEX](https://sologenic.org/trade?market=DFI%2BrUY6tjGN8PJDVyVFLztRZLmPZ8uTBUfa2Z%2FXRP&network=mainnet)
- [First Ledger](https://firstledger.net/token/rUY6tjGN8PJDVyVFLztRZLmPZ8uTBUfa2Z/DFI)

## 📝 License

© 2025 BM Denarii Program. All rights reserved.

## 🤝 Contributing

This is the flagship project for the 1 Million Devs Program. Join our daily X Spaces to learn how to build similar applications!

---

**Built with ❤️ by the BM Denarii Community**
