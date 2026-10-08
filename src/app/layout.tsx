import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vanguard Digital — Engineering High-Performance Digital Products',
  description: 'We engineer high-performance digital products — from blazing-fast web apps to conversion-optimised e-commerce platforms.',
  keywords: ['web development', 'UI/UX design', 'SEO optimization', 'e-commerce development', 'custom software', 'digital agency'],
  openGraph: {
    title: 'Vanguard Digital — Engineering High-Performance Digital Products',
    description: 'We engineer high-performance digital products.',
    type: 'website',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
