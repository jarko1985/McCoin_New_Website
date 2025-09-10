"use client"
import { FiArrowRight } from 'react-icons/fi'
import DownloadPDF from '../shared/DownloadPDF'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'

// Helper function to get terms and conditions data with translations
const getTermsAndConditionsData = (t: any) => [
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
  },
  {
    id: 15,
    title: t('sections.section15.title'),
    description: t('sections.section15.description')
  }
];

const TermsContent = () => {
  const t = useTranslations('TermsAndConditions');
  const termsAndConditionsData = useMemo(() => getTermsAndConditionsData(t), [t]);

  return (
    <section className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
       <div className='flex items-end justify-end mb-6'><DownloadPDF fileName='terms-and-conditions.pdf' buttonText={t('downloadPdf')}/></div>
      <div className="flex flex-col gap-8">
        {termsAndConditionsData.map((para) => (
          <div
            key={para.id}
            className="bg-gradient-to-br from-[#07153B]/80 to-[#0A1E4F]/80 rounded-2xl p-6 sm:p-8 shadow-2xl border border-[#3A4F7A]/50 hover:border-[#4A6B9A]"
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
              {para.description.split('\n\n').map((text: string, i: number) => (
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