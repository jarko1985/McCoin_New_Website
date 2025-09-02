'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

const MissionAndVision = () => {
  const t = useTranslations('aboutPage');
  const locale = useLocale();
  const isArabic = locale === 'ar';

  return (
    <section className="py-16 px-4 xl:px-0">
      <div className="xl:max-w-[70%] mx-auto">
        {/* Mission Section */}
        <div
          className={`flex flex-col items-center gap-12 mb-24 ${
            isArabic ? 'lg:flex-row' : 'lg:flex-row-reverse'
          }`}
        >
          {/* Image Container - Left */}
          <motion.div
            className="relative w-full lg:w-1/2 h-96 lg:h-[500px]"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            {/* Main Image (cropped from middle) */}
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src="/images/bitcoin2.jpg"
                alt="Construction team working"
                fill
                className="object-cover object-center"
                style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0% 100%)' }}
              />
            </div>

            {/* Overlapping Image */}
            <motion.div
              className="absolute -right-8 bottom-8 w-2/5 h-3/5 z-10 shadow-2xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <Image
                src="/images/bitcoin.jpg"
                alt="Construction site detail"
                fill
                className="object-cover object-center"
              />
            </motion.div>
          </motion.div>

          {/* Text Content - Right */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <h2 className="text-4xl font-bold dark:text-white text-[#07153B] mb-6">
              {t('mission.title')}{' '}
              <span className="text-[#EC3B3B]">{t('mission.title_highlight')}</span>
            </h2>

            <p className="text-lg text-[#07153B] dark:text-gray-200 mb-6">
              {t('mission.description1')}
            </p>

            <p className="text-lg text-[#07153B] dark:text-gray-200 mb-8">
              {t('mission.description2')}
            </p>

            <div className="space-y-4">
              <div className="flex items-start">
                <div
                  className={`flex-shrink-0 ${
                    isArabic ? 'mt-0 ml-3' : 'mt-1 mr-3'
                  }   text-[#EC3B3B]`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-[#07153B] dark:text-gray-300">{t('mission.points.point1')}</p>
              </div>
              <div className="flex items-start">
                <div
                  className={`flex-shrink-0 ${
                    isArabic ? 'mt-0 ml-3' : 'mt-1 mr-3'
                  }   text-[#EC3B3B]`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-[#07153B] dark:text-gray-300">{t('mission.points.point2')}</p>
              </div>
              <div className="flex items-start">
                <div
                  className={`flex-shrink-0 ${
                    isArabic ? 'mt-0 ml-3' : 'mt-1 mr-3'
                  }   text-[#EC3B3B]`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-[#07153B] dark:text-gray-300">{t('mission.points.point3')}</p>
              </div>
              <div className="flex items-start">
                <div
                  className={`flex-shrink-0 ${
                    isArabic ? 'mt-0 ml-3' : 'mt-1 mr-3'
                  }   text-[#EC3B3B]`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-[#07153B] dark:text-gray-300">{t('mission.points.point4')}</p>
              </div>
              <div className="flex items-start">
                <div
                  className={`flex-shrink-0 ${
                    isArabic ? 'mt-0 ml-3' : 'mt-1 mr-3'
                  }   text-[#EC3B3B]`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-[#07153B] dark:text-gray-300">{t('mission.points.point5')}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Vision Section */}
        <div
          className={`flex flex-col lg:flex-row items-center gap-12 ${
            isArabic ? 'lg:flex-row-reverse' : ''
          }`}
        >
          {/* Image Container - Right */}
          <motion.div
            className="relative w-full lg:w-1/2 h-96 lg:h-[500px]"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            {/* Main Image (cropped from middle) */}
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src="/images/bitcoin5.jpg"
                alt="Modern architecture"
                fill
                className="object-cover object-center"
                style={{
                  clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)',
                }}
              />
            </div>

            {/* Overlapping Image */}
            <motion.div
              className="absolute -left-8 bottom-8 w-2/5 h-3/5 z-10 shadow-2xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <Image
                src="/images/bitcoin6.jpg"
                alt="Architectural detail"
                fill
                className="object-cover object-center"
              />
            </motion.div>
          </motion.div>

          {/* Text Content - Left */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <h2 className="text-4xl font-bold text-[#07153B] dark:text-[#FFF] mb-6">
              {t('vision.title')}{' '}
              <span className="text-[#EC3B3B]">{t('vision.title_highlight')}</span>
            </h2>

            <p className="text-lg text-[#07153B] dark:text-gray-200 mb-6">
              {t('vision.description1')}
            </p>

            <p className="text-lg text-[#07153B] dark:text-gray-200 mb-8">
              {t('vision.description2')}
            </p>

            <div className="space-y-4">
              <div className="flex items-start">
                <div
                  className={`flex-shrink-0 ${
                    isArabic ? 'mt-0 ml-3' : 'mt-1 mr-3'
                  }   text-[#EC3B3B]`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-[#07153B] dark:text-gray-300">{t('vision.points.point1')}</p>
              </div>
              <div className="flex items-start">
                <div
                  className={`flex-shrink-0 ${
                    isArabic ? 'mt-0 ml-3' : 'mt-1 mr-3'
                  }   text-[#EC3B3B]`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-[#07153B] dark:text-gray-300">{t('vision.points.point2')}</p>
              </div>
              <div className="flex items-start">
                <div
                  className={`flex-shrink-0 ${
                    isArabic ? 'mt-0 ml-3' : 'mt-1 mr-3'
                  }   text-[#EC3B3B]`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-[#07153B] dark:text-gray-300">{t('vision.points.point3')}</p>
              </div>
              <div className="flex items-start">
                <div
                  className={`flex-shrink-0 ${
                    isArabic ? 'mt-0 ml-3' : 'mt-1 mr-3'
                  }   text-[#EC3B3B]`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-[#07153B] dark:text-gray-300">{t('vision.points.point4')}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MissionAndVision;
