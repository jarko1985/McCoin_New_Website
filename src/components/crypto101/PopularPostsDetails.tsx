'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, MessageCircle, ThumbsUp, Calendar, Clock } from 'lucide-react';
import Image from 'next/image';

interface PopularPostDetailsProps {
  post: {
    id: string;
    title: string;
    subtitle: string;
    images: string[];
    datePublished: string;
    comments: number;
    likes: number;
    content: Array<{
      heading?: string;
      paragraphs?: string[];
      lists?: string[];
    }>;
  };
}

export default function PopularPostsDetails({ post }: PopularPostDetailsProps) {
  const router = useRouter();

  const estimatedReadTime = Math.ceil(
    post.content.reduce((acc, section) => {
      const paragraphWords = section.paragraphs?.join(' ').split(' ').length || 0;
      const listWords = section.lists?.join(' ').split(' ').length || 0;
      return acc + paragraphWords + listWords;
    }, 0) / 200,
  );

  return (
    <div className="xl:max-w-[70%] mx-auto min-h-screen bg-[#07153b] text-[#DAE6EA] py-8">
      <motion.button
        onClick={() => router.back()}
        className="flex items-center gap-2 bg-[#DAE6EA]/10 backdrop-blur-md border border-[#DAE6EA]/20 text-[#DAE6EA] px-4 py-2  rounded-lg hover:bg-[#DAE6EA]/20 transition-all duration-300"
      >
        <ArrowLeft size={18} />
        <span>Back</span>
      </motion.button>

      {/* Title Overlay */}
      <div className="py-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
          {post.title}
        </h1>
        <p className="text-xl text-[#DAE6EA]/80 mb-6">{post.subtitle}</p>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-[#DAE6EA]/60">
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>
              {new Date(post.datePublished).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>{estimatedReadTime} min read</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageCircle size={16} />
            <span>{post.comments} comments</span>
          </div>
          <div className="flex items-center gap-2">
            <ThumbsUp size={16} />
            <span>{post.likes} likes</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="mx-auto py-12">
        {/* Additional Images */}
        {post.images.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {post.images.map((image, index) => (
                <div
                  key={index}
                  className="relative h-64 rounded-lg overflow-hidden border border-[#DAE6EA]/20"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center hover:scale-110 transition-transform duration-500"
                    style={{ backgroundImage: `url(${image})` }}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          {post.content.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="mb-12 bg-[#DAE6EA]/5 border border-[#DAE6EA]/10 rounded-xl p-8 hover:bg-[#DAE6EA]/10 transition-all duration-300"
            >
              {section.heading && (
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                  <span className="w-3 h-3 bg-[#EC3B3B] rounded-full mr-4"></span>
                  {section.heading}
                </h2>
              )}

              {section.paragraphs && (
                <div className="space-y-4">
                  {section.paragraphs.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className="text-lg leading-relaxed text-[#DAE6EA]/90"
                      dangerouslySetInnerHTML={{ __html: paragraph }}
                    />
                  ))}
                </div>
              )}

              {section.lists && (
                <ul className="space-y-3 mt-6">
                  {section.lists.map((item, lIndex) => (
                    <motion.li
                      key={lIndex}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.05 * lIndex }}
                      className="flex items-start text-lg text-[#DAE6EA]/85"
                    >
                      <span className="text-[#EC3B3B] mr-3 mt-1 flex-shrink-0">•</span>
                      <span dangerouslySetInnerHTML={{ __html: item }} />
                    </motion.li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>

        {/* Engagement Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 p-8 bg-gradient-to-r from-[#DAE6EA]/10 to-[#EC3B3B]/10 border border-[#DAE6EA]/20 rounded-xl"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-[#EC3B3B]/20 border border-[#EC3B3B]/30 text-[#EC3B3B] px-6 py-3 rounded-lg hover:bg-[#EC3B3B]/30 transition-all duration-300"
              >
                <ThumbsUp size={20} />
                <span className="font-semibold">{post.likes}</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-[#DAE6EA]/20 border border-[#DAE6EA]/30 text-[#DAE6EA] px-6 py-3 rounded-lg hover:bg-[#DAE6EA]/30 transition-all duration-300"
              >
                <MessageCircle size={20} />
                <span className="font-semibold">{post.comments} Comments</span>
              </motion.button>
            </div>
            <div className="text-sm text-[#DAE6EA]/60">
              Published on {new Date(post.datePublished).toLocaleDateString()}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
