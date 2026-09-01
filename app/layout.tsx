import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Freeflow Creative Hub — Express Your Inner Vision',
  description: 'Creative branding, publishing, strategy, and academy for people ready to build their creative empire.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
