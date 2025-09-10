"use client";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, HeartPulse, DollarSign, Users } from "lucide-react";
import { useTranslations } from 'next-intl';

const getPerksData = (t: any) => [
  {
    title: t('perks.learning_growth.title'),
    description: t('perks.learning_growth.description'),
    icon: <BookOpen className="w-8 h-8" />,
    details: t.raw('perks.learning_growth.details'),
    bgColor: "bg-[#EC3B3B]/10",
    borderColor: "border-[#EC3B3B]/30",
    hoverColor: "hover:bg-[#EC3B3B]/15"
  },
  {
    title: t('perks.health_wellness.title'),
    description: t('perks.health_wellness.description'),
    icon: <HeartPulse className="w-8 h-8" />,
    details: t.raw('perks.health_wellness.details'),
    bgColor: "bg-[#07153B]/10",
    borderColor: "border-[#07153B]/30",
    hoverColor: "hover:bg-[#07153B]/15"
  },
  {
    title: t('perks.financial_benefits.title'),
    description: t('perks.financial_benefits.description'),
    icon: <DollarSign className="w-8 h-8" />,
    details: t.raw('perks.financial_benefits.details'),
    bgColor: "bg-[#DAE6EA]",
    borderColor: "border-[#DAE6EA]/50",
    hoverColor: "hover:bg-[#DAE6EA]/90"
  },
  {
    title: t('perks.team_culture.title'),
    description: t('perks.team_culture.description'),
    icon: <Users className="w-8 h-8" />,
    details: t.raw('perks.team_culture.details'),
    bgColor: "bg-[#EC3B3B]/5",
    borderColor: "border-[#EC3B3B]/20",
    hoverColor: "hover:bg-[#EC3B3B]/10"
  }
];

const Perks = () => {
  const t = useTranslations('Careers.Perks');
  const perks = getPerksData(t);
  
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#07153B] mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-[#07153B]/80 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {perks.map((perk, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`relative rounded-xl border ${perk.borderColor} ${perk.bgColor} ${perk.hoverColor} transition-all duration-300 overflow-hidden`}
            >
              <div className="p-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" 
                  style={{ backgroundColor: perk.title === "Financial Benefits" ? "#07153B" : "#EC3B3B" }}>
                  {perk.icon}
                </div>
                <h3 className="text-xl font-bold text-[#07153B] mb-2">{perk.title}</h3>
                <p className="text-[#07153B]/80 mb-4">{perk.description}</p>
                
                <AnimatePresence>
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    whileHover={{ 
                      height: "auto",
                      opacity: 1,
                      transition: { 
                        duration: 0.3,
                        ease: "easeOut"
                      } 
                    }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t border-[#07153B]/10">
                      <ul className="space-y-2">
                        {perk.details.map((detail: string, i: number) => (
                          <motion.li 
                            key={i}
                            initial={{ x: -10, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.05 + 0.2 }}
                            className="flex items-start text-[#07153B]"
                          >
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#EC3B3B] mt-2 mr-2"></span>
                            {detail}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Perks;