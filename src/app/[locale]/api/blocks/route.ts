import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Get current time in milliseconds
    const currentTimestamp = Date.now();

    // Blockchain API endpoint
    const apiUrl = `https://blockchain.info/blocks/${currentTimestamp}?format=json`;

    // Fetch the blocks
    const res = await fetch(apiUrl);

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch blocks' }, { status: res.status });
    }

    const data = await res.json();

    // Return the JSON response
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong', details: error }, { status: 500 });
  }
}