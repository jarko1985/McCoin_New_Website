import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h,24h,7d'
    );
    const data = await res.json();

    const up = data.filter((coin: any) => coin.price_change_percentage_24h > 0).length;
    const down = data.filter((coin: any) => coin.price_change_percentage_24h < 0).length;

    const totalMarketCap = data.reduce((sum: number, coin: any) => sum + coin.market_cap, 0);
    const totalValue = data.reduce((sum: number, coin: any) => sum + coin.total_volume, 0);

    const historicalData = data.filter((coin: any) =>
      ['bitcoin', 'ethereum', 'binancecoin', 'tether', 'solana'].includes(coin.id)
    ).map((coin: any) => ({
      id: coin.id,
      name: coin.name,
      market_cap: coin.market_cap,
      total_volume: coin.total_volume,
      price_change_percentage_24h: coin.price_change_percentage_24h,
      price_change_percentage_7d_in_currency: coin.price_change_percentage_7d_in_currency,
    }));

    return NextResponse.json({
      up,
      down,
      totalMarketCap,
      totalValue,
      historicalData,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
