'use client'

import { motion } from 'framer-motion'
import { Rocket, Globe } from 'lucide-react'
import { cn } from '@/lib/utils'

export const MissionVisionSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#07153B] text-[#DAE6EA]">
      {/* Background curve divider */}
      <svg
        className="absolute inset-0 w-full h-full z-0"
        viewBox="0 0 1440 600"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,0 C400,300 1000,300 1440,0 L1440,600 L0,600 Z"
          fill="#EC3B3B"
        />
      </svg>

      {/* Content wrapper */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-10">
        {/* Mission Block */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="bg-[#EC3B3B] rounded-xl shadow-xl p-8 md:p-10 flex flex-col gap-6"
        >
          <div className="flex items-center gap-3 text-white">
            <Rocket className="w-8 h-8" />
            <h2 className="text-3xl font-bold">Our Mission</h2>
          </div>
          <p className="text-lg">
            At McCoin, our mission is to make crypto trading secure, useful, and accessible; blending everyday life with cutting-edge finance.
          </p>
          <p className="text-base">
            We stand for continuous learning, neotric innovation, agility in a fast-changing world, and reliability as the foundation of trust.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-base">
            <li>
              <strong>Learning</strong> through empowerment and continuous education.
            </li>
            <li>
              <strong>Usefulness</strong> in everyday life, business collaboration, and seamless transactions.
            </li>
            <li>
              <strong>Neotric innovation</strong> that leads and defines financial trends.
            </li>
            <li>
              <strong>Agility</strong> to adapt and scale; <strong>reliability</strong> as our trusted foundation.
            </li>
          </ul>
        </motion.div>

        {/* Vision Block */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="bg-[#07153B] border border-[#EC3B3B] rounded-xl shadow-xl p-8 md:p-10 flex flex-col gap-6"
        >
          <div className="flex items-center gap-3 text-[#EC3B3B]">
            <Globe className="w-8 h-8" />
            <h2 className="text-3xl font-bold text-white">Our Vision</h2>
          </div>
          <p className="text-lg text-[#DAE6EA]">
            Our vision is to redefine crypto trading as a trusted, inclusive, and innovation-driven gateway for the world.
          </p>
          <p className="text-base text-[#DAE6EA]">
            From Dubai to the globe, McCoin connects traders with secure technology, transparency, and the agility to adapt to tomorrow.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-base text-[#DAE6EA]">
            <li>
              <strong>Global Inclusion:</strong> a crypto exchange built for everyone, everywhere.
            </li>
            <li>
              <strong>Innovation Leadership:</strong> driving neotric solutions that shape the future of finance.
            </li>
            <li>
              <strong>Agility & Growth:</strong> scaling with market needs while empowering users.
            </li>
            <li>
              <strong>Reliability as Foundation:</strong> secure, regulated, and trusted at every step.
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
