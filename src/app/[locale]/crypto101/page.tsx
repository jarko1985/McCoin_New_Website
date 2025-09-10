'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion, AnimatePresence } from 'framer-motion';
import PopularPosts from '@/components/crypto101/PopularPosts';
import VideoPosts from '@/components/crypto101/VideoPosts';
import Image from 'next/image';
import { topics } from '../../../../utils/data';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';



const CryptoPage = () => {
  const t = useTranslations('Crypto101.page');
  const tTopics = useTranslations('Crypto101.topics');
  const params = useParams();
  const locale = params?.locale || 'en';
  const [activeTopic, setActiveTopic] = useState(topics[0]);
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const getTranslatedTopicTitle = (topicId: string) => {
    try {
      return tTopics(`${topicId}.title`);
    } catch {
      return topics.find(t => t.id === topicId)?.title || topicId;
    }
  };

  const getTranslatedSection = (topicId: string, sectionKey: string, field: string) => {
    try {
      return tTopics(`${topicId}.sections.${sectionKey}.${field}`);
    } catch {
      // If translation doesn't exist, return null instead of falling back
      // This prevents trying to access non-existent keys
      return null;
    }
  };

  const filteredTopics = topics.filter(topic => {
    const translatedTitle = getTranslatedTopicTitle(topic.id);
    return translatedTitle.toLowerCase().includes(search.toLowerCase());
  });
  return (
    <section>
      <div className="flex min-h-screen bg-[#07153b] text-[#DAE6EA]">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-[320px] border-r border-[#1a2d6b] flex flex-col bg-[#0a1a4a]/50 backdrop-blur-sm z-50 sticky top-16 h-[calc(100vh-4rem)] overflow-hidden"
        >
          <div className="p-4 border-b border-[#1a2d6b] flex items-center justify-between">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="cursor-pointer text-white border border-[#EC3B3B]/30 bg-[#0f1f49] px-3 py-2 rounded-md h-9 flex items-center text-sm w-full shadow-lg hover:shadow-[#EC3B3B]/20 transition-all"
                >
                  {t('jumpToTopic')}
                </motion.div>
              </DialogTrigger>
              <DialogContent className="bg-[#0a1a4a] border-[#1a2d6b] text-[#DAE6EA] max-w-md rounded-lg shadow-2xl">
                <DialogTitle className="text-xl font-bold mb-2">{t('searchTopics')}</DialogTitle>
                <Input
                  placeholder={t('searchPlaceholder')}
                  className="mb-4 bg-[#07153b] border-[#1a2d6b] focus-visible:ring-[#EC3B3B]"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                <ScrollArea className="max-h-[400px] pr-2">
                  <ul className="space-y-1">
                    {filteredTopics.map(topic => (
                      <motion.li
                        key={topic.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        className="cursor-pointer hover:bg-[#1a2d6b] p-3 rounded-md transition-colors"
                        onClick={() => {
                          setActiveTopic(topic);
                          setDialogOpen(false);
                        }}
                      >
                        <div className="flex items-center">
                          <span className="text-[#EC3B3B] mr-2">•</span>
                          <span className="font-medium">{getTranslatedTopicTitle(topic.id)}</span>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          </div>
          <ScrollArea className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {topics.map(topic => (
                <motion.li
                  key={topic.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTopic(topic)}
                  className={`cursor-pointer px-4 py-3 rounded-lg transition-all ${
                    activeTopic.id === topic.id
                      ? 'bg-gradient-to-r from-[#EC3B3B]/20 to-[#EC3B3B]/10 border-l-4 border-[#EC3B3B] shadow-lg'
                      : 'hover:bg-[#1a2d6b]/50 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center">
                    <span
                      className={`mr-3 ${
                        activeTopic.id === topic.id ? 'text-[#EC3B3B]' : 'text-[#DAE6EA]/70'
                      }`}
                    >
                      {activeTopic.id === topic.id ? '→' : '•'}
                    </span>
                    <span
                      className={`font-medium ${
                        activeTopic.id === topic.id ? 'text-white' : 'text-[#DAE6EA]/80'
                      }`}
                    >
                      {getTranslatedTopicTitle(topic.id)}
                    </span>
                  </div>
                </motion.li>
              ))}
            </ul>
          </ScrollArea>
        </motion.aside>

        {/* Content */}
        <main className="flex-1 p-6 md:px-10 overflow-auto xl:max-w-[65%]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTopic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative w-full h-[500px]">
                <Image
                  alt={t('altText')}
                  className="object-cover"
                  src={activeTopic.imgSRC || ''}
                  fill
                />
              </div>
              <motion.h1
                className="text-3xl md:text-4xl font-bold my-6 bg-[#DAE6EA] bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {getTranslatedTopicTitle(activeTopic.id)}
              </motion.h1>

              <div className="space-y-8">
                {activeTopic.sections.map((section: any, idx: any) => {
                  // Map section heading to translation key
                  const sectionKeyMap: { [key: string]: string } = {
                    'Overview': 'overview',
                    'How It Works': 'howItWorks',
                    'Uses & Value': 'usesAndValue',
                    'Volatility & Risk': 'volatilityAndRisk',
                    'Regulation & Legality': 'regulationAndLegality',
                    'Pros & Cons': 'prosAndCons',
                    'Bottom Line': 'bottomLine',
                    'Challenges': 'challenges',
                    'Regulation & Adoption': 'regulationAndAdoption',
                    'Risks & Limitations': 'risksAndLimitations',
                    'Types & Uses': 'typesAndUses',
                    'Security Risks': 'securityRisks',
                    'Regulation & Recovery': 'regulationAndRecovery',
                    'Key Components': 'keyComponents',
                    'Risks & Challenges': 'risksAndChallenges'
                  };
                  
                  const sectionKey = sectionKeyMap[section.heading] || 'overview';
                  const translatedHeading = getTranslatedSection(activeTopic.id, sectionKey, 'heading');
                  
                  // Only get paragraph1 for sections that have it (not prosAndCons)
                  const translatedParagraph1 = sectionKey !== 'prosAndCons' ? getTranslatedSection(activeTopic.id, sectionKey, 'paragraph1') : null;
                  
                  // Only get pros/cons titles for prosAndCons section
                  const translatedProsTitle = sectionKey === 'prosAndCons' ? getTranslatedSection(activeTopic.id, sectionKey, 'prosTitle') : null;
                  const translatedConsTitle = sectionKey === 'prosAndCons' ? getTranslatedSection(activeTopic.id, sectionKey, 'consTitle') : null;
                  
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + idx * 0.05 }}
                      className="bg-[#0a1a4a]/50 p-6 rounded-xl border border-[#1a2d6b] shadow-lg backdrop-blur-sm"
                    >
                      <h3 className="text-2xl font-bold text-[#DAE6EA] mb-4 flex items-center">
                        <span className="w-2 h-2 bg-[#EC3B3B] rounded-full mr-3"></span>
                        {translatedHeading ? String(translatedHeading) : section.heading}
                      </h3>

                      {sectionKey !== 'prosAndCons' && (
                        <motion.p
                          className="text-base leading-relaxed mb-4 text-[#DAE6EA]/90"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 + idx * 0.05 }}
                        >
                          {translatedParagraph1 ? String(translatedParagraph1) : section.paragraphs?.[0] || ''}
                        </motion.p>
                      )}

                      {sectionKey === 'prosAndCons' && section.listGroups && (
                        <div className="mt-6 space-y-6">
                          {section.listGroups.map((group: any, gIdx: any) => (
                            <motion.div
                              key={gIdx}
                              className="mt-6"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.3 + idx * 0.05 + gIdx * 0.05 }}
                            >
                              <p className="font-semibold text-lg mb-3 text-[#FF7A45] flex items-center">
                                <span className="w-1.5 h-1.5 bg-[#FF7A45] rounded-full mr-2"></span>
                                {group.title}
                              </p>
                              <ul className="space-y-2 ml-1">
                                {group.items.map((item: any, ii: any) => (
                                  <motion.li
                                    key={ii}
                                    className="flex items-start pl-4"
                                    initial={{ opacity: 0, x: -5 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 + idx * 0.05 + gIdx * 0.05 + ii * 0.03 }}
                                  >
                                    <span className="text-[#EC3B3B] mr-2 mt-1">•</span>
                                    <span className="text-[#DAE6EA]/85">{item}</span>
                                  </motion.li>
                                ))}
                              </ul>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      <PopularPosts />
      <VideoPosts />
    </section>
  )
}

export default CryptoPage;