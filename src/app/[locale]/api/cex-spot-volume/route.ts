import { NextRequest, NextResponse } from 'next/server';

const exchangeIds = ['binance', 'gdax', 'bybit', 'okx', 'crypto_com'];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const days = searchParams.get('days') || '365';

  try {
    const apiKey = process.env.NEXT_PUBLIC_COINGECKO_API_KEY!;
    const headers = {
      'x-cg-pro-api-key': apiKey,
    };

    // Fetch BTC price
    const btcRes = await fetch(
      `https://pro-api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`,
      { headers },
    );
    const btcJson = await btcRes.json();
    const btcUsd = btcJson.bitcoin.usd;

    // Fetch all volume charts
    const volumes = await Promise.all(
      exchangeIds.map(async id => {
        const res = await fetch(
          `https://pro-api.coingecko.com/api/v3/exchanges/${id}/volume_chart?days=${days}`,
          { headers },
        );
        const json = await res.json();
        return {
          id,
          data: Array.isArray(json)
            ? json
                .map(([ts, vol]: [number, string]) => [ts, parseFloat(vol) * btcUsd])
                .filter((arr): arr is [number, number] => Array.isArray(arr) && arr.length === 2)
            : [],
        };
      }),
    );

    // Format results
    const results: Record<string, [number, number][]> = {};
    volumes.forEach(({ id, data }) => {
      results[id] = data;
    });

    return NextResponse.json({ results });
  } catch (error) {
    console.error('[CEX Volume Error]', error);
    return NextResponse.json({ error: 'Failed to fetch CEX volume data' }, { status: 500 });
  }
}
