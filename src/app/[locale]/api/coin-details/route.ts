// app/api/coin-details/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const coinId = searchParams.get('id');

  if (!coinId) {
    return NextResponse.json({ error: 'Missing coinId' }, { status: 400 });
  }

  try {
    const res = await fetch(`https://pro-api.coingecko.com/api/v3/coins/${coinId}`, {
      headers: {
        'x-cg-pro-api-key': process.env.NEXT_PUBLIC_COINGECKO_API_KEY!,
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Coin not found' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json({ coin: data });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch coin data' }, { status: 500 });
  }
}
