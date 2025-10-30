'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
// Swiper removed per request
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

// Swiper styles removed

type Post = {
  id: number;
  title: string;
  description: string;
  content?: string;
  author?: string;
  publishDate: string;
  category: string;
  image: string;
  slug: string;
  likes?: number;
  dislikes?: number;
  featured?: boolean;
};

export default function BlogSection() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useMemo(() => pathname?.split('/')?.[1] || 'en', [pathname]);
  const t = useTranslations('HomePage.BlogSection');

  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  // Swiper instance removed

  // Fetch posts
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(`/api/blog-posts`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load posts');
        const data = (await res.json()) as { posts: Post[] };
        if (mounted) {
          setPosts(data.posts || []);
          setIsLoading(false);
        }
      } catch (err) {
        console.error(err);
        if (mounted) {
          setPosts([]);
          setIsLoading(false);
        }
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const formatDate = (dateString: string): string => {
    try {
      const d = new Date(dateString);
      if (isNaN(d.getTime())) throw new Error('bad');
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      const now = new Date();
      return now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  const handleCardClick = (index: number) => setActiveIndex(index);
  const handleReadMore = (slug: string) => router.push(`/${locale}/blog/${slug}`);

  // Use only the 4 most recent posts
  const recentPosts = React.useMemo(() => {
    const safeDate = (d: string) => {
      const dt = new Date(d);
      return isNaN(dt.getTime()) ? 0 : dt.getTime();
    };
    return [...posts]
      .sort((a, b) => safeDate(b.publishDate) - safeDate(a.publishDate))
      .slice(0, 3);
  }, [posts]);

  // Clamp active index when list changes
  useEffect(() => {
    if (activeIndex >= recentPosts.length) setActiveIndex(0);
  }, [recentPosts.length, activeIndex]);

  const activePost = recentPosts[activeIndex] || recentPosts[0] || null;

  if (isLoading) {
    return (
      <section className="bg-[#07153B] py-16 px-4 sm:px-6">
        <div className="container mx-auto xl:w-[70%]">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-stretch">
            <div className="lg:col-span-3">
              <div className="bg-[#0d1635] rounded-lg overflow-hidden h-full">
                <div className="h-64 bg-[#e2dedc]/10 animate-pulse" />
                <div className="p-6 space-y-4">
                  <div className="h-8 bg-[#e2dedc]/10 rounded animate-pulse w-3/4" />
                  <div className="h-4 bg-[#e2dedc]/10 rounded animate-pulse w-full" />
                  <div className="h-4 bg-[#e2dedc]/10 rounded animate-pulse w-5/6" />
                </div>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="h-full flex flex-col gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-[#0d1635] rounded-lg p-4 h-[110px] animate-pulse" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (recentPosts.length === 0) return null;

  // Right column will list up to 6 items with scroll; left and right stay equal height via grid stretch

  return (
    <section className="bg-[#07153B] py-16 px-4 sm:px-6">
      <div className="container mx-auto xl:w-[70%]">
        <div className="mb-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#e2dedc] mb-2">{t('title')}</h2>
          <p className="text-[#e2dedc]/70 text-lg">{t('subtitle')}</p>
        </div>

        {/* SINGLE GRID ROW → both columns stretch to the same height */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-stretch">
          {/* LEFT — Featured (3/5 width on lg+) */}
          <div className="lg:col-span-3">
            {activePost && (
              <Card className="bg-[#0d1635] border-[#e2dedc]/20 hover:border-[#117f60]/50 transition-colors h-auto">
                {/* Keep a consistent media block to avoid layout jumps */}
                <div className="relative w-full h-64 sm:h-80 overflow-hidden rounded-t-lg">
                  <Image
                    src={activePost.image || '/images/placeholder-blog.jpg'}
                    alt={activePost.title}
                    fill
                    className="object-cover"
                    priority={activeIndex === 0}
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-[#117f60]/90 text-white border-0">{activePost.category}</Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex flex-wrap items-center gap-4 text-sm text-[#e2dedc]/70 mb-4">
                    {activePost.author && (
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{activePost.author}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(activePost.publishDate)}</span>
                    </div>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-[#e2dedc] mb-4 leading-tight">
                    {activePost.title}
                  </h3>

                  <p className="text-[#e2dedc]/80 text-base sm:text-lg mb-6">
                    {activePost.description}
                  </p>

                  <Button
                    onClick={() => handleReadMore(activePost.slug)}
                    className="bg-[#117f60] hover:bg-[#117f60]/90 text-white"
                  >
                    {t('readMore')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* RIGHT — Cards list (2/5 width on lg+), matches left height and scrolls if overflow */}
          <div className="lg:col-span-2">
            <div className="h-full flex flex-col gap-4 overflow-auto pr-1">
              {recentPosts.map((post, index) => (
                <Card
                  key={post.id}
                  onClick={() => handleCardClick(index)}
                  className={`bg-[#0d1635] border-[#e2dedc]/20 hover:border-[#117f60]/50 transition-all cursor-pointer h-[33%] ${
                    index === activeIndex ? 'border-[#117f60]' : ''
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden">
                        <Image
                          src={post.image || '/images/placeholder-blog.jpg'}
                          alt={post.title}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Badge className="bg-[#117f60]/20 text-[#117f60] border-0 text-[11px] mb-1">
                          {post.category}
                        </Badge>
                        <h4 className="text-sm sm:text-base font-semibold text-[#e2dedc] leading-snug line-clamp-2">
                          {post.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-[#e2dedc]/60 mt-1">
                          <Calendar className="h-3 w-3" />
                          <span className="truncate">{formatDate(post.publishDate)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* View All */}
        <div className="mt-8 text-center">
          <Button
            variant="outline"
            onClick={() => router.push(`/${locale}/blog`)}
            className="border-[#117f60] text-[#117f60] hover:bg-[#117f60] hover:text-white"
          >
            {t('viewAll')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
