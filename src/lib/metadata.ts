import { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://mc-coin-new-website.vercel.app';

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
  title: 'McCoin Virtual Assets',
  description: 'Your trusted crypto exchange platform',
  openGraph: {
    title: 'McCoin Virtual Assets',
    description: 'Your trusted crypto exchange platform',
    url: `${baseUrl}/en`,
    siteName: 'McCoin',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'McCoin - Your Trusted Crypto Exchange Platform',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'McCoin Virtual Assets',
    description: 'Your trusted crypto exchange platform',
    images: ['/og-image.svg'],
    creator: '@mccoin',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
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
