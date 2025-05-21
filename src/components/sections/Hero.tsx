import { Button } from "@/components/ui/button";
import { FaArrowRightToBracket } from "react-icons/fa6";
import RetroCinemaSwiper from "../homepage/RetroCinemaSwiper";
import Screener from "../custom/Screener";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[90vh] sm:h-[100vh] overflow-hidden bg-[#07153b]">
      <video
        src="/videos/hero_video_3.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-[#07153b]/80 z-10" />

      <div className="container relative z-20 mx-auto flex flex-col items-center py-8 md:py-16 px-4">
        <div className="flex flex-col space-y-6 md:space-y-12 xl:pt-8 w-full">
          <h1 className="text-2xl lg:text-5xl text-center font-bold leading-tight text-[#DAE6EA]">
            Invest in <span className="text-[#EC3B3B]">McCoin</span>
            Way to Trade
          </h1>

          <p className="text-lg md:text-2xl text-[#DAE6EA]/80 text-center">
            The global crypto currency exchange
          </p>
          <div className="flex flex-col justify-center items-center lg:flex-row gap-4 lg:m-0">
            <input
              type="email"
              placeholder="Email address"
              className="bg-transparent border border-[#DAE6EA]/70 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Button className="bg-[#FFF] hover:text-white hover:bg-[#07153b] border-2 hover:border-[#FFF] border-[#EC3B3B] text-[#07153b] px-8 py-6 text-lg group">
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
        <RetroCinemaSwiper />
      </div>

      <div className="relative z-20">
        <Screener/>
        {/* <Ticker/> */}
      </div>
    </section>
  );
}
