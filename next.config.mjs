/** @type {import('next').NextConfig} */
const nextConfig = {
  // API routes that spawn the Python CLI must run on the Node runtime (set per-route via `export const runtime`).
  serverExternalPackages: ['xrpl'],
};
export default nextConfig;
