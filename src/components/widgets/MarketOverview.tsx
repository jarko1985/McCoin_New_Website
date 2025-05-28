"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";

export default function TradingViewMarketOverview() {
  const [BtcArticles, setBtcArticles] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWidget = () => {
      try {
        const container = document.querySelector(
          ".tradingview-widget-container__widget"
        );
        if (container) container.innerHTML = "";

        const script = document.createElement("script");
        script.src =
          "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
        script.async = true;
        script.onload = () => {
          setLoaded(true);
          setTimeout(applyCustomStyles, 500);
        };
        script.onerror = () => setError("Failed to load TradingView widget");

        script.innerHTML = JSON.stringify({
          colorTheme: "dark",
          dateRange: "12M",
          showChart: true,
          locale: "en",
          largeChartUrl: "",
          isTransparent: true,
          showSymbolLogo: true,
          showFloatingTooltip: false,
          width: "100%",
          height: 450,
          plotLineColorGrowing: "rgba(41, 98, 255, 1)",
          plotLineColorFalling: "rgba(41, 98, 255, 1)",
          gridLineColor: "rgba(242, 242, 242, 0)",
          scaleFontColor: "rgba(255, 255, 255, 1)",
          belowLineFillColorGrowing: "rgba(41, 98, 255, 0.12)",
          belowLineFillColorFalling: "rgba(41, 98, 255, 0.12)",
          belowLineFillColorGrowingBottom: "rgba(41, 98, 255, 0)",
          belowLineFillColorFallingBottom: "rgba(41, 98, 255, 0)",
          symbolActiveColor: "rgba(41, 98, 255, 0.12)",
          tabs: [
            {
              title: "Cryptocurrencies",
              symbols: [
                { s: "BINANCE:BTCUSDT" },
                { s: "BINANCE:ETHUSDT" },
                { s: "BINANCE:BTCUSD" },
                { s: "BINANCE:SOLUSDT" },
              ],
              originalTitle: "Cryptocurrencies",
            },
          ],
        });

        document
          .querySelector(".tradingview-widget-container__widget")
          ?.appendChild(script);
      } catch (err) {
        setError("Error initializing widget");
        console.error(err);
      }
    };

    const applyCustomStyles = () => {
      const style = document.createElement("style");
      style.innerHTML = `
        .tv-market-overview {
          border-radius: 12px !important;
          overflow: hidden !important;
        }
        .tv-market-overview__symbol:hover {
          background-color: #0a1f4d !important;
        }
        .tradingview-widget-copyright {
      display: none !important;
        }  
      `;
      document.head.appendChild(style);
    };

    async function fetchBtcArticles() {
      try {
        const res = await fetch(
          `https://data-api.coindesk.com/news/v1/article/list?lang=EN&limit=8&categories=BTCUSD`
        );
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        if (Array.isArray(data.Data)) {
          setBtcArticles(data.Data);
        } else {
          console.error("Expected 'Data' to be an array, got:", data);
        }
      } catch (err) {
        console.error("Failed to fetch side articles:", err);
      }
    }

    loadWidget();
    fetchBtcArticles();

    return () => {
      const script = document.querySelector(
        ".tradingview-widget-container__widget script"
      );
      if (script) {
        document
          .querySelector(".tradingview-widget-container__widget")
          ?.removeChild(script);
      }
    };
  }, []);
  console.log("BtcArticles", BtcArticles);

  return (
    <section className="flex flex-col md:flex-row gap-4">
      <div className="flex-[0.5]">
        <h2 className="text-xl font-bold text-white mb-8 pl-6 relative">
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-sm"></span>
       BTCUSD Top Stories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {BtcArticles.map((article) => (
          <motion.div
            key={article.ID}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5 }}
            className="bg-[#07153b] backdrop-blur-md rounded-lg p-3 flex gap-4 items-center shadow-md group border border-slate-700"
          >
            <Link href={article.URL || '#'} className={`flex gap-2 items-center group w-full ${!article.URL ? 'pointer-events-none opacity-50' : ''}`}>
              <div className="w-24 h-24 overflow-hidden rounded-lg relative">
                <motion.img
                  src={article.IMAGE_URL || '/placeholder-news.jpg'}
                  alt={article.title || 'Untitled'}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex-1 space-y-2">
                <h4 className="text-white font-semibold text-sm leading-snug group-hover:text-[#EC3B3B] transition-colors line-clamp-2">
                  {article.TITLE || 'Untitled Article'}
                </h4>
                <span className="p-[2px] rounded-lg text-xs bg-yellow-300 text-blue-950">{article.AUTHORS || "unknown Author"}</span>
                <div className="text-xs text-[#DAE6EA] mt-1">
                  {format(new Date(article.PUBLISHED_ON), "dd/MMM/yyyy")}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      </div>
      <div className="flex-[0.5]">
        <h2 className="text-xl font-bold text-white mb-8 pl-6 relative">
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-sm"></span>
       BTCUSD Top Stories
      </h2>
        <div className="tradingview-widget-container w-full relative">
          <div
            className="
          bg-[#07153b]
          rounded-xl
          border
          w-full
          border-slate-600
          overflow-hidden 
          p-[1px]
        "
          >
            <div className="relative h-full w-full rounded-[11px] overflow-hidden">
              {!loaded && !error && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#07153b] rounded-xl">
                  <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                    <p className="text-gray-300">Loading market overview...</p>
                  </div>
                </div>
              )}

              {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#07153b] rounded-xl">
                  <div className="text-center p-4">
                    <p className="text-red-300 font-medium">{error}</p>
                    <button
                      onClick={() => {
                        setError(null);
                        setLoaded(false);
                        window.location.reload();
                      }}
                      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Retry
                    </button>
                  </div>
                </div>
              )}

              <div
                className="tradingview-widget-container__widget h-[500px] mt-24"
                style={{
                  display: loaded ? "block" : "none",
                  backgroundColor: "transparent",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
