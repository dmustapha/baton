import { NextResponse } from 'next/server';
import { getXrpUsd } from '../../../lib/ftso';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    const { price, feedId } = await getXrpUsd();
    return NextResponse.json({ symbol: 'XRP/USD', price, feedId, source: 'FTSOv2', chainId: 114 });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 502 });
  }
}
