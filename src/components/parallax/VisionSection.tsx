import { motion } from 'framer-motion';
import TiltCard from './TiltCard';
import SectionWrapper from './SectionWrapper';

export default function VisionSection() {
  return (
    <SectionWrapper id="vision" className="bg-gradient-to-b from-gray-900/50 to-transparent">
      <div className="container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Our <span className="text-purple-400">Vision</span>
          </h2>
          <p className="text-xl text-white/80 mb-8">
            To create a world where technology enhances human potential without compromising our
            humanity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Inclusive Innovation',
              description: 'Building solutions that serve all communities equally',
              icon: '🌍',
            },
            {
              title: 'Ethical Technology',
              description: 'Developing with privacy and ethics at the core',
              icon: '⚖️',
            },
            {
              title: 'Sustainable Growth',
              description: 'Creating systems that scale responsibly',
              icon: '🌱',
            },
          ].map((item, index) => (
            <TiltCard key={index} className="p-8 h-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center h-full"
              >
                <div className="text-5xl mb-6">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-white/80">{item.description}</p>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
