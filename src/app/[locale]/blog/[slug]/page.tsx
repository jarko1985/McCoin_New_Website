import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogHero from '@/components/blog-details/BlogHero';
import BlogContent from '@/components/blog-details/BlogContent';
import BlogInteractiveSection from '@/components/blog-details/BlogInteractiveSection';

// ---------- Types ----------
interface BlogPost {
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
}

// ---------- Utils ----------
const ADMIN = process.env.NEXT_PUBLIC_ADMIN_URL!;
const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://mc-coin-new-website-hassanjarkoyahoocoms-projects.vercel.app';

// Parse a date string -> ISO, fallback to now
const safeParseDate = (dateString: string): string => {
  try {
    const d = new Date(dateString);
    return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
  } catch {
    return new Date().toISOString();
  }
};

// Server fetch for a single post
async function fetchPost(slug: string, revalidate: number | false = 60): Promise<BlogPost | null> {
  const opts: RequestInit & { next?: { revalidate?: number } } = {};
  if (revalidate === false) opts.cache = 'no-store';
  else opts.next = { revalidate };

  const res = await fetch(`${ADMIN}/api/public/posts/${slug}`, opts);
  if (!res.ok) return null;
  const { post } = (await res.json()) as { post: BlogPost };
  return post ?? null;
}

// ---------- SEO: generateMetadata ----------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const blogPost = await fetchPost(slug, 60);

  if (!blogPost) {
    return {
      title: 'Blog Post Not Found | McCoin',
      description: 'The requested blog post could not be found.',
    };
  }

  const title = `${blogPost.title} | McCoin`;
  const description = blogPost.description;
  const imageUrl = `${BASE}${blogPost.image}`;
  const url = `${BASE}/${locale}/blog/${slug}`;

  return {
    title,
    description,
    keywords: [
      'cryptocurrency',
      'crypto trading',
      'blockchain',
      'digital assets',
      'MENA',
      'Dubai',
      'VARA',
      'McCoin',
      blogPost.category.toLowerCase(),
      ...blogPost.title.toLowerCase().split(' ').filter((w) => w.length > 3),
    ],
    authors: [{ name: blogPost.author || 'McCoin Editorial Team' }],
    creator: 'McCoin',
    publisher: 'McCoin',
    formatDetection: { email: false, address: false, telephone: false },
    metadataBase: new URL(BASE),
    alternates: {
      canonical: url,
      languages: { en: `/en/blog/${slug}`, ar: `/ar/blog/${slug}` },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'McCoin',
      images: [{ url: imageUrl, width: 1200, height: 630, alt: blogPost.title }],
      locale,
      type: 'article',
      publishedTime: safeParseDate(blogPost.publishDate),
      authors: [blogPost.author || 'McCoin Editorial Team'],
      section: blogPost.category,
      tags: [blogPost.category, 'cryptocurrency', 'trading', 'blockchain'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      creator: '@McCoin',
      site: '@McCoin',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_VERIFICATION,
    },
  };
}

// ---------- Page ----------
export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;

  // Fetch post from Admin API (ISR 60s; switch to false for no-store)
  const blogPost = await fetchPost(slug, 60);
  if (!blogPost) notFound();

  const currentUrl = `${BASE}/${locale}/blog/${slug}`;

  // Reading time
  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = (content || '').trim().split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  // JSON-LD
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blogPost.title,
    description: blogPost.description,
    image: `${BASE}${blogPost.image}`,
    author: {
      '@type': 'Organization',
      name: blogPost.author || 'McCoin Editorial Team',
      url: BASE,
    },
    publisher: {
      '@type': 'Organization',
      name: 'McCoin',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE}/images/logo.svg`,
      },
    },
    datePublished: safeParseDate(blogPost.publishDate),
    dateModified: safeParseDate(blogPost.publishDate),
    mainEntityOfPage: { '@type': 'WebPage', '@id': currentUrl },
    articleSection: blogPost.category,
    keywords: [
      'cryptocurrency',
      'crypto trading',
      'blockchain',
      'digital assets',
      'MENA',
      'Dubai',
      'VARA',
      blogPost.category.toLowerCase(),
    ],
    url: currentUrl,
    wordCount: blogPost.content ? blogPost.content.split(/\s+/).length : 0,
    timeRequired: `PT${calculateReadingTime(blogPost.content || '')}M`,
  };

  return (
    <div className="min-h-screen bg-[#07153B]">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero */}
      <BlogHero
        title={blogPost.title}
        image={blogPost.image}
        author={blogPost.author || 'McCoin Editorial Team'}
        publishDate={blogPost.publishDate}
        category={blogPost.category}
        locale={locale}
      />

      {/* Content */}
      <BlogContent content={blogPost.content || ''} />

      {/* Interactive (Client Component) */}
      <BlogInteractiveSection
        blogId={blogPost.id}
        initialLikes={blogPost.likes || 0}
        initialDislikes={blogPost.dislikes || 0}
        currentUrl={currentUrl}
        title={blogPost.title}
        category={blogPost.category}
      />
    </div>
  );
}
