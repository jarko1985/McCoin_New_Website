import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch(
      'https://pro-api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&sparkline=false&price_change_percentage=24h',
      {
        headers: {
          'x-cg-pro-api-key': process.env.NEXT_PUBLIC_COINGECKO_API_KEY!,
        },
        next: { revalidate: 60 }, // Optional if you're using Next.js caching
      },
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error('CoinGecko API error:', errorText);
      return NextResponse.json([], { status: 200 });
    }

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
    console.error('Internal server error:', error);
    return NextResponse.json([], { status: 200 });
  }
}
