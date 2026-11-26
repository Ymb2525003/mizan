import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Mizan', description: 'A quieter way to plan your life.' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
