"use client";

import { useEffect, useState } from "react";
import { Hash, ToyBrick } from "lucide-react";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

interface Block {
  Number: number;
  Hash: string;
  Mined: string;
  rawHash: string;
}

export function BlocksRow() {
  const locale = (useParams() as { locale?: string })?.locale ?? "en";
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        const response = await fetch(`/${locale}/api/blocks?page=1&limit=15`);
        if (!response.ok) throw new Error("Failed to fetch blocks");
        const data = await response.json();
        setBlocks(data.blocks); // Access the blocks array from the response
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchBlocks();
  }, [locale]);

  const skeletons = Array.from({ length: 12 }, (_, i) => i);

  const heights = blocks.map((block) => block.Number); // Use Number instead of height
  const maxHeight = Math.max(...heights, 1);
  const minHeight = Math.min(...heights, maxHeight);

  return (
    <div className="bg-[#07153b] rounded-lg p-6">
      <h2 className="text-white text-lg font-semibold mb-6">
        Latest BTC Blocks
      </h2>

      <div className="relative">
        <div className="flex gap-0 pb-4 relative z-10 w-full overflow-x-auto scrollbar-hide">
          <div className="flex items-end min-w-max space-x-0 px-4">
            {(loading ? skeletons : blocks).map(
              (block: Block | number, index) => {
                const isLoading = loading;
                const typedBlock = block as Block;
                const formattedHash = isLoading
                  ? ""
                  : typedBlock.Hash; // Already formatted in API
                const isLast =
                  index === (isLoading ? skeletons.length : blocks.length) - 1;
                const fillPercentage = isLoading
                  ? 100
                  : ((typedBlock.Number - minHeight) /
                      (maxHeight - minHeight)) *
                    100;

                const blockContent = (
                  <div className="flex flex-col items-center group px-2">
                    <div className="text-white text-xs mb-2 font-mono">
                      {isLoading ? (
                        <Skeleton className="h-4 w-8" />
                      ) : (
                        `#${typedBlock.Number}`
                      )}
                    </div>

                    <div className="relative w-12 h-12">
                      {isLoading ? (
                        <Skeleton className="w-full h-full rounded" />
                      ) : (
                        <>
                          <div
                            className="absolute inset-0 overflow-hidden"
                            style={{
                              clipPath: `inset(0 0 ${100 - fillPercentage}% 0)`,
                            }}
                          >
                            <ToyBrick
                              className="w-full h-full text-[#EC3B3B]"
                              strokeWidth={1}
                              fill="#EC3B3B"
                            />
                          </div>
                          <ToyBrick
                            className="w-full h-full text-white relative z-10"
                            strokeWidth={1}
                            fill="transparent"
                          />
                        </>
                      )}
                    </div>

                    <div className="mt-2 bg-[#07153b] px-2 py-1 rounded border border-[#DAE6EA]/20">
                      {isLoading ? (
                        <Skeleton className="h-4 w-16" />
                      ) : (
                        <div className="flex items-center">
                          <Hash className="h-3 w-3 mr-1 text-gray-300" />
                          <span className="text-white text-xs font-mono">
                            {formattedHash}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );

                return (
                  <div
                    key={isLoading ? index : typedBlock.Hash}
                    className="flex items-end"
                  >
                    {isLoading ? (
                      blockContent
                    ) : (
                      <Link
                        href={`/market-explorer/${typedBlock.rawHash}`}
                        className="hover:opacity-90 transition"
                      >
                        {blockContent}
                      </Link>
                    )}

                    {!isLast && (
                      <div className="relative h-0.5 bg-[#DAE6EA]/40 w-6 mb-8 self-center"></div>
                    )}
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
}