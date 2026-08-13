# Vellum: Confidential Private Credit on Canton

A sealed-bid loan origination book where invited lenders price the line blind, the borrower alone sees the full book, and the winning facility funds atomically. Privacy and atomicity are enforced by the ledger, not the UI.

[![Daml](https://img.shields.io/badge/Daml-2.10.4-e2001a)](https://www.digitalasset.com/developers)
[![Canton](https://img.shields.io/badge/Canton-Network-0b0e14)](https://www.canton.network/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=black)](https://react.dev/)
[![Tests](https://img.shields.io/badge/daml_script-6_passing-brightgreen)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

![Vellum landing](docs/images/landing.png)

## Live Demo

**[vellum-bay.vercel.app](https://vellum-bay.vercel.app)**

A fully interactive demo with static data: the same UI, pre-seeded with two sealed bids (Northwind Capital at 8.50%, Meridian Credit at 7.90%). Walk through the entire journey: sign in as any seat, view the book, select and fund. This is a frontend-only simulation. For the real Canton ledger with cryptographic privacy and atomic DvP, run [locally](#running-locally).

## What Is Vellum?

A borrower opens a credit deal and invites lenders. Each lender receives a disclosure package visible only to them and submits a sealed term sheet no rival lender can see. The borrower reviews every term sheet, selects a winner, and the facility funds in one atomic transaction: cash moves to the borrower while the loan token issues to the lender. Both legs commit, or neither does. Repayments build a portable, permissioned track record the borrower can selectively share with future counterparties.

On a transparent chain, competing lenders would see each other's pricing and settlement could tear. Canton provides sub-transaction privacy and atomic delivery-versus-payment at the protocol layer. Competing lenders are never stakeholders of each other's disclosures or bids. Settlement never leaves a party exposed to a half-funded facility.

## Screenshots

| Landing | Sign In |
|---|---|
| ![Landing](docs/images/landing.png) | ![Sign in](docs/images/signin.png) |

| Lender: sealed bid (rivals under seal) | Borrower: the full book |
|---|---|
| ![Lender bid](docs/images/lender-bid.png) | ![Borrower book](docs/images/book.png) |

## Features

- **Sealed-bid origination.** Each lender prices the line blind. A rival cannot see the bid, the pricing, or even that a rival was invited.
- **Per-lender selective disclosure.** The borrower shares a data-room reference with one lender at a time. Each sees only their own package.
- **Atomic funding (DvP).** Acceptance releases the lender's pledged capital to the borrower and issues the facility to the lender in a single transaction.
- **Rollback safety.** If the pledged capital is unavailable at settlement, the whole funding aborts. No half-open loan, no stranded cash.
- **Portable repayment record.** Repayments leave immutable receipts the borrower can selectively disclose to future counterparties.
- **Two-role UI.** A borrower "book" view that sees every sealed term sheet, and a lender "sealed" view where rivals stay under seal.

## Tech Stack

| Layer | Technology |
|---|---|
| Ledger model | Daml 2.10.4 on Canton, CIP-56 token holding |
| Settlement | Atomic delivery-versus-payment in one transaction |
| Tests | Daml Script (lifecycle, privacy, atomicity, rollback) |
| Auth | Signed party tokens (`jose`, HS256), verified at a dev gateway |
| Integration | HTTP JSON Ledger API, `@daml/ledger` |
| Frontend | React 18, Vite 5, TypeScript, `@daml/react` |

## How It Works

```
Browser (React SPA)
  |
  v
Vite Dev Server (:5173)
  |
  +---> Backend Auth (HS256 party tokens)
  |
  +---> HTTP JSON Ledger API (:7575)
          |
          v
        Canton Sandbox
          |
          +---> Vellum.Deal (sealed bids, facility, receipts)
          +---> Vellum.Token (CIP-56 cash, pledge)
          +---> Vellum.Init (demo book seeding)
```

Every lender is an observer of their own disclosure and term sheet only. The borrower is the sole observer of every term sheet and the sole signatory of the deal. Rival lenders never enter each other's ledger streams. The authorization model, not UI hiding, enforces confidentiality.

On acceptance, the pledge release and facility creation commit as one Daml choice. If the pledge is gone, the choice aborts and the facility is never created.

## Quick Demo (No Docker, No Ledger)

You can run the full Vellum UI with static seeded data. No Canton sandbox, no Daml SDK, no Docker needed. Just Node.js.

```bash
cd frontend
npm install
npm run demo
```

Open **http://localhost:5173**. Click any seat to walk through the entire deal flow: pick a lender, read their disclosure, see their sealed bid. Then switch to the borrower to view the full book and fund the winner. Everything works with pre-seeded demo data.

To serve the built demo on a different port:

```bash
cd frontend
npm run demo:server
```

> The frontend includes pre-built Daml JS bindings (`frontend/daml.js/`). If you update the Daml contract model, regenerate them with:
> ```bash
> cd daml
> daml build
> # daml build prints the DAR path; use it below:
> daml codegen js -o ../frontend/daml.js/ .daml/2.10.4/vellum-0.1.0.dar
> ```

## Running Locally (Full Stack)

### Prerequisites

- Node.js 18+
- Daml SDK 2.10.4

### Quick start

```bash
# 1. Build and start the ledger (sandbox + JSON API on :7575, seeded with a demo book)
cd daml
daml build
daml start

# 2. In a second terminal, start the frontend
cd frontend
npm install
node server.mjs
```

Open http://localhost:5173. The demo passphrase is `vellum`.

### One-command launch

```bash
bash scripts/start.sh
```

This builds the Daml model, starts the sandbox and JSON API on :7575, waits for the API to become ready, and launches the frontend server on :5173. Press Ctrl+C to stop both servers.

### Optional: headless end-to-end check

With the ledger running:

```bash
node frontend/smoke.mjs
```

This drives the browser stack (dev JWT, generated bindings, `@daml/ledger`, the JSON API) through the full journey: a lender lodges a sealed bid, the borrower reads the book, the borrower funds atomically, and the facility goes live. It consumes the seeded bid, so restart the ledger before a live demo.

## Demo Script

1. **Sign in as Northwind Capital** (passphrase: `vellum`). Read the disclosure package, then lodge a sealed term sheet at 8.50%. Lodging earmarks the capital as a pledge.
2. **Sign out and sign in as Meridian Credit.** You see only your own disclosure. There is no sign Northwind was invited or what they priced. Lodge 7.90%.
3. **Sign out and sign in as Atlas Components (Borrower).** The full book is visible: both sealed term sheets side by side, with "Best price" on Meridian. This is the view no rival lender can ever have.
4. **Select and fund.** One click settles the cash leg (pledge to borrower) and the loan leg (facility to Meridian) in a single transaction. The facility goes live. A declined lender's pledge is returned.
5. **The privacy proof.** Sign back in as Northwind. "Rival Terms" is still under seal. Nothing about Meridian's 7.90% ever reached them. Confidentiality is enforced by the ledger and demonstrable in `daml test` (Lender B's stream contains no trace of Lender A), not hidden by the UI.

## Project Structure

```
Vellum/
├── daml/                       Daml contracts and Daml Script tests
│   ├── Vellum/Deal.daml        Deal, DisclosurePackage, TermSheet, Facility, receipts
│   ├── Vellum/Token.daml       Cash (CIP-56 holding) and Pledge
│   ├── Vellum/Init.daml        Seed script for a live demo book
│   └── Test/Suite.daml         Privacy, atomicity, lifecycle, rollback tests
├── backend/                    Thin, stateless integration layer
│   ├── config.ts               Ledger connection config
│   ├── token.ts                Signs party tokens (jose / HS256)
│   └── parties.ts              Runtime party resolution
├── frontend/                   React + @daml/react two-role UI
│   ├── src/views/              BorrowerView, LenderView
│   └── smoke.mjs               Headless end-to-end check
├── scripts/
│   ├── dev-ledger.sh           Build and boot the ledger stack
│   └── start.sh                One-command full stack launch
└── docs/images/                Screenshots
```

## License

MIT
