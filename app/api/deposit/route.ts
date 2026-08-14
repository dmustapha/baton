import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { startDeposit } from '../../../lib/jobs';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const Body = z.object({
  xrplAddress: z.string().regex(/^r[1-9A-HJ-NP-Za-km-z]{24,34}$/, 'must be an XRPL classic address'),
  strategy: z.enum(['upshift', 'firelight']),
  lots: z.string().default('1'),
});
export async function POST(req: NextRequest) {
  const parsed = Body.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  try {
    const r = await startDeposit(parsed.data.xrplAddress, parsed.data.strategy, parsed.data.lots);
    return NextResponse.json({ ...r, status: 'submitted' });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
