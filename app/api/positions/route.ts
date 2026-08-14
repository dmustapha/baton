import { NextRequest, NextResponse } from 'next/server';
import { getPortfolio } from '../../../lib/positions';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function GET(req: NextRequest) {
  const xrplAddress = req.nextUrl.searchParams.get('xrplAddress');
  if (!xrplAddress) return NextResponse.json({ error: 'xrplAddress required' }, { status: 400 });
  try {
    return NextResponse.json(await getPortfolio(xrplAddress));
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
