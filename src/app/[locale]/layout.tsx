  import type { Metadata } from "next";
  import { Montserrat } from "next/font/google";
  import "./globals.css";
  import { NextIntlClientProvider, hasLocale } from "next-intl";
  import { notFound } from "next/navigation";
  import { routing } from "@/i18n/routing";
  import Navbar from "@/components/custom/Navbar";
  import ChatWidget from "@/components/custom/ChatWidget";
  import Footer from "@/components/custom/Footer";
  import AOSWrapper from "@/components/custom/AosWrapper";
import CookieBanner from "@/components/custom/CookieBanner";

  const montserrat = Montserrat({
    variable: "--font-montserrat",
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    preload: true,
  });

  export const metadata: Metadata = {
    title: "Mccoin Virtual Assets",
    description: "Mccoin Virtual Assets",
  };

  export default async function LocaleLayout({
    children,
    params,
  }: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
  }>) {
    const { locale } = await params;
    const direction = locale === "ar" ? "rtl" : "ltr";
    if (!hasLocale(routing.locales, locale)) {
      notFound();
    }
    return (
      <html lang={locale} dir={direction} suppressHydrationWarning>
        <body className={`${montserrat.variable} antialiased bg-[#07153b]`}>
          <NextIntlClientProvider>
            <Navbar />
            <main className="h-full">
              <AOSWrapper>{children}</AOSWrapper>
            </main>
            <Footer />
            <ChatWidget />
            {/* <CookieBanner /> */}
          </NextIntlClientProvider>
        </body>
      </html>
    );
  }
