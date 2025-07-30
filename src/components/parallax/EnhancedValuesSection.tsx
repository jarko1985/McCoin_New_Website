import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import AdvancedParallax from './AdvancedParallax';
import ScrollReveal, { StaggeredReveal } from './ScrollReveal';
import ParallaxBackground, { backgroundPresets } from './ParallaxBackground';

const coreValues = [
  {
    title: 'Integrity',
    description: "We do what's right, not what's easy, building trust through transparency",
    icon: '⚖️',
    color: 'from-blue-500 to-cyan-400',
    delay: 0,
  },
  {
    title: 'Innovation',
    description: 'We push boundaries and challenge conventions to create breakthrough solutions',
    icon: '💡',
    color: 'from-purple-500 to-pink-500',
    delay: 0.1,
  },
  {
    title: 'Excellence',
    description: 'We settle for nothing less than exceptional in everything we create',
    icon: '⭐',
    color: 'from-amber-500 to-orange-500',
    delay: 0.2,
  },
  {
    title: 'Collaboration',
    description: 'We believe the best work happens when diverse minds come together',
    icon: '🤝',
    color: 'from-emerald-500 to-teal-400',
    delay: 0.3,
  },
];

export default function EnhancedValuesSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const gridY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex items-center relative py-24 overflow-hidden"
    >
      {/* Ocean-themed background for values */}
      <ParallaxBackground elements={backgroundPresets.ocean} />

      {/* Floating geometric patterns */}
      <AdvancedParallax
        speed={0.2}
        x={['-40%', '40%']}
        rotate={[0, 90]}
        scale={[0.5, 1.5]}
        className="absolute top-1/6 left-1/4"
      >
        <div className="w-32 h-32 border border-teal-400/20">
          <div className="w-full h-full border border-cyan-400/20 rotate-45 scale-75" />
        </div>
      </AdvancedParallax>

      <AdvancedParallax
        speed={0.4}
        y={['-30%', '30%']}
        rotate={[0, -270]}
        className="absolute bottom-1/4 right-1/6"
      >
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500/20 to-teal-500/20 rounded-full backdrop-blur-sm" />
      </AdvancedParallax>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div style={{ y: titleY }} className="text-center mb-20">
          <ScrollReveal variant="slideDown" duration={1}>
            <h2 className="text-5xl md:text-7xl font-bold mb-6">
              Our{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500">
                Values
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal variant="fade" delay={0.3} duration={0.8}>
            <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              The principles that guide our decisions, shape our culture, and drive our commitment
              to excellence
            </p>
          </ScrollReveal>
        </motion.div>

        {/* Values Grid */}
        <motion.div
          style={{ y: gridY }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {coreValues.map((value, index) => (
            <ScrollReveal
              key={index}
              variant="slideUp"
              delay={value.delay}
              duration={0.8}
              className="h-full"
            >
              <motion.div
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  rotateY: 5,
                }}
                className="group h-full p-8 rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all duration-500 hover:bg-white/10"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Icon with floating animation */}
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: index * 0.5,
                    ease: 'easeInOut',
                  }}
                  className="mb-6"
                >
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${value.color} flex items-center justify-center text-2xl shadow-lg`}
                  >
                    {value.icon}
                  </div>
                </motion.div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                  {value.title}
                </h3>

                <p className="text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                  {value.description}
                </p>

                {/* Hover effect accent */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  className="absolute top-4 right-4 w-3 h-3 bg-cyan-400 rounded-full"
                />
              </motion.div>
            </ScrollReveal>
          ))}
        </motion.div>

        {/* Animated connecting lines */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none">
          {coreValues.map(
            (_, index) =>
              index < coreValues.length - 1 && (
                <AdvancedParallax
                  key={index}
                  speed={0.1 + index * 0.05}
                  opacity={[0.2, 0.6, 0.2]}
                  className="absolute"
                  style={
                    {
                      top: '50%',
                      left: `${25 + index * 25}%`,
                      width: '20%',
                      height: '2px',
                    } as React.CSSProperties
                  }
                >
                  <div className="w-full h-full bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
                </AdvancedParallax>
              ),
          )}
        </div>

        {/* Bottom statement */}
        <ScrollReveal variant="slideUp" delay={0.6} className="text-center mt-20">
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-white/70 italic">
              "These values aren't just words on a wall—they're the foundation of every decision we
              make, every relationship we build, and every solution we create."
            </p>
            <div className="mt-4 w-16 h-1 bg-gradient-to-r from-cyan-400 to-teal-400 mx-auto rounded-full" />
          </div>
        </ScrollReveal>
      </div>

      {/* Ambient particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 6 }, (_, i) => (
          <AdvancedParallax
            key={i}
            speed={0.1 + i * 0.02}
            x={[`${-20 - i * 5}%`, `${20 + i * 5}%`]}
            y={[`${-10 - i * 3}%`, `${10 + i * 3}%`]}
            opacity={[0, 0.3, 0]}
            className="absolute"
            style={
              {
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              } as React.CSSProperties
            }
          >
            <div className="w-2 h-2 bg-cyan-400/40 rounded-full blur-sm" />
          </AdvancedParallax>
        ))}
      </div>
    </section>
  );
}
