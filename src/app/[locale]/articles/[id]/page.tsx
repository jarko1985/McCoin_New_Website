'use client';

import { useEffect, useState } from 'react';
import { useParams, notFound, useRouter } from 'next/navigation';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { NewsItem } from '@/types/Messari';
import { Share2, ArrowLeft, Bookmark, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface FormattedContentProps {
  html: string;
  className?: string;
}

function FormattedArticleContent({ html, className = '' }: FormattedContentProps) {
  // Split content into logical sections
  const sections = html
    .split(/(<h[1-6]>|<\/?strong>|<\/?em>|<\/?p>|<\/?a>|<\/?img>)/)
    .filter(section => section.trim().length > 0);

  return (
    <div className={`space-y-6 ${className}`}>
      {sections.map((section, index) => {
        if (section.startsWith('<img')) {
          // Handle images with proper sizing
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="my-8 rounded-lg overflow-hidden"
            >
              <div dangerouslySetInnerHTML={{ __html: section }} />
            </motion.div>
          );
        }

        if (section.startsWith('<h') || section.includes('font-weight:bold')) {
          // Handle headings and bold text
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-xl font-bold my-6"
              dangerouslySetInnerHTML={{ __html: section }}
            />
          );
        }

        if (section.includes('<a ')) {
          // Handle links with special styling
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="my-4"
              dangerouslySetInnerHTML={{ __html: section }}
            />
          );
        }

        // Regular paragraphs
        return (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.03 }}
            className="text-lg leading-relaxed text-[#DAE6EA]/90"
            dangerouslySetInnerHTML={{ __html: section }}
          />
        );
      })}
    </div>
  );
}

function extractKeyPoints(content: string, count: number = 3): string[] {
  const sentences = content
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .split(/(?<=[.!?])\s+/); // Split on sentence boundaries

  return sentences
    .filter(s => s.length > 30 && !s.includes('http')) // Filter out short sentences and URLs
    .slice(0, count) // Take first few
    .map(s => s.trim()); // Clean up whitespace
}

export default function ArticleDetail() {
  const router = useRouter();
  const { id, locale }: { id?: string; locale?: string } = useParams() as any;
  const [article, setArticle] = useState<NewsItem | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [keyPoints, setKeyPoints] = useState<string[]>([]);

  useEffect(() => {
    if (!id || !locale) return;

    async function getArticleData() {
      try {
        setLoading(true);

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/api/messari`);
        if (!res.ok) throw new Error('Failed to fetch articles');

        const articles: NewsItem[] = await res.json();
        const foundArticle = articles.find(a => a.id === id) || null;

        if (!foundArticle) {
          setArticle(null);
          return;
        }

        setArticle(foundArticle);
        setKeyPoints(extractKeyPoints(foundArticle.content));

        // Get related articles (excluding current article)
        const related = articles
          .filter(a => a.id !== id)
          .sort(() => 0.5 - Math.random())
          .slice(0, 2);

        setRelatedArticles(related);
      } catch (error) {
        console.error('Error fetching data:', error);
        setArticle(null);
      } finally {
        setLoading(false);
      }
    }

    getArticleData();
  }, [id, locale]);

  if (loading) return <ArticleLoadingSkeleton />;
  if (!article) return notFound();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#07153B] to-[#0A1E4D] text-[#DAE6EA]">
      <div className="xl:max-w-[70%] mx-auto px-4">
        {/* Navigation */}
        <nav className="py-6">
          <Button
            variant="ghost"
            className="text-[#DAE6EA] hover:bg-[#0A1E4D]/50 px-0 cursor-pointer"
            onClick={() => router.push('/' + locale + '/articles')}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to articles
          </Button>
        </nav>

        {/* Main Image */}
        {article.previewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 rounded-xl overflow-hidden"
          >
            <Image
              src={article.previewImage}
              alt={article.title}
              width={1200}
              height={630}
              className="w-full h-auto object-cover rounded-xl"
              priority
            />
          </motion.div>
        )}

        {/* Article Header */}
        <header className="mb-10">
          <div className="flex flex-wrap gap-2 mb-6">
            {article.tags?.map((tag, index) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="px-3 py-1 bg-[#EC3B3B]/20 text-[#EC3B3B] rounded-full text-xs font-medium"
              >
                {tag}
              </motion.span>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">{article.title}</h1>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-[#DAE6EA]/80">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{article.author?.name || 'Unknown Author'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>
                {new Date(article.published_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
        </header>

        {/* Enhanced Article Content */}
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          {article.content && <FormattedArticleContent html={article.content} />}

          {/* Key Takeaways section */}
          {keyPoints.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-12 bg-[#0A1E4D]/40 p-6 rounded-xl border border-[#0A1E4D]"
            >
              <h3 className="text-2xl font-bold mb-4 text-[#EC3B3B]">Key Takeaways</h3>
              <ul className="space-y-3 list-disc pl-6 marker:text-[#EC3B3B]">
                {keyPoints.map((point, i) => (
                  <li key={i} className="text-[#DAE6EA]/90">
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </motion.article>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-16">
          <Button
            variant={isBookmarked ? 'default' : 'outline'}
            className="gap-2"
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            <Bookmark className="w-4 h-4" />
            {isBookmarked ? 'Bookmarked' : 'Bookmark'}
          </Button>
          <Button
            variant="outline"
            className="gap-2"
            onClick={() =>
              navigator
                .share?.({
                  title: article.title,
                  url: window.location.href,
                })
                .catch(() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                })
            }
          >
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="mb-20">
            <h3 className="text-2xl font-bold mb-8">More to read</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedArticles.map(relatedArticle => (
                <motion.div
                  key={relatedArticle.id}
                  whileHover={{ y: -4 }}
                  className="bg-[#0A1E4D]/50 rounded-xl overflow-hidden border border-[#0A1E4D] hover:border-[#EC3B3B]/30 transition-all"
                >
                  {relatedArticle.previewImage && (
                    <div className="relative aspect-video w-full">
                      {' '}
                      {/* Changed from fixed h-48 to aspect-video */}
                      <Image
                        src={relatedArticle.previewImage}
                        alt={relatedArticle.title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    {relatedArticle.tags?.[0] && (
                      <span className="text-xs font-medium text-[#EC3B3B] mb-2 inline-block">
                        {relatedArticle.tags[0].toUpperCase()}
                      </span>
                    )}
                    <h4 className="text-xl font-bold mb-3 line-clamp-2">{relatedArticle.title}</h4>
                    <Button
                      asChild
                      variant="link"
                      className="text-[#EC3B3B] hover:no-underline p-0 h-auto cursor-pointer"
                    >
                      <Link href={`/articles/${relatedArticle.id}`}>Read More</Link>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function ArticleLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#07153B] to-[#0A1E4D]">
      <div className="xl:max-w-[70%] mx-auto px-4 py-12">
        <div className="animate-pulse space-y-8">
          {/* Back button skeleton */}
          <div className="h-10 w-24 bg-[#0A1E4D] rounded"></div>

          {/* Image skeleton */}
          <div className="aspect-video w-full bg-[#0A1E4D] rounded-xl"></div>

          {/* Header skeleton */}
          <div className="space-y-4">
            <div className="h-6 w-32 bg-[#0A1E4D] rounded"></div>
            <div className="h-10 w-full bg-[#0A1E4D] rounded"></div>
            <div className="h-4 w-48 bg-[#0A1E4D] rounded"></div>
          </div>

          {/* Content skeleton */}
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-full bg-[#0A1E4D] rounded"></div>
                <div className="h-4 w-5/6 bg-[#0A1E4D] rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
