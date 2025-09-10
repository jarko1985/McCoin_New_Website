'use client';
import { motion } from 'framer-motion';
import { FiChevronRight } from 'react-icons/fi';
import { VscDebugBreakpointLog } from 'react-icons/vsc';
import DownloadPDF from '../shared/DownloadPDF';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

// Helper function to get privacy policy data with translations
const getPrivacyPolicyData = (t: any) => [
  {
    id: 1,
    title: t('sections.section1.title'),
    description: t('sections.section1.description'),
    sections: [
      {
        title: t('sections.section1.subsections.personalIdentification.title'),
        bullets: [
          t('sections.section1.subsections.personalIdentification.bullets.fullName'),
          t('sections.section1.subsections.personalIdentification.bullets.dateOfBirth'),
          t('sections.section1.subsections.personalIdentification.bullets.nationality'),
          t('sections.section1.subsections.personalIdentification.bullets.contactInfo'),
        ],
      },
      {
        title: t('sections.section1.subsections.financialInfo.title'),
        bullets: [
          t('sections.section1.subsections.financialInfo.bullets.bankDetails'),
          t('sections.section1.subsections.financialInfo.bullets.paymentInfo'),
          t('sections.section1.subsections.financialInfo.bullets.transactionHistory'),
        ],
      },
      {
        title: t('sections.section1.subsections.identityVerification.title'),
        bullets: [
          t('sections.section1.subsections.identityVerification.bullets.governmentIds'),
          t('sections.section1.subsections.identityVerification.bullets.proofOfAddress'),
          t('sections.section1.subsections.identityVerification.bullets.biometricData'),
        ],
      },
      {
        title: t('sections.section1.subsections.deviceUsage.title'),
        bullets: [
          t('sections.section1.subsections.deviceUsage.bullets.ipAddress'),
          t('sections.section1.subsections.deviceUsage.bullets.browserDevice'),
          t('sections.section1.subsections.deviceUsage.bullets.cookiesTracking'),
        ],
      },
    ],
  },
  {
    id: 2,
    title: t('sections.section2.title'),
    description: t('sections.section2.description'),
    sections: [
      {
        title: t('sections.section2.subsections.provideServices.title'),
        bullets: [
          t('sections.section2.subsections.provideServices.bullets.facilitateAccess'),
          t('sections.section2.subsections.provideServices.bullets.processTransactions'),
          t('sections.section2.subsections.provideServices.bullets.accountManagement'),
        ],
      },
      {
        title: t('sections.section2.subsections.legalCompliance.title'),
        bullets: [
          t('sections.section2.subsections.legalCompliance.bullets.kyc'),
          t('sections.section2.subsections.legalCompliance.bullets.amlCtf'),
          t('sections.section2.subsections.legalCompliance.bullets.transactionMonitoring'),
          t('sections.section2.subsections.legalCompliance.bullets.regulatoryReporting'),
        ],
      },
      {
        title: t('sections.section2.subsections.improveSecurity.title'),
        bullets: [
          t('sections.section2.subsections.improveSecurity.bullets.enhanceSecurity'),
          t('sections.section2.subsections.improveSecurity.bullets.useEncryption'),
          t('sections.section2.subsections.improveSecurity.bullets.fraudDetection'),
        ],
      },
      {
        title: t('sections.section2.subsections.communicate.title'),
        bullets: [
          t('sections.section2.subsections.communicate.bullets.essentialNotifications'),
          t('sections.section2.subsections.communicate.bullets.serviceUpdates'),
        ],
      },
    ],
    summary: t('sections.section2.summary'),
  },
  {
    id: 3,
    title: t('sections.section3.title'),
    description: t('sections.section3.description'),
    sections: [
      {
        title: t('sections.section3.subsections.identityVerification.title'),
        bullets: [t('sections.section3.subsections.identityVerification.bullets.kycDocuments')],
      },
      {
        title: t('sections.section3.subsections.transactionRecords.title'),
        bullets: [t('sections.section3.subsections.transactionRecords.bullets.transactionData')],
      },
      {
        title: t('sections.section3.subsections.accountInfo.title'),
        bullets: [t('sections.section3.subsections.accountInfo.bullets.accountData')],
      },
    ],
  },
  {
    id: 4,
    title: t('sections.section4.title'),
    description: t('sections.section4.description'),
    sections: [
      {
        title: t('sections.section4.subsections.serviceProviders.title'),
        bullets: [t('sections.section4.subsections.serviceProviders.bullets.thirdPartyProviders')],
      },
      {
        title: t('sections.section4.subsections.regulatoryAuthorities.title'),
        bullets: [
          t('sections.section4.subsections.regulatoryAuthorities.bullets.disclosureToAuthorities'),
        ],
      },
      {
        title: t('sections.section4.subsections.businessTransactions.title'),
        bullets: [
          t('sections.section4.subsections.businessTransactions.bullets.mergerAcquisition'),
        ],
      },
      {
        title: t('sections.section4.subsections.legalCompliance.title'),
        bullets: [t('sections.section4.subsections.legalCompliance.bullets.legalRights')],
      },
    ],
  },
  {
    id: 5,
    title: t('sections.section5.title'),
    description: t('sections.section5.description'),
    sections: [
      {
        bullets: [
          t('sections.section5.subsections.securityMeasures.bullets.encryption'),
          t('sections.section5.subsections.securityMeasures.bullets.accessControl'),
          t('sections.section5.subsections.securityMeasures.bullets.regularAudits'),
        ],
      },
    ],
    summary: t('sections.section5.summary'),
  },
  {
    id: 6,
    title: t('sections.section6.title'),
    description: t('sections.section6.description'),
    sections: [
      {
        bullets: [
          t('sections.section6.subsections.userRights.bullets.rightToAccess'),
          t('sections.section6.subsections.userRights.bullets.rightToRectification'),
          t('sections.section6.subsections.userRights.bullets.rightToDeletion'),
          t('sections.section6.subsections.userRights.bullets.rightToObject'),
          t('sections.section6.subsections.userRights.bullets.rightToPortability'),
          t('sections.section6.subsections.userRights.bullets.rightToWithdraw'),
        ],
      },
    ],
    summary: t('sections.section6.summary'),
  },
  {
    id: 7,
    title: t('sections.section7.title'),
    description: t('sections.section7.description'),
    sections: [
      {
        bullets: [
          t('sections.section7.subsections.cookiesInfo.bullets.cookiesPurpose'),
          t('sections.section7.subsections.cookiesInfo.bullets.consentToCookies'),
          t('sections.section7.subsections.cookiesInfo.bullets.cookieControl'),
        ],
      },
    ],
  },
  {
    id: 8,
    title: t('sections.section8.title'),
    description: t('sections.section8.description'),
    sections: [
      {
        bullets: [
          t('sections.section8.subsections.complianceInfo.bullets.kycCompliance'),
          t('sections.section8.subsections.complianceInfo.bullets.transactionMonitoring'),
          t('sections.section8.subsections.complianceInfo.bullets.amlCtfProcedures'),
          t('sections.section8.subsections.complianceInfo.bullets.varaCompliance'),
        ],
      },
    ],
  },
  {
    id: 9,
    title: t('sections.section9.title'),
    description: t('sections.section9.description'),
    sections: [
      {
        bullets: [
          t('sections.section9.subsections.policyChanges.bullets.updatesReflect'),
          t('sections.section9.subsections.policyChanges.bullets.updatesPosted'),
          t('sections.section9.subsections.policyChanges.bullets.checkPeriodically'),
        ],
      },
    ],
  },
  {
    id: 10,
    title: t('sections.section10.title'),
    description: t('sections.section10.description'),
    sections: [
      {
        bullets: [
          t('sections.section10.subsections.contactInfo.bullets.companyName'),
          t('sections.section10.subsections.contactInfo.bullets.email'),
          t('sections.section10.subsections.contactInfo.bullets.phone'),
        ],
      },
    ],
  },
];

const PrivacyPolicyContent = () => {
  const t = useTranslations('PrivacyPolicy');
  const privacyPolicyData = useMemo(() => getPrivacyPolicyData(t), [t]);

  return (
    <section className="container xl:max-w-[70%] mx-auto py-12 px-4 lg:px-0">
      <p className="text-[#DAE6EA] text-[0.875rem] lg:text-[1.275rem] tracking-wide leading-normal">
        <strong className="font-bold block mb-4 text-[1rem] lg:text-[1.5rem]">
          {t('introduction.title')}
        </strong>
        {t('introduction.content')}
      </p>

      <div className="mx-auto py-12 space-y-8">
        <div className="pt-2 flex items-end justify-end">
          <DownloadPDF fileName="privacy-policy.pdf" buttonText={t('downloadPdf')} />
        </div>
        {privacyPolicyData.map((section: any) => (
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
              {section.sections?.map((subsection: any, subIndex: number) => (
                <div key={subIndex}>
                  {/* Subsection Title */}
                  {subsection.title && (
                    <h3 className="text-[1rem] lg:text-[1.5rem] font-semibold text-[#DAE6EA] mb-3">
                      {subsection.title}
                    </h3>
                  )}

                  {/* Bullet Points */}
                  {subsection.bullets && (
                    <ul className="space-y-3">
                      {subsection.bullets.map((bullet: any, bulletIndex: number) => (
                        <li
                          key={bulletIndex}
                          className="flex items-center gap-x-2 text-[#DAE6EA]/90 leading-relaxed text-[0.875rem] lg:text-[1.275rem]"
                        >
                          <VscDebugBreakpointLog className="text-[#EC3B3B]" size={10} />
                          {/* Bullet Point Text */}
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {/* Summary Box */}
            {section.summary && (
              <div className="mt-6 p-4 bg-[#07153B]/70 rounded-lg border-l-4 border-[#EC3B3B]">
                <p className="text-[#DAE6EA]/80 italic">{section.summary}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default PrivacyPolicyContent;
