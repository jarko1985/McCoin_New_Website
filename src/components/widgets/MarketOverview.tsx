"use client";

import { useEffect, useState } from "react";

export default function TradingViewMarketOverview() {
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

    loadWidget();

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

  return (
    <div className="w-[35%]">
      <div className="tradingview-widget-container w-full relative min-h-[600px]">
        <div
          className="
          bg-[#07153b]
          rounded-xl
          border
          w-full
          border-gray-600/30
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
  );
}
