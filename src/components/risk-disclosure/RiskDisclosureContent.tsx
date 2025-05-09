"use client"
import React, { useState } from 'react'
import { riskDisclosureData } from '../../../utils/data';
import { AnimatePresence, motion } from 'framer-motion';
import { FaMinus, FaPlus } from 'react-icons/fa';

const RiskDisclosureContent = () => {
     const [activeIndex, setActiveIndex] = useState<number | null>(null);
    
      const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
      };
  return (
    <section className='container mx-auto py-12'>
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
                    <div dangerouslySetInnerHTML={{ __html: faq.description }} />
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