import About from "@/components/sections/About";
import CompanyNews from "@/components/sections/CompanyNews";
import Hero from "@/components/sections/Hero";
import OurGoals from "@/components/sections/OurGoals";
import OurPartners from "@/components/sections/OurPartners";
import Steps from "@/components/sections/Steps";
import Team from "@/components/sections/Team";
import TradingViewWidget from "@/components/sections/TradingChart";
import WhyMccoin from "@/components/sections/WhyMccoin";


import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations('HomePage');
  return (
    <div>
      <Hero/> 
      <TradingViewWidget/>
      <WhyMccoin/>
      <Steps/>
     <OurPartners/> 
     <CompanyNews/>
    <OurGoals/>
    <Team/>
    <About/>
  </div>
  );
}
