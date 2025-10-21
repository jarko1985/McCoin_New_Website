import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogHero from '@/components/blog-details/BlogHero';
import BlogContent from '@/components/blog-details/BlogContent';
import BlogInteractiveSection from '@/components/blog-details/BlogInteractiveSection';
import { blogPosts } from '../../../../../utils/data';

// Blog post interface (matching the structure from main blog page)
interface BlogPost {
  id: number;
  title: string;
  description: string;
  content?: string;
  author?: string;
  publishDate: string;
  category: string;
  image: string;
  slug?: string;
  likes?: number;
  dislikes?: number;
  featured?: boolean;
}

// Generate metadata for each blog post
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ id: string; locale: string }> 
}): Promise<Metadata> {
  const { id, locale } = await params;
  const blogPost = blogPosts.find(post => post.id === parseInt(id));
  
  if (!blogPost) {
    return {
      title: 'Blog Post Not Found | DHS.exchange',
      description: 'The requested blog post could not be found.',
    };
  }

  const title = `${blogPost.title} | DHS.exchange`;
  const description = blogPost.description;
  const imageUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://dhs.exchange'}${blogPost.image}`;
  const url = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://dhs.exchange'}/${locale}/blog/${id}`;

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
      'DHS.exchange',
      blogPost.category.toLowerCase(),
      ...blogPost.title.toLowerCase().split(' ').filter(word => word.length > 3)
    ],
    authors: [{ name: blogPost.author || 'DHS.exchange Editorial Team' }],
    creator: 'DHS.exchange',
    publisher: 'DHS.exchange',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://dhs.exchange'),
    alternates: {
      canonical: url,
      languages: {
        'en': `/en/blog/${id}`,
        'ar': `/ar/blog/${id}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'DHS.exchange',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: blogPost.title,
        },
      ],
      locale: locale,
      type: 'article',
      publishedTime: new Date(blogPost.publishDate).toISOString(),
      authors: [blogPost.author || 'DHS.exchange Editorial Team'],
      section: blogPost.category,
      tags: [blogPost.category, 'cryptocurrency', 'trading', 'blockchain'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      creator: '@DHSEXCHANGE',
      site: '@DHSEXCHANGE',
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


export default async function BlogDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string; locale: string }> 
}) {
  const { id, locale } = await params;
  const blogId = parseInt(id);

  // Find the blog post by ID from the consolidated data
  const blogPost = blogPosts.find(post => post.id === blogId);

  if (!blogPost) {
    notFound();
  }

  // Use a stable URL for SSR compatibility
  const currentUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://dhs.exchange'}/${locale}/blog/${blogId}`;

  // Calculate reading time
  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
  };

  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blogPost.title,
    "description": blogPost.description,
    "image": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://dhs.exchange'}${blogPost.image}`,
    "author": {
      "@type": "Organization",
      "name": blogPost.author || "DHS.exchange Editorial Team",
      "url": "https://dhs.exchange"
    },
    "publisher": {
      "@type": "Organization",
      "name": "DHS.exchange",
      "logo": {
        "@type": "ImageObject",
        "url": `${process.env.NEXT_PUBLIC_BASE_URL || 'https://dhs.exchange'}/images/dhs_logo.png`
      }
    },
    "datePublished": new Date(blogPost.publishDate).toISOString(),
    "dateModified": new Date(blogPost.publishDate).toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": currentUrl
    },
    "articleSection": blogPost.category,
    "keywords": [
      "cryptocurrency",
      "crypto trading",
      "blockchain",
      "digital assets",
      "MENA",
      "Dubai",
      "VARA",
      blogPost.category.toLowerCase()
    ],
    "url": currentUrl,
    "wordCount": blogPost.content ? blogPost.content.split(' ').length : 0,
    "timeRequired": `PT${calculateReadingTime(blogPost.content || '')}M`
  };

  return (
    <div className="min-h-screen bg-[#07153B]">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Hero Section */}
      <BlogHero
        title={blogPost.title}
        image={blogPost.image}
        author={blogPost.author || 'DHS.exchange Editorial Team'}
        publishDate={blogPost.publishDate}
        category={blogPost.category}
        locale={locale}
      />

      {/* Blog Content */}
      <BlogContent content={blogPost.content || ''} />

      {/* Interactive Section (Client Component) */}
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
