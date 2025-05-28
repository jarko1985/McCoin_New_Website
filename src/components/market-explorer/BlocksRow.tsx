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

export default function BlocksRow() {
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
    <div className="mx-auto xl:max-w-[70%] bg-[#07153b] text-[#DAE6EA] px-4 xl:px-0 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Latest Bitcoin Blocks</h1>
      <div className="w-full overflow-x-auto pb-4 custom-scroll">
        <div className="inline-flex gap-8 px-2 py-2 items-end">
          {blocks.length === 0 &&
            Array.from({ length: 10 }).map((_, idx) => (
              <div
                key={idx}
                className="w-44 h-52 bg-[#DAE6EA]/10 rounded-md animate-pulse"
              ></div>
            ))}
          {blocks.map((block, index) => {
            const fillPercent = getFillPercent(block.height, maxHeight);
            const timeAgo = Math.floor((Date.now() / 1000 - block.timestamp) / 60);
            const blockSize = (block.size / 100000000).toFixed(3);
            const feeRate = (block.weight / block.size).toFixed(2);
            
            return (
              <div key={index} className="flex flex-col items-center relative">
                {/* Block Height Label */}
                <span className="mb-3 text-sm text-yellow-400 font-semibold bg-[#0f1f3d] px-2 py-1 rounded-md">
                  #{block.height}
                </span>
                
                {/* Chain Link */}
                {index > 0 && (
                  <div className="absolute -left-[30px] top-1/2 w-7 h-1 bg-gradient-to-r from-[#EC3B3B] to-[#c92e2e] z-0"></div>
                )}
                
                <Link href={`/en/market-explorer/${block.id}`} className="group">
                  {/* 3D Block Container */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-44 h-52 perspective-1000"
                  >
                    {/* Main Cube */}
                    <div className="relative w-full h-full preserve-3d group-hover:rotate-y-15 group-hover:-translate-y-2 transition-all duration-300">
                      {/* Front Face (Main Content) */}
                      <div className="absolute w-full h-full bg-[#1a2d5a] border-2 border-[#3a4d7a] rounded-sm shadow-xl flex flex-col justify-between p-4 backface-hidden transform-style-preserve-3d">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-xs text-[#DAE6EA]/80 mb-1">Fee Rate</p>
                            <p className="text-sm font-mono text-[#DAE6EA]">
                              {feeRate} sat/vB
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-[#DAE6EA]/80 mb-1">Transactions</p>
                            <p className="text-sm font-mono text-[#DAE6EA]">
                              {block.tx_count}
                            </p>
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-xs text-[#DAE6EA]/80 mb-1">Block Reward</p>
                          <p className="text-xl font-bold text-white font-mono">
                            {blockSize} BTC
                          </p>
                        </div>
                        
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-xs text-[#DAE6EA]/80 mb-1">Mined</p>
                            <p className="text-xs font-mono text-[#DAE6EA]">
                              {timeAgo} min ago
                            </p>
                          </div>
                          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center animate-pulse">
                            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Right Face (Depth) */}
                      <div className="absolute w-6 h-full bg-[#0f1f3d] border-r-2 border-[#3a4d7a] right-0 top-0 transform rotate-y-90 origin-right backface-hidden transform-style-preserve-3d">
                        <div className="h-full w-full flex items-center justify-center">
                          <div 
                            className="h-full w-1 bg-gradient-to-b from-[#EC3B3B] to-[#c92e2e]"
                            style={{ height: `${fillPercent}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      {/* Top Face (Block Height) */}
                      <div className="absolute w-full h-6 bg-[#0f1f3d] border-t-2 border-[#3a4d7a] top-0 transform rotate-x-90 origin-top backface-hidden transform-style-preserve-3d">
                        <div className="h-full w-full flex items-center justify-center">
                          <p className="text-[8px] text-[#DAE6EA]/70 uppercase tracking-wider rotate-90 whitespace-nowrap">
                            Bitcoin Block
                          </p>
                        </div>
                      </div>
                      
                      {/* Bottom Face (Shadow) */}
                      <div className="absolute w-full h-6 bg-[#000000]/40 bottom-0 transform rotate-x-90 origin-bottom backface-hidden transform-style-preserve-3d"></div>
                    </div>
                    
                    {/* Glow Effect */}
                    <div className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#EC3B3B]/10"></div>
                  </motion.div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <div className="text-center mt-8">
        <button
          onClick={() => lastHeight && fetchBlocks(lastHeight)}
          className="bg-gradient-to-r from-[#EC3B3B] to-[#c92e2e] text-white px-6 py-3 rounded-md hover:brightness-110 transition-all shadow-lg"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading...
            </span>
          ) : (
            'Load More Blocks'
          )}
        </button>
      </div>
    </div>
  );
}