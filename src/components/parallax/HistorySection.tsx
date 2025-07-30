import SectionWrapper from './SectionWrapper';
import { motion } from 'framer-motion';

const timeline = [
  {
    year: '2015',
    title: 'Founded in a garage',
    description:
      'Started with just three people passionate about changing how people interact with technology.',
  },
  {
    year: '2017',
    title: 'First major client',
    description: 'Landed our first Fortune 500 client, proving our concept at scale.',
  },
  {
    year: '2019',
    title: 'Series A funding',
    description: 'Raised $15M to expand our team and product offerings.',
  },
  {
    year: '2021',
    title: 'Global expansion',
    description: 'Opened offices in three new countries across Europe and Asia.',
  },
  {
    year: '2023',
    title: 'AI platform launch',
    description: 'Introduced our industry-leading AI solutions to democratize machine learning.',
  },
];

export default function HistorySection() {
  return (
    <SectionWrapper id="history" className="bg-gradient-to-b from-transparent to-gray-900/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Our <span className="text-amber-400">Journey</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            From humble beginnings to industry leaders - our story through the years
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-white/20 to-transparent -translate-x-1/2" />

          {/* Timeline items */}
          <div className="space-y-24">
            {timeline.map((item, index) => (
              <div
                key={index}
                className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className="w-full md:w-1/2 px-4 md:px-8">
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: index * 0.1 }}
                    className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10"
                  >
                    <div className="absolute top-6 -left-2 w-4 h-4 bg-amber-400 rounded-full" />
                    <div className="text-amber-400 font-mono mb-2">{item.year}</div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-white/80">{item.description}</p>
                  </motion.div>
                </div>
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
