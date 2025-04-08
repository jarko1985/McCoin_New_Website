import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OurGoalsData } from "../../../utils/data";
import Image from "next/image";

const OurGoals = () => {
  return (
    <section className="container py-12 mx-auto xl:w-[70%]">
      <h1 data-aos="fade-left" className="text-center text-xl md:text-2xl lg:text-3xl text-[#DAE6EA] font-[600] pb-3">
        Our Goals
      </h1>
      <p data-aos="fade-left" className="text-center text-sm lg:text-lg text-[#DAE6EA] pb-5">
        The Global Crypto Currency exchange
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center place-content-center place-items-center md:px-0 px-8">
        {OurGoalsData.map((card) => (
          <Card
            data-aos="flip-left"
            key={card.id}
            className="min-h-[300px] flex flex-col justify-between 
                bg-[#1A2A3A] border border-[#2A3B4C]/70
                transition-all duration-300 ease-in-out
                hover:scale-[1.02] hover:shadow-xl hover:border-[#EC3B3B]/30
                group overflow-hidden relative cursor-pointer"
          >
            {/* Gradient overlay on hover */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-transparent to-[#EC3B33]/10 opacity-0 
                      group-hover:opacity-100 transition-opacity duration-500 z-0"
            />

            <CardHeader className="z-10">
              <CardTitle>
                <div className="p-3 rounded-full bg-[#2A3B4C] group-hover:bg-[#EC3B3B]/20 transition-colors duration-300">
                  <Image
                    src={card.src}
                    width={50}
                    height={50}
                    alt="icon image"
                    className="group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </CardTitle>
            </CardHeader>

            <CardContent className="z-10">
              <h3 className="text-xl font-semibold pb-4">
                {card.title.split(" ").map((word, index) => (
                  <span
                    key={index}
                    className={`transition-colors duration-300 ${
                      index === 0 ? "text-[#DAE6EA]" : "text-[#EC3B3B]"
                    } group-hover:${
                      index === 0 ? "text-white" : "text-[#FF6B6B]"
                    }`}
                  >
                    {word}{" "}
                  </span>
                ))}
              </h3>
              <p className="text-[#DAE6EA] group-hover:text-white/90 transition-colors duration-300">
                {card.description}
              </p>
            </CardContent>

            {/* Animated border bottom */}
            <div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#EC3B3B] 
                      transform origin-left scale-x-0 group-hover:scale-x-100 
                      transition-transform duration-500"
            />
          </Card>
        ))}
      </div>
    </section>
  );
};

export default OurGoals;
