# Baton — Demo Video Script

Voice: ElevenLabs `cjVigY5qzO86Huf0OWal` (eleven_multilingual_v2, stability 0.5, similarity 0.75).
Target: ~120s, under the 3-minute cap. Real-Only: every number read from chain. No em dashes in narration.
Brief §Demo coverage: one real outcome (10 FXRP deposited), one exact tx (0x5f4766e1 on Coston2 explorer),
one failure-path safeguard (FTSO decoupling: balances render even if the price feed is down), network + chainId on screen.

## Scene lineup

### 1. hook  (animated brand + problem hint)
"Your XRP mostly just sits there. On Flare, that same XRP could be earning yield. Baton makes it happen from the wallet you already own."

### 2. problem  (animated, 5-step friction)
"Normally this is a slog. You bridge or mint a wrapped asset, set up a wallet on a chain you have never touched, buy its gas token, approve a contract, and only then deposit. Five steps across two chains. Most people quit before they finish."

### 3. howItWorks  (animated flow: XRPL -> operator -> mint -> deposit)
"Baton uses Flare Smart Accounts to collapse all of that. You sign from your XRP Ledger wallet, and Flare's hosted operator takes it from there. It mints real FXRP through the FAssets protocol and deposits it into a live yield vault, on your behalf. No EVM wallet. No gas. No bridge. And your key never leaves your hands."

### 4. app  (live-app screenshots with motion)
"Here is the app, running live. Pick a strategy, Upshift or Firelight. Choose how much to put to work, and confirm. Behind the scenes the Flare operator does the on-chain work, and your position shows up for real. Ten FXRP, sitting in a live Flare vault, valued in real time through Flare's own FTSO price oracle. Every figure on this screen is read straight from the chain."

### 5. proof  (explorer tx + safeguard + network/chainId)
"And none of it is staged. This is the real transaction on the Coston2 block explorer. In a single Flare transaction, the operator minted ten FXRP and deposited it into the vault, driven entirely from the XRP Ledger, with no EVM wallet and no gas from the user. Network, Coston2. Chain ID, one fourteen. And if the price oracle ever goes quiet, your balance still renders. Nothing here is faked."

### 6. close  (brand + URL)
"Baton. Your XRP, working on Flare. Try it live, at baton dash flare dot onrender dot com."
