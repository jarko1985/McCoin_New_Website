'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  price: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  market_cap: number;
  volume_24h: number;
  circulating_supply: number;
  sparkline_7d: number[];
}

type SortKey = keyof Coin;

export default function PricesTable() {
  const locale = (useParams() as { locale?: string })?.locale ?? 'en';
  const [coins, setCoins] = useState<Coin[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortKey>('market_cap');
  const [sortAsc, setSortAsc] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const coinsPerPage = 10;

  useEffect(() => {
    fetch(`/${locale}/api/prices_table`)
      .then((res) => res.json())
      .then(setCoins)
      .finally(() => setLoading(false));
  }, []);

  const handleSort = (key: SortKey) => {
    if (sortBy === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(key);
      setSortAsc(true);
    }
  };

  const format = (num: number, decimals = 2) =>
    Intl.NumberFormat('en-US', { maximumFractionDigits: decimals }).format(num);

  const filteredCoins = coins.filter((coin) =>
    Object.values(coin)
      .join(' ')
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const sortedCoins = [...filteredCoins].sort((a: any, b: any) => {
    const aVal = a[sortBy] ?? 0;
    const bVal = b[sortBy] ?? 0;
    return sortAsc ? aVal - bVal : bVal - aVal;
  });

  const totalPages = Math.ceil(sortedCoins.length / coinsPerPage);
  const paginatedCoins = sortedCoins.slice(
    (currentPage - 1) * coinsPerPage,
    currentPage * coinsPerPage
  );

  return (
    <div className="xl:w-[70%] mx-auto py-12 px-4 xl:px-0">
      <h2 className="text-lg lg:text-3xl font-bold text-[#DAE6EA] text-center mb-6 lg:mb-12">
        VA Offered
      </h2>
      <div className="flex justify-start items-center">
        <Input
          placeholder="Search any column..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="mb-4 border-[#DAE6EA] text-[#DAE6EA] font-medium placeholder:text-[#DAE6EA] w-[200px]"
        />
      </div>
      <Card className="overflow-x-auto rounded-2xl shadow-md bg-[#07153b] px-4">
        <table className="min-w-full table-auto text-sm text-[#DAE6EA]">
          <thead>
            <tr className="text-left">
              {[
                { key: 'name', label: 'Name' },
                { key: 'price', label: 'Price' },
                { key: 'percent_change_1h', label: '1h %' },
                { key: 'percent_change_24h', label: '24h %' },
                { key: 'percent_change_7d', label: '7d %' },
                { key: 'market_cap', label: 'Market Cap' },
                { key: 'volume_24h', label: 'Volume(24h)' },
                { key: 'circulating_supply', label: 'Circulating Supply' },
                { key: 'sparkline_7d', label: 'Last 7 Days' },
              ].map(({ key, label }) => (
                <th
                  key={key}
                  className="py-4 px-2 cursor-pointer select-none"
                  onClick={() => handleSort(key as SortKey)}
                >
                  <div className="flex items-center gap-1">
                    {label}
                    <ArrowUpDown
                      className={cn(
                        'w-4 h-4 transition-colors',
                        sortBy === key
                          ? sortAsc
                            ? 'text-green-400'
                            : 'text-red-400'
                          : 'text-[#DAE6EA]/50'
                      )}
                    />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: coinsPerPage }).map((_, i) => (
                <tr key={i} className="border-t border-[#DAE6EA]/10">
                  {Array.from({ length: 9 }).map((__, j) => (
                    <td key={j} className="p-2">
                      <Skeleton className="h-4 w-full" />
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              paginatedCoins.map((coin) => (
                <tr
                  key={coin.id}
                  className="border-t border-[#DAE6EA]/10 hover:bg-[#EC3B3B]/10 transition-colors h-12"
                >
                  <td className="flex items-center gap-2 py-2 px-2 max-w-[160px]">
                    <img src={coin.image} alt={coin.name} className="w-5 h-5" />
                    <span className="font-semibold truncate max-w-[100px]">
                      {coin.name.length > 16
                        ? `${coin.name.slice(0, 16)}...`
                        : coin.name}
                    </span>
                    <span className="uppercase text-xs text-[#DAE6EA]/70">
                      {coin.symbol}
                    </span>
                  </td>
                  <td>${format(coin.price)}</td>
                  <td
                    className={cn(
                      coin.percent_change_1h >= 0
                        ? 'text-green-400'
                        : 'text-red-400'
                    )}
                  >
                    {coin.percent_change_1h?.toFixed(2)}%
                  </td>
                  <td
                    className={cn(
                      coin.percent_change_24h >= 0
                        ? 'text-green-400'
                        : 'text-red-400'
                    )}
                  >
                    {coin.percent_change_24h?.toFixed(2)}%
                  </td>
                  <td
                    className={cn(
                      coin.percent_change_7d >= 0
                        ? 'text-green-400'
                        : 'text-red-400'
                    )}
                  >
                    {coin.percent_change_7d?.toFixed(2)}%
                  </td>
                  <td>${format(coin.market_cap, 0)}</td>
                  <td>${format(coin.volume_24h, 0)}</td>
                  <td>{format(coin.circulating_supply, 0)}</td>
                  <td>
                    <Sparkline
                      prices={coin.sparkline_7d}
                      positive={coin.percent_change_7d >= 0}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 gap-6 text-[#DAE6EA]">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          className="flex items-center gap-2 disabled:opacity-40"
        >
          <ChevronLeft className="w-4 h-4" />
          Prev
        </button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          className="flex items-center gap-2 disabled:opacity-40"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function Sparkline({ prices, positive }: { prices: number[]; positive: boolean }) {
  const max = Math.max(...prices);
  const min = Math.min(...prices);
  const height = 40;

  const points = prices
    .map((p, i) => `${(i / prices.length) * 100},${height - ((p - min) / (max - min)) * height}`)
    .join(' ');

  return (
    <motion.svg width="100" height={height}>
      <motion.polyline
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        fill="none"
        stroke={positive ? 'green' : '#EC3B3B'}
        strokeWidth="2"
        points={points}
      />
    </motion.svg>
  );
}
