'use client';
import AnimatedLogo from '@/components/custom/AnimatedLogo';
import LocationDisplay from '@/components/custom/LocationDisplay';
import PodcastTeaserBanner from '@/components/homepage/PodcastBanner';
import TradeNow from '@/components/homepage/TradeNow';
import CryptoNewsUAE from '@/components/sections/CryptoNewsUAE';
import Hero from '@/components/sections/Hero';
import OurPartners from '@/components/sections/OurPartners';
import Steps from '@/components/sections/Steps';
import Testimonials from '@/components/sections/Testimonials';
import WhyMccoin from '@/components/sections/WhyMccoin';
import PricesTable from '@/components/tables/PricesTable';

import { useTranslations } from 'next-intl';
import { useState, useEffect, useCallback } from 'react';

export default function Home() {
  const t = useTranslations('HomePage');
  const [isLoading, setIsLoading] = useState(true);
  const [minDelayPassed, setMinDelayPassed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinDelayPassed(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setIsLoading(false);
  }, [minDelayPassed]);

  return (
    <div className="relative">
      {isLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center">
          <AnimatedLogo />
          <p className="text-white font-semibold text-lg animate-pulse mt-4">Loading....</p>
        </div>
      )}
      <div className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}>
        <Hero />
        <PricesTable />
        <OurPartners />
        <WhyMccoin />
        <Steps />
        <CryptoNewsUAE />
        <Testimonials />
        <PodcastTeaserBanner />
        <TradeNow />
        <LocationDisplay />
      </div>
    </div>
  );
}
