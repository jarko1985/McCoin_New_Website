'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { ArrowRight, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Block {
  id: string;
  height: number;
  version: number;
  timestamp: number;
  tx_count: number;
  size: number;
  weight: number;
  merkle_root: string;
  previousblockhash: string;
  mediantime: number;
  nonce: number;
  bits: number;
  difficulty: number;
}

const formatId = (id: string) => `${id.slice(0, 4)}...${id.slice(-4)}`;
const formatTime = (ts: number) => new Date(ts * 1000).toLocaleTimeString();
const toMB = (size: number) => (size / 1_000_000).toFixed(2);

export default function BlocksTable() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    fetch('https://mempool.space/api/blocks')
      .then(res => res.json())
      .then(data => {
        setBlocks(data);
        setLoading(false);
      });
  }, []);

  const filtered = blocks.filter(
    b =>
      b.id.includes(search) ||
      b.height.toString().includes(search) ||
      b.tx_count.toString().includes(search)
  );

  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <section className="bg-[#07153b] mx-auto xl:max-w-[70%] px-4 xl:px-0 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4 flex items-center gap-4">
          <Search className="text-white" />
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by ID, height or tx count"
            className="w-full max-w-md border border-white/10 text-white bg-transparent focus:border-[#EC3B3B] focus:ring-0"
          />
        </div>

        <div className=" overflow-x-auto lg:overflow-hidden rounded-xl border border-white/10 shadow-md">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#EC3B3B] text-white">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Height</th>
                <th className="p-3">#Transactions</th>
                <th className="p-3">Nonce</th>
                <th className="p-3">Bits</th>
                <th className="p-3">Median Time</th>
                <th className="p-3">Size</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(perPage)].map((_, i) => (
                  <tr key={i}>
                    <td colSpan={7}><Skeleton className="h-6 my-2 w-full" /></td>
                  </tr>
                ))
              ) : (
                paginated.map(block => (
                  <motion.tr
                    key={block.id}
                    whileHover={{ scale: 1.01 }}
                    className="border-b border-white/10 hover:bg-white/5"
                  >
                    <td className="p-3">{formatId(block.id)}</td>
                    <td className="p-3">{block.height}</td>
                    <td className="p-3">{block.tx_count}</td>
                    <td className="p-3">{block.nonce}</td>
                    <td className="p-3">{block.bits}</td>
                    <td className="p-3">{formatTime(block.mediantime)}</td>
                    <td className="p-3 w-40">
                      <div className="relative w-full bg-white/10 h-4 rounded-full">
                        <div
                          className="absolute top-0 left-0 h-4 rounded-full bg-[#EC3B3B]"
                          style={{ width: `${Math.min((block.size / 3_000_000) * 100, 100)}%` }}
                        ></div>
                        <span className="absolute right-2 text-xs">{toMB(block.size)} MB</span>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-center gap-4 items-center">
          <button
            className="px-4 py-2 bg-[#EC3B3B] rounded hover:bg-[#c32e2e] transition"
            onClick={() => setPage(p => Math.max(p - 1, 1))}
          >
            Previous
          </button>
          <span>Page {page}</span>
          <button
            className="px-4 py-2 bg-[#EC3B3B] rounded hover:bg-[#c32e2e] transition"
            disabled={page * perPage >= filtered.length}
            onClick={() => setPage(p => p + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
