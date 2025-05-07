// src/app/[locale]/api/podcasts/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';

const PODCHASER_API_URL = 'https://api.podchaser.com/graphql';
const PODCHASER_API_KEY = process.env.PODCHASER_API_KEY_DEVELOPMENT!;

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ locale: string; id: string }> }
) {
  const { id } = await context.params;

  // 1) Validate API key
  if (!PODCHASER_API_KEY) {
    return NextResponse.json(
      { error: 'Missing Podchaser API key' },
      { status: 500 }
    );
  }

  // 2) Build GraphQL query with a variable
  const query = `
    query GetPodcastDetails($id: String!) {
      podcast(identifier: { id: $id, type: PODCHASER }) {
        id
        title
        description
        imageUrl
        webUrl
        episodes(first: 5) {
          data {
            id
            title
            audioUrl
          }
        }
      }
    }
  `;

  // 3) Send request
  try {
    const response = await fetch(PODCHASER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${PODCHASER_API_KEY}`,
      },
      body: JSON.stringify({
        query,
        variables: { id },
      }),
    });

    const { data, errors } = await response.json();

    if (!response.ok || errors) {
      return NextResponse.json(
        { error: errors || 'Failed to fetch podcast details' },
        { status: 500 }
      );
    }

    return NextResponse.json(data.podcast);
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
