import { NextRequest, NextResponse } from 'next/server';
import { derivePersonalAccount } from '../../../lib/personalAccount';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const XRPL = /^r[1-9A-HJ-NP-Za-km-z]{24,34}$/;
export async function GET(req: NextRequest) {
  const xrplAddress = req.nextUrl.searchParams.get('xrplAddress');
  if (!xrplAddress || !XRPL.test(xrplAddress))
    return NextResponse.json({ error: 'valid XRPL classic address required' }, { status: 400 });
  try {
    const personalAccount = await derivePersonalAccount(xrplAddress);
    return NextResponse.json({ xrplAddress, personalAccount, network: 'coston2', chainId: 114 });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
