// src/app/api/podcasts/series/[seriesId]/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, context: { params: Promise<{ seriesId: string }> }) {
  const { seriesId } = await context.params;
  const userId = process.env.TADDY_USER_ID;
  const apiKey = process.env.TADDY_API_KEY;

  if (!userId || !apiKey) {
    return NextResponse.json({ error: 'Missing Taddy credentials' }, { status: 500 });
  }

  // Fetch episodes for series

  // GraphQL query to get episodes for a specific podcast series
  const query = `
    query GET_PODCAST_SERIES($uuid: ID!) {
      getPodcastSeries(uuid: $uuid) {
        uuid
        name
        description
        imageUrl
        rssUrl
        genres
        episodes {
          uuid
          name
          description
          imageUrl
          audioUrl
          datePublished
          podcastSeries {
            uuid
            name
            genres
          }
        }
      }
    }
  `;

  const safeImage = (url: string | null | undefined) =>
    !url || url.includes('cloudfront.net') ? '/images/fallback-image.jpeg' : url;

  try {
    const response = await fetch('https://api.taddy.org', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-USER-ID': userId,
        'X-API-KEY': apiKey,
      },
      body: JSON.stringify({
        query,
        variables: {
          uuid: seriesId,
        },
      }),
    });

    const json = await response.json();

    if (json.errors) {
      return NextResponse.json(
        { error: 'Failed to fetch series episodes' },
        { status: 500 },
      );
    }

    const series = json.data?.getPodcastSeries;

    if (!series) {
      return NextResponse.json({ error: 'Series not found' }, { status: 404 });
    }

    // Helper function to strip HTML tags
    const stripHtml = (html: string) => {
      if (!html) return '';
      return html
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .trim();
    };

    // Process the episodes with safe image URLs and clean descriptions
    const episodes = (series.episodes ?? []).map((ep: any) => ({
      ...ep,
      imageUrl: safeImage(ep.imageUrl),
      description: stripHtml(ep.description || ''),
      publishedAt: ep.datePublished, // Map datePublished to publishedAt for consistency
    }));

    return NextResponse.json({
      series: {
        ...series,
        imageUrl: safeImage(series.imageUrl),
        description: stripHtml(series.description || ''),
      },
      episodes,
    });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch series episodes' }, { status: 500 });
  }
}
