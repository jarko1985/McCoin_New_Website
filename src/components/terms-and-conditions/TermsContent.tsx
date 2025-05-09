"use client"
import { FiArrowRight } from 'react-icons/fi'
import { termsAndConditionsData } from '../../../utils/data'
import DownloadPDF from '../shared/DownloadPDF'

const TermsContent = () => {
  return (
    <section className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
       <div className='flex items-end justify-end mb-6'><DownloadPDF fileName='terms-and-conditions.pdf' buttonText='Download PDF'/></div>
      <div className="flex flex-col gap-8">
        {termsAndConditionsData.map((para) => (
          <div
            key={para.id}
            className="bg-gradient-to-br from-[#07153B]/80 to-[#0A1E4F]/80 rounded-2xl p-6 sm:p-8 shadow-2xl border border-[#3A4F7A]/50 hover:border-[#4A6B9A]"
            data-aos="fade-up"
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="text-[#EC3B3B] mt-1">
                <FiArrowRight className="text-xl" />
              </div>
              <h2 className="lg:text-2xl text-[1.25rem] font-bold text-[#DAE6EA] tracking-tight">
                {para.title}
              </h2>
            </div>

            <div className="pl-9 space-y-4 text-[#DAE6EA]/90">
              {para.description.split('\n\n').map((text, i) => (
                <p
                  key={i}
                  className="lg:text-[1rem] text-[0.875rem] leading-relaxed"
                >
                  {text.startsWith('• ') ? (
                    <span className="flex items-start">
                      <span className="text-[#EC3B3B] mr-3 mt-1 text-xl">•</span>
                      <span>{text.substring(2)}</span>
                    </span>
                  ) : (
                    text
                  )}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TermsContent