'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface CryptoBox {
  title: string;
  bg: string;
  link: string;
  color: string;
  size: string;
  hoverText: string;
}

export default function Crypto101Hero() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const boxes: CryptoBox[] = [
    {
      title: "What is Bitcoin",
      bg: "bg-[url('/images/bitcoin_academy2.jpeg')]",
      link: "/bitcoin",
      color: "#EC3B3B",
      size: "col-span-4 md:col-span-3 md:row-span-2",
      hoverText: "Discover Bitcoin McCoin Academy"
    },
    {
      title: "What is Blockchain",
      bg: "bg-[url('/images/blockchain.webp')]",
      link: "/blockchain",
      color: "#07153B",
      size: "col-span-4 md:col-span-1",
      hoverText: "explore Blockchain technology"
    },
    {
      title: "What is Smart Contract",
      bg: "bg-[url('/images/smart_contract.jpg')]",
      link: "/smart-contract",
      color: "#DAE6EA",
      size: "col-span-4 md:col-span-1",
      hoverText: "Learn about Smart Contracts"
    }
  ];

  return (
    <header className="w-full overflow-hidden py-4 md:h-[60vh]">
      <div className="grid grid-cols-4 grid-rows-[repeat(3,minmax(180px,1fr))] md:grid-rows-2 gap-4 px-4 h-full">
        {boxes.map((box, index) => (
          <Link 
            href={box.link} 
            key={index} 
            className={`relative ${box.size} h-full min-h-[180px] group`}
          >
            <motion.div
              className={`w-full h-full ${box.bg} bg-cover bg-center rounded-xl shadow-xl overflow-hidden brightness-75 hover:brightness-100 transition-all duration-300`}
              whileHover={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div 
                className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300"
                style={{ mixBlendMode: "multiply" }}
              />
              <motion.div 
                className="absolute top-4 left-4 z-10"
                initial={{ y: 0 }}
                whileHover={{ y: -2 }}
              >
                <h2 
                  className="text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-lg"
                  style={{ textShadow: `0 0 8px ${box.color}`, color: "#DAE6EA" }}
                >
                  {box.title}
                </h2>
              </motion.div>
              <motion.div
                className="absolute inset-0 flex items-center justify-center z-10 px-4"
                initial={{ opacity: 0 }}
                whileHover={{ 
                  opacity: 1,
                  transition: { delay: 0.2, duration: 0.4, ease: "easeOut" }
                }}
              >
                <div className="bg-black/60 p-3 sm:p-4 rounded-lg backdrop-blur-sm max-w-[90%] sm:max-w-[80%] text-center">
                  <p className="text-white text-sm sm:text-base md:text-lg font-medium">
                    {box.hoverText}
                  </p>
                </div>
              </motion.div>
              {isClient && (
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(20)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="absolute text-white opacity-0 group-hover:opacity-100"
                      initial={{ 
                        x: Math.random() * 100,
                        y: Math.random() * 100,
                        rotate: Math.random() * 360
                      }}
                      animate={{
                        x: Math.random() * 100,
                        y: Math.random() * 100,
                        rotate: Math.random() * 360,
                        transition: {
                          duration: 3 + Math.random() * 5,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }
                      }}
                      style={{
                        fontSize: `${Math.random() * 12 + 6}px`,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                    >
                      {Math.random() > 0.5 ? "₿" : "Ξ"}
                    </motion.span>
                  ))}
                </div>
              )}
            </motion.div>
          </Link>
        ))}
      </div>
    </header>
  );
}