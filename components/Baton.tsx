'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

type Strategy = 'upshift' | 'firelight';
const DEMO_XRPL = 'rwLtfA6cn57VYjzaDetfCQi2z4cDgeNi8b';
const EXPLORER = 'https://coston2-explorer.flare.network';
const XRPL_EXPLORER = 'https://testnet.xrpl.org/transactions';

const STRATS: { key: Strategy; label: string; blurb: string; tag: string; cls: string; mark: string }[] = [
  { key: 'upshift', label: 'Upshift', blurb: 'Institutional lending vault — steady FXRP yield.', tag: 'Lending', cls: 'u', mark: 'U' },
  { key: 'firelight', label: 'Firelight', blurb: 'Higher-yield strategy vault — active allocation.', tag: 'Strategy', cls: 'f', mark: 'F' },
];

const STAGES = ['submitted', 'observed', 'attesting', 'executed'] as const;
const STEP_LABELS = ['Signed', 'Reserved', 'Minting', 'Deposited'];

export default function Baton({ initialPrice }: { initialPrice: number | null }) {
  const [strategy, setStrategy] = useState<Strategy>('upshift');
  const [lots, setLots] = useState('1');
  const [price, setPrice] = useState<number | null>(initialPrice);
  const [busy, setBusy] = useState(false);
  const [stage, setStage] = useState<string>('idle');
  const [statusMsg, setStatusMsg] = useState('');
  const [xrplCr, setXrplCr] = useState<string>();
  const [xrplMint, setXrplMint] = useState<string>();
  const [positions, setPositions] = useState<any>(null);
  const poll = useRef<ReturnType<typeof setInterval> | null>(null);

  const loadPositions = useCallback(async () => {
    try {
      const r = await fetch(`/api/positions?xrplAddress=${DEMO_XRPL}`, { cache: 'no-store' });
      if (r.ok) setPositions(await r.json());
    } catch {}
  }, []);

  useEffect(() => { loadPositions(); }, [loadPositions]);
  useEffect(() => {
    const t = setInterval(async () => {
      try { const r = await fetch('/api/price', { cache: 'no-store' }); if (r.ok) setPrice((await r.json()).price); } catch {}
    }, 15000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => () => { if (poll.current) clearInterval(poll.current); }, []);

  const usd = price ? (Number(lots || '0') * 10 * price).toFixed(2) : null; // 1 lot = 10 FXRP

  async function deposit() {
    setBusy(true); setStage('submitted'); setStatusMsg('Submitting your XRPL signature...'); setXrplCr(undefined); setXrplMint(undefined);
    const baseline = '0';
    try {
      const r = await fetch('/api/deposit', {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ xrplAddress: DEMO_XRPL, strategy, lots }),
      });
      if (!r.ok) { setStatusMsg('Could not start deposit.'); setBusy(false); setStage('failed'); return; }
      if (poll.current) clearInterval(poll.current);
      poll.current = setInterval(async () => {
        try {
          const s = await fetch(`/api/status?xrplAddress=${DEMO_XRPL}&strategy=${strategy}&baselineShares=${baseline}`, { cache: 'no-store' });
          const st = await s.json();
          setStage(st.stage); setStatusMsg(st.message);
          if (st.xrplCrTx) setXrplCr(st.xrplCrTx);
          if (st.xrplMintTx) setXrplMint(st.xrplMintTx);
          if (st.stage === 'executed') {
            if (poll.current) clearInterval(poll.current);
            setBusy(false); loadPositions();
          }
        } catch {}
      }, 6000);
    } catch {
      setStatusMsg('Network error.'); setBusy(false); setStage('failed');
    }
  }

  const stageIdx = STAGES.indexOf(stage as any);

  return (
    <>
      <div className="grid">
        <div className="card">
          <h2>1 · Choose a strategy</h2>
          <div className="strats">
            {STRATS.map((s) => (
              <div key={s.key} className="strat" data-on={strategy === s.key} tabIndex={0}
                onClick={() => setStrategy(s.key)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setStrategy(s.key)}>
                <div className={`stratmark ${s.cls}`}>{s.mark}</div>
                <div>
                  <div className="name">{s.label}</div>
                  <div className="blurb">{s.blurb}</div>
                </div>
                <div className="apy"><b>Live</b><span>{s.tag}</span></div>
              </div>
            ))}
          </div>

          <div className="amount">
            <label>Amount to put to work</label>
            <div className="amtbox">
              <input type="number" min="1" step="1" value={lots} onChange={(e) => setLots(e.target.value)} />
              <div>
                <div className="unit">lots</div>
                <div className="usd">≈ {Number(lots || '0') * 10} FXRP{usd ? ` · $${usd}` : ''}</div>
              </div>
            </div>
          </div>

          <button className="btn" onClick={deposit} disabled={busy}>
            {busy ? 'Working on Flare…' : 'Sign once → deposit into Flare'}
          </button>
          <div className="hint">Demo XRPL wallet (testnet). No EVM wallet · no FLR gas · the Flare operator executes on-chain.</div>

          {stage !== 'idle' && (
            <div className="status">
              <div className="steps">
                {STEP_LABELS.map((l, i) => (
                  <div key={l} className="step" data-on={i === stageIdx} data-done={stageIdx > i || stage === 'executed'}>
                    <div className="sdot" />{l}
                  </div>
                ))}
              </div>
              <div className="statusmsg">
                {busy && stage !== 'executed' && <div className="spin" />}
                {stage === 'executed' ? '✓ ' : ''}{statusMsg}
              </div>
            </div>
          )}

          {(xrplCr || xrplMint) && (
            <div className="receipt">
              {xrplCr && <div className="row"><span>XRPL signature</span><a href={`${XRPL_EXPLORER}/${xrplCr}`} target="_blank" rel="noreferrer">{xrplCr.slice(0, 10)}…</a></div>}
              {xrplMint && <div className="row"><span>XRPL mint payment</span><a href={`${XRPL_EXPLORER}/${xrplMint}`} target="_blank" rel="noreferrer">{xrplMint.slice(0, 10)}…</a></div>}
            </div>
          )}
        </div>

        <div className="card">
          <h2>Your Flare position</h2>
          {positions && positions.positions?.some((p: any) => Number(p.fxrpBalance) > 0) ? (
            <>
              {positions.positions.filter((p: any) => Number(p.fxrpBalance) > 0).map((p: any) => (
                <div className="pos" key={p.vault}>
                  <div className="pname">
                    <div className={`stratmark ${p.symbol.toLowerCase().startsWith('upshift') ? 'u' : 'f'}`} style={{ width: 32, height: 32, fontSize: 13 }}>
                      {p.symbol[0]}
                    </div>
                    <div><b>{p.symbol.replace('-FXRP', '')}</b><div className="mono">{p.vault.slice(0, 8)}…</div></div>
                  </div>
                  <div className="pv"><b>{Number(p.fxrpBalance).toFixed(2)} FXRP</b><span>{p.usdValue === '—' ? '—' : `$${p.usdValue}`}</span></div>
                </div>
              ))}
              <div className="total">
                <div><div className="mono">TOTAL DEPLOYED</div><div className="big">{Number(positions.totalFxrp).toFixed(2)} FXRP</div></div>
                <div style={{ textAlign: 'right' }}><div className="mono">VALUE</div><div className="big">{positions.totalUsd === '—' ? '—' : `$${positions.totalUsd}`}</div></div>
              </div>
              <div className="receipt">
                <div className="row"><span>PersonalAccount</span><a href={`${EXPLORER}/address/${positions.personalAccount}`} target="_blank" rel="noreferrer">{positions.personalAccount.slice(0, 10)}…</a></div>
                <div className="row"><span>XRP/USD (FTSOv2)</span><b className="mono" style={{ color: 'var(--ink)' }}>{positions.ftsoPrice}</b></div>
              </div>
            </>
          ) : (
            <div className="empty">No Flare position yet. Pick a strategy and sign once — your XRP becomes a live yield position, no bridge, no gas.</div>
          )}
        </div>
      </div>
    </>
  );
}
