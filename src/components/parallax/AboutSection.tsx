import SectionWrapper from './SectionWrapper';
import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <SectionWrapper id="about" className="bg-gradient-to-b from-gray-900/50 to-gray-900">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:w-1/2"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              About <span className="text-cyan-400">Us</span>
            </h2>
            <p className="text-xl text-white/80 mb-8">
              We're a global team of designers, engineers, and strategists united by our passion for
              creating meaningful digital experiences.
            </p>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-cyan-400/10 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-cyan-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Global Presence</h3>
                  <p className="text-white/70">
                    Teams across 12 countries serving clients worldwide
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-purple-400/10 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Innovation Focus</h3>
                  <p className="text-white/70">30+ patents and industry-first solutions</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="md:w-1/2"
          >
            <div className="aspect-video rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg">
              <div className="grid grid-cols-2 grid-rows-2 h-full">
                {[1, 2, 3, 4].map(item => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: item * 0.1 }}
                    className={`border border-white/5 ${
                      item === 1
                        ? 'bg-cyan-400/10'
                        : item === 2
                        ? 'bg-purple-400/10'
                        : item === 3
                        ? 'bg-amber-400/10'
                        : 'bg-emerald-400/10'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
