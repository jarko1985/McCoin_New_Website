"use client";
import { motion } from "framer-motion";
import { Newspaper } from "lucide-react";

export default function NewsRoomHero() {
//   const newsParticles = [
//     { icon: "✍️", size: 24, x: 10, y: 20, delay: 0.1, duration: 15 },
//     { icon: "📰", size: 32, x: 85, y: 30, delay: 0.3, duration: 18 },
//     { icon: "📅", size: 28, x: 25, y: 70, delay: 0.5, duration: 20 },
//     { icon: "📢", size: 36, x: 75, y: 60, delay: 0.2, duration: 16 },
//     { icon: "🎤", size: 26, x: 50, y: 80, delay: 0.4, duration: 22 },
//     { icon: "📸", size: 30, x: 15, y: 50, delay: 0.6, duration: 19 },
//     { icon: "📊", size: 28, x: 90, y: 10, delay: 0.7, duration: 17 },
//     { icon: "🏆", size: 34, x: 60, y: 40, delay: 0.8, duration: 21 },
//     { icon: "🔊", size: 26, x: 30, y: 15, delay: 0.9, duration: 14 },
//     { icon: "📑", size: 28, x: 70, y: 75, delay: 1.0, duration: 23 },
//   ];

  return (
    <div className="relative h-[30vh] w-full overflow-hidden">
      {/* Background Image with Gradient Overlay
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/images/newsroom_banner.jpeg')",
            backgroundBlendMode: "overlay",
            opacity: 0.9,
          }}
        />
        <div className="absolute inset-0" />
      </div> */}

      {/* Enhanced News-themed Particles */}
      {/* {newsParticles.map((particle, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 1, scale: 0.5 }}
          animate={{
            opacity: [1, 1, 1, 1, 1],
            scale: [1, 1, 1, 1, 1],
            y: [0, -50, 20, -30, 0],
            x: [0, 20, -15, 10, 0],
            rotate: [0, 15, -10, 5, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
          className="absolute text-white z-10 pointer-events-none"
          style={{
            fontSize: `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            filter: "drop-shadow(0 0 8px rgba(236, 59, 59, 0.7))",
          }}
        >
          {particle.icon}
        </motion.div>
      ))} */}

      {/* Hero Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <motion.div
            animate={{
              rotate: [0, 5, -5, 3, 0],
              y: [0, -10, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            <Newspaper className="h-16 w-16 mx-auto text-white mb-6" />
          </motion.div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
           
              News
           
            <span>room</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-8">
            Stay updated with our latest announcements, press releases, and
            McCoin news.
          </p>
        </motion.div>
      </div>

      {/* Animated Headlines - More vibrant */}
      {/* <motion.div
        className="absolute bottom-10 left-0 right-0 overflow-hidden py-3 bg-[#07153b]/20 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <div className="flex whitespace-nowrap">
          <motion.div
            animate={{ x: ["0%", "-100%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex space-x-16 text-white text-lg font-medium"
          >
            {[
              "🚨 Breaking News: Company reaches 1 million users •",
              "📚 New research published in Tech Journal •",
              "👔 CEO featured in Forbes 30 Under 30 •",
              "🆕 Product update: Version 3.0 now available •",
              "🎉 Join us at the upcoming Tech Conference •",
              "🏅 Industry award for innovation received •",
              "🌍 Sustainability report released •",
            ].map((text, i) => (
              <span key={i} className="flex items-center">
                {text}{" "}
                <Megaphone className="h-5 w-5 ml-4 text-[#EC3B3B] animate-pulse" />
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div> */}
    </div>
  );
}
