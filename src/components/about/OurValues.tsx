"use client";
import { motion } from "framer-motion";
import { JSX } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
const values = [
    { name: "Security" },
    { name: "Innovation" },
    { name: "Transparency" },
    { name: "Community" },
  ];
  const getValueIcon = (valueName: string, isFlipped = false) => {
    const color = isFlipped ? "text-white" : "text-white";
  
    const icons: Record<string, JSX.Element> = {
      Security: isFlipped ? (
        <svg
          className={`w-8 h-8 ${color}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ) : (
        <svg
          className={`w-8 h-8 ${color}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
      Innovation: isFlipped ? (
        <svg
          className={`w-8 h-8 ${color}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
      ) : (
        <svg
          className={`w-8 h-8 ${color}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      Transparency: isFlipped ? (
        <svg
          className={`w-8 h-8 ${color}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ) : (
        <svg
          className={`w-8 h-8 ${color}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      ),
      Community: isFlipped ? (
        <svg
          className={`w-8 h-8 ${color}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ) : (
        <svg
          className={`w-8 h-8 ${color}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
    };
  
    return (
      icons[valueName] || (
        <svg
          className={`w-8 h-8 ${color}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      )
    );
  };
  const getValueDescription = (valueName: string) => {
    switch (valueName) {
      case "Security":
        return "Enterprise-grade protection for all transactions and user data";
      case "Innovation":
        return "Pioneering new approaches in decentralized finance";
      case "Transparency":
        return "Open and clear operations with verifiable on-chain data";
      case "Community":
        return "Collaborative ecosystem that empowers all participants";
      default:
        return "Core principle that drives our platform forward";
    }
  };  
const OurValues = () => {
   
  return (
    <section className="py-16 px-4 md:px-0 bg-[#07153B]/80">
    <div className="mx-auto xl:max-w-[70%]">
      <h2 className="text-3xl text-white font-bold text-center mb-16">
        Our Core <span className="text-[#EC3B3B]">Values</span> 
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {values.map((value, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="bg-transparent border-white/20 hover:border-white transition-all duration-300 h-full group">
              <CardHeader className="flex flex-col items-center">
                <div className="relative mb-6 w-16 h-16 perspective-1000">
                  <div className="relative w-full h-full preserve-3d transform-style-3d transition-transform duration-700 rotate-y-0 group-hover:rotate-y-180">
                    <div
                      className="absolute inset-0 bg-[#07153B] border border-white rounded-full flex items-center justify-center backface-hidden"
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      {getValueIcon(value.name)}
                    </div>
                    <div
                      className="absolute inset-0 bg-[#EC3B3B] rounded-full flex items-center justify-center rotate-y-180 border border-white"
                    //   style={{ backfaceVisibility: "hidden" }}
                    >
                      {getValueIcon(value.name, true)}
                    </div>
                  </div>
                </div>
                <CardTitle className="text-white text-center text-xl">
                  {value.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center px-6 pb-6">
                <p className="text-[#DAE6EA]/80">
                  {getValueDescription(value.name)}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
  )
}

export default OurValues