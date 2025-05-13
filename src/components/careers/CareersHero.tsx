"use client";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

const CareersHero = () => {
  const stats = [
    { value: "30K+", label: "People got hired", position: "top-4 -left-4" },
    { value: "800+", label: "Freelancers hired", position: "-bottom-4 -right-4" },
    { label: "It only takes few seconds", position: "top-1/2 -right-10" },
  ];

  return (
    <section className="relative overflow-hidden bg-[#DAE6EA] py-12 md:py-24">
      <div className="xl:max-w-[70%] mx-auto px-4 xl:px-0">
        <div className="flex flex-col items-center gap-12 lg:flex-row">
          {/* Left Content */}
          <div className="flex-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-bold tracking-tight text-[#07153B] md:text-5xl lg:text-6xl">
                Find the job of your{" "}
                <span className="text-[#EC3B3B]">Dreams</span>
              </h1>
              <p className="mt-6 text-lg text-[#07153B]/80 md:text-xl">
                Lorem ipsum dolor sit amet consectetur. Viverra lacinia sed
                praesent pharetra quisque consectetur telius elit. Suspendisse
                ultrices vitae
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex items-center gap-4"
            >
              <div className="flex">
                {[1, 2, 3, 4].map((i) => (
                  <Avatar key={i} className="h-12 w-12 border-2 border-white">
                    <AvatarImage src={`/images/emp${i}.png`} />
                    <AvatarFallback>U{i}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <p className="text-sm font-medium text-[#07153B] md:text-base">
                Over <span className="font-bold">800+</span> people found their
                future with McCoin
              </p>
            </motion.div>
          </div>

          {/* Right Content with Image */}
          <div className="relative flex-1">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative mx-auto h-80 w-80 md:h-96 md:w-96"
            >
              {/* Red Circle Background */}
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <div className="h-full w-full rounded-full bg-[#EC3B3B]/20"></div>
              </div>

              {/* Main image */}
              <div className="relative z-10 h-full w-full">
                <Image
                  src="/images/careers_bg.png"
                  alt="Happy professional"
                  fill
                  className="object-contain"
                />
              </div>

              {/* Floating stats */}
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.5 + index * 0.2,
                    type: "spring",
                    stiffness: 100,
                  }}
                  className={`absolute z-20 rounded-lg bg-white p-3 shadow-lg ${stat.position}`}
                >
                  {stat.value && (
                    <p className="text-xl font-bold text-[#EC3B3B]">
                      {stat.value}
                    </p>
                  )}
                  <p className="text-xs font-medium text-[#07153B] md:text-sm">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareersHero;