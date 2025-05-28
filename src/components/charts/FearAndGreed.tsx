"use client";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "date-fns";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const GaugeChart = dynamic(() => import("react-gauge-chart"), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-[200px] rounded-full" />,
});

export default function FearAndGreedChart() {
  const locale = (useParams() as { locale?: string })?.locale ?? "en";
  const [index, setIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sideArticles, setSideArticles] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/${locale}/api/fear-and-greed`);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        const value = Number(data.value);

        if (isNaN(value)) {
          throw new Error("Invalid data format");
        }

        setIndex(Math.min(Math.max(value, 0), 100)); // Clamp value 0-100
      } catch (err) {
        console.error("Failed to fetch Fear & Greed Index:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
        setIndex(null);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    fetchSideArticles()
    const interval = setInterval(fetchData, 300000); // Refresh every 5 minutes

    return () => clearInterval(interval);
  }, [locale]);

async function fetchSideArticles() {
  try {
    const res = await fetch(
      `https://newsdata.io/api/1/latest?apikey=pub_752267707f3132a3cc9669daa80ac2dabab98&q=CRYPTO&country=ae`
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    if (Array.isArray(data.results)) {
      setSideArticles(data.results.slice(0, 3));
    } else {
      console.error("Expected 'results' to be an array, got:", data);
    }
  } catch (err) {
    console.error("Failed to fetch side articles:", err);
  }
}

  const getSentimentLabel = (value: number) => {
    if (value < 20) return "Extreme Fear";
    if (value < 40) return "Fear";
    if (value < 60) return "Neutral";
    if (value < 80) return "Greed";
    return "Extreme Greed";
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-[#07153b] via-[#0c1e4d] to-[#07153b]/80 backdrop-blur-md bg-opacity-60 text-white w-[60%] mx-auto p-6 rounded-xl shadow-lg space-y-6">
        <Skeleton className="h-8 w-1/2 mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="w-full md:w-1/2">
            <Skeleton className="w-full h-[200px] rounded-full" />
          </div>

          <div className="text-center md:text-left space-y-4 w-full md:w-1/2">
            <div>
              <Skeleton className="h-12 w-20 mx-auto md:mx-0" />
              <Skeleton className="h-6 w-24 mt-2 mx-auto md:mx-0" />
            </div>
            <div className="flex flex-col gap-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Skeleton className="h-4 w-1/2" />
          <div className="flex gap-2">
            <Skeleton className="flex-1 h-10" />
            <Skeleton className="flex-1 h-10" />
          </div>
        </div>

        <div className="space-y-2">
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-[#07153b] via-[#0c1e4d] to-[#07153b]/80 backdrop-blur-md bg-opacity-60 text-white w-[60%] mx-auto p-6 rounded-xl shadow-lg space-y-6 text-center">
        <h2 className="text-2xl font-bold">Crypto Fear & Greed Index</h2>
        <div className="py-10 text-red-400">Failed to load data: {error}</div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <section className="flex gap-4 flex-col md:flex-row mb-12">
    
    <div className="bg-gradient-to-br from-[#07153b] via-[#0c1e4d] to-[#07153b]/80 backdrop-blur-md bg-opacity-60 flex-[0.6] text-white border border-slate-600 mx-auto p-4 rounded-xl shadow-lg space-y-6">
      <h2 className="text-2xl font-bold">Crypto Fear & Greed Index</h2>
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="w-full md:w-1/2">
          <GaugeChart
            id="crypto-fear-greed"
            nrOfLevels={30}
            arcPadding={0.03}
            colors={["#ea3945", "#f5c42d", "#4cbf4b"]}
            percent={(index ?? 0) / 100}
            arcWidth={0.3}
            needleColor="#ffffff"
            textColor="#ffffff"
            hideText={true}
            animate={!loading}
          />
        </div>

        <div className="text-center md:text-left space-y-4">
          <div>
            <div className="text-5xl font-bold">{index}</div>
            <div
              className={`text-xl font-semibold ${
                !index
                  ? "text-gray-400"
                  : index < 20
                  ? "text-red-400"
                  : index < 40
                  ? "text-orange-400"
                  : index < 60
                  ? "text-yellow-400"
                  : index < 80
                  ? "text-lime-400"
                  : "text-green-400"
              }`}
            >
              {index ? getSentimentLabel(index) : "Loading..."}
            </div>
          </div>
          <div className="flex flex-col gap-2 text-sm text-gray-400">
            <div>
              <span className="text-white font-medium">Yesterday</span>: Greed{" "}
              <span className="float-right text-white font-semibold pl-1">
                61
              </span>
            </div>
            <div>
              <span className="text-white font-medium">Last Week</span>: Fear{" "}
              <span className="float-right text-white font-semibold pl-1">
                39
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-400 mt-4">
        <p className="mb-2">How do you feel about BTC today?</p>
        <div className="flex flex-col md:flex-row gap-2">
          <button className="flex-1 bg-red-500 hover:bg-red-600 transition text-white font-semibold py-2 rounded">
            Bearish
          </button>
          <button className="flex-1 bg-green-500 hover:bg-green-600 transition text-white font-semibold py-2 rounded">
            Bullish
          </button>
        </div>
      </div>

      <div className="text-sm text-gray-300 border-t border-gray-700 pt-4">
        <h3 className="font-semibold mb-1">
          What's Crypto Fear & Greed Index?
        </h3>
        <p>
          The index ranges from 0 (Extreme Fear) to 100 (Extreme Greed),
          reflecting crypto market sentiment. A low value signals over-selling,
          while a high value warns of a potential market correction. Binance
          Square combines trading data and unique user behavior insights for a
          precise overview.
        </p>
      </div>
    </div>
    <div className="flex-[0.4] bg-gradient-to-br from-[#07153b] via-[#0c1e4d] to-[#07153b]/80 backdrop-blur-md bg-opacity-60 text-white border border-slate-600 p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold text-white mb-8 pl-6 relative">
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-sm"></span>
       Trending Topics
      </h2>
       <div className="flex flex-col justify-between">
          {sideArticles.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-[#07153b] backdrop-blur-md rounded-lg p-3 flex gap-4 items-center mb-4 last:mb-0 shadow-md hover:-translate-y-2 tramsition-transform duration-300 border border-slate-700"
            >
              <Link
                href={article.link}
                className="flex gap-2 items-center group w-full"
              >
                <div className="w-24 h-24 relative overflow-hidden rounded-lg">
                  <Image
                    src={article.image_url || "/images/fallback-image.jpeg"}
                    alt={article.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    fill
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold text-sm leading-snug transition-colors line-clamp-2">
                    {article.title}
                  </h4>
                  <div className="text-xs text-[#DAE6EA] mt-1">
                    {article.pubDate}                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
    </div>  
    </section>
  );
}
