import SectionWrapper from './SectionWrapper';
import { motion } from 'framer-motion';
import TiltCard from './TiltCard';

const team = [
  {
    id: 1,
    name: 'Alex Johnson',
    role: 'CEO & Founder',
    bio: 'Visionary leader with 15+ years in tech innovation',
    image: '/team/ceo.jpg',
  },
  {
    id: 2,
    name: 'Sarah Chen',
    role: 'CTO',
    bio: 'Engineering expert focused on scalable architectures',
    image: '/team/cto.jpg',
  },
  {
    id: 3,
    name: 'Michael Rodriguez',
    role: 'Design Director',
    bio: 'Award-winning designer passionate about UX',
    image: '/team/design.jpg',
  },
  {
    id: 4,
    name: 'Priya Patel',
    role: 'Head of Product',
    bio: 'Product strategist bridging business and tech',
    image: '/team/product.jpg',
  },
];

export default function TeamSection() {
  return (
    <SectionWrapper id="team" className="relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-purple-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-cyan-400/10 rounded-full blur-[90px]" />
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Meet Our <span className="text-purple-400">Team</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            The brilliant minds behind our success
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map(member => (
            <TiltCard key={member.id} className="p-6 h-full" glareColor="rgba(168,85,247,0.1)">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center h-full"
              >
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-400/20 p-1 mb-6">
                  <div
                    className="w-full h-full rounded-full bg-gray-700 bg-cover bg-center"
                    style={{ backgroundImage: `url(${member.image})` }}
                  />
                </div>
                <h3 className="text-xl font-semibold text-center">{member.name}</h3>
                <p className="text-purple-400 mb-4 text-center">{member.role}</p>
                <p className="text-center text-white/70">{member.bio}</p>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
