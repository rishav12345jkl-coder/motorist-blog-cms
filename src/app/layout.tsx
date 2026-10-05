import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'MOTORIST Journal | Performance Motorcycle Mods & Garage Guides',
  description:
    'The official technical journal of MOTORIST. High-performance motorcycle exhaust guides, Himalayan 450 touring builds, Duke 390 modifications, and DIY garage maintenance.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Jost:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Open+Sans:ital,wght@0,400;0,600;0,700;0,800;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-surface-base text-brand-charcoal font-sans antialiased selection:bg-brand-amber selection:text-white">
        {children}
      </body>
    </html>
  );
}
