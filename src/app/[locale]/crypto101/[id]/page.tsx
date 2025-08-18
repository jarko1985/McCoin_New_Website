import { notFound } from 'next/navigation';
import PopularPostsDetails from '@/components/crypto101/PopularPostsDetails';
import { popularCryptoPosts } from '../../../../../utils/data';

// Force static generation
export const dynamic = 'force-static';

interface PageProps {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

// Generate static params for all available posts
export async function generateStaticParams() {
  const locales = ['en', 'ar']; // Add your supported locales

  return locales.flatMap(locale =>
    popularCryptoPosts.map(post => ({
      locale,
      id: post.id,
    })),
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const post = popularCryptoPosts.find(p => p.id === id);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | McCoin Crypto101`,
    description: post.subtitle,
    openGraph: {
      title: post.title,
      description: post.subtitle,
      images: post.images || ['/og-image.svg'],
      type: 'article',
      url: `https://mc-coin-new-website.vercel.app/en/crypto101/${id}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.subtitle,
      images: post.images || ['/og-image.svg'],
    },
  };
}

export default async function PostDetailsPage({ params }: PageProps) {
  // Find the post by ID
  const { id } = await params;
  const post = popularCryptoPosts.find(p => p.id === id);

  // If post not found, show 404
  if (!post) {
    notFound();
  }

  return <PopularPostsDetails post={post} />;
}
