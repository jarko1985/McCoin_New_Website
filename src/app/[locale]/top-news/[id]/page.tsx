import Image from "next/image";
import { notFound } from "next/navigation";

interface NewsArticle {
  article_id: string;
  title: string;
  description: string;
  content: string;
  image_url: string;
  pubDate: string;
  source_name: string;
}

async function getNewsArticle(
  id: string,
  locale: string,
  source: string
): Promise<NewsArticle | null> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const endpoint = source === "gnews" ? "gnews" : "newsdata";

  try {
    const res = await fetch(`${baseUrl}/${locale}/api/${endpoint}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch articles: ${res.status}`);
    }

    const articles = await res.json();

    const article = articles.find((a: any) => {
      if (source === "gnews") return encodeURIComponent(a.url) === id;
      return a.article_id === id;
    });

    if (!article) return null;

    // Normalize structure
    return source === "gnews"
      ? {
          article_id: encodeURIComponent(article.url),
          title: article.title,
          description: article.description,
          content: article.content,
          image_url: article.image,
          pubDate: article.publishedAt,
          source_name: article.source.name,
        }
      : article;
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
}

export default async function NewsDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string; locale: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { id, locale } = await params;
  const { source } = await searchParams;

  const article = await getNewsArticle(id, locale, source || "newsdata");

  if (!article) return notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 text-white">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>

      <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
        <span>Source: {article.source_name}</span>
        <span>•</span>
        <span>Published: {new Date(article.pubDate).toLocaleString()}</span>
      </div>

      {article.image_url && (
        <div className="relative w-full h-64 mb-6">
          <Image
            src={article.image_url}
            alt={article.title}
            fill
            className="object-cover rounded-md"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      )}

      <div className="prose prose-invert max-w-none">
        <p className="text-lg mb-6">{article.description}</p>
        <div className="border-t border-gray-700 pt-6">
          {article.content ? (
            <p>{article.content}</p>
          ) : (
            <p className="text-gray-400">No detailed content available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
