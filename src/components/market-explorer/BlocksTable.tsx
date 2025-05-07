"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import Pagination from "../custom/Pagination";

interface BlockSummary {
  Number: number;
  Hash: string;
  Miner: string;
  Mined: string;
  TxCount: number;
  Nonce: number;
  Fill: number;
  Size: string;
  TotalSent: string;
  TotalFees: string;
}

interface ApiResponse {
  blocks: BlockSummary[];
  totalBlocks: number;
  currentPage: number;
  totalPages: number;
}

const SkeletonRow = () => (
  <tr className="animate-pulse">
    {Array(10)
      .fill(null)
      .map((_, i) => (
        <td key={i} className="px-4 py-3">
          <Skeleton className="h-4 w-20" />
        </td>
      ))}
  </tr>
);

export default function BlocksTable() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const blocksPerPage = 35;
  const locale = (useParams() as { locale?: string })?.locale ?? "en";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `/${locale}/api/blocks?page=${currentPage}&limit=${blocksPerPage}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch blocks data");
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load block data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, locale]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (error) {
    return <div className="bg-red-100 text-red-600 p-4 rounded">{error}</div>;
  }

  return (
    <>
      <div className="rounded-lg border border-[#DAE6EA] overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#07153b] text-white">
            <tr>
              <th className="px-4 py-3 text-left">Number</th>
              <th className="px-4 py-3 text-left">Hash</th>
              <th className="px-4 py-3 text-left">Miner</th>
              <th className="px-4 py-3 text-left">Mined</th>
              <th className="px-4 py-3 text-left">Tx Count</th>
              <th className="px-4 py-3 text-left">Nonce</th>
              <th className="px-4 py-3 text-left">Fill</th>
              <th className="px-4 py-3 text-left">Size</th>
              <th className="px-4 py-3 text-left">Total Sent</th>
              <th className="px-4 py-3 text-left">Total Fees</th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: 10 }).map((_, i) => (
                  <SkeletonRow key={i} />
                ))
              : data?.blocks.map((block, i) => (
                  <tr
                    key={block.Number}
                    className={i % 2 === 0 ? "bg-white" : "bg-[#DAE6EA]"}
                  >
                    <td className="px-4 py-3">{block.Number}</td>
                    <td className="px-4 py-3 font-mono">{block.Hash}</td>
                    <td className="px-4 py-3">{block.Miner}</td>
                    <td className="px-4 py-3">{block.Mined}</td>
                    <td className="px-4 py-3">
                      {block.TxCount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      {block.Nonce.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Progress value={block.Fill} className="h-2 w-20" />
                        <span>{block.Fill}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">{block.Size}</td>
                    <td className="px-4 py-3">{block.TotalSent}</td>
                    <td className="px-4 py-3">{block.TotalFees}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {data && (
        <div className="mt-4 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={data.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
}
