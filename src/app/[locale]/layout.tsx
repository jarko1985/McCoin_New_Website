import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Navbar from '@/components/custom/Navbar';
import ChatWidget from '@/components/custom/ChatWidget';
import Footer from '@/components/custom/Footer';
import AOSWrapper from '@/components/custom/AosWrapper';

import { Providers } from './providers';
import { CookieConsent } from '@/components/cookies/CookieConsent';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  preload: true,
});

export const metadata: Metadata = {
  title: 'Mccoin Virtual Assets',
  description: 'Your trusted crypto exchange platform',
  openGraph: {
    title: 'Mccoin Virtual Assets',
    description: 'Your trusted crypto exchange platform',
    url: 'https://mc-coin-new-website.vercel.app/en',
    siteName: 'Mccoin',
    images: [
      {
        url: '/banner1.png',
        width: 1200,
        height: 630,
        alt: 'Mccoin Banner',
      },
    ],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const direction = locale === 'ar' ? 'rtl' : 'ltr';
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body className={`${montserrat.variable} antialiased bg-[#07153b]`}>
        <NextIntlClientProvider>
          <Providers params={params}>
            <Navbar />
            <main className="h-full">
              <AOSWrapper>
                {children}
                <CookieConsent />
              </AOSWrapper>
            </main>
            <Footer />
            <ChatWidget />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
