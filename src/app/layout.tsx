import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Stardew Valley Farm Planner',
  description: 'Plan your perfect Stardew Valley farm before building it in-game',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  themeColor: '#16a34a',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
