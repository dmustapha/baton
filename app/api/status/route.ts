import { NextRequest, NextResponse } from 'next/server';
import { getStatus } from '../../../lib/jobs';
import type { Strategy } from '../../../lib/deposit';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams;
  const xrplAddress = q.get('xrplAddress');
  const strategy = (q.get('strategy') ?? 'upshift') as Strategy;
  const baseline = q.get('baselineShares') ?? '0';
  if (!xrplAddress) return NextResponse.json({ error: 'xrplAddress required' }, { status: 400 });
  try {
    return NextResponse.json(await getStatus(xrplAddress, strategy, baseline));
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
