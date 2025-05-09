"use client";
import { motion } from 'framer-motion';
import { FiChevronRight } from 'react-icons/fi';
import { privacyPolicyData, PrivacyPolicyItem } from '../../../utils/data';
import { VscDebugBreakpointLog } from "react-icons/vsc";
import DownloadPDF from '../shared/DownloadPDF';
const PrivacyPolicyContent = () => {
  return (
    <section className="container xl:max-w-[70%] mx-auto py-12 px-4 lg:px-0">
      <p className="text-[#DAE6EA] text-[0.875rem] lg:text-[1.275rem] tracking-wide leading-normal">
        <strong className="font-bold block mb-4 text-[1rem] lg:text-[1.5rem]">Introduction:</strong>
        At McCoin Virtual Assets LLC ("McCoin", "we", "our", or "us"), we are
        committed to respecting your privacy and safeguarding the personal data
        you provide when using our services. This Privacy Policy outlines how we
        collect, store, process, and protect your personal information in
        compliance with the latest Financial Action Task Force (FATF)
        recommendations, the UAE Data Protection Law (2021), and the Virtual
        Assets Regulatory Authority (VARA) regulations. We are dedicated to
        maintaining transparency regarding how we handle your personal
        information and ensuring that we adhere to global standards for privacy,
        security, and legal compliance. By using our services, you consent to
        the practices described in this Privacy Policy. If you disagree with any
        part of this policy, we recommend that you refrain from using our
        services.
      </p>
      
      <div className="mx-auto py-12 space-y-8">
      <div className='pt-2 flex items-end justify-end'><DownloadPDF fileName='privacy-policy.pdf' buttonText='Download PDF'/></div>
      {privacyPolicyData.map((section:PrivacyPolicyItem) => (
        <div
          key={section.id}
          className="bg-gradient-to-br from-[#07153B]/70 to-[#0A1E4F]/70 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-[#3A4F7A]/50 shadow-lg hover:border-[#4A6B9A]"
          data-aos="fade-up"
        >
          <div className="flex items-start gap-3 mb-6">
            <div className="text-[#EC3B3B] mt-1">
              <FiChevronRight className="text-xl" />
            </div>
            <h2 className="text-[1rem] lg:text-[1.5rem] font-bold text-[#DAE6EA] tracking-tight">
              {section.id}. {section.title}
            </h2>
          </div>

          {section.description && (
            <p className="text-[0.875rem] lg:text-[1.275rem] text-[#DAE6EA]/90 mb-6 leading-relaxed">
              {section.description}
            </p>
          )}

          {/* Subsections */}
          <div className="space-y-6 ml-6">
            {section.sections?.map((subsection, subIndex) => (
              <motion.div 
                key={subIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 + (subIndex * 0.05) }}
              >
                {/* Subsection Title */}
                {subsection.title && (
                  <h3 className="text-[1rem] lg:text-[1.5rem] font-semibold text-[#DAE6EA] mb-3">
                    {subsection.title}
                  </h3>
                )}

                {/* Bullet Points */}
                {subsection.bullets && (
                  <ul className="space-y-3">
                    {subsection.bullets.map((bullet, bulletIndex) => (
                      <motion.li
                        key={bulletIndex}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + (bulletIndex * 0.03) }}
                        className="flex items-center gap-x-2 text-[#DAE6EA]/90 leading-relaxed text-[0.875rem] lg:text-[1.275rem]"
                      >
                        <VscDebugBreakpointLog className="text-[#EC3B3B]" size={10} />
                        {/* Bullet Point Text */}
                        <span>{bullet}</span>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>

          {/* Summary Box */}
          {section.summary && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 p-4 bg-[#07153B]/70 rounded-lg border-l-4 border-[#EC3B3B]"
            >
              <p className="text-[#DAE6EA]/80 italic">{section.summary}</p>
            </motion.div>
          )}
        </div>
      ))}
    </div>
    </section>
  );
};

export default PrivacyPolicyContent;
