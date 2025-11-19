import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://mc-coin-new-website-hassanjarkoyahoocoms-projects.vercel.app';

export function generateMetadata({
  title,
  description,
  image = '/og-image.svg',
  url,
  type = 'website',
}: {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}): Metadata {
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: 'McCoin',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type,
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@mccoin',
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
  };
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'McCoin - Everything Crypto | Global Cryptocurrency Exchange',
  description:
    'Join McCoin, the global cryptocurrency exchange platform. Trade Bitcoin, Ethereum, and 100+ cryptocurrencies with zero fees, advanced trading tools, and bank-grade security. Start your crypto journey today!',
  keywords:
    'cryptocurrency, bitcoin, ethereum, crypto exchange, digital assets, trading platform, blockchain, crypto trading, virtual assets, McCoin',
  authors: [{ name: 'McCoin Team' }],
  creator: 'McCoin',
  publisher: 'McCoin',
  applicationName: 'McCoin',
  referrer: 'origin-when-cross-origin',
  openGraph: {
    title: 'McCoin - Everything Crypto | Global Cryptocurrency Exchange',
    description:
      'Join McCoin, the global cryptocurrency exchange platform. Trade Bitcoin, Ethereum, and 100+ cryptocurrencies with zero fees, advanced trading tools, and bank-grade security. Start your crypto journey today!',
    url: `${baseUrl}/en`,
    siteName: 'McCoin',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'McCoin - Global Cryptocurrency Exchange Platform',
        type: 'image/png',
      },
    ],
    type: 'website',
    locale: 'en_US',
    countryName: 'United Arab Emirates',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'McCoin - Everything Crypto | Global Cryptocurrency Exchange',
    description:
      'Join McCoin, the global cryptocurrency exchange platform. Trade Bitcoin, Ethereum, and 100+ cryptocurrencies with zero fees, advanced trading tools, and bank-grade security.',
    images: ['/og-image.png'],
    creator: '@mccoin',
    site: '@mccoin',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
    shortcut: '/favicon.ico',
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
  alternates: {
    canonical: `${baseUrl}/en`,
  },
  category: 'Finance',
  classification: 'Cryptocurrency Exchange',
};
