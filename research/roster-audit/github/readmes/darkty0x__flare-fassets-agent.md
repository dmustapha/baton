# Flare FAssets Agent

**Flare Summer Signal** · bounty **Interoperable Asset Products**

When **FTSO XRP/USD** signals, this agent resolves **FXRP** via FAssets and executes a **policy-gated FXRP transfer** on **Coston2** — with a public audit trail.

Not a KeeperHub / Sepolia reskin: Flare Contract Registry, FTSOv2, AssetManagerFXRP, and FXRP ERC-20 writes.

## Live

| Surface | URL |
|---------|-----|
| Product UI | https://web-production-096c5.up.railway.app |
| API | https://api-production-d43d.up.railway.app |
| GitHub | https://github.com/darkty0x/flare-fassets-agent |
| Demo video | https://github.com/darkty0x/flare-fassets-agent/releases/download/v1.0.0/Flare-FAssets-Agent-Demo.mp4 |

## Proof

| Item | Value |
|------|-------|
| Network | Coston2 (`114`) |
| Wallet | `0x838C427b0fAc63130c1B74deA46EDE5D88E715f5` |
| FXRP token | `0x0b6A3645c240605887a5532109323A3E12273dc7` |
| Signal receipt | [`0x3D4342201C1F0067782F0626175E41C2843DB365`](https://coston2.testnet.flarescan.com/address/0x3D4342201C1F0067782F0626175E41C2843DB365) |
| Proof tx | [`0xded5dcc6b9f6aed38deda74075866095513fd4842040f4ccd4eac3233dca58ba`](https://coston2.testnet.flarescan.com/tx/0xded5dcc6b9f6aed38deda74075866095513fd4842040f4ccd4eac3233dca58ba) |

## How Flare is used

1. **FTSOv2** — XRP/USD (+ FLR/USD) via registry `FtsoV2`
2. **FAssets** — `AssetManagerFXRP.fAsset()` → FXRP + balance
3. **Coston2** — FXRP transfer when funded; otherwise `FxrpSignalReceipt` records live FTSO XRP/USD + FXRP token address

## Architecture

```text
FTSO XRP/USD + FXRP snapshot
        → decide (signal band)
        → policy
        → FXRP ERC-20 transfer
        → audit JSONL
```

## Quick start

```bash
cp .env.example .env
# Fund C2FLR + FXRP: https://faucet.flare.network/ (Coston2)
npm install && npm test
npm run ftso-probe
npm run cli -- guardian --force
npm run dev
cd apps/web && npm install && npm run dev
```

## What was newly built for this program

- Flare registry + FTSOv2 observe path
- FAssets FXRP resolution and FXRP execute path
- Flare-first product UI (FXRP / FTSO hero — not a generic agent console)
- Coston2 live deployment + explorer-linked proof

## Roadmap

Mainnet hardening, FXRP mint/redeem agent flows, optional Flare Confidential Compute for policy secrets.

## License

MIT
