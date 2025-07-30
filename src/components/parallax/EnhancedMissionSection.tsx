import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import AdvancedParallax from './AdvancedParallax';
import ScrollReveal, { StaggeredReveal } from './ScrollReveal';
import ParallaxBackground from './ParallaxBackground';
import RollingParallax, { RollingObjects } from './RollingParallax';
import HorizontalScrollParallax from './HorizontalScrollParallax';

const missionPoints = [
  {
    title: 'Democratizing Technology',
    description: 'Making cutting-edge solutions accessible to everyone',
    icon: '🌍',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    title: 'Bridging Divides',
    description: 'Connecting communities through innovative platforms',
    icon: '🌉',
    color: 'from-purple-500 to-pink-600',
  },
  {
    title: 'Sustainable Solutions',
    description: 'Building for tomorrow while respecting today',
    icon: '♻️',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    title: 'Meaningful Impact',
    description: 'Creating technology that truly matters',
    icon: '❤️',
    color: 'from-orange-500 to-red-600',
  },
];

const backgroundElements = [
  {
    id: 'mission-bg1',
    size: 'w-[50vw] h-[50vw]',
    color: 'bg-gradient-to-r from-cyan-500/8 to-purple-500/8',
    position: { top: '10%', right: '5%' },
    speed: 0.2,
    blur: 'blur-[100px]',
    opacity: 0.6,
    rotate: true,
    scale: [0.8, 1.2] as [number, number],
  },
  {
    id: 'mission-bg2',
    size: 'w-[35vw] h-[35vw]',
    color: 'bg-gradient-to-r from-emerald-500/10 to-cyan-500/10',
    position: { bottom: '15%', left: '10%' },
    speed: 0.4,
    blur: 'blur-[80px]',
    opacity: 0.4,
    rotate: false,
    scale: [1.1, 0.9] as [number, number],
  },
];

export default function EnhancedMissionSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const floatingY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex items-center relative py-24 overflow-hidden"
    >
      {/* Dynamic Background */}
      <ParallaxBackground elements={backgroundElements} />

      {/* Floating decorative elements */}
      <AdvancedParallax
        speed={0.3}
        x={['-30%', '30%']}
        rotate={[0, 360]}
        scale={[0.8, 1.2]}
        className="absolute top-1/4 left-1/6"
      >
        <div className="w-20 h-20 border-2 border-cyan-400/20 rounded-lg rotate-45 backdrop-blur-sm" />
      </AdvancedParallax>

      <AdvancedParallax
        speed={0.4}
        y={['-20%', '20%']}
        rotate={[0, -180]}
        className="absolute bottom-1/3 right-1/8"
      >
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full backdrop-blur-sm" />
      </AdvancedParallax>

      {/* Rolling Mission Elements */}
      <RollingObjects.Ball
        direction="left"
        speed={0.7}
        size={35}
        color="bg-gradient-to-r from-emerald-400/50 to-teal-500/50"
        className="absolute top-1/6 right-0"
        style={{ transform: 'translateX(40px)' }}
      />

      <RollingObjects.Gear
        direction="right"
        speed={0.5}
        size={45}
        teeth={10}
        className="absolute bottom-1/6 left-0"
        style={{ transform: 'translateX(-40px)' }}
      />

      {/* Horizontal sliding mission cards */}
      <HorizontalScrollParallax direction="right" speed={0.2} className="absolute top-1/3 left-1/6">
        <div className="w-32 h-8 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full backdrop-blur-sm border border-white/5" />
      </HorizontalScrollParallax>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <ScrollReveal variant="slideRight" duration={0.8}>
              <h2 className="text-5xl md:text-6xl font-bold leading-tight">
                Our{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                  Mission
                </span>
              </h2>
            </ScrollReveal>

            <ScrollReveal variant="slideRight" delay={0.2} duration={0.8}>
              <p className="text-xl text-white/80 leading-relaxed">
                To empower businesses and individuals through innovative digital solutions that
                solve real problems and create lasting impact in our interconnected world.
              </p>
            </ScrollReveal>

            <div className="space-y-6">
              <StaggeredReveal staggerDelay={0.1} variant="slideLeft">
                {missionPoints.map((point, index) => (
                  <div key={index} className="group">
                    <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300">
                      <div className="flex-shrink-0">
                        <div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-r ${point.color} flex items-center justify-center text-xl`}
                        >
                          {point.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                          {point.title}
                        </h3>
                        <p className="text-white/70">{point.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </StaggeredReveal>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <AdvancedParallax
              speed={0.2}
              scale={[0.9, 1.1]}
              rotate={[0, 5]}
              className="relative z-10"
            >
              <div className="aspect-square rounded-3xl overflow-hidden border border-white/20 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-lg p-8">
                {/* Grid of animated elements */}
                <div className="grid grid-cols-3 gap-4 h-full">
                  {Array.from({ length: 9 }, (_, i) => (
                    <ScrollReveal key={i} variant="scale" delay={i * 0.05} className="h-full">
                      <motion.div
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        }}
                        className="h-full rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group cursor-pointer transition-all duration-300"
                      >
                        <motion.div
                          animate={{
                            rotate: [0, 180, 360],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.2,
                            ease: 'easeInOut',
                          }}
                          className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg opacity-60 group-hover:opacity-100 transition-opacity"
                        />
                      </motion.div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </AdvancedParallax>

            {/* Floating accent elements */}
            <AdvancedParallax
              speed={0.6}
              x={['20%', '-20%']}
              rotate={[0, 360]}
              className="absolute -top-8 -left-8"
            >
              <div className="w-24 h-24 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-full blur-sm" />
            </AdvancedParallax>

            <AdvancedParallax
              speed={0.3}
              y={['10%', '-10%']}
              rotate={[0, -90]}
              className="absolute -bottom-6 -right-6"
            >
              <div className="w-16 h-16 border-2 border-purple-400/30 rounded-lg rotate-45" />
            </AdvancedParallax>
          </div>
        </div>

        {/* Bottom call-to-action */}
        <ScrollReveal variant="slideUp" delay={0.8} className="text-center mt-48">
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: '0 20px 40px rgba(139, 92, 246, 0.3)',
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold text-lg shadow-lg transition-all duration-300"
          >
            Join Our Mission
          </motion.button>
        </ScrollReveal>
      </div>
    </section>
  );
}
