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
          <div className="mark">
            <svg width="34" height="34" viewBox="0 0 512 512" aria-label="Baton">
              <defs>
                <linearGradient id="hbmk" x1="0.5" y1="1" x2="0.5" y2="0">
                  <stop offset="0" stopColor="#2f7bff" />
                  <stop offset="1" stopColor="#ff5a3c" />
                </linearGradient>
              </defs>
              <g fill="none" stroke="url(#hbmk)" strokeWidth={34} strokeLinecap="round">
                <path d="M256 372 L164 184" />
                <path d="M256 372 L256 150" />
                <path d="M256 372 L348 184" />
              </g>
              <circle cx="256" cy="384" r="42" fill="#2f7bff" />
              <circle cx="164" cy="176" r="28" fill="#4f8cff" />
              <circle cx="256" cy="142" r="28" fill="#9b6bd6" />
              <circle cx="348" cy="176" r="28" fill="#ff5a3c" />
            </svg>
          </div>
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
