import { NextRequest, NextResponse } from 'next/server';

const dexIds = ['uniswap', 'curve', 'pancakeswap', 'sushiswap'];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const days = searchParams.get('days') || '365';

  try {
    const apiKey = process.env.NEXT_PUBLIC_COINGECKO_API_KEY!;
    const headers = {
      'x-cg-pro-api-key': apiKey,
    };

    // 1. Fetch BTC price
    const btcRes = await fetch(
      'https://pro-api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd',
      { headers },
    );
    const btcJson = await btcRes.json();
    const btcUsd = btcJson?.bitcoin?.usd ?? null;

    if (!btcUsd || isNaN(btcUsd)) {
      return NextResponse.json({ error: 'Invalid BTC price' }, { status: 502 });
    }

    // 2. Fetch volume data for each DEX
    const results: Record<string, [number, number][]> = {};

    for (const id of dexIds) {
      try {
        const res = await fetch(
          `https://pro-api.coingecko.com/api/v3/exchanges/${id}/volume_chart?days=${days}`,
          { headers },
        );
        const json = await res.json();
        const parsed: [number, number][] = Array.isArray(json)
          ? json
              .filter(item => Array.isArray(item) && item.length === 2)
              .map(([ts, vol]) => [ts as number, parseFloat(vol as string) * btcUsd])
          : [];

        results[id] = parsed;
      } catch (dexErr) {
        results[id] = [];
      }
    }

    return NextResponse.json({ results });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch DEX volume data' }, { status: 500 });
  }
}
