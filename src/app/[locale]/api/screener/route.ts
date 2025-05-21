
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&sparkline=false&price_change_percentage=24h'
    );
    if (!res.ok) throw new Error('Failed to fetch data');
    const data = await res.json();

    const formatted = data.map((coin: any) => ({
      id: coin.id,
      name: coin.name,
      image: coin.image,
      price: coin.current_price,
      price_change: coin.price_change_24h,
      percent_change: coin.price_change_percentage_24h,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
