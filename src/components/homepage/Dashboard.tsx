// components/Dashboard.tsx
'use client';
import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts';
import { useParams } from 'next/navigation';
import Image from 'next/image';

interface Coin {
    id: string;
    name: string;
    market_cap: number;
    total_volume: number;
    price_change_percentage_24h: number;
    price_change_percentage_7d_in_currency: number;
}

export default function Dashboard() {
    const [data, setData] = useState<any>(null);
    const locale = (useParams() as { locale?: string })?.locale ?? "en";
    useEffect(() => {
        fetch(`/${locale}/api/dashboard`)
            .then(res => res.json())
            .then(setData);
    }, []);

    if (!data) return <div className="text-white">Loading...</div>;

    const percentage = Math.round((data.up / (data.up + data.down)) * 100);

    const mockLength = 20;
    const chartData = Array.from({ length: mockLength }, (_, i) => {
        const entry: any = { name: `${i * 3}h` };
        (data.historicalData ?? []).forEach((coin: Coin, index: number) => {
            const base = 10000 + index * 1500;
            const frequency = 0.6 + index * 0.2;
            const amplitude = 800 + index * 200;
            const variation = Math.sin(i * frequency + index) * amplitude;
            entry[coin.name] = Math.round(base + variation);
        });
        return entry;
    });

    function getColor(id: string) {
        switch (id) {
            case 'bitcoin': return '#DAE6EA';
            case 'ethereum': return '#0074FF';
            case 'binancecoin': return '#00C896';
            case 'tether': return '#EC3B3B';
            case 'solana': return '#999';
            default: return '#fff';
        }
    }
    const getLineShape = (index: number): "monotone" | "linear" | "natural" | "basis" => {
        const shapes = ['monotone', 'basis', 'linear', 'natural'] as const;
        return shapes[index % shapes.length];
    };

    return (
        <div className=" space-y-4 bg-[#07153b] text-white xl:max-w-[70%] mx-auto px-4 xl:px-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 24H Price Change + Gauge */}
                <div className="bg-[#050E27] rounded-xl py-3 px-3 flex justify-between items-center shadow-md">
                    <div>
                        <p className="text-lg text-[#DAE6EA] mb-4 whitespace-nowrap">24H Price Change</p>

                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <div className="text-green-400 flex items-center gap-1 text-lg font-semibold">
                                    <ArrowUp className="w-4 h-4" />
                                    {data.up}
                                </div>
                                <p className="text-xs text-[#DAE6EA]">Price up</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="text-red-400 flex items-center gap-1 text-lg font-semibold">
                                    <ArrowDown className="w-4 h-4" />
                                    {data.down}
                                </div>
                                <p className="text-xs text-[#DAE6EA]">Price down</p>
                            </div>
                        </div>
                    </div>
                  <div className="relative w-20 h-20">
            <svg viewBox="0 0 36 36" className="w-full h-full">
              <path
                className="text-[#1c2f5c]"
                stroke="#1c2f5c"
                strokeWidth="3.8"
                fill="none"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-[#EC3B3B] animate-[dash_1s_ease-out_forwards]"
                stroke="#EC3B3B"
                strokeWidth="3.8"
                strokeDasharray={`${percentage}, 100`}
                fill="none"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <text x="18" y="20.35" className="fill-white text-[6px]" textAnchor="middle">
                {percentage}%
              </text>
            </svg>
          </div>
                </div>

                {/* Total Market Cap */}
                <div className="bg-[#050E27] rounded-xl p-6 shadow-md">
                    <p className="text-sm text-[#DAE6EA] mb-2">Total Market Cap (USD)</p>
                    <div className="text-2xl font-bold">{(data.totalMarketCap / 1e9).toFixed(2)} B</div>
                    <div className="text-red-400 flex items-center mt-1">
                        <ArrowDown className="w-4 h-4 mr-1" /> -0.32%
                    </div>
                </div>

                {/* Total Value */}
                <div className="bg-[#050E27] rounded-xl p-6 shadow-md">
                    <p className="text-sm text-[#DAE6EA] mb-2">Total Value</p>
                    <div className="text-2xl font-bold">{Number(data.totalValue).toLocaleString()}</div>
                </div>
            </div>

            {/* Historical Market Value */}
          <div className="relative w-full mt-6 rounded-xl overflow-hidden">
        <Image
          src="/images/historical_chart.svg"
          alt="Historical Market Chart"
          width={400}
          height={200}
          className="w-full object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full h-[50%] bg-gradient-to-t from-[#07153b] to-transparent pointer-events-none" />
      </div>
        </div>
    );
}
