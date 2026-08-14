#!/usr/bin/env node
// Livetest: assert the LIVE deployment against source-derived expectations (not observe-then-assert).
// V1 functional (pages/routes respond), V2 exact-value (chain-derived truths), V3 adversarial (bad input).
//   node scripts/livetest.mjs https://baton-flare.onrender.com
const BASE = process.argv[2] || 'https://baton-flare.onrender.com';
const DEMO = 'rwLtfA6cn57VYjzaDetfCQi2z4cDgeNi8b';
const PA = '0x27fBb63780AB83aE7CEcd69291AAbb0A769071f7'; // derived on-chain (Task-0)
let pass = 0, fail = 0;
const ok = (c, label, extra = '') => { console.log(`${c ? 'PASS' : 'FAIL'}  ${label}${extra ? ' :: ' + extra : ''}`); c ? pass++ : fail++; };

async function j(path) {
  const r = await fetch(BASE + path, { headers: { 'cache-control': 'no-cache' } });
  let body = null; try { body = await r.json(); } catch {}
  return { status: r.status, body };
}
async function txt(path) { const r = await fetch(BASE + path); return r.status; }

async function main() {
  console.log(`\n== LIVETEST ${BASE} ==\n-- V1 functional --`);
  ok((await txt('/')) === 200, 'GET / (home) 200');
  ok((await txt('/proof')) === 200, 'GET /proof 200');

  const price = await j('/api/price');
  ok(price.status === 200, 'GET /api/price 200');

  console.log('\n-- V2 exact-value (chain-derived) --');
  ok(price.body?.source === 'FTSOv2' && price.body?.chainId === 114, 'price source=FTSOv2 chainId=114', JSON.stringify(price.body));
  ok(typeof price.body?.price === 'number' && price.body.price > 0.4 && price.body.price < 3, 'XRP/USD in (0.4,3)', String(price.body?.price));

  const acct = await j(`/api/account?xrplAddress=${DEMO}`);
  ok(acct.status === 200 && acct.body?.personalAccount?.toLowerCase() === PA.toLowerCase(),
    'account derives exact PersonalAccount', acct.body?.personalAccount);

  const pos = await j(`/api/positions?xrplAddress=${DEMO}`);
  ok(pos.status === 200, 'GET /api/positions 200');
  const upshift = (pos.body?.positions || []).find((p) => p.symbol?.toLowerCase().startsWith('upshift'));
  ok(!!upshift && Number(upshift.fxrpBalance) >= 10, 'Upshift position >= 10 FXRP (on-chain truth)', upshift && `${upshift.fxrpBalance} FXRP`);
  ok(pos.body?.ftsoPrice && pos.body.ftsoPrice !== '—', 'positions carry live FTSO price', pos.body?.ftsoPrice);
  ok(upshift?.usdValue && upshift.usdValue !== '—', 'position USD value present (FTSO valuation)', upshift?.usdValue);

  console.log('\n-- V3 adversarial --');
  const bad = await j('/api/account?xrplAddress=notxrpl');
  ok(bad.status >= 400 || (bad.body && 'error' in bad.body), 'bad xrplAddress rejected/handled', String(bad.status));
  const noParam = await j('/api/positions');
  ok(noParam.status === 400, 'missing xrplAddress -> 400', String(noParam.status));
  const badDep = await fetch(BASE + '/api/deposit', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ xrplAddress: DEMO, strategy: 'nope', lots: '1' }) });
  ok(badDep.status === 400, 'invalid strategy -> 400', String(badDep.status));

  console.log(`\n== RESULT: ${pass} pass / ${fail} fail ==`);
  process.exit(fail === 0 ? 0 : 1);
}
main().catch((e) => { console.error('livetest error:', e); process.exit(1); });
