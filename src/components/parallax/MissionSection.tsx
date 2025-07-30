import { motion } from 'framer-motion';
import SectionWrapper from './SectionWrapper';
import ParallaxLayer from './ParallaxLayer';

export default function MissionSection() {
  return (
    <SectionWrapper id="mission" className="bg-gradient-to-b from-transparent to-gray-900/50">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '0px 0px -100px 0px' }}
            transition={{ duration: 0.7 }}
            className="md:w-1/2"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Our <span className="text-cyan-400">Mission</span>
            </h2>
            <p className="text-xl text-white/80 mb-8">
              To empower businesses and individuals through innovative digital solutions that solve
              real problems.
            </p>
            <div className="space-y-4">
              {[
                'Democratizing technology access',
                'Bridging the digital divide',
                'Creating sustainable solutions',
                'Fostering meaningful connections',
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-8 h-8 rounded-full bg-cyan-400/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-white/90">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '0px 0px -100px 0px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="md:w-1/2 relative"
          >
            <ParallaxLayer speed={0.3}>
              <div className="aspect-square rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-lg p-8">
                <div className="grid grid-cols-2 gap-4 h-full">
                  {[1, 2, 3, 4].map(item => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: item * 0.1 }}
                      className="rounded-xl bg-white/5 border border-white/10 flex items-center justify-center"
                    >
                      <svg
                        className="w-10 h-10 text-cyan-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ParallaxLayer>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
