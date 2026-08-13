<h1 align="center">
  <img src="frontend/public/favicon.svg" width="72" height="72" alt=""><br>
  Veripay
</h1>

<p align="center">
  <strong>Prove they paid. Prove they didn't.</strong><br>
  Trustless proof-of-payment marketplace for XRPL→Flare trades.<br>
  Built for the Flare Summer Signal hackathon.
</p>

---

Veripay settles peer-to-peer trades using the Flare Data Connector (FDC). A
seller lists an item; the buyer pays them directly on the XRP Ledger; a Flare
smart contract verifies the payment happened — or trustlessly proves it didn't —
using FDC attestations. No platform intermediary holds funds or acts as
arbitrator.

**Live on Coston2:** [`0x41091384DccCDFB95e0B672175b3715D91188Be7`](https://coston2-explorer.flare.network/address/0x41091384DccCDFB95e0B672175b3715D91188Be7)
· see [`deployments.md`](deployments.md)

## Not custody — read this
The contract does **not** hold XRP/FXRP. The buyer pays the seller directly on
XRPL. The contract is the trustless *verifier and state tracker*:
- **FDC `Payment` attestation** → proves the buyer paid (amount + destination + reference).
- **FDC `ReferencedPaymentNonexistence` attestation** → proves the buyer did NOT
  pay by a deadline, so the seller can cancel. Proving a *negative* trustlessly is
  the distinctive part.

## Layout

```
contracts/   Foundry — Solidity, FDC attestation scripts, tests
frontend/    Vite + React + TypeScript + Tailwind + shadcn
```

## Status
- **Live on Coston2** and proven end-to-end: a real XRPL testnet payment
  ([`7BE1643C…`](https://testnet.xrpl.org/transactions/7BE1643C1ED1BBC8945F4866A1715482CCC4FDDCBDB2C17197530191D189808D))
  was attested by FDC and funded a listing on Flare.
- Core contract compiles against real `flare-periphery` interfaces.
- 32 passing unit tests over the full state machine, every guard, the
  cancel-path forgery regressions (mock FDC verifier), and the FDC request encodings.
- Frontend is wired to the contract and runs the entire four-stage FDC flow
  **in the browser** — there is no backend in this project. A full buy was driven
  from the UI alone: create → pay → prove → confirm.
- **Both** FDC paths are proven on Coston2. The `ReferencedPaymentNonexistence`
  path cancelled an unpaid listing by proving, on-chain, that no matching payment
  existed in its window — every state in the machine has now been reached on a
  live network.

`DEMO.md` walks through driving both paths from the UI.

Contract dependencies are vendored by hand and gitignored — see the restore steps
in `CLAUDE.md` before the first build.

```bash
cd contracts && forge build && forge test -vv

cd frontend && npm install && npm run dev
```

Deploy target for the frontend is Vercel or Cloudflare Pages with root directory
`frontend`, build `npm run build`, output `dist`. See `CLAUDE.md`.

See `CLAUDE.md` for the full build plan and TODO.

## Flow
createListing → (buyer pays on XRPL w/ reference in memo) → fundListing(paymentProof)
→ confirmCompletion. Unpaid listings: cancelListing(nonexistenceProof).

## Roadmap

Ordered by what most limits the product today.

**1. Buyer pays from their own XRPL wallet.**
The payment must carry exactly one memo holding the listing's 32-byte reference,
and no wallet UI lets you type an arbitrary memo — so today the demo sends it
with `scripts/pay-xrpl.mjs`, a dev harness holding a testnet seed. That is not a
shipping product. The fix is a wallet integration that hands the wallet a
transaction *including* `Memos`:

- **GemWallet / Crossmark** — XRPL browser extensions, MetaMask-style. Fully
  client-side, so the deployment stays static-hosted with no backend. Best fit
  for the current architecture.
- **Xaman (Xumm)** — QR / deep-link signing, far wider adoption and better on
  mobile, but its payload API key must stay server-side, so this is the one that
  requires a backend.

With either, the buy flow becomes: open listing → *Pay with wallet* → approve →
the app already holds the tx hash and runs the proof steps itself, with no
copy-paste.

**2. Self-hosted FDC verifier.**
The public testnet verifier is rate limited and its key ships in the client
bundle. Production needs its own verifier behind a proxy — the one genuine
backend requirement in the design.

**3. Custody via FAssets.**
Mint FXRP from the payment and lock it in the contract, making this real escrow
rather than proof-of-payment settlement. Deliberately out of scope for v1; see
"Not custody" above.

**4. Proof of delivery.**
`confirmCompletion` is buyer-attested and therefore trusted — the contract proves
*payment*, not *receipt*. A Web2Json attestation against a carrier's tracking API
would close that gap.

**5. Multi-chain.**
BTC and DOGE use the same two FDC attestation types and the same
`standardPaymentReference` mechanism, so this is mostly configuration. XRP-only
keeps the demo scope tight.

**6. Event indexing.**
`getAllListings` scans every listing, which is fine at demo scale and wrong at a
thousand. Index `ListingCreated` instead.

## License
MIT
