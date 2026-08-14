// File: lib/viem.ts
import { createPublicClient, http, defineChain } from 'viem';
import { COSTON2 } from './config';

export const coston2 = defineChain({
  id: COSTON2.id,
  name: COSTON2.name,
  nativeCurrency: { name: 'Coston2 Flare', symbol: 'C2FLR', decimals: 18 },
  rpcUrls: { default: { http: [COSTON2.rpc] } },
  blockExplorers: { default: { name: 'Coston2 Explorer', url: COSTON2.explorer } },
});

export const publicClient = createPublicClient({ chain: coston2, transport: http(COSTON2.rpc) });
