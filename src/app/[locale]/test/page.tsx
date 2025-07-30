'use client';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import EnhancedHeroSection from '@/components/parallax/EnhancedHeroSection';
import EnhancedMissionSection from '@/components/parallax/EnhancedMissionSection';
import VisionSection from '@/components/parallax/VisionSection';
import EnhancedValuesSection from '@/components/parallax/EnhancedValuesSection';
import HistorySection from '@/components/parallax/HistorySection';
import TeamSection from '@/components/parallax/TeamSection';
import AboutSection from '@/components/parallax/AboutSection';
export default function AboutPage() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <main className="relative overflow-x-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 z-[-1] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-indigo-900/20 to-gray-900" />
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-purple-500/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 5,
          }}
          className="absolute bottom-1/3 right-1/4 w-[30vw] h-[30vw] bg-cyan-400/10 rounded-full blur-[90px]"
        />
      </div>

      <EnhancedHeroSection />
      <EnhancedMissionSection />
      <VisionSection />
      <EnhancedValuesSection />
      <HistorySection />
      <TeamSection />
      <AboutSection />
    </main>
  );
}
