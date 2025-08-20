'use client';
import { useEffect, useState, useRef } from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';

// 3D Cube Component
const RotatingCube = ({ data, percentage }: { data: any; percentage: number }) => {
  const t = useTranslations('HomePage.Dashboard');
  return (
    <div className="flex justify-center items-center h-[400px] perspective-1000 select-none">
      <div
        className="relative w-80 h-80 animate-spin-slow"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Face 1: 24H Price Change */}
        <div
          className="absolute w-80 h-80 bg-gradient-to-br from-[#050E27] to-[#07153b] rounded-xl border border-[#1a2f4d] shadow-2xl flex flex-col justify-center items-center p-6"
          style={{
            transform: 'rotateY(0deg) translateZ(160px)',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
          }}
        >
          <h3 className="text-xl text-[#DAE6EA] mb-6 font-semibold">{t('price_change_24h')}</h3>
          <div className="flex items-center gap-8 mb-6">
            <div className="flex items-center gap-2">
              <div className="text-green-400 flex items-center gap-1 text-lg font-semibold">
                <ArrowUp className="w-4 h-4" />
                {data.up}
              </div>
              <p className="text-xs text-[#DAE6EA]">{t('price_up')}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-red-400 flex items-center gap-1 text-lg font-semibold">
                <ArrowDown className="w-4 h-4" />
                {data.down}
              </div>
              <p className="text-xs text-[#DAE6EA]">{t('price_down')}</p>
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
                className="text-[#EC3B3B]"
                stroke="#EC3B3B"
                strokeWidth="3.8"
                strokeDasharray={`${percentage}, 100`}
                fill="none"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <text x="18" y="20.35" className="fill-[#DAE6EA] text-[6px]" textAnchor="middle">
                {percentage}%
              </text>
            </svg>
          </div>
        </div>

        {/* Face 2: Total Market Cap */}
        <div
          className="absolute w-80 h-80 bg-gradient-to-br from-[#050E27] to-[#07153b] rounded-xl border border-[#1a2f4d] shadow-2xl flex flex-col justify-center items-center p-6"
          style={{
            transform: 'rotateY(90deg) translateZ(160px)',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
          }}
        >
          <h3 className="text-xl text-[#DAE6EA] mb-6 font-semibold">{t('total_market_cap')}</h3>
          <div className="text-4xl text-[#FFF] font-bold mb-4">
            {(data.totalMarketCap / 1e9).toFixed(2)} B
          </div>
          <div className="text-red-400 flex items-center text-lg">
            <ArrowDown className="w-5 h-5 mr-2" /> -0.32%
          </div>
        </div>

        {/* Face 3: Total Value */}
        <div
          className="absolute w-80 h-80 bg-gradient-to-br from-[#050E27] to-[#07153b] rounded-xl border border-[#1a2f4d] shadow-2xl flex flex-col justify-center items-center p-6"
          style={{
            transform: 'rotateY(180deg) translateZ(160px)',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
          }}
        >
          <h3 className="text-xl text-[#DAE6EA] mb-6 font-semibold">{t('total_value')}</h3>
          <div className="text-2xl font-bold text-[#FFF] text-center">
            {Number(data.totalValue).toLocaleString()}
          </div>
          <div className="text-[#DAE6EA]/70 text-sm mt-4 text-center">
            {t('global_market_value')}
          </div>
        </div>

        {/* Face 4: Market Statistics */}
        <div
          className="absolute w-80 h-80 bg-gradient-to-br from-[#050E27] to-[#07153b] rounded-xl border border-[#1a2f4d] shadow-2xl flex flex-col justify-center items-center p-6"
          style={{
            transform: 'rotateY(270deg) translateZ(160px)',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
          }}
        >
          <h3 className="text-xl text-[#DAE6EA] mb-6 font-semibold">{t('market_statistics')}</h3>
          <div className="space-y-4 text-center">
            <div>
              <div className="text-2xl text-[#FFF] font-bold">{data.up + data.down}</div>
              <div className="text-sm text-[#DAE6EA]/70">{t('total_coins')}</div>
            </div>
            <div>
              <div className="text-2xl text-green-400 font-bold">{data.up}</div>
              <div className="text-sm text-[#DAE6EA]/70">{t('gaining')}</div>
            </div>
            <div>
              <div className="text-2xl text-red-400 font-bold">{data.down}</div>
              <div className="text-sm text-[#DAE6EA]/70">{t('declining')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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
      <div className="text-white">
        <div className="flex justify-center items-center h-[400px]">
          <div className="w-80 h-80 bg-[#050E27] rounded-xl shadow-2xl flex items-center justify-center">
            <div className="text-center">
              <Skeleton className="h-8 w-48 mb-4 bg-[#1c2f5c]" />
              <Skeleton className="h-6 w-32 mb-2 bg-[#1c2f5c]" />
              <Skeleton className="h-6 w-40 bg-[#1c2f5c]" />
            </div>
          </div>
        </div>
      </div>
    );

  const percentage = Math.round((data.up / (data.up + data.down)) * 100);

  return (
    <div className="">
      {/* 3D Rotating Cube */}
      <RotatingCube data={data} percentage={percentage} />

      {/* Historical Market Value */}
      {/* <div className="relative w-full mt-6 rounded-xl overflow-hidden">
        <Image
          src="/images/historical_chart.svg"
          alt="Historical Market Chart"
          width={400}
          height={200}
          className="w-full object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full h-[50%] bg-gradient-to-t from-[#07153b] to-transparent pointer-events-none" />
      </div> */}
    </div>
  );
}
