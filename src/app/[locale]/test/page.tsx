// src/app/blocks/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
interface Block {
  id: string;
  height: number;
  timestamp: number;
  tx_count: number;
  size: number;
  merkle_root: string;
  previousblockhash: string;
  mediantime: number;
  version: number;
  weight: number;
}

function getFillPercent(height: number, maxHeight: number): number {
  return Math.min((height / maxHeight) * 100, 100);
}

export default function BlocksPage() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastHeight, setLastHeight] = useState<number | null>(null);
  const [maxHeight, setMaxHeight] = useState<number>(0);

  const fetchBlocks = async (startHeight?: number) => {
    setLoading(true);
    try {
      const endpoint = startHeight
        ? `https://mempool.space/api/blocks/${startHeight}`
        : 'https://mempool.space/api/blocks';
      const res = await fetch(endpoint);
      const data = await res.json();
      setBlocks((prev) => [...(prev || []), ...data]);
      setLastHeight(data[data.length - 1].height - 1);
      if (!startHeight) setMaxHeight(data[0].height);
    } catch (error) {
      console.error('Error fetching blocks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlocks();
  }, []);

  return (
    <div className="min-h-screen mx-auto xl:max-w-[70%] bg-[#07153b] text-[#DAE6EA] px-4 xl:px-0 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Bitcoin Blocks</h1>
      <div className="w-full overflow-x-auto pb-4 custom-scroll">
        <div className="inline-flex gap-4 px-2 py-2">
          {blocks.length === 0 &&
            Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="w-40 h-48 bg-[#DAE6EA]/10 rounded-md animate-pulse"
              ></div>
            ))}

          {blocks.map((block) => {
            const fillPercent = getFillPercent(block.height, maxHeight);
            return (
            
              
              <motion.div
                key={block.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="relative w-40 h-48 bg-[#DAE6EA]/10 border border-[#DAE6EA]/20 text-white rounded-sm shadow-lg overflow-hidden transform -skew-y-3 hover:scale-105 transition-transform duration-300"
              >
                
                <div className="absolute bottom-0 left-0 w-full" style={{ height: `${fillPercent}%`, backgroundColor: '#EC3B3B' }}></div>
                <div className="absolute left-0 top-0 w-2 h-full bg-[#07153b]/40 skew-y-3 origin-left z-10"></div>
                <div className="absolute top-0 left-0 right-0 bottom-0 p-4 flex flex-col justify-between z-20">
                  <div>
                    <p className="text-sm text-[#DAE6EA]">
                      ~{(block.weight / block.size).toFixed(2)} sat/vB
                    </p>
                    <p className="text-xs text-[#DAE6EA]/80">1 - ? sat/vB</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white">{(block.size / 100000000).toFixed(3)} BTC</p>
                    <p className="text-xs text-[#DAE6EA]/80">{block.tx_count} transactions</p>
                  </div>
                  <p className="text-xs text-[#DAE6EA]/70">In ~{Math.floor(Math.random() * 60)} minutes</p>
                </div>
                <span className='text-yellow-400'>{block.height}</span>
              </motion.div>
            
            );
          })}
        </div>
      </div>
      <div className="text-center mt-6">
        <button
          onClick={() => lastHeight && fetchBlocks(lastHeight)}
          className="bg-[#EC3B3B] text-white px-6 py-2 rounded-md hover:bg-[#c92e2e] transition"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Load More Blocks'}
        </button>
      </div>
    </div>
  );
}
