import Image from "next/image";
import React from "react";
import { WhyMcCoinData } from "../../../utils/data";

const WhyMccoin = () => {
  return (
    <section className="container mx-auto xl:w-[70%] pt-24 pb-12 px-4 sm:px-6">
      <h1 className="text-center text-[#DAE6EA] font-[600] text-3xl sm:text-4xl xl:text-[2.225rem]">
        Why Choose McCoin
      </h1>
      <p className="text-center text-[#DAE6EA] font-[400] text-lg sm:text-xl xl:text-[1.5rem] mt-6 mb-12 max-w-3xl mx-auto">
        McCoin combines advanced features, zero-fee trading, and bank-grade
        security—all in one place.
      </p>

      <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
        {WhyMcCoinData.slice(0, 2).map((card) => (
          <div
            key={card.id}
            className="
              bg-gradient-to-r from-[#050E27] to-[#07153b] 
              rounded-lg p-8 flex-1 max-w-md xl:max-w-lg 
              flex flex-col items-center text-center
              transition-all duration-300 ease-in-out
              hover:shadow-lg hover:shadow-[#07153b]/50
              hover:-translate-y-2 hover:scale-[1.02]
              border border-transparent hover:border-[#2a3e6d]
              group
            "
          >
            <div className="mb-6 transition-transform duration-300 group-hover:scale-110">
              <Image
                src={card.imgSRC}
                alt={card.title1}
                width={300}
                height={140}
                className="transition-opacity duration-300 group-hover:opacity-90"
              />
            </div>
            <h1 className="text-[#DAE6EA] font-[600] text-2xl group-hover:text-white">
              {card.title1}{" "}
              <span className="block group-hover:text-[#c8d6e7]">
                {card.title2}
              </span>
            </h1>
            <p className="text-[#8A939B] mt-4 text-lg group-hover:text-[#a0b3c8] transition-colors duration-300">
              {card.paragraph}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {WhyMcCoinData.slice(2).map((card) => (
          <div
            key={card.id}
            className="
              bg-gradient-to-r from-[#050E27] to-[#07153b]
              rounded-lg p-6 flex flex-col items-start text-left
              transition-all duration-300 ease-in-out
              hover:shadow-md hover:shadow-[#07153b]/40
              hover:-translate-y-1 hover:scale-[1.02]
              border border-transparent hover:border-[#2a3e6d]
              group
            "
          >
            <div
              className="
              mb-4 p-3 rounded-lg 
              bg-[#0a1836] group-hover:bg-[#12234a]
              transition-all duration-300
            "
            >
              <Image
                src={card.imgSRC}
                alt={card.title1}
                width={64}
                height={64}
                className="transition-transform duration-500 group-hover:rotate-[180deg]"
              />
            </div>
            <h1 className="text-[#DAE6EA] font-[600] text-xl group-hover:text-white">
              {card.title1}{" "}
              <span className="block group-hover:text-[#c8d6e7]">
                {card.title2}
              </span>
            </h1>
            <p className="text-[#8A939B] mt-2 text-base group-hover:text-[#a0b3c8] transition-colors duration-300">
              {card.paragraph}
            </p>
            <div
              className="
              mt-4 h-1 w-12 bg-[#2a3e6d] 
              transition-all duration-300
              group-hover:w-16 group-hover:bg-[#3d5a9c]
            "
            ></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyMccoin;
