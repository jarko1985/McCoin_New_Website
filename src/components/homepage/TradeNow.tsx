import Image from "next/image"
import { Button } from "../ui/button"
import RED_GLOBE from '@/../public/images/red_globe.png'

const TradeNow = () => {
  return (
    <section className="relative bg-[#050E27] rounded-2xl overflow-hidden flex flex-col lg:flex-row items-center justify-between xl:max-w-[70%] mx-auto px-6 lg:px-12 py-12 gap-8 my-12">
      <div className="z-10 text-center lg:text-left max-w-lg">
        <h1 data-aos="fade-right" className="text-[#DAE6EA] font-semibold text-2xl sm:text-3xl lg:text-4xl leading-snug mb-6">
          Explore the Crypto World <br className="hidden sm:block" />
          with Mccoin
        </h1>
        <Button data-aos="fade-right" className="bg-[#EC3B3B] text-white font-medium px-6 py-2 rounded-lg hover:bg-[#d53131] transition cursor-pointer">
          Trade now
        </Button>
      </div>
      <div className="absolute right-0 w-[35%] h-full hidden lg:block">
        <Image
          src={RED_GLOBE}
          alt="Red Globe"
          fill
          className="object-cover object-top-left"
          priority
          data-aos="fade-left"
        />
      </div>
    </section>
  )
}

export default TradeNow
