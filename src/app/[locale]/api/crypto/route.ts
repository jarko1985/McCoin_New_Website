import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const apiKey = process.env.COINDESK_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Missing CoinDesk API key' }, { status: 500 });
  }

  try {
    const url = new URL(request.url);
    const range = url.searchParams.get('range') || '30d';

    const now = Math.floor(Date.now() / 1000);
    let fromDate = new Date();

    if (range === '30d') fromDate.setDate(fromDate.getDate() - 30);
    else if (range === '1y') fromDate.setFullYear(fromDate.getFullYear() - 1);
    else fromDate = new Date(2013, 0, 1); // 'all'

    const from_ts = Math.floor(fromDate.getTime() / 1000);
    const endpoint = `https://data-api.coindesk.com/overview/v1/historical/marketcap/all/assets/days?from_ts=${from_ts}&to_ts=${now}`;

    const res = await fetch(endpoint, {
      headers: {
        'x-api-key': apiKey,
        'Accept': 'application/json',
      },
    });

    const result = await res.json();

    if (!result?.Data?.length) {
      return NextResponse.json({ error: 'No Data from CoinDesk', result }, { status: 500 });
    }

    const mapped = result.Data.map((entry: any) => ({
      date: new Date(entry.TIMESTAMP * 1000).toISOString().split('T')[0],
      marketCap: entry.CLOSE,
      volume: entry.TOP_TIER_VOLUME,
    }));

    return NextResponse.json(mapped);
  } catch (error) {
    console.error('❌ CoinDesk API error:', error);
    return NextResponse.json({ error: 'Server error', message: (error as Error).message }, { status: 500 });
  }
}
