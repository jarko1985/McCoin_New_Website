'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import {
  Zap,
  Database,
  LayoutTemplate,
  BookOpen,
  User,
  BrainCircuit,
  ChevronLeft,
} from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslations } from 'next-intl';

// Helper function to get help topics with translations
const getHelpTopics = (t: any) => [
  {
    id: 1,
    title: t('topics.trading_platform.title'),
    description: t('topics.trading_platform.description'),
    longDescription: `
      <p>${t('topics.trading_platform.long_description')}</p>
      
      <h3>${t('topics.trading_platform.key_features')}</h3>
      <ul>
        ${t.raw('topics.trading_platform.key_features_list').map((item: string) => `<li>${item}</li>`).join('')}
      </ul>
      
      <h3>${t('topics.trading_platform.getting_started')}</h3>
      <p>${t('topics.trading_platform.getting_started_description')}</p>
      <ol>
        ${t.raw('topics.trading_platform.getting_started_steps').map((item: string) => `<li>${item}</li>`).join('')}
      </ol>
      
      <p>${t('topics.trading_platform.advanced_users')}</p>
    `,
    icon: <Zap className="w-8 h-8" />,
    tags: [t('topics.trading_platform.tag1'), t('topics.trading_platform.tag2'), t('topics.trading_platform.tag3')],
    imageUrl: '/images/trading_platform.jpg',
    relatedTopics: [2, 5, 6],
  },
  {
    id: 2,
    title: t('topics.wallet_management.title'),
    description: t('topics.wallet_management.description'),
    longDescription: `
      <p>${t('topics.wallet_management.long_description')}</p>
      
      <h3>${t('topics.wallet_management.wallet_types')}</h3>
      <ul>
        ${t.raw('topics.wallet_management.wallet_types_list').map((item: string) => `<li><strong>${item.split(':')[0]}:</strong> ${item.split(':')[1]}</li>`).join('')}
      </ul>
      
      <h3>${t('topics.wallet_management.security_best_practices')}</h3>
      <ol>
        ${t.raw('topics.wallet_management.security_steps').map((item: string) => `<li>${item}</li>`).join('')}
      </ol>
      
      <p>${t('topics.wallet_management.wallet_integration')}</p>
    `,
    icon: <Database className="w-8 h-8" />,
    tags: [t('topics.wallet_management.tag1'), t('topics.wallet_management.tag2'), t('topics.wallet_management.tag3')],
    imageUrl: '/images/wallet_management.jpg',
    relatedTopics: [1, 4, 6],
  },
  {
    id: 3,
    title: t('topics.api_integration.title'),
    description: t('topics.api_integration.description'),
    longDescription: `
      <p>${t('topics.api_integration.long_description')}</p>
      
      <h3>${t('topics.api_integration.api_features')}</h3>
      <ul>
        ${t.raw('topics.api_integration.api_features_list').map((item: string) => `<li>${item}</li>`).join('')}
      </ul>
      
      <h3>${t('topics.api_integration.getting_started_api')}</h3>
      <ol>
        ${t.raw('topics.api_integration.api_steps').map((item: string) => `<li>${item}</li>`).join('')}
      </ol>
      
      <p>${t('topics.api_integration.sdk_support')}</p>
    `,
    icon: <LayoutTemplate className="w-8 h-8" />,
    tags: [t('topics.api_integration.tag1'), t('topics.api_integration.tag2'), t('topics.api_integration.tag3')],
    imageUrl: '/images/api_integration.jpg',
    relatedTopics: [1, 5],
  },
  {
    id: 4,
    title: t('topics.account_security.title'),
    description: t('topics.account_security.description'),
    longDescription: `
      <p>${t('topics.account_security.long_description')}</p>
      
      <h3>${t('topics.account_security.security_features')}</h3>
      <ul>
        ${t.raw('topics.account_security.security_features_list').map((item: string) => `<li>${item}</li>`).join('')}
      </ul>
      
      <h3>${t('topics.account_security.enhancing_security')}</h3>
      <ol>
        ${t.raw('topics.account_security.security_enhancement_steps').map((item: string) => `<li>${item}</li>`).join('')}
      </ol>
      
      <p>${t('topics.account_security.institutional_accounts')}</p>
    `,
    icon: <User className="w-8 h-8" />,
    tags: [t('topics.account_security.tag1'), t('topics.account_security.tag2'), t('topics.account_security.tag3')],
    imageUrl: '/images/account_security.jpg',
    relatedTopics: [2, 5],
  },
  {
    id: 5,
    title: t('topics.market_analysis.title'),
    description: t('topics.market_analysis.description'),
    longDescription: `
      <p>${t('topics.market_analysis.long_description')}</p>
      
      <h3>${t('topics.market_analysis.analysis_tools')}</h3>
      <ul>
        ${t.raw('topics.market_analysis.analysis_tools_list').map((item: string) => `<li>${item}</li>`).join('')}
      </ul>
      
      <h3>${t('topics.market_analysis.trading_strategies')}</h3>
      <ol>
        ${t.raw('topics.market_analysis.trading_strategy_steps').map((item: string) => `<li>${item}</li>`).join('')}
      </ol>
      
      <p>${t('topics.market_analysis.educational_resources')}</p>
    `,
    icon: <BrainCircuit className="w-8 h-8" />,
    tags: [t('topics.market_analysis.tag1'), t('topics.market_analysis.tag2'), t('topics.market_analysis.tag3')],
    imageUrl: '/images/market_analysis.jpg',
    relatedTopics: [1, 3, 6],
  },
  {
    id: 6,
    title: t('topics.getting_started.title'),
    description: t('topics.getting_started.description'),
    longDescription: `
      <p>${t('topics.getting_started.long_description')}</p>
      
      <h3>${t('topics.getting_started.crypto_basics')}</h3>
      <ul>
        ${t.raw('topics.getting_started.crypto_basics_list').map((item: string) => `<li>${item}</li>`).join('')}
      </ul>
      
      <h3>${t('topics.getting_started.first_steps')}</h3>
      <ol>
        ${t.raw('topics.getting_started.first_steps_list').map((item: string) => `<li>${item}</li>`).join('')}
      </ol>
      
      <p>${t('topics.getting_started.demo_account')}</p>
    `,
    icon: <BookOpen className="w-8 h-8" />,
    tags: [t('topics.getting_started.tag1'), t('topics.getting_started.tag2'), t('topics.getting_started.tag3')],
    imageUrl: '/images/getting_started.jpg',
    relatedTopics: [1, 2, 5],
  },
];

const HelpTopicDetailsPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('HelpTopicDetail');
  const id = pathname?.split('/').pop() ?? '';
  const [topic, setTopic] = useState<any>(null);
  const [relatedTopics, setRelatedTopics] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Memoize help topics to prevent recreation on every render
  const helpTopics = useMemo(() => getHelpTopics(t), [t]);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      const foundTopic = helpTopics.find(t => t.id.toString() === id);
      setTopic(foundTopic);

      if (foundTopic?.relatedTopics) {
        const related = helpTopics.filter(t => foundTopic.relatedTopics.includes(t.id));
        setRelatedTopics(related);
      }

      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id, helpTopics]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#DAE6EA] to-white dark:from-[#07153B] dark:to-[#0A1E4D] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-[#EC3B3B] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#DAE6EA] to-white dark:from-[#07153B] dark:to-[#0A1E4D] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#07153B] dark:text-[#DAE6EA] mb-4">
            {t('topic_not_found')}
          </h1>
          <p className="text-xl text-[#07153B]/80 dark:text-[#DAE6EA]/80 mb-8">
            {t('topic_not_found_description')}
          </p>
          <Button asChild className="bg-[#EC3B3B] hover:bg-[#EC3B3B]/90 text-white">
            <a href="/help-topics">{t('browse_all_topics')}</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#DAE6EA] to-white dark:from-[#07153B] dark:to-[#0A1E4D]">
      {/* Hero Section with Parallax Effect */}
      <div className="relative h-96 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={topic.imageUrl}
            alt={topic.title}
            fill
            className="object-cover"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07153B] to-transparent opacity-80 dark:opacity-90" />
        </motion.div>

        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-end pb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Button
              asChild
              variant="ghost"
              className="mb-6 text-[#DAE6EA] hover:text-white hover:bg-[#07153B]/50"
            >
              <a href="/help-topics" className="flex items-center gap-2">
                <ChevronLeft className="w-5 h-5" />
                {t('back_to_help_center')}
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="p-3 bg-[#EC3B3B]/20 rounded-lg backdrop-blur-sm">
              {React.cloneElement(topic.icon, { className: 'w-8 h-8 text-[#EC3B3B]' })}
            </div>
            <span className="text-sm font-medium text-[#DAE6EA]/90 bg-[#07153B]/50 px-3 py-1 rounded-full">
              {topic.tags[0]}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            {topic.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="text-xl text-[#DAE6EA]/90 max-w-3xl"
          >
            {topic.description}
          </motion.p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.article
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="prose dark:prose-invert max-w-none prose-h2:text-2xl prose-h2:font-semibold prose-h2:mb-4 prose-h2:text-[#07153B] dark:prose-h2:text-[#DAE6EA] prose-h3:text-xl prose-h3:font-medium prose-h3:mt-8 prose-h3:mb-3 prose-ul:list-disc prose-ul:pl-6 prose-ol:list-decimal prose-ol:pl-6 prose-li:my-2 prose-p:text-[#07153B]/90 dark:prose-p:text-[#DAE6EA]/80"
              dangerouslySetInnerHTML={{ __html: topic.longDescription }}
            />

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.6 }}
              className="mt-16"
            >
              <h2 className="text-2xl font-semibold text-[#07153B] dark:text-[#DAE6EA] mb-6">
                {t('frequently_asked_questions')}
              </h2>

              <div className="space-y-4">
                {[1, 2, 3].map(item => (
                  <motion.div
                    key={item}
                    whileHover={{ y: -2 }}
                    className="border border-[#DAE6EA]/20 dark:border-[#07153B]/50 rounded-xl overflow-hidden"
                  >
                    <Card className="border-none bg-[#DAE6EA]/10 dark:bg-[#07153B]/20">
                      <CardContent className="p-6">
                        <h3 className="font-medium text-lg text-[#07153B] dark:text-[#DAE6EA] mb-2">
                          {item === 1 && t('faq.faq1.question')}
                          {item === 2 && t('faq.faq2.question')}
                          {item === 3 && t('faq.faq3.question')}
                        </h3>
                        <p className="text-[#07153B]/80 dark:text-[#DAE6EA]/80">
                          {item === 1 && t('faq.faq1.answer')}
                          {item === 2 && t('faq.faq2.answer')}
                          {item === 3 && t('faq.faq3.answer')}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="sticky top-24 space-y-8"
            >
              {/* Related Topics */}
              {relatedTopics.length > 0 && (
                <div className="bg-[#DAE6EA]/10 dark:bg-[#07153B]/20 border border-[#DAE6EA]/20 dark:border-[#07153B]/50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-[#07153B] dark:text-[#DAE6EA] mb-4">
                    {t('related_topics')}
                  </h3>
                  <div className="space-y-3">
                    {relatedTopics.map(related => (
                      <motion.a
                        key={related.id}
                        whileHover={{ x: 5 }}
                        href={`/help-topics/${related.id}`}
                        className="block p-3 hover:bg-[#DAE6EA]/20 dark:hover:bg-[#07153B]/30 rounded-lg transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-[#EC3B3B]/10 rounded-lg">
                            {React.cloneElement(related.icon, {
                              className: 'w-5 h-5 text-[#EC3B3B]',
                            })}
                          </div>
                          <span className="font-medium text-[#07153B] dark:text-[#DAE6EA]">
                            {related.title}
                          </span>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Support */}
              <div className="bg-gradient-to-br from-[#EC3B3B]/10 to-[#07153B]/10 dark:from-[#EC3B3B]/10 dark:to-[#0A1E4D]/20 border border-[#DAE6EA]/20 dark:border-[#07153B]/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-[#07153B] dark:text-[#DAE6EA] mb-4">
                  {t('need_more_help')}
                </h3>
                <p className="text-[#07153B]/80 dark:text-[#DAE6EA]/80 mb-6">
                  {t('support_description')}
                </p>
                <Button
                  onClick={() => router.push('/contact')}
                  className="w-full bg-[#EC3B3B] hover:bg-[#EC3B3B]/90 cursor-pointer hover:text-white"
                >
                  {t('contact_support')}
                </Button>
              </div>

              {/* Download Guide */}
              <div className="bg-[#DAE6EA]/10 dark:bg-[#07153B]/20 border border-[#DAE6EA]/20 dark:border-[#07153B]/50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-[#07153B] dark:text-[#DAE6EA] mb-4">
                  {t('download_guide')}
                </h3>
                <p className="text-[#07153B]/80 dark:text-[#DAE6EA]/80 mb-6">
                  {t('download_guide_description', { topic: topic.title })}
                </p>
                <Button
                  variant="outline"
                  className="w-full border-[#EC3B3B] text-[#EC3B3B] hover:bg-[#EC3B3B]/10"
                >
                  {t('download_pdf')}
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpTopicDetailsPage;
