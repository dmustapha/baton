// File: app/api/encode/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { encode } from '../../../lib/encode';
import type { Depth } from '../../../lib/types';

export const runtime = 'nodejs'; // needs child_process to spawn the Python CLI

const Body = z.object({
  xrplAddress: z.string().regex(/^r[1-9A-HJ-NP-Za-km-z]{24,34}$/, 'must be an XRPL classic address'),
  templateId: z.string(),
  fxrpAmount: z.string().default('10'),
});

export async function POST(req: NextRequest) {
  const parsed = Body.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const depth = (process.env.BATON_DEPTH ?? 'depth-8') as Depth; // set by Gate-1 (Task-0 locked depth-8)
  try {
    const result = await encode(parsed.data, depth);
    return NextResponse.json(
      // BigInt is not JSON-serializable — Call.value is surfaced as a string for display.
      { ...result, calls: result.calls.map((c) => ({ ...c, value: c.value.toString() })) },
    );
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
