import Baton from '../components/Baton';
import { getXrpUsd } from '../lib/ftso';

export const dynamic = 'force-dynamic';

export default async function Home() {
  let price: number | null = null;
  try { price = (await getXrpUsd()).price; } catch { price = null; }

  return (
    <div className="wrap">
      <header className="top">
        <div className="brand">
          <div className="mark">B</div>
          <div><b>Baton</b><div className="net">Coston2 · chainId 114 · Flare Smart Accounts</div></div>
        </div>
        <div className="ticker"><span className="dot" /> XRP/USD <b>{price ? price.toFixed(4) : '—'}</b> <span style={{ color: 'var(--ink-faint)' }}>FTSOv2</span></div>
      </header>

      <section className="hero">
        <h1>Your XRP, working on Flare.<br /><span className="grad">In one signature.</span></h1>
        <p>
          Sign once with your XRPL wallet. Baton mints FXRP and deposits it into a live Flare yield
          vault — no EVM wallet, no gas, no manual bridge. The Flare operator does the on-chain work; you keep custody.
        </p>
        <div className="chips">
          <span className="chip"><b>FAssets</b> real FXRP mint</span>
          <span className="chip"><b>Smart Accounts</b> XRPL-authorized execution</span>
          <span className="chip"><b>FTSOv2</b> live valuation</span>
          <span className="chip"><b>0</b> EVM wallets</span>
        </div>
      </section>

      <Baton initialPrice={price} />

      <footer>
        Reuses live Coston2 infrastructure · <a href="/proof">On-chain proof →</a> · Operator <span className="mono">0x103b38…f437</span>
      </footer>
    </div>
  );
}
