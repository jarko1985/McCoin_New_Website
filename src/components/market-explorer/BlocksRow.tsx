"use client";

import { useEffect, useState } from "react";
import { Hash, ToyBrick } from "lucide-react";
import { useParams } from "next/navigation";

interface Block {
  hash: string;
  height: number;
  time: number;
  block_index: number;
}

export function BlocksRow() {
  const locale = (useParams() as { locale?: string })?.locale ?? "en";
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        const response = await fetch(`/${locale}/api/blocks`);
        if (!response.ok) throw new Error("Failed to fetch blocks");
        const data = await response.json();
        setBlocks(data.slice(0, 15));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchBlocks();
  }, []);

  if (loading)
    return (
      <div className="p-4 text-center text-[#07153b]">Loading blocks...</div>
    );
  if (error)
    return <div className="p-4 text-center text-red-500">Error: {error}</div>;

  // Calculate min/max for fill scaling
  const heights = blocks.map((block) => block.height);
  const maxHeight = Math.max(...heights, 1);
  const minHeight = Math.min(...heights, maxHeight);

  return (
    <div className="bg-[#07153b] rounded-lg p-6">
      <h2 className="text-white text-lg font-semibold mb-6">
        Latest BTC Blocks
      </h2>

      <div className="relative">
        <div className="flex gap-0 overflow-x-auto pb-4 relative z-10">
          {blocks.map((block, index) => {
            const fillPercentage =
              ((block.height - minHeight) / (maxHeight - minHeight)) * 100;
            const isNotLast = index < blocks.length - 1;

            return (
              <div key={block.hash} className="flex items-end">
                {/* Block container */}
                <div className="flex flex-col items-center group px-4">
                  {/* Block number */}
                  <div className="text-white text-xs mb-2 font-mono">
                    #{block.height}
                  </div>

                  {/* ToyBrick icon with fill */}
                  <div className="relative">
                    {/* Red fill (behind everything) */}
                    <div
                      className="absolute inset-0 overflow-hidden"
                      style={{
                        clipPath:
                          "inset(0 0 " + (100 - fillPercentage) + "% 0)",
                      }}
                    >
                      <ToyBrick
                        className="w-15 h-15 text-[#EC3B3B]"
                        strokeWidth={1}
                        fill="#EC3B3B"
                      />
                    </div>
                    <ToyBrick
                      className="w-15 h-15 text-white relative z-10"
                      strokeWidth={1}
                      fill="transparent"
                    />
                  </div>

                  <div className="mt-2 bg-white/10 px-2 py-1 rounded">
                    <div className="flex items-center">
                      <Hash className="h-3 w-3 mr-1 text-gray-300" />
                      <span className="text-white text-xs font-mono">
                        {block.hash.slice(0, 6)}...
                      </span>
                    </div>
                  </div>
                </div>
                {isNotLast && (
                  <div className="relative h-0.5 bg-gray-400 w-8 mb-6 self-center"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
