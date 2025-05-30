'use client';

import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { ArrowDown, ArrowUp } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Coin {
  id: string;
  name: string;
  image: string;
  usd: number;
  usd_24h_vol: number;
  usd_24h_change: number;
}

export default function TopGainersAndLosers() {
  const locale = (useParams() as { locale?: string })?.locale ?? 'en';
  const [gainers, setGainers] = useState<Coin[]>([]);
  const [losers, setLosers] = useState<Coin[]>([]);
  const [sortKey, setSortKey] = useState<'usd' | 'usd_24h_vol' | 'usd_24h_change'>(
    'usd_24h_change',
  );
  const [sortAsc, setSortAsc] = useState(false);
  const [gainersPage, setGainersPage] = useState(1);
  const [losersPage, setLosersPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;

  useEffect(() => {
    setLoading(true);
    fetch('https://pro-api.coingecko.com/api/v3/coins/top_gainers_losers?vs_currency=usd', {
      headers: {
        'x-cg-pro-api-key': process.env.NEXT_PUBLIC_COINGECKO_API_KEY!,
      },
    })
      .then(res => res.json())
      .then(data => {
        setGainers(data.top_gainers || []);
        setLosers(data.top_losers || []);
        setLoading(false);
      });
  }, []);

  const handleSort = (key: 'usd' | 'usd_24h_vol' | 'usd_24h_change') => {
    if (key === sortKey) setSortAsc(!sortAsc);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const getSortedData = (coins: Coin[]) => {
    return [...coins].sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];
      return sortAsc ? valA - valB : valB - valA;
    });
  };

  const paginate = (coins: Coin[], page: number) => {
    const start = (page - 1) * itemsPerPage;
    return coins.slice(start, start + itemsPerPage);
  };

  const renderSortArrow = (key: string) => {
    if (sortKey !== key) return null;
    return sortAsc ? (
      <ArrowUp className="inline w-4 h-4 ml-1" />
    ) : (
      <ArrowDown className="inline w-4 h-4 ml-1" />
    );
  };

  const renderTable = (
    coins: Coin[],
    title: string,
    page: number,
    setPage: (page: number) => void,
  ) => {
    const sortedData = getSortedData(coins);
    const paginatedData = paginate(sortedData, page);
    const totalPages = Math.ceil(coins.length / itemsPerPage);

    return (
      <Card className="bg-[#07153b] text-[#DAE6EA] w-full overflow-auto">
        <div className="p-4 text-xl font-bold">{title}</div>
        {loading ? (
          <div className="flex justify-center items-center p-8">
            <Loader2 className="animate-spin text-[#DAE6EA] w-6 h-6" />
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead
                    className={`cursor-pointer ${sortKey === 'usd' ? 'text-white' : ''}`}
                    onClick={() => handleSort('usd')}
                  >
                    Price {renderSortArrow('usd')}
                  </TableHead>
                  <TableHead
                    className={`cursor-pointer ${sortKey === 'usd_24h_vol' ? 'text-white' : ''}`}
                    onClick={() => handleSort('usd_24h_vol')}
                  >
                    Volume {renderSortArrow('usd_24h_vol')}
                  </TableHead>
                  <TableHead
                    className={`cursor-pointer ${sortKey === 'usd_24h_change' ? 'text-white' : ''}`}
                    onClick={() => handleSort('usd_24h_change')}
                  >
                    24H {renderSortArrow('usd_24h_change')}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map(coin => (
                  <TableRow key={coin.id}>
                    <TableCell className="flex items-center gap-2">
                      <Image
                        src={coin.image}
                        alt={coin.name}
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                      <Link
                        href={`/${locale}/market-overview/${coin.id}`}
                        className="hover:underline text-[#DAE6EA]"
                      >
                        {coin.name}
                      </Link>
                    </TableCell>
                    <TableCell>${coin.usd.toFixed(6)}</TableCell>
                    <TableCell>${coin.usd_24h_vol.toLocaleString()}</TableCell>
                    <TableCell>
                      <span
                        className={`flex items-center gap-1 font-medium ${
                          coin.usd_24h_change >= 0 ? 'text-green-500' : 'text-[#EC3B3B]'
                        }`}
                      >
                        {coin.usd_24h_change >= 0 ? (
                          <ArrowUp className="w-4 h-4" />
                        ) : (
                          <ArrowDown className="w-4 h-4" />
                        )}
                        {coin.usd_24h_change.toFixed(2)}%
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-between items-center p-4">
              <Button
                variant="ghost"
                onClick={() => setPage(Math.max(page - 1, 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <span>
                Page {page} of {totalPages}
              </span>
              <Button
                variant="ghost"
                onClick={() => setPage(Math.min(page + 1, totalPages))}
                disabled={page === totalPages}
              >
                Next
              </Button>
            </div>
          </>
        )}
      </Card>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 px-4 py-6">
      {renderTable(gainers, 'Top Gainers', gainersPage, setGainersPage)}
      {renderTable(losers, 'Top Losers', losersPage, setLosersPage)}
    </div>
  );
}
