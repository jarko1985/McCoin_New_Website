import { NewsItem } from "@/types/Messari";
import { format } from "date-fns";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

export function NewsCard({ news }: { news: NewsItem }) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 h-full flex flex-col overflow-hidden">
    {news.previewImage && (
      <div className="w-full aspect-[16/9] relative">
        <Image
          src={news.previewImage}
          alt={news.title}
          fill
          className="object-cover rounded-t-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    )}
    <CardHeader className="pt-4">
      <h3 className="text-xl font-semibold line-clamp-2">{news.title}</h3>
      <div className="flex items-center justify-between text-sm text-muted-foreground mt-2">
        <span>{news.author?.name || "Unknown Author"}</span>
        <span>{format(new Date(news.published_at), "MMM d, yyyy")}</span>
      </div>
    </CardHeader>
    <CardContent className="flex-grow">
      <p className="text-muted-foreground line-clamp-3">{news.content}</p>
    </CardContent>
    <CardFooter>
      <Button asChild variant="outline" className="w-full">
        <Link href={news.url} target="_blank" rel="noopener noreferrer">
          Read More
        </Link>
      </Button>
    </CardFooter>
  </Card>
  
  );
}

export function NewsList({ news }: { news: NewsItem[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {news.map((item) => (
        <NewsCard key={item.id} news={item} />
      ))}
    </div>
  );
}

export function NewsListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-[400px] w-full rounded-lg bg-muted animate-pulse" />
      ))}
    </div>
  );
}