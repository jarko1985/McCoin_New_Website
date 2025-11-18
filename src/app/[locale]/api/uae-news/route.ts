import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.GNEWS_API_KEY;
  const url = `https://gnews.io/api/v4/search?q=uae+crypto&lang=en&max=20&apikey=${apiKey}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 300 }, // Changed from 3600 to 300 seconds (5 minutes)
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data.articles);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}
