"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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
const AboutHero = () => {


  return (
    <div className="text-[#DAE6EA] min-h-[40vh] relative">
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
          <Button asChild className="bg-[#EC3B3B] hover:bg-[#EC3B3B]/90 text-white px-8 py-6 text-lg">
            <a href="#team" className="flex items-center gap-2">
          
            Meet The McCoin Team
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AboutHero;
