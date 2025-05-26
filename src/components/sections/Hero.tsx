import { Button } from "@/components/ui/button";
import { FaArrowRightToBracket } from "react-icons/fa6";
import Screener from "../custom/Screener";
// import SwiperShowcase from "../homepage/SwiperShowcase";

export default function HeroSection() {
  return (
    <section className="w-full h-screen overflow-hidden bg-[#07153b] flex flex-col">
      {/* Top: Title + CTA */}
      <div className="flex flex-col justify-center items-center px-4 py-4 space-y-6 md:space-y-12 xl:pt-8 w-full flex-[0.3]">
        <h1 className="text-2xl lg:text-5xl text-center font-bold leading-tight text-[#DAE6EA]">
          Invest in <span className="text-[#EC3B3B]">McCoin</span> Way to Trade
        </h1>

        <p className="text-lg md:text-2xl text-[#DAE6EA]/80 text-center">
          The global crypto currency exchange
        </p>

        <div className="flex flex-col justify-center items-center lg:flex-row gap-4">
          <input
            type="email"
            placeholder="Email address"
            className="bg-transparent border border-[#DAE6EA]/70 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white"
          />
          <Button className="bg-[#FFF] hover:text-white hover:bg-[#07153b] border-2 cursor-pointer hover:border-[#FFF] border-[#EC3B3B] text-[#07153b] px-8 py-6 text-lg group">
            <div className="flex items-center gap-2 lg:text-xl text-[1rem]">
              <span>Get Started</span>
              <FaArrowRightToBracket
                className="text-[#07153b] transition-transform duration-500 group-hover:text-[#FFF] group-hover:translate-x-2"
                size={18}
              />
            </div>
          </Button>
        </div>
      </div>

      {/* Middle: Swiper */}
      {/* <div className="flex-[0.5] overflow-hidden">
        <SwiperShowcase />
      </div> */}

      {/* Bottom: Screener */}
      <div className="flex-[0.2]">
        <Screener />
      </div>
    </section>
  );
}
