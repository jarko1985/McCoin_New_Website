"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import { NewsItem } from "@/types/Messari";

export default function ArticleDetail() {
  const { id, locale }: { id?: string; locale?: string } = useParams() as any;
  const [article, setArticle] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || !locale) return;

    async function getArticle() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/api/messari`, {
          cache: "no-store",
        });

        if (!res.ok) {
          setArticle(null);
          return;
        }

        const articles: NewsItem[] = await res.json();
        const found = articles.find((a) => a.id === id) || null;
        setArticle(found);
      } catch (error) {
        console.error("Error fetching article:", error);
        setArticle(null);
      } finally {
        setLoading(false);
      }
    }

    getArticle();
  }, [id, locale]);

  if (loading) return <p className="text-center py-12">Loading...</p>;
  if (!article) return notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{article.title}</h1>

        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
          <span>by {article.author?.name || "Unknown Author"}</span>
          <span>•</span>
          <span>
            {new Date(article.published_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>

        {article.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-[#DAE6EA] text-[#07153b] rounded-full text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {article.previewImage && (
        <div className="relative w-full aspect-video mb-8 rounded-lg overflow-hidden">
          <Image
            src={article.previewImage}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <article className="prose prose-lg max-w-none text-white">
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </article>

      {article.url && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#EC3B3B] hover:underline inline-flex items-center"
          >
            Read original article
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
}
