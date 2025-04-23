import Image from "next/image";
import { Button } from "@/components/ui/button";
import PRICECHANGE from "@/../public/images/price_change.svg";
import TOTALVALUE from "@/../public/images/total_value.svg";
import TOTALMARKET from "@/../public/images/total_market.svg";
import HISTORICALMARKET from "@/../public/images/historical_value.svg";
import TradingTicker from "./TradingTicker";
export default function HeroSection() {
  return (
    <section className="container mx-auto xl:w-[73%] min-h-screen overflow-hidden">
      <div className="flex flex-col lg:flex-row justify-between">
      <div className="flex flex-col xl:pt-12">
        <div className="space-y-12">
          <h1 className="text-4xl lg:text-5xl text-center lg:text-left font-bold leading-tight text-[#DAE6EA]/80">
            Invest in <span className="text-[#EC3B3B]">McCoin</span>
            <br /> Way to Trade
          </h1>

          <p className="text-xl md:text-2xl text-[#DAE6EA]/80 text-center lg:text-left">
            The global crypto currency exchange
          </p>
          <div className="flex flex-col lg:flex-row gap-4 mx-auto lg:m-0 max-w-md">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 bg-transparent border border-[#DAE6EA]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#EC3B3B]"
            />
            <Button className="bg-[#EC3B3B] hover:bg-[#EC3B3B]/90 text-white px-8 py-6 text-lg">
              Get Started
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-y-4 pt-6 xl:pt-12 px-4 md:px-0">
        <div>
          <Image
            src={PRICECHANGE}
            alt="price change"
            width={521}
            height={188.5}
          />
        </div>
        <div className="flex gap-x-4">
          <Image
            src={TOTALMARKET}
            alt="total value"
            width={252.2}
            height={188.5}
          />
          <Image
            src={TOTALVALUE}
            alt="total value"
            width={252.2}
            height={188.5}
          />
        </div>
        <div>
          <Image
            src={HISTORICALMARKET}
            alt="Historical Value"
            width={521}
            height={515}
            className="hidden xl:block"
          />
          <div className="absolute inset-0 pointer-events-none hidden xl:block">
            <div
              className="absolute bottom-0 left-0 right-0 h-2/5 
                    bg-gradient-to-t from-[#07153b] to-transparent"
            ></div>

            <div
              className="absolute bottom-0 left-0 right-0 h-2/5
                    [mask-image:linear-gradient(to_top,black_20%,transparent_80%)]
                    backdrop-blur-[2px]"
            ></div>
          </div>
        </div>
      </div>
      </div>
      <TradingTicker/>
    </section>
  );
}
