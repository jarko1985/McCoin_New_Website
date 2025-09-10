"use client"
import React, { useState, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { FaMinus, FaPlus } from 'react-icons/fa';
import DownloadPDF from '../shared/DownloadPDF';
import { useTranslations } from 'next-intl';

// Helper function to get risk disclosure data with translations
const getRiskDisclosureData = (t: any) => [
  {
    id: 1,
    title: t('sections.section1.title'),
    description: t('sections.section1.description')
  },
  {
    id: 2,
    title: t('sections.section2.title'),
    description: t('sections.section2.description')
  },
  {
    id: 3,
    title: t('sections.section3.title'),
    description: t('sections.section3.description')
  },
  {
    id: 4,
    title: t('sections.section4.title'),
    description: t('sections.section4.description')
  },
  {
    id: 5,
    title: t('sections.section5.title'),
    description: t('sections.section5.description')
  },
  {
    id: 6,
    title: t('sections.section6.title'),
    description: t('sections.section6.description')
  },
  {
    id: 7,
    title: t('sections.section7.title'),
    description: t('sections.section7.description')
  },
  {
    id: 8,
    title: t('sections.section8.title'),
    description: t('sections.section8.description')
  },
  {
    id: 9,
    title: t('sections.section9.title'),
    description: t('sections.section9.description')
  },
  {
    id: 10,
    title: t('sections.section10.title'),
    description: t('sections.section10.description')
  },
  {
    id: 11,
    title: t('sections.section11.title'),
    description: t('sections.section11.description')
  },
  {
    id: 12,
    title: t('sections.section12.title'),
    description: t('sections.section12.description')
  },
  {
    id: 13,
    title: t('sections.section13.title'),
    description: t('sections.section13.description')
  },
  {
    id: 14,
    title: t('sections.section14.title'),
    description: t('sections.section14.description')
  }
];

const RiskDisclosureContent = () => {
  const t = useTranslations('RiskDisclosure');
  const riskDisclosureData = useMemo(() => getRiskDisclosureData(t), [t]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
    
  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  
  return (
    <section className='container mx-auto py-12'>
       <div className='flex items-end justify-end mb-6'><DownloadPDF fileName='risk_disclosure_statement.pdf' buttonText={t('downloadPdf')}/></div>
           <div className="w-full space-y-4">
        {riskDisclosureData.map((faq, index) => (
          <motion.div
            key={faq.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <div 
              className={`border border-gray-500/90 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:border-white ${activeIndex === index ? 'border-white' : ''}`}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="flex justify-between items-center w-full font-semibold text-lg text-[#DAE6EA] px-6 py-4 transition-colors duration-300 bg-[#07153B]/70 hover:bg-[#07153B] cursor-pointer"
              >
                <span className="text-left">{faq.title}</span>
                <motion.span
                  animate={{ rotate: activeIndex === index ? 0 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-4 text-[#EC3B3B]"
                >
                  {activeIndex === index ? <FaMinus /> : <FaPlus />}
                </motion.span>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 pt-4 text-[#DAE6EA]/90 bg-[#07153B]/40 border-t border-[#FFF]/20">
                    <div className="whitespace-pre-line">{faq.description}</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  )
}

export default RiskDisclosureContent