'use client';
import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const locale = (useParams() as { locale?: string })?.locale ?? 'en';
  useEffect(() => {
    fetch(`/${locale}/api/dashboard`)
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data)
    return (
      <div className="dark:bg-[#07153b] bg-[#DAE6EA] text-white xl:max-w-[70%] mx-auto px-4 xl:px-0 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 24H Price Change + Gauge Skeleton */}
          <div className="bg-[#050E27] rounded-xl py-3 px-3 flex justify-between items-center shadow-md h-[150px]">
            <div className="w-full">
              <Skeleton className="h-6 w-3/4 mb-4 bg-[#1c2f5c]" />
              <div className="flex items-center gap-6">
                <div className="flex-1">
                  <Skeleton className="h-6 w-3/4 mb-2 bg-[#1c2f5c]" />
                  <Skeleton className="h-4 w-1/2 bg-[#1c2f5c]" />
                </div>
                <div className="flex-1">
                  <Skeleton className="h-6 w-3/4 mb-2 bg-[#1c2f5c]" />
                  <Skeleton className="h-4 w-1/2 bg-[#1c2f5c]" />
                </div>
              </div>
            </div>
            <Skeleton className="w-20 h-20 rounded-full bg-[#1c2f5c]" />
          </div>

          {/* Total Market Cap Skeleton */}
          <div className="bg-[#050E27] rounded-xl p-6 shadow-md h-[150px]">
            <Skeleton className="h-5 w-3/4 mb-4 bg-[#1c2f5c]" />
            <Skeleton className="h-8 w-full mb-3 bg-[#1c2f5c]" />
            <Skeleton className="h-5 w-1/2 bg-[#1c2f5c]" />
          </div>

          {/* Total Value Skeleton */}
          <div className="bg-[#050E27] rounded-xl p-6 shadow-md h-[150px]">
            <Skeleton className="h-5 w-3/4 mb-4 bg-[#1c2f5c]" />
            <Skeleton className="h-8 w-full bg-[#1c2f5c]" />
          </div>
        </div>

        {/* Historical Market Value Skeleton */}
        <div className="w-full mt-6 rounded-xl overflow-hidden h-[200px]">
          <Skeleton className="w-full h-full bg-[#1c2f5c]" />
        </div>
      </div>
    );

  const percentage = Math.round((data.up / (data.up + data.down)) * 100);

  return (
    <div className="space-y-4 dark:bg-[#07153b] bg-[#DAE6EA] text-white xl:max-w-[70%] mx-auto px-4 xl:px-0 lg:pb-6 pb-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 24H Price Change + Gauge */}
        <div className="dark:bg-[#050E27] bg-[#DAE6EA] rounded-xl py-3 px-3 flex justify-between items-center shadow-lg dark:border-none border border-[#050E27]">
          <div>
            <p className="text-lg dark:text-[#DAE6EA] text-[#07153b]  mb-4 whitespace-nowrap">
              24H Price Change
            </p>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="text-green-400 flex items-center gap-1 text-lg font-semibold">
                  <ArrowUp className="w-4 h-4" />
                  {data.up}
                </div>
                <p className="text-xs dark:text-[#DAE6EA] text-[#07153b]">Price up</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-red-400 flex items-center gap-1 text-lg font-semibold">
                  <ArrowDown className="w-4 h-4" />
                  {data.down}
                </div>
                <p className="text-xs dark:text-[#DAE6EA] text-[#07153b]">Price down</p>
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
              <text
                x="18"
                y="20.35"
                className="dark:fill-[#DAE6EA] fill-[#07153b] text-[6px]"
                textAnchor="middle"
              >
                {percentage}%
              </text>
            </svg>
          </div>
        </div>

        {/* Total Market Cap */}
        <div className="dark:bg-[#050E27] bg-[#DAE6EA] rounded-xl p-6 shadow-lg dark:border-none border border-[#050E27]">
          <p className="text-sm dark:text-[#DAE6EA] text-[#07153b] mb-2">Total Market Cap (USD)</p>
          <div className="text-2xl dark:text-[#FFF] text-[#07153b] font-bold">
            {(data.totalMarketCap / 1e9).toFixed(2)} B
          </div>
          <div className="text-red-400 flex items-center mt-1">
            <ArrowDown className="w-4 h-4 mr-1" /> -0.32%
          </div>
        </div>

        {/* Total Value */}
        <div className="dark:bg-[#050E27] bg-[#DAE6EA] rounded-xl p-6 shadow-lg dark:border-none border border-[#050E27]">
          <p className="text-sm dark:text-[#DAE6EA] text-[#07153b] mb-2">Total Value</p>
          <div className="text-2xl font-bold dark:text-[#FFF] text-[#07153b]">
            {Number(data.totalValue).toLocaleString()}
          </div>
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
