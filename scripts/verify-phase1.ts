// Live Phase 1 verification: registry + FXRP + PersonalAccount against Coston2.
import { resolve, resolveFxrp } from '../lib/registry';
import { getFxrpDecimals, getXrpUsd } from '../lib/ftso';
import { derivePersonalAccount } from '../lib/personalAccount';

const EXPECT = {
  ftsoV2: '0xc4e9c78ea53db782e28f28fdf80baf59336b304d',
  fxrp: '0x0b6a3645c240605887a5532109323a3e12273dc7',
  pa: '0x27fbb63780ab83ae7cecd69291aabb0a769071f7',
};

function assertEq(label: string, got: string, want: string) {
  const ok = got.toLowerCase() === want.toLowerCase();
  console.log(`${ok ? 'PASS' : 'FAIL'} ${label}: ${got}${ok ? '' : ` (expected ${want})`}`);
  if (!ok) process.exitCode = 1;
}

async function main() {
  const ftso = await resolve('FtsoV2');
  assertEq('registry.resolve(FtsoV2)', ftso, EXPECT.ftsoV2);

  const fxrp = await resolveFxrp();
  assertEq('resolveFxrp (AssetManagerFXRP.fAsset)', fxrp, EXPECT.fxrp);

  const decimals = await getFxrpDecimals();
  console.log(`${decimals === 6 ? 'PASS' : 'FAIL'} getFxrpDecimals: ${decimals}`);
  if (decimals !== 6) process.exitCode = 1;

  const pa = await derivePersonalAccount('rwLtfA6cn57VYjzaDetfCQi2z4cDgeNi8b');
  assertEq('derivePersonalAccount(demo)', pa, EXPECT.pa);

  const { price } = await getXrpUsd();
  console.log(`${price > 0 ? 'PASS' : 'FAIL'} getXrpUsd (getFeedById): XRP/USD=${price.toFixed(4)}`);
  if (!(price > 0)) process.exitCode = 1;
}

main().catch((e) => {
  console.error('verify-phase1 error:', e);
  process.exit(1);
});
