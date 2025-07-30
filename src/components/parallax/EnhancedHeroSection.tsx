import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import AdvancedParallax from './AdvancedParallax';
import ScrollReveal from './ScrollReveal';
import ParallaxBackground, { backgroundPresets } from './ParallaxBackground';
import RollingParallax, { RollingObjects } from './RollingParallax';
import HorizontalScrollParallax, { CinematicTextReveal } from './HorizontalScrollParallax';

export default function EnhancedHeroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Hero text transformations
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const titleScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const subtitleY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Dynamic Background */}
      <ParallaxBackground elements={backgroundPresets.cosmic} />

      {/* Additional layered background elements */}
      <AdvancedParallax
        speed={0.1}
        scale={[1, 1.2]}
        opacity={[0.3, 0]}
        className="absolute inset-0"
      >
        <div className="absolute top-1/4 left-1/3 w-[30vw] h-[30vw] bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-[60px]" />
      </AdvancedParallax>

      <AdvancedParallax
        speed={0.3}
        x={['-20%', '20%']}
        rotate={[0, 180]}
        className="absolute bottom-1/4 right-1/4"
      >
        <div className="w-[20vw] h-[20vw] bg-gradient-to-r from-cyan-400/15 to-pink-400/15 rounded-full blur-[40px]" />
      </AdvancedParallax>

      {/* Floating geometric shapes */}
      <AdvancedParallax
        speed={0.4}
        rotate={[0, 360]}
        scale={[0.8, 1.2]}
        className="absolute top-1/3 right-1/5"
      >
        <div className="w-16 h-16 border border-cyan-400/30 rotate-45 backdrop-blur-sm" />
      </AdvancedParallax>

      <AdvancedParallax
        speed={0.2}
        x={['20%', '-20%']}
        rotate={[0, -180]}
        className="absolute bottom-1/3 left-1/5"
      >
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500/40 to-pink-500/40 rounded-full backdrop-blur-sm" />
      </AdvancedParallax>

      {/* Rolling Objects */}
      <RollingObjects.Ball
        direction="right"
        speed={0.8}
        size={40}
        color="bg-gradient-to-r from-cyan-400/60 to-blue-500/60"
        className="absolute top-1/4 left-0"
        style={{ transform: 'translateX(-50px)' }}
      />

      <RollingObjects.Wheel
        direction="left"
        speed={0.6}
        size={60}
        spokes={6}
        className="absolute bottom-1/4 right-0"
        style={{ transform: 'translateX(50px)' }}
      />

      <RollingObjects.Gear
        direction="right"
        speed={0.4}
        size={50}
        teeth={8}
        className="absolute top-2/3 left-1/3"
      />

      {/* Horizontal Sliding Elements */}
      <HorizontalScrollParallax direction="left" speed={0.3} className="absolute top-1/6 right-1/4">
        <div className="w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg backdrop-blur-sm border border-white/10" />
      </HorizontalScrollParallax>

      <HorizontalScrollParallax
        direction="right"
        speed={0.5}
        className="absolute bottom-1/6 left-1/4"
      >
        <div className="w-16 h-16 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rotate-45 backdrop-blur-sm" />
      </HorizontalScrollParallax>

      {/* Main Content */}
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          style={{
            y: titleY,
            scale: titleScale,
            opacity: titleOpacity,
          }}
          className="mb-6"
        >
          <h1 className="text-6xl md:text-8xl font-bold leading-tight">
            <CinematicTextReveal
              text="McCoin"
              className="block bg-clip-text text-transparent bg-gradient-to-r from-[#ec3b3b]/90 via-[#ec3b3b]/90 to-[#ec3b3b]/90"
            />
            <CinematicTextReveal text="Experiences" className="block text-white mt-2" />
            <CinematicTextReveal
              text="That Matter"
              className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 mt-2"
            />
          </h1>
        </motion.div>

        <motion.div
          style={{
            y: subtitleY,
            opacity: subtitleOpacity,
          }}
          className="max-w-2xl mx-auto mb-12"
        >
          <p className="text-xl md:text-2xl text-white/80 leading-relaxed">
            We craft extraordinary digital experiences that bridge the gap between imagination and
            reality, creating solutions that inspire and transform.
          </p>
        </motion.div>

        {/* Staggered Action Buttons */}
        <ScrollReveal
          variant="slideUp"
          delay={0.8}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)',
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-lg shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
          >
            Explore Our Work
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.05,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full border-2 border-white/30 text-white font-semibold text-lg backdrop-blur-sm hover:bg-white/5 transition-all duration-300"
          >
            Learn More
          </motion.button>
        </ScrollReveal>

        {/* Scroll Indicator */}
        <ScrollReveal
          variant="fade"
          delay={1.2}
          className="absolute -bottom-24 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 text-white/60"
          >
            <span className="text-sm font-medium">Scroll to explore</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1 h-3 bg-white/60 rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </ScrollReveal>
      </div>

      {/* Ambient lighting effects */}
      <AdvancedParallax
        speed={0.05}
        scale={[1, 1.1]}
        opacity={[0.1, 0.05]}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-radial from-cyan-500/10 via-transparent to-transparent" />
      </AdvancedParallax>
    </section>
  );
}
