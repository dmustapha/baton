import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export const dynamic = 'force-dynamic';

export default function Proof() {
  let md = '';
  try { md = readFileSync(join(process.cwd(), 'submission/proof.md'), 'utf8'); } catch { md = 'Proof file not found.'; }
  return (
    <div className="wrap">
      <header className="top">
        <div className="brand"><div className="mark">B</div><div><b>Baton</b><div className="net">On-chain proof</div></div></div>
        <a className="ticker" href="/">← Back</a>
      </header>
      <div className="card">
        <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'var(--mono)', fontSize: 12.5, lineHeight: 1.7, color: 'var(--ink-dim)' }}>{md}</pre>
      </div>
    </div>
  );
}
