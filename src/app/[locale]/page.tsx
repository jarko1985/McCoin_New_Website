import About from "@/components/sections/About";
import OurGoals from "@/components/sections/OurGoals";
import Team from "@/components/sections/Team";
import TradingViewWidget from "@/components/sections/TradingChart";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations('HomePage');
  return (
    <div>
    <OurGoals/>
    <TradingViewWidget/>
    <Team/>
    <About/>
  </div>
  );
}
