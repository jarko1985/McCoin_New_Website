import { NextResponse } from 'next/server';

const PODCHASER_API_URL = 'https://api.podchaser.com/graphql';
const PODCHASER_API_KEY = process.env.PODCHASER_API_KEY_DEVELOPMENT;

const QUERY = `
  query {
    podcasts(searchTerm: "crypto", filters: {rating: {minRating: 2, maxRating: 5}}) {
      paginatorInfo {
        currentPage,
        hasMorePages,
        lastPage,
      },
      data {
        id,
        title,
        description,
        webUrl,
        imageUrl,
      }
    }
  }
`;

export async function GET() {
  if (!PODCHASER_API_KEY) {
    return NextResponse.json({ error: 'Missing Podchaser API key' }, { status: 500 });
  }

  try {
    const response = await fetch(PODCHASER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${PODCHASER_API_KEY}`,
      },
      body: JSON.stringify({
        query: QUERY,
      }),
    });

    const result = await response.json();
    console.log(result.data.podcasts.data);
    
    if (!response.ok || result.errors) {
      return NextResponse.json({ error: result.errors || 'Failed to fetch podcasts' }, { status: 500 });
    }

    return NextResponse.json(result.data.podcasts.data);

  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
