import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crypto Blog & News | McCoin',
  description: 'Stay updated with the latest cryptocurrency news, market analysis, and trading insights fromMcCoin. Expert articles on crypto security, market trends, and blockchain technology in the MENA region.',
  keywords: [
    'cryptocurrency blog',
    'crypto news',
    'blockchain articles',
    'crypto trading insights',
    'MENA crypto',
    'Dubai crypto',
    'VARA regulations',
    'crypto security',
    'market analysis',
    'McCoin'
  ],
  authors: [{ name: 'McCoin Editorial Team' }], 
  creator: 'McCoin',
  publisher: 'McCoin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://mc-coin-new-website.vercel.app'),
  alternates: {
    canonical: '/blog',
    languages: {
      'en': '/en/blog',
      'ar': '/ar/blog',
    },
  },
  openGraph: {
    title: 'Crypto Blog & News | McCoin',
    description: 'Stay updated with the latest cryptocurrency news, market analysis, and trading insights from McCoin. Expert articles on crypto security, market trends, and blockchain technology in the MENA region.',
    url: '/blog',
    siteName: 'McCoin',
    images: [
      {
        url: '/images/blog/blog1.png',
        width: 1200,
        height: 630,
        alt: 'McCoin Crypto Blog',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crypto Blog & News | McCoin',
    description: 'Stay updated with the latest cryptocurrency news, market analysis, and trading insights from McCoin.',
    images: ['/images/blog/blog1.png'],
    creator: '@McCoin',
    site: '@McCoin',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION,
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
