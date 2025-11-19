"use client";

import React, { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Bitcoin,
  TrendingUp,
  Shield,
  BarChart3,
  Scale,
  PieChart,
  ArrowRight,
  Calendar,
  Mail,
  Send,
} from "lucide-react";

// ===== Types =====
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

// ===== Filter categories (unchanged) =====
const categories = [
  { id: "crypto-security", label: "Crypto Security", icon: Shield, color: "text-red-400" },
  { id: "cryptomarket", label: "Crypto Market", icon: TrendingUp, color: "text-blue-400" },
  { id: "bitcoin", label: "Bitcoin", icon: Bitcoin, color: "text-orange-500" },
  { id: "ethereum", label: "Ethereum", icon: TrendingUp, color: "text-blue-400" },
  { id: "market-trends", label: "Market Trends", icon: BarChart3, color: "text-green-400" },
  { id: "risk-management", label: "Risk Management", icon: Shield, color: "text-red-400" },
  { id: "technical-indicators", label: "Technical Indicators", icon: BarChart3, color: "text-purple-400" },
  { id: "crypto-regulations", label: "Cryptocurrency Regulations", icon: Scale, color: "text-yellow-400" },
  { id: "portfolio-diversification", label: "Portfolio Diversification", icon: PieChart, color: "text-pink-400" },
];

export default function BlogPage() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useMemo(() => (pathname?.split("/")?.[1] || "en"), [pathname]);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [email, setEmail] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // ===== Fetch posts from Admin App public API =====
  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetch(
          `/api/blog-posts`,
          { cache: "no-store" } // always fresh on client
        );
        if (!res.ok) throw new Error("Failed to load posts");
        const data = (await res.json()) as { posts: Post[] };
        if (mounted) setPosts(data.posts || []);
      } catch (e) {
        console.error(e);
        if (mounted) setPosts([]);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  // Helper function to safely parse dates
  const safeParseDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        // If date is invalid, return current date
        return new Date().toISOString();
      }
      return date.toISOString();
    } catch (error) {
      // If parsing fails, return current date
      return new Date().toISOString();
    }
  };

  // ===== Structured Data (built from fetched posts) =====
  const structuredData = useMemo(() => {
    const base = process.env.NEXT_PUBLIC_BASE_URL || "https://mc-coin-new-website-hassanjarkoyahoocoms-projects.vercel.app";
    return {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "McCoin Crypto Blog",
      description:
        "Stay updated with the latest cryptocurrency news, market analysis, and trading insights from McCoin. Expert articles on crypto security, market trends, and blockchain technology in the MENA region.",
      url: `${base}/blog`,
      publisher: {
        "@type": "Organization",
        name: "McCoin",
        logo: {
          "@type": "ImageObject",
          url: `${base}/images/mc_logo.png`,
        },
      },
      blogPost: posts.map((post) => ({
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        url: `${base}/blog/${post.slug}`,
        datePublished: safeParseDate(post.publishDate),
        author: {
          "@type": "Organization",
          name: post.author || "McCoin Editorial Team",
        },
        image: `${base}${post.image}`,
        articleSection: post.category,
      })),
    };
  }, [posts]);

  // ===== Filter + Featured =====
  const filteredPosts = useMemo(() => {
    if (selectedCategory === "all") return posts;
    return posts.filter((p) => p.category === selectedCategory);
  }, [posts, selectedCategory]);

  const featuredPost = useMemo(() => {
    if (!posts.length) return undefined;
    return posts.find((p) => p.featured) || posts[0];
  }, [posts]);

  // ===== Utils =====
  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = (content || "").trim().split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: connect to your newsletter provider
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-[#07153B]">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent z-10" />
        {featuredPost && (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
            style={{ backgroundImage: `url(${featuredPost.image})` }}
          />
        )}

        {/* Floating crypto icons */}
        <div className="absolute inset-0 z-5">
          <div className="absolute top-20 right-20 w-16 h-16 bg-[#EC3B3B]/20 rounded-full animate-float opacity-60" />
          <div
            className="absolute top-40 right-40 w-12 h-12 bg-[#DAE6EA]/20 rounded-full animate-float opacity-60"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute bottom-40 left-40 w-20 h-20 bg-gradient-to-r from-[#EC3B3B]/20 to-[#DAE6EA]/20 rounded-full animate-float opacity-60"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="relative z-20 h-full">
          <div className="container mx-auto px-6 relative h-full">
            <div className="max-w-2xl slide-in-up">
              <Badge className="absolute top-2 right-0 bg-[#EC3B3B] text-white hover:bg-[#EC3B3B]/90 glow-effect">
                Featured Article
              </Badge>

              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                {isLoading ? "Loading…" : featuredPost?.title}
              </h1>

              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                {isLoading ? " " : featuredPost?.description}
              </p>

              {featuredPost && (
                <Button
                  size="lg"
                  className="absolute cursor-pointer bottom-4 left-0 bg-[#EC3B3B] hover:bg-[#EC3B3B]/90 text-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => router.push(`/${locale}/blog/${featuredPost.slug}`)}
                >
                  Read Full Article
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-8 bg-[#07153B] border-b border-[#DAE6EA]/20">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              onClick={() => setSelectedCategory("all")}
              className={`${
                selectedCategory === "all"
                  ? "bg-[#EC3B3B] text-white hover:bg-[#EC3B3B]/90 glow-effect"
                  : "bg-transparent border-[#DAE6EA]/20 text-[#DAE6EA] hover:bg-[#DAE6EA]/10 hover:text-white"
              } transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl`}
            >
              All Topics
            </Button>

            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`${
                    selectedCategory === category.id
                      ? "bg-[#EC3B3B] text-white hover:bg-[#EC3B3B]/90 glow-effect"
                      : "bg-transparent border-[#DAE6EA]/20 text-[#DAE6EA] hover:bg-[#DAE6EA]/10 hover:text-white"
                  } transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl fade-in-scale`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Icon className={`mr-2 h-4 w-4 ${category.color}`} />
                  {category.label}
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 bg-[#07153B]">
        <div className="container mx-auto px-6">
          {isLoading ? (
            <div className="text-center py-16 slide-in-up">
              <div className="w-24 h-24 mx-auto mb-6 bg-[#DAE6EA]/10 rounded-full animate-pulse" />
              <p className="text-[#DAE6EA]/70 text-xl">Loading posts…</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredPosts.map((post, index) => (
                  <Card
                    key={post.id}
                    className="group bg-[#07153B] border border-[#DAE6EA]/20 hover:border-[#EC3B3B]/40 transition-all duration-500 transform hover:scale-105 hover:shadow-4xl hover:shadow-black/50 overflow-hidden fade-in-scale"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-1 left-4">
                        <Badge className="bg-[#EC3B3B] text-white hover:bg-[#EC3B3B]/90 shadow-lg">
                          {categories.find((cat) => cat.id === post.category)?.label || post.category}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <Button
                          size="sm"
                          className="bg-[#EC3B3B]/20 hover:bg-[#EC3B3B] text-white border-0 cursor-pointer"
                          onClick={() => router.push(`/${locale}/blog/${post.slug}`)}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <div className="flex items-center justify-between text-[#DAE6EA]/70 text-sm mb-3">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          {post.publishDate}
                        </div>
                        <div className="flex items-center">
                          <span className="text-xs bg-[#EC3B3B]/20 text-[#EC3B3B] px-2 py-1 rounded-full">
                            {calculateReadingTime(post.content || "")} min read
                          </span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-[#DAE6EA] mb-3 line-clamp-2 group-hover:text-[#EC3B3B] transition-colors duration-300">
                        {post.title}
                      </h3>

                      <p className="text-[#DAE6EA]/80 text-sm leading-relaxed line-clamp-3 mb-4">
                        {post.description}
                      </p>

                      <Button
                        className="w-full text-[#EC3B3B] hover:text-white hover:bg-[#EC3B3B] transition-all duration-300 group-hover:shadow-lg cursor-pointer"
                        onClick={() => router.push(`/${locale}/blog/${post.slug}`)}
                      >
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-16 slide-in-up">
                  <div className="w-24 h-24 mx-auto mb-6 bg-[#DAE6EA]/10 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-12 w-12 text-[#DAE6EA]/50" />
                  </div>
                  <p className="text-[#DAE6EA]/70 text-xl">No posts found for this category.</p>
                  <p className="text-[#DAE6EA]/50 text-sm mt-2">
                    Try selecting a different category or check back later.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-[#07153B] to-[#EC3B3B]/20 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-[#EC3B3B]/10 rounded-full animate-float" />
          <div
            className="absolute bottom-20 right-20 w-24 h-24 bg-[#DAE6EA]/10 rounded-full animate-float"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-r from-[#EC3B3B]/5 to-[#DAE6EA]/5 rounded-full animate-float"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Image */}
            <div className="relative fade-in-scale">
              <div className="relative z-10">
                <img
                  src="/images/rocket.png"
                  alt="Newsletter"
                  className="w-full h-80 object-contain rounded-2xl shadow-4xl transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl" />
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#EC3B3B] rounded-full opacity-20 animate-float glow-effect" />
              <div
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#DAE6EA] rounded-full opacity-20 animate-float glow-effect"
                style={{ animationDelay: "1s" }}
              />
            </div>

            {/* Right side - Content */}
            <div className="space-y-8 slide-in-up">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#DAE6EA] mb-6">
                  Ready to Soar to <span className="text-[#EC3B3B]"> Wealth?</span>
                </h2>
                <p className="text-xl text-[#DAE6EA]/90 leading-relaxed">
                  <span className="text-[#EC3B3B]">McCoin</span> is your key to profitable trading! Learn, trade, and
                  grow with our expert insights, live trade signals, and mentorship programs. Don't wait - start your
                  journey to financial success today.
                </p>
              </div>

              <form onSubmit={handleNewsletterSubmit} className="space-y-6">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#DAE6EA]/70" />
                  <Input
                    type="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 pr-4 py-4 bg-[#07153B] border border-[#DAE6EA]/20 text-[#DAE6EA] placeholder:text-[#DAE6EA]/70 focus:border-[#EC3B3B] focus:ring-[#EC3B3B] rounded-xl transition-all duration-300"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-[#EC3B3B] hover:bg-[#EC3B3B]/90 text-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 py-4 glow-effect"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Subscribe Now
                </Button>
              </form>

              <div className="flex flex-wrap items-center gap-6 text-[#DAE6EA]/70">
                <div className="flex items-center group">
                  <div className="w-3 h-3 bg-[#EC3B3B] rounded-full mr-3 group-hover:animate-pulse" />
                  <span className="text-sm group-hover:text-[#EC3B3B] transition-colors duration-300">
                    Expert Insights
                  </span>
                </div>
                <div className="flex items-center group">
                  <div className="w-3 h-3 bg-[#DAE6EA] rounded-full mr-3 group-hover:animate-pulse" />
                  <span className="text-sm group-hover:text-[#DAE6EA] transition-colors duration-300">Live Signals</span>
                </div>
                <div className="flex items-center group">
                  <div className="w-3 h-3 bg-[#EC3B3B] rounded-full mr-3 group-hover:animate-pulse" />
                  <span className="text-sm group-hover:text-[#EC3B3B] transition-colors duration-300">Mentorship</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
