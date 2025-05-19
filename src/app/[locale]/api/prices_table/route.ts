
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h,24h,7d', {
      headers: {
        'Accept': 'application/json'
      },
      next: { revalidate: 60 }
    });

    const data = await res.json();

    const formatted = data.map((coin: any) => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      image: coin.image,
      price: coin.current_price,
      percent_change_1h: coin.price_change_percentage_1h_in_currency,
      percent_change_24h: coin.price_change_percentage_24h_in_currency,
      percent_change_7d: coin.price_change_percentage_7d_in_currency,
      market_cap: coin.market_cap,
      volume_24h: coin.total_volume,
      circulating_supply: coin.circulating_supply,
      sparkline_7d: coin.sparkline_in_7d?.price || [],
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch crypto data' }, { status: 500 });
  }
}
