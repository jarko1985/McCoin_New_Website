"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { JSX, useEffect, useState } from "react";

const FloatingCryptoSymbols = () => {
  const [symbols, setSymbols] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      size: number;
      rotate: number;
      char: string;
    }>
  >([]);

  useEffect(() => {
    // Generate symbols on client side only
    const generatedSymbols = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 12, // Larger size range (12-32px)
      rotate: Math.random() * 360,
      char: Math.random() > 0.5 ? "₿" : "Ξ",
    }));
    setSymbols(generatedSymbols);
  }, []);

  if (symbols.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {symbols.map((symbol) => (
        <motion.div
          key={symbol.id}
          className="absolute text-[#EC3B3B]"
          initial={{
            opacity: 0,
          }}
          animate={{
            x: [symbol.x, Math.random() * 100, symbol.x],
            y: [symbol.y, Math.random() * 100, symbol.y],
            rotate: [symbol.rotate, symbol.rotate + 360],
            opacity: [1, 1, 1], // More visible opacity range
          }}
          transition={{
            duration: 3 + Math.random() * 1, // Slower movement
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
          style={{
            fontSize: `${symbol.size}px`,
            left: `${symbol.x}%`,
            top: `${symbol.y}%`,
            filter: "drop-shadow(0 0 2px rgba(236, 59, 59, 0.5))", // Glow effect
            zIndex: 0,
          }}
        >
          {symbol.char}
        </motion.div>
      ))}
    </div>
  );
};
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
const AboutHero = () => {
  const team = [
    {
      name: "Kasra Taghavi",
      role: "Co-Founder | Director",
      bio: "Blockchain pioneer with 10+ years in crypto markets",
      avatar: "/images/team/kasra.png",
    },
    {
      name: "Kiyan Taghavi",
      role: "Co-Founder | CEO",
      bio: "Former lead engineer at major crypto exchange",
      avatar: "/images/team/kiyan.png",
    },
    {
      name: "Sunil Nair",
      role: "CISO",
      bio: "Chief Information Security Officer with 15+ years in cybersecurity",
      avatar: "/images/team/sunil.png",
    },
    {
      name: "Vahid Sobati",
      role: "Operations Manager",
      bio: "Operations Manager with 10+ years in crypto markets",
      avatar: "/images/team/vahid.png",
    },
    {
      name: "Mohamed Elsayed",
      role: "CIO",
      bio: "Chief Information Officer with 10+ years in Blockchain",
      avatar: "/images/team/moe.png",
    },
  ];

  const values = [
    { name: "Security" },
    { name: "Innovation" },
    { name: "Transparency" },
    { name: "Community" },
  ];

  return (
    <div className="min-h-screen bg-[#07153B] text-[#DAE6EA] relative">
      <section className="relative py-20 px-4 overflow-hidden z-10">
        <FloatingCryptoSymbols />

        <div className="max-w-6xl mx-auto text-center relative -z-10">
          <motion.h1
            initial={{ opacity: 1, y: 1 }}
            animate={{ opacity: 1, y: 1 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Revolutionizing{" "}
            <span className="text-[#EC3B3B]">Crypto Trading</span>
          </motion.h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
            Secure, fast, and transparent trading for the future of finance
          </p>
          <Button className="bg-[#EC3B3B] hover:bg-[#EC3B3B]/90 text-white px-8 py-6 text-lg">
            Meet The McCoiners
          </Button>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-[#07153B] border border-[#EC3B3B]/30 rounded-xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4 text-[#EC3B3B]">
              Our Mission
            </h2>
            <p className="text-lg">
              To empower traders with cutting-edge crypto solutions, ensuring
              security, speed, and profitability through innovative blockchain
              technology.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-[#07153B] border border-[#EC3B3B]/30 rounded-xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4 text-[#EC3B3B]">
              Our Vision
            </h2>
            <p className="text-lg">
              Becoming the most trusted and technologically advanced crypto
              trading platform worldwide, bridging traditional finance with
              decentralized innovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 bg-[#07153B]/80">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">
            Our Core Values
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
                          className="absolute inset-0 bg-[#EC3B3B] rounded-full flex items-center justify-center rotate-y-180 backface-hidden"
                          style={{ backfaceVisibility: "hidden" }}
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

      {/* Team */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">Meet Our Team</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              whileHover="hover"
              initial="rest"
              className="perspective-1000 h-80"
            >
              <motion.div
                variants={{
                  rest: { rotateX: 0 },
                  hover: { rotateX: 180 },
                }}
                transition={{ duration: 0.6 }}
                className="relative w-full h-full rounded-xl shadow-lg preserve-3d"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Front */}
                <div
                  className="cursor-pointer absolute inset-0 bg-[#07153B] border border-white rounded-xl p-6 flex flex-col items-center justify-center backface-hidden"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <Avatar className="w-24 h-24 mb-4 border-2 border-[#EC3B3B]">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-[#EC3B3B]">{member.role}</p>
                  <p className="text-sm mt-2 text-center">Hover to flip</p>
                </div>

                {/* Back */}
                <div
                  className="cursor-pointer absolute inset-0 bg-white rounded-xl p-6 flex flex-col items-center justify-center backface-hidden"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateX(180deg)",
                  }}
                >
                  <h3 className="text-xl font-bold text-[#07153B]">
                    {member.name}
                  </h3>
                  <p className="text-[#07153B] mb-4">{member.role}</p>
                  <p className="text-[#07153B] text-center">{member.bio}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutHero;
