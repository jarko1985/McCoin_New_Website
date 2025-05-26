"use client";
import AnimatedLogo from "@/components/custom/AnimatedLogo";
import LocationDisplay from "@/components/custom/LocationDisplay";
import PodcastTeaserBanner from "@/components/homepage/PodcastBanner";
import TradeNow from "@/components/homepage/TradeNow";
import CryptoNewsUAE from "@/components/sections/CryptoNewsUAE";
import Hero from "@/components/sections/Hero";
import OurPartners from "@/components/sections/OurPartners";
import Steps from "@/components/sections/Steps";
import Testimonials from "@/components/sections/Testimonials";
import WhyMccoin from "@/components/sections/WhyMccoin";
import PricesTable from "@/components/tables/PricesTable";
import BitCoinWidget from "@/components/widgets/BitCoinWidget";
import EthereumWidget from "@/components/widgets/EthereumWidget";
import SolanaWidget from "@/components/widgets/SolanaWidget";
import RippleWidget from "@/components/widgets/XRPWidget";

import { useTranslations } from "next-intl";
import { useState, useEffect, useCallback } from "react";

export default function Home() {
  const t = useTranslations("HomePage");
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [minDelayPassed, setMinDelayPassed] = useState(false);

  const handleWidgetLoaded = useCallback(() => {
    setLoadedCount((prev) => prev + 1);
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinDelayPassed(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loadedCount >= 4 && minDelayPassed) {
      setIsLoading(false);
    }
  }, [loadedCount, minDelayPassed]);

  return (
    <div className="relative">
      {isLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center">
          <AnimatedLogo />
          <p className="text-white font-semibold text-lg animate-pulse mt-4">
            Loading....
          </p>
        </div>
      )}
      <div
        className={
          isLoading
            ? "opacity-0"
            : "opacity-100 transition-opacity duration-300"
        }
      >
        <Hero />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mx-auto xl:max-w-[70%] justify-center items-center gap-2 py-4">
          <BitCoinWidget onLoad={handleWidgetLoaded} />
          <EthereumWidget onLoad={handleWidgetLoaded} />
          <SolanaWidget onLoad={handleWidgetLoaded} />
          <RippleWidget onLoad={handleWidgetLoaded} />
        </div>
        <PricesTable />
         <OurPartners />
        <WhyMccoin />
        <Steps />
        <CryptoNewsUAE/>
       <Testimonials/>
        <PodcastTeaserBanner />
        <TradeNow/>  
        <LocationDisplay />
      </div>
    </div>
  );
}
