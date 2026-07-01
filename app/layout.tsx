import type { Metadata, Viewport } from 'next';
import { Cinzel, Cormorant_Garamond, Jost, Reem_Kufi } from 'next/font/google';
import './globals.css';
import { SvgSymbols } from '@/components/SvgSymbols';

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-cinzel',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jost',
  display: 'swap',
});

const reemKufi = Reem_Kufi({
  subsets: ['arabic', 'latin'],
  weight: ['500', '700'],
  variable: '--font-reem-kufi',
  display: 'swap',
});

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? '';

export const metadata: Metadata = {
  metadataBase: appUrl ? new URL(appUrl) : undefined,
  title: 'Musfir & Fasna · Fasil & Rinshana — Wedding Invitation',
  description:
    'Together with their families, you are joyfully invited to the wedding celebration of Musfir & Fasna and Fasil & Rinshana — Thursday, 23 July 2026, Al Jazeera Convention Centre.',
  openGraph: {
    type: 'website',
    title: 'Musfir & Fasna · Fasil & Rinshana — Wedding Invitation',
    description:
      'A joyous double wedding celebration · Thursday, 23 July 2026 · Al Jazeera Convention Centre',
    images: [{ url: `${appUrl}/api/og`, width: 1200, height: 630 }],
  },
  icons: {
    icon: '/favicon.svg',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export const viewport: Viewport = {
  themeColor: '#064e3b',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cormorant.variable} ${jost.variable} ${reemKufi.variable}`}
    >
      <body>
        <div className="bg-veil" aria-hidden="true" />
        <canvas id="dust-canvas" aria-hidden="true" />
        <SvgSymbols />
        {children}
      </body>
    </html>
  );
}
