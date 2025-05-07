import { NextResponse } from 'next/server'

interface BlockSummary {
  height: number;
  hash: string;
  time: number;
  n_tx: number;
  nonce: number;
  size: number;
  tx: {
    result: number;
    fee: number;
  }[];
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '35', 10);

    // Fetch recent blocks first
    const currentTimestamp = Date.now();
    const apiUrl = `https://blockchain.info/blocks/${currentTimestamp}?format=json`;
    const res = await fetch(apiUrl);

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch blocks' }, { status: res.status });
    }

    const blocks = await res.json();
    
    // Paginate the blocks
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedBlocks = blocks.slice(startIndex, endIndex);

    // Fetch details for the paginated blocks in parallel
    const blocksWithDetails = await Promise.all(
      paginatedBlocks.map(async (block: any) => {
        try {
          const detailsRes = await fetch(`https://blockchain.info/rawblock/${block.hash}`);
          if (!detailsRes.ok) return null;
          return await detailsRes.json() as BlockSummary;
        } catch (error) {
          return null;
        }
      })
    );

    // Filter out failed requests and format the data
    const formattedBlocks = blocksWithDetails
      .filter(block => block !== null)
      .map(block => {
        const minedTime = new Date(block.time * 1000);
        const now = new Date();
        const diff = Math.floor((now.getTime() - minedTime.getTime()) / 1000);

        let mined = diff < 60 ? `${diff}s` :
                    diff < 3600 ? `${Math.floor(diff / 60)}m ${diff % 60}s` :
                    `${Math.floor(diff / 3600)}h ${Math.floor((diff % 3600) / 60)}m`;

        const fill = Math.min(170, Math.max(100, Math.floor(100 + (block.size / 2000000 * 70))));
        const formattedSize = `${(block.size / 1024).toFixed(2)} KB`;

        const totalSent = block.tx.reduce((sum:any, tx:any) => sum + (tx.result || 0), 0) / 1e8;
        const totalFees = block.tx.reduce((sum:any, tx:any) => sum + (tx.fee || 0), 0) / 1e8;

        return {
          Number: block.height,
          Hash: `${block.hash.substring(0, 4)}-${block.hash.substring(block.hash.length - 4)}`,
          rawHash:block.hash,
          Miner: 'Unknown', // You can add miner detection logic here
          Mined: mined,
          TxCount: block.n_tx,
          Nonce: block.nonce,
          Fill: fill,
          Size: formattedSize,
          TotalSent: `${totalSent.toFixed(2)} BTC`,
          TotalFees: `${totalFees.toFixed(2)} BTC`,
        };
      });

    return NextResponse.json({
      blocks: formattedBlocks,
      totalBlocks: blocks.length,
      currentPage: page,
      totalPages: Math.ceil(blocks.length / limit)
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}