// app/api/spot-volume/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const days = searchParams.get('days') || '365';
  const interval = searchParams.get('interval') || 'daily';

  try {
    const res = await fetch(
      `https://pro-api.coingecko.com/api/v3/global/market_cap_chart?vs_currency=usd&days=${days}&interval=${interval}`,
      {
        headers: {
          'x-cg-pro-api-key': process.env.NEXT_PUBLIC_COINGECKO_API_KEY!,
        },
      },
    );

    const json = await res.json();
    const volume = json.market_cap_chart.volume;

    return NextResponse.json({ volume });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch volume data' }, { status: 500 });
  }
}
