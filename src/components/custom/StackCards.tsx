'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ArrowDown, ArrowUp, TrendingUp, DollarSign, BarChart3, Activity } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';

interface DashboardData {
  up: number;
  down: number;
  totalMarketCap: number;
  totalValue: number;
  historicalData: any[];
}

interface SlideData {
  id: string;
  title: string;
  imageSrc: string;
  value: string | number;
  subtitle?: string;
  subtitleData?: {
    priceUp?: number;
    priceDown?: number;
    gaining?: number;
    declining?: number;
  };
  change?: {
    value: number;
    isPositive: boolean;
  };
  percentage?: number;
}

export default function StackCards() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const locale = (useParams() as { locale?: string })?.locale ?? 'en';
  const t = useTranslations('HomePage.StackCards');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/${locale}/api/dashboard`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [locale]);

  // Calculate percentage for price change slide
  const percentage = data ? Math.round((data.up / (data.up + data.down)) * 100) : 0;

  // Function to render colored subtitle
  const renderColoredSubtitle = (subtitle: string, subtitleData?: SlideData['subtitleData']) => {
    if (!subtitleData) {
      return <span>{subtitle}</span>;
    }

    // For price change cards
    if (subtitleData.priceUp !== undefined && subtitleData.priceDown !== undefined) {
      return (
        <span>
          <span className="text-green-400 font-semibold">{subtitleData.priceUp}</span>
          <span> coins up | </span>
          <span className="text-red-400 font-semibold">{subtitleData.priceDown}</span>
          <span> coins down</span>
        </span>
      );
    }

    // For market statistics cards
    if (subtitleData.gaining !== undefined && subtitleData.declining !== undefined) {
      return (
        <span>
          <span>Gaining: </span>
          <span className="text-green-400 font-semibold">{subtitleData.gaining}</span>
          <span> | Declining: </span>
          <span className="text-red-400 font-semibold">{subtitleData.declining}</span>
        </span>
      );
    }

    return <span>{subtitle}</span>;
  };

  // Prepare slide data
  const slides: SlideData[] = data
    ? [
        {
          id: 'market-statistics1',
          title: t('cards.market_statistics.title'),
          imageSrc: '/images/insights1.png',
          value: data.up + data.down,
          subtitle: t('cards.market_statistics.subtitle_template', {
            gaining: data.up,
            declining: data.down,
          }),
          subtitleData: {
            gaining: data.up,
            declining: data.down,
          },
        },
        {
          id: 'price-change',
          title: t('cards.price_change.title'),
          imageSrc: '/images/price.png',
          value: `${percentage}%`,
          subtitle: t('cards.price_change.subtitle_template', {
            priceUp: data.up,
            priceDown: data.down,
          }),
          subtitleData: {
            priceUp: data.up,
            priceDown: data.down,
          },
          percentage,
        },
        {
          id: 'market-cap',
          title: t('cards.market_cap.title'),
          imageSrc: '/images/market_cap.png',
          value: `$${(data.totalMarketCap / 1e9).toFixed(2)}B`,
          subtitle: t('cards.market_cap.subtitle'),
          change: {
            value: -0.32,
            isPositive: false,
          },
        },
        {
          id: 'total-value',
          title: t('cards.total_value.title'),
          imageSrc: '/images/value.png',
          value: `$${Number(data.totalValue).toLocaleString()}`,
          subtitle: t('cards.total_value.subtitle'),
        },
        {
          id: 'market-statistics',
          title: t('cards.market_statistics.title'),
          imageSrc: '/images/insights1.png',
          value: data.up + data.down,
          subtitle: t('cards.market_statistics.subtitle_template', {
            gaining: data.up,
            declining: data.down,
          }),
          subtitleData: {
            gaining: data.up,
            declining: data.down,
          },
        },
        {
          id: 'price-change1',
          title: t('cards.price_change.title'),
          imageSrc: '/images/price.png',
          value: `${percentage}%`,
          subtitle: t('cards.price_change.subtitle_template', {
            priceUp: data.up,
            priceDown: data.down,
          }),
          subtitleData: {
            priceUp: data.up,
            priceDown: data.down,
          },
          percentage,
        },
        {
          id: 'market-cap1',
          title: t('cards.market_cap.title'),
          imageSrc: '/images/market_cap.png',
          value: `$${(data.totalMarketCap / 1e9).toFixed(2)}B`,
          subtitle: t('cards.market_cap.subtitle'),
          change: {
            value: -0.32,
            isPositive: false,
          },
        },
        {
          id: 'total-value1',
          title: t('cards.total_value.title'),
          imageSrc: '/images/value.png',
          value: `$${Number(data.totalValue).toLocaleString()}`,
          subtitle: t('cards.total_value.subtitle'),
        },
        {
          id: 'market-statistics2',
          title: t('cards.market_statistics.title'),
          imageSrc: '/images/insights1.png',
          value: data.up + data.down,
          subtitle: t('cards.market_statistics.subtitle_template', {
            gaining: data.up,
            declining: data.down,
          }),
          subtitleData: {
            gaining: data.up,
            declining: data.down,
          },
        },
      ]
    : [];

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="w-full py-4 pb-5 mb-12">
      <div className="flex justify-center gap-4">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="w-[600px] h-[300px] rounded-[20px] overflow-hidden">
            <div className="h-full w-full dark:bg-gradient-to-br from-[#050E27] to-[#07153b] bg-[#DAE6EA] rounded-[20px] border border-[#1a2f4d] shadow-2xl flex flex-col justify-center items-center p-6">
              <Skeleton className="h-8 w-8 mb-4 bg-[#1c2f5c] rounded-full" />
              <Skeleton className="h-6 w-32 mb-2 bg-[#1c2f5c]" />
              <Skeleton className="h-8 w-24 mb-2 bg-[#1c2f5c]" />
              <Skeleton className="h-4 w-40 bg-[#1c2f5c]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Error component
  const ErrorDisplay = () => (
    <div className="w-full py-4 pb-5 mb-12">
      <div className="flex justify-center">
        <div className="w-[600px] h-[300px] dark:bg-gradient-to-br from-[#050E27] to-[#07153b] bg-[#DAE6EA] rounded-[20px] border border-[#1a2f4d] shadow-2xl flex flex-col justify-center items-center p-6">
          <div className="text-center">
            <div className="text-red-400 mb-4">
              <Activity className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-xl dark:text-[#DAE6EA] text-[#07153B] mb-2 font-semibold">
              {t('error_loading')}
            </h3>
            <p className="text-sm dark:text-[#DAE6EA]/70 text-[#07153B]/70 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[#1c2f5c] text-white rounded-lg hover:bg-[#2a3f6a] transition-colors"
            >
              {t('retry')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorDisplay />;
  }

  if (!data) {
    return <ErrorDisplay />;
  }

  return (
    <section className="w-full overflow-hidden xl:mt-8 mt-4">
      <Swiper
        modules={[EffectCoverflow, Pagination, A11y, Autoplay]}
        effect="coverflow"
        grabCursor
        centeredSlides
        loop
        speed={600}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 3,
          },
        }}
        coverflowEffect={{
          rotate: 10,
          stretch: 120,
          depth: 200,
          slideShadows: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          el: '.tp-pagination',
          clickable: true,
        }}
        onSlideChange={swiper => {
          setActiveIndex(swiper.realIndex);
        }}
        onSwiper={swiper => {
          setActiveIndex(swiper.realIndex);
        }}
        onClick={swiper => {
          if (typeof swiper.clickedIndex === 'number' && swiper.clickedIndex >= 0) {
            swiper.slideTo(swiper.clickedIndex);
          }
        }}
        className={[
          'xl:w-[70%] py-4 pb-5 mb-12',
          '[&_.swiper-pagination-bullet]:w-[10px] [&_.swiper-pagination-bullet]:h-[10px]',
          '[&_.swiper-pagination-bullet]:bg-[#ffffffe7] [&_.swiper-pagination-bullet]:transition-all',
          '[&_.swiper-pagination-bullet]:duration-300 [&_.swiper-pagination-bullet]:ease-in-out',
          '[&_.swiper-pagination-bullet-active]:bg-white [&_.swiper-pagination-bullet-active]:w-[18px]',
          '[&_.swiper-pagination-bullet-active]:rounded-[8px]',
        ].join(' ')}
      >
        {slides.map((slide, i) => {
          const isActive = i === activeIndex;
          return (
            <SwiperSlide key={slide.id} className="relative px-4 sm:px-0">
              <div
                className={`h-[250px] w-full dark:bg-gradient-to-br from-[#050E27] to-[#07153b] bg-[#DAE6EA] rounded-[20px] shadow-2xl flex flex-col justify-center items-center p-6 relative overflow-hidden transition-all duration-500 ${
                  isActive ? 'border-2 border-blue-900' : 'border border-[#DAE6EA]'
                }`}
              >
                {/* Background gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#1a2f4d]/20" />

                {/* Content */}
                <div className="relative z-10 text-center">
                  {/* Icon */}
                  <div className="text-[#1c2f5c] dark:text-[#DAE6EA] mb-4 mx-auto">
                    <div className="flex justify-center items-center">
                      <Image src={slide.imageSrc} alt={slide.title} width={100} height={100} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl dark:text-[#DAE6EA] text-[#07153B] mb-4 font-semibold">
                    {slide.title}
                  </h3>

                  {/* Main Value */}
                  {!slide.id.includes('price-change') && (
                    <div className="text-xl dark:text-[#FFF] text-[#07153B] font-bold mb-2">
                      {slide.value}
                    </div>
                  )}

                  {/* Subtitle */}
                  {slide.subtitle && (
                    <div className="text-sm dark:text-[#DAE6EA]/70 text-[#07153B]/70 mb-3">
                      {renderColoredSubtitle(slide.subtitle, slide.subtitleData)}
                    </div>
                  )}

                  {/* Change indicator */}
                  {slide.change && (
                    <div
                      className={`flex items-center justify-center text-lg ${
                        slide.change.isPositive ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      {slide.change.isPositive ? (
                        <ArrowUp className="w-4 h-4 mr-1" />
                      ) : (
                        <ArrowDown className="w-4 h-4 mr-1" />
                      )}
                      {slide.change.value}%
                    </div>
                  )}

                  {/* Progress circle for price change */}
                  {slide.percentage !== undefined && (
                    <div className="relative w-16 h-16 mx-auto mt-4">
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
                          strokeDasharray={`${slide.percentage}, 100`}
                          fill="none"
                          d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <text
                          x="18"
                          y="20.35"
                          className="dark:fill-[#DAE6EA] fill-[#07153B] text-[6px]"
                          textAnchor="middle"
                        >
                          {slide.percentage}%
                        </text>
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </SwiperSlide>
          );
        })}

        {/* Pagination */}
        {/* <div className="tp-pagination" /> */}
      </Swiper>
    </section>
  );
}
