import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Navbar from '@/components/custom/Navbar';
import ChatWidget from '@/components/custom/ChatWidget';
import Footer from '@/components/custom/Footer';
import AOSWrapper from '@/components/custom/AosWrapper';

import { CookieConsent } from '@/components/cookies/CookieConsent';
import { getLocation } from '@/lib/location';
import { LocationProvider } from '@/context/LocationContext';
import { ClientProviders } from './client-providers';
import { defaultMetadata } from '@/lib/metadata';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  preload: true,
});

export const metadata: Metadata = defaultMetadata;

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

  // Load messages for the locale
  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  const serverLocation = await getLocation(locale);
  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body className={`${montserrat.variable}  antialiased dark:bg-[#07153b] bg-[#DAE6EA]`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LocationProvider serverLocation={serverLocation}>
            <ClientProviders>
              <Navbar />
              <main className="h-full">
                <AOSWrapper>
                  {children}
                  <CookieConsent />
                </AOSWrapper>
              </main>
              <Footer />
              <ChatWidget />
            </ClientProviders>
          </LocationProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
