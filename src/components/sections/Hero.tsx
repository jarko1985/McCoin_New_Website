import { Button } from "@/components/ui/button";
import { FaArrowRightToBracket } from "react-icons/fa6";
import Screener from "../custom/Screener";
import Dashboard from "../homepage/Dashboard";

export default function HeroSection() {
  return (
    <section className="w-full min-h-screen bg-[#07153b] flex flex-col items-center overflow-x-hidden overflow-y-auto">
      {/* Top: Title + CTA */}
      <div className="w-full px-4 py-6 text-center space-y-4">
        <h1 className="text-2xl lg:text-5xl font-bold leading-tight text-[#DAE6EA]">
          Invest in <span className="text-[#EC3B3B]">McCoin</span> Way to Trade
        </h1>

        <p className="text-lg md:text-2xl text-[#DAE6EA]/80">
          The global crypto currency exchange
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Email address"
            className="bg-transparent border border-[#DAE6EA]/70 rounded-lg px-4 py-3 text-white w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-white"
          />
          <Button className="bg-[#FFF] hover:text-white hover:bg-[#07153b] border-2 cursor-pointer hover:border-[#FFF] border-[#EC3B3B] text-[#07153b] px-8 py-6 text-lg group">
            <div className="flex items-center gap-2 text-base lg:text-xl">
              <span>Get Started</span>
              <FaArrowRightToBracket
                className="text-[#07153b] transition-transform duration-500 group-hover:text-[#FFF] group-hover:translate-x-2"
                size={18}
              />
            </div>
          </Button>
        </div>
      </div>

      {/* Middle: Dashboard */}
      <div className="w-full">
        <Dashboard />
      </div>

      {/* Bottom: Screener */}
      <div className="w-full mt-auto sticky bottom-0 z-10 hidden lg:block">
        <Screener />
      </div>

      {/* Fallback for mobile: Screener appears stacked */}
      <div className="w-full block lg:hidden">
        <Screener />
      </div>
    </section>
  );
}
