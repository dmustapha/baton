import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Baton — your XRP, working on Flare',
  description: 'One XRPL signature turns idle XRP into a live Flare yield position. No EVM wallet, no gas.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
