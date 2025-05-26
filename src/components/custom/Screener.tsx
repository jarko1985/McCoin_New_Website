"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Coin = {
  id: string;
  name: string;
  image: string;
  price: number;
  price_change: number;
  percent_change: number;
};

export default function Screener() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const locale = (useParams() as { locale?: string })?.locale ?? "en";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/${locale}/api/screener`);
        const data = await res.json();

        // Validate that data is an array
        if (Array.isArray(data)) {
          setCoins(data);
        } else {
          console.error("API did not return an array:", data);
          setCoins([]); // prevent crash
        }
      } catch (err) {
        console.error("Error fetching screener data:", err);
        setCoins([]); // prevent crash
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  // Duplicate data for seamless loop
  const duplicatedCoins = [...coins, ...coins];

  return (
    <div className="overflow-hidden bg-[#07153b] py-2">
      <div className="ticker-track">
        {duplicatedCoins.map((coin, index) => (
          <div key={`${coin.id}-${index}`} className="ticker-item">
            <img src={coin.image} alt={coin.name} className="w-5 h-5 mr-1" />
            <strong className="mr-1">{coin.name}</strong>
            <span className="mr-1">{coin.price.toFixed(4)}</span>
            <span
              className={`mr-2 ${
                coin.price_change >= 0 ? "text-green-500" : "text-[#EC3B3B]"
              }`}
            >
              {coin.price_change >= 0 ? "+" : ""}
              {coin.price_change.toFixed(2)} ({coin.percent_change.toFixed(2)}%)
            </span>
            <span className="text-[#DAE6EA] px-2">|</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        .ticker-track {
          display: flex;
          width: max-content;
          animation: scrollLoop 60s linear infinite;
        }

        .ticker-item {
          display: flex;
          align-items: center;
          color: #dae6ea;
          white-space: nowrap;
          padding-right: 16px;
        }

        @keyframes scrollLoop {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
