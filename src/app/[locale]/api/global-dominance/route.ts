// app/api/global-dominance/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://pro-api.coingecko.com/api/v3/global', {
      headers: {
        'x-cg-pro-api-key': process.env.NEXT_PUBLIC_COINGECKO_API_KEY!,
      },
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch dominance data' }, { status: 500 });
  }
}
