import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const SITE_URL = 'https://nullopcode.cv';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'nullopcode -- Solana Builder',
  description: 'Solana protocol engineer shipping on-chain programs, DeFi infrastructure, and open-source tooling.',
  keywords: ['nullopcode', 'Solana', 'Rust', 'Anchor', 'DeFi', 'staking', 'CLAWG', 'builder', 'protocol engineer'],
  authors: [{ name: 'nullopcode', url: SITE_URL }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'nullopcode',
    title: 'nullopcode -- Solana Builder',
    description: 'Solana protocol engineer shipping on-chain programs, DeFi infrastructure, and open-source tooling.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'nullopcode',
    description: 'Solana protocol engineer shipping on-chain programs and DeFi infrastructure.',
    creator: '@nullopcode',
  },
  alternates: { canonical: SITE_URL },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'nullopcode',
    url: SITE_URL,
    jobTitle: 'Solana Builder & Protocol Engineer',
    sameAs: [
      'https://github.com/nullopcode',
      'https://x.com/nullopcode',
      'https://warpcast.com/nullopcode',
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${jetbrainsMono.variable} font-mono antialiased`}>
        {children}
      </body>
    </html>
  );
}
