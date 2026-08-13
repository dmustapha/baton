# Firegate — Trustless XRP Checkout Rail on Flare

**Firegate** is a Stripe-style checkout where anyone sells a digital asset priced in USD and gets paid in **native XRP on the XRPL** — no bridge UX, no custodian.

The buyer sends XRP with a destination tag. Flare's **FDC** proves the payment on-chain via Merkle proof. The invoice contract settles instantly, mints an **ERC-721 ReceiptNFT** to the buyer, and credits the merchant's payout balance in **FXRP**.

## Live (Coston2 Testnet)

Cockpit: **http://31.220.75.26:3004/** — FTSO XRP/USD ticking live, settlements streaming in real time.

## Flare Protocols Used (All Load-Bearing)

- **FDC `Payment` attestation** — settlement fires ONLY when the contract verifies the Merkle proof that an XRPL payment (amount + destination tag) exists. No trusted relayer.
- **FTSOv2 XRP/USD feed** — invoices priced in USD; contract quotes exact XRP amount at checkout from the live feed.
- **FXRP (FAssets)** — merchant payout leg: settled invoices credit merchant balance in FXRP units (1:1 XRP drop → FXRP unit; mainnet path = FAssets mint-with-tag, Tag 101, live today).

## Architecture

```
Buyer          XRPL testnet      Relayer (VPS)           Coston2
  |--XRP + tag-->|                    |                      |
               |--WebSocket event-->|                      |
                                   |--FDC prepareRequest-->| (FdcHub)
                                   |                      |--voting round--|
                                   |<---Merkle proof-------|  (DA layer)   |
                                   |--settle(proof)------->|               |
                                                       InvoiceRegistry: SETTLED
                                                       ReceiptNFT minted to buyer
                                                       Merchant FXRP balance credited
```

## Contracts (Coston2)

See `DEPLOYED.md` for live addresses.

- `SettlementGate.sol` — FDC proof verify → NFT mint → FXRP credit
- `InvoiceRegistry.sol` — invoice lifecycle + FTSO XRP/USD quoting
- `ReceiptNFT (ERC-721)` — deployed inside SettlementGate constructor

## Build

```bash
forge build     # Compiler run successful! (3 contracts)
```

## Run

```bash
# Cockpit (SSE dashboard)
PORT=3004 SETTLEMENT_GATE_ADDRESS=0x... PRIVATE_KEY=0x... node src/cockpit/server.js

# Relayer (XRPL watcher → FDC → settle)
XRPL_GATE_ADDRESS=r... SETTLEMENT_GATE_ADDRESS=0x... PRIVATE_KEY=0x... node src/relayer/index.js

# Heartbeat (sends a real XRPL purchase every 10min to keep demo live)
HEARTBEAT_FROM_SECRET=s... XRPL_GATE_ADDRESS=r... SETTLEMENT_GATE_ADDRESS=0x... node src/heartbeat/index.js
```

## FDC Spike Receipt

The FDC XRPPayment round-trip was proven before product code:
- XRPL testnet tx `60C7E9570E918C74E3499582EA31E70B5C8C84852E467F9334F0C7162585F906`
- FdcHub submission tx `45dd229ce29409879d5d226bd0e37cf74a5819414faee4b2389a7ffda2e8ae4b` (block 32560223, Coston2)
- DA layer returned Merkle proof (3 elements) — status VALID

## Hackathon

Flare Summer Signal — **Bounty 1: Best Financial dApp** · Deadline Aug 14, 2026
