// app/api/coin-chart/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const coinId = searchParams.get('id');
  const days = searchParams.get('days') || '1';

  if (!coinId) {
    return NextResponse.json({ error: 'Missing coinId' }, { status: 400 });
  }

  try {
    const headers = {
      'x-cg-pro-api-key': process.env.COINGECKO_API_KEY!,
    };

    const res = await fetch(
      `https://pro-api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`,
      { headers },
    );
    const data = await res.json();
    return NextResponse.json({ prices: data.prices });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch chart' }, { status: 500 });
  }
}
