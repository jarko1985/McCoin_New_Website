import SectionWrapper from './SectionWrapper';
import { motion } from 'framer-motion';
import ParallaxLayer from './ParallaxLayer';

const coreValues = [
  {
    title: 'Integrity',
    description: "We do what's right, not what's easy",
    color: 'from-blue-500 to-cyan-400',
  },
  {
    title: 'Curiosity',
    description: 'We ask questions and challenge assumptions',
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Excellence',
    description: 'We settle for nothing less than exceptional',
    color: 'from-amber-500 to-orange-500',
  },
  {
    title: 'Collaboration',
    description: 'We believe the best work happens together',
    color: 'from-emerald-500 to-teal-400',
  },
];

export default function ValuesSection() {
  return (
    <SectionWrapper id="values" className="relative overflow-hidden">
      <ParallaxLayer speed={0.3} className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/2 left-1/2 w-[80vw] h-[80vw] bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
      </ParallaxLayer>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Core <span className="text-cyan-400">Values</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            The principles that guide every decision we make and every product we build
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={`h-full p-0.5 rounded-2xl bg-gradient-to-br ${value.color}`}>
                <div className="h-full bg-gray-900 rounded-2xl p-6">
                  <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                  <p className="text-white/80">{value.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
