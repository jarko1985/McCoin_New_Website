'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';

interface Article {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
}

const shimmer = 'animate-pulse bg-[#DAE6EA]/10';
const fallbackImage = '/images/fallback-image.jpeg';

export default function CryptoNewsUAE() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const locale = (useParams() as { locale?: string })?.locale ?? 'en';

  const fetchNews = useCallback(
    async (isRefresh = false) => {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      try {
        const response = await fetch(`/${locale}/api/uae-news`, {
          cache: 'no-store', // Ensure fresh data on manual refresh
        });

        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }

        const data = await response.json();
        setArticles(data.slice(0, 5));
        setLastUpdated(new Date());
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch news');
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [locale],
  );

  useEffect(() => {
    fetchNews();

    // Set up periodic refresh every 10 minutes
    const interval = setInterval(() => {
      fetchNews(true);
    }, 600000); // 10 minutes in milliseconds

    return () => clearInterval(interval);
  }, [fetchNews]);

  const handleManualRefresh = () => {
    fetchNews(true);
  };

  const featured = articles[0];
  const others = articles.slice(1);

  return (
    <section className="dark:bg-[#07153b] bg-[#DAE6EA] py-16 dark:text-[#DAE6EA] text-[#07153b]">
      <div className="flex items-center justify-center gap-4 mb-5 lg:mb-12">
        <h1 className="text-xl lg:text-4xl font-semibold text-center">Local News</h1>
        <button
          onClick={handleManualRefresh}
          disabled={refreshing}
          className={`p-2 rounded-full transition-all duration-300 ${
            refreshing
              ? 'animate-spin cursor-not-allowed opacity-50'
              : 'hover:bg-white/10 hover:scale-110'
          }`}
          title="Refresh news"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      </div>

      {lastUpdated && (
        <p className="text-center text-sm opacity-70 mb-4">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </p>
      )}

      {error && (
        <div className="text-center text-red-500 mb-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg max-w-md mx-auto">
          <p>Error: {error}</p>
          <button
            onClick={handleManualRefresh}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      <div className="xl:max-w-[70%] mx-auto px-4 xl:px-0 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Side List */}
        <div className="md:col-span-1 space-y-6">
          {loading
            ? Array(3)
                .fill(null)
                .map((_, i) => (
                  <div key={i} className="flex gap-4">
                    <div className={`w-20 h-20 rounded ${shimmer}`} />
                    <div className="flex flex-col justify-between space-y-2">
                      <div className={`h-3 w-32 rounded ${shimmer}`} />
                      <div className={`h-4 w-48 rounded ${shimmer}`} />
                    </div>
                  </div>
                ))
            : others.map((article, i) => (
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={article.url}
                  href={article.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex gap-4 p-2 rounded-md border dark:border-white/10 border-[#07153b] shadow hover:shadow-lg dark:hover:bg-white/5 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-20 h-20 bg-gray-300 rounded overflow-hidden flex-shrink-0">
                    <img
                      src={article.image || fallbackImage}
                      onError={e => (e.currentTarget.src = fallbackImage)}
                      alt={article.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-[#EC3B3B]">
                      {new Date(article.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                    <h3 className="font-semibold text-sm leading-snug line-clamp-2">
                      {article.title}
                    </h3>
                  </div>
                </motion.a>
              ))}
        </div>

        {/* Featured Article */}
        {featured && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 dark:bg-white/5 border-[#07153b] rounded-lg overflow-hidden shadow-xl hover:-translate-y-1 hover:shadow-2xl border dark:transition-all duration-300"
          >
            <a href={featured.url} target="_blank" rel="noreferrer">
              <img
                src={featured.image || fallbackImage}
                onError={e => (e.currentTarget.src = fallbackImage)}
                alt={featured.title}
                className="w-full h-72 object-cover"
              />
              <div className="p-6">
                <div className="flex flex-wrap gap-2 text-xs dark:text-[#DAE6EA]/70 text-[#07153b]">
                  <span className="bg-[#EC3B3B] dark:text-white text-[#07153b] px-2 py-1 rounded-full text-xs">
                    {featured.source.name}
                  </span>
                  <span>
                    {new Date(featured.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <h2 className="text-2xl font-bold dark:text-white text-[#07153b] mt-3 mb-2 leading-snug hover:underline">
                  {featured.title}
                </h2>
                <p className="dark:text-[#DAE6EA]/90 text-[#07153b] line-clamp-3">
                  {featured.description}
                </p>
              </div>
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
