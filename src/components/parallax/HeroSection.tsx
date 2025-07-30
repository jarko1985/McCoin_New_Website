import { motion } from 'framer-motion';
import ParallaxLayer from './ParallaxLayer';
import ScrollIndicator from './ScrollIndicator';

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center relative pt-20 px-4 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <ParallaxLayer speed={0.2} offset={['start start', 'end start']}>
          <div className="absolute top-1/3 right-10 w-[40vw] h-[40vw] bg-cyan-400/10 rounded-full blur-[100px]" />
        </ParallaxLayer>
        <ParallaxLayer speed={0.4} offset={['start start', 'end start']}>
          <div className="absolute bottom-20 left-10 w-[30vw] h-[30vw] bg-purple-500/10 rounded-full blur-[90px]" />
        </ParallaxLayer>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:w-1/2"
          >
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-6 leading-tight">
              We build digital experiences that matter
            </h1>
            <p className="text-xl text-white/80 mb-10">
              Pioneering the future of human-centered design and technology since 2015.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium"
            >
              Explore our work
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="md:w-1/2 relative"
          >
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 backdrop-blur-lg bg-white/5">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
