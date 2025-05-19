'use client';

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function PodcastBanner() {
  return (
    <section className="bg-[#07153b] py-16 px-4">
      <div className="xl:max-w-[70%] mx-auto flex flex-col lg:flex-row items-center justify-between relative">
        
        {/* Image container with relative layout */}
        <div className="relative w-[320px] h-[380px]">
          {/* Man Image */}
          <Image
            data-aos="fade-right"
            src="/images/man_resized.png"
            alt="Podcast Host"
            width={320}
            height={380}
            className="z-10"
          />

          {/* Mic Image sliding down to mouth level (beside, not overlapping) */}
          <div
            data-aos="fade-down"
            className="absolute top-12 right-0"
          >
            <Image
              src="/images/mic_resized.png"
              alt="Microphone"
              width={90}
              height={90}
            />
          </div>
        </div>

        {/* Text and Button */}
        <div  data-aos="fade-left" className="text-center lg:text-left max-w-xl space-y-6">
          <h2 className="text-4xl font-bold text-[#DAE6EA]">
            🎙️ Tune Into McCoin Talks
          </h2>
          <p className="text-[#DAE6EA]/80 text-lg">
            Discover expert insights, crypto trends, and market news in our exclusive podcast series.
          </p>
          <Button
            className="bg-[#EC3B3B] text-white hover:bg-[#DAE6EA] hover:text-[#07153b]"
            onClick={() => window.location.href = "/podcasts"}
          >
            Visit Podcast Page
          </Button>
        </div>
      </div>
    </section>
  );
}
