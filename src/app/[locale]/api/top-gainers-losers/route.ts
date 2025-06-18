import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch(
      'https://pro-api.coingecko.com/api/v3/coins/top_gainers_losers?vs_currency=usd',
      {
        headers: {
          'x-cg-pro-api-key': process.env.NEXT_PUBLIC_COINGECKO_API_KEY!,
        },
      },
    );

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch top gainers and losers' }, { status: 500 });
  }
}
