'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { GrLinkPrevious } from "react-icons/gr";
import Link from 'next/link';
import 'aos/dist/aos.css';
import AOS from 'aos';

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

interface Transaction {
    txid: string;
    size: number;
    weight: number;
    fee: number;
    vout: any[];
    status: {
        confirmed: boolean;
        block_height: number;
        block_hash: string;
        block_time: number;
    };
}

export default function BlockDetailsPage() {
    const params = useParams();
    const idParam = params?.id;
    const id = Array.isArray(idParam) ? idParam[0] : idParam;
    const [block, setBlock] = useState<Block | null>(null);
    const [txs, setTxs] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const perPage = 25;
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        AOS.init({ duration: 500 });
    }, []);

    useEffect(() => {
        const fetchBlockDetails = async () => {
            const res = await fetch(`https://mempool.space/api/block/${id}`);
            const data = await res.json();
            setBlock(data);
            if (data.tx_count) {
                setTotalPages(Math.ceil(data.tx_count / perPage));
            }
        };

        if (id) fetchBlockDetails();
    }, [id]);

    useEffect(() => {
        const fetchBlockTxs = async () => {
            setLoading(true);
            const res = await fetch(`https://mempool.space/api/block/${id}/txs/${page * perPage}`);
            const data = await res.json();
            setTxs(data);
            setLoading(false);
        };

        if (id) fetchBlockTxs();
    }, [id, page]);

    return (
        <div className="bg-[#07153b] text-white px-4 sm:px-6 xl:px-0 xl:max-w-[70%] mx-auto py-12">
            <h2 className='flex items-center py-6 gap-2 text-lg sm:text-xl'>
                <Link href='/market-explorer'>
                    <GrLinkPrevious className='text-white hover:-translate-x-1 cursor-pointer transition-transform duration-300' />
                </Link>
                Market Explorer
            </h2>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 pl-6 relative">
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-sm"></span>
                Block #{id?.slice(0, 4)}...{id?.slice(-4)}
            </h2>

            <div className="grid gap-8">
                {/* Block Details */}
                <div className="overflow-x-auto">
                    <Card className="bg-[#07153b] border border-white/10 shadow-lg">
                        <table className="w-full text-xs sm:text-sm">
                            <tbody>
                                {block ? (
                                    Object.entries(block).map(([key, value], idx) => (
                                        <tr key={key} className="border-b border-white/10" data-aos="fade-left" data-aos-delay={idx * 25}>
                                            <td className="p-2 font-semibold capitalize text-white/80 whitespace-nowrap">{key.replace(/_/g, ' ')}</td>
                                            <td className="p-2 text-white/90 break-words max-w-xs">{value?.toString()}</td>
                                        </tr>
                                    ))
                                ) : (
                                    [...Array(10)].map((_, i) => (
                                        <tr key={i}><td colSpan={2}><Skeleton className="h-6 my-2 w-full" /></td></tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </Card>
                </div>

                {/* Transactions */}
                <div className="overflow-x-auto">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 pl-6 relative">
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-sm"></span>
                        Transactions
                    </h2>
                    <table className="min-w-full text-xs sm:text-sm border border-white/10 rounded-xl overflow-hidden">
                        <thead className="bg-[#EC3B3B] text-white text-left">
                            <tr>
                                <th className="p-2 sm:p-3">Tx ID</th>
                                <th className="p-2 sm:p-3">Vout</th>
                                <th className="p-2 sm:p-3">Size</th>
                                <th className="p-2 sm:p-3">Weight</th>
                                <th className="p-2 sm:p-3">Status</th>
                                <th className="p-2 sm:p-3">Fee</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading
                                ? [...Array(10)].map((_, i) => (
                                    <tr key={i}><td colSpan={6}><Skeleton className="h-6 my-2 w-full" /></td></tr>
                                ))
                                : txs.map((tx, i) => (
                                    <motion.tr
                                        key={tx.txid}
                                        whileHover={{ scale: 1.01 }}
                                        className="border-b border-white/10 hover:bg-white/5"
                                        data-aos="fade-left"
                                        data-aos-delay={i * 20}
                                    >
                                        <td className="p-2 sm:p-3 text-white/80 break-words max-w-xs">{tx.txid.slice(0, 6)}...{tx.txid.slice(-6)}</td>
                                        <td className="p-2 sm:p-3">{tx.vout.length}</td>
                                        <td className="p-2 sm:p-3">{tx.size}</td>
                                        <td className="p-2 sm:p-3">{tx.weight}</td>
                                        <td className="p-2 sm:p-3">{tx.status.confirmed ? 'Confirmed' : 'Pending'}</td>
                                        <td className="p-2 sm:p-3">{tx.fee}</td>
                                    </motion.tr>
                                ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="flex flex-wrap justify-center mt-6 gap-3 items-center text-xs sm:text-sm">
                        <button
                            className="bg-[#EC3B3B] px-3 py-1.5 rounded hover:bg-[#c32e2e] transition"
                            disabled={page === 0}
                            onClick={() => setPage(0)}
                        >
                            First
                        </button>
                        <button
                            className="bg-[#EC3B3B] px-3 py-1.5 rounded hover:bg-[#c32e2e] transition"
                            disabled={page === 0}
                            onClick={() => setPage((p) => Math.max(p - 1, 0))}
                        >
                            Previous
                        </button>
                        <span>
                            Page {page + 1} of {totalPages || '?'}
                        </span>
                        <button
                            className="bg-[#EC3B3B] px-3 py-1.5 rounded hover:bg-[#c32e2e] transition"
                            disabled={page + 1 >= totalPages}
                            onClick={() => setPage((p) => p + 1)}
                        >
                            Next
                        </button>
                        <button
                            className="bg-[#EC3B3B] px-3 py-1.5 rounded hover:bg-[#c32e2e] transition"
                            disabled={page + 1 >= totalPages}
                            onClick={() => setPage(totalPages - 1)}
                        >
                            Last
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
