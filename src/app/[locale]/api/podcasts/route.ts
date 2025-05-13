import { NextResponse } from "next/server";

export async function GET() {
  const userId = process.env.TADDY_USER_ID;
  const apiKey = process.env.TADDY_API_KEY;

  if (!userId || !apiKey) {
    return NextResponse.json(
      { error: "Missing Taddy credentials" },
      { status: 500 }
    );
  }

  const query = `
  query SEARCH_FOR_TERM_QUERY(
    $term: String!
    $page: Int
    $limitPerPage: Int
    $filterForTypes: [SearchContentType!]
    $filterForCountries: [Country!]
    $isSafeMode: Boolean
  ) {
    search(
      term: $term
      page: $page
      limitPerPage: $limitPerPage
      filterForTypes: $filterForTypes
      filterForCountries: $filterForCountries
      isSafeMode: $isSafeMode
    ) {
      searchId
      podcastEpisodes {
        uuid
        name
        description(shouldStripHtmlTags: true)
        imageUrl
        audioUrl
        podcastSeries {
          uuid
          name
          genres
        }
      }
      podcastSeries {
        uuid
        name
        description(shouldStripHtmlTags: true)
        imageUrl
        rssUrl
        genres
      }
    }
  }
`;

  const baseVars = {
    term: "crypto",
    limitPerPage: 20,
    filterForCountries: ["UNITED_STATES_OF_AMERICA"],
    isSafeMode: true,
  };

  try {
    const fetchSearch = async (page: number, filterForTypes: string[]) => {
      const res = await fetch("https://api.taddy.org", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-USER-ID": userId,
          "X-API-KEY": apiKey,
        },
        body: JSON.stringify({
          query,
          variables: {
            ...baseVars,
            page,
            filterForTypes,
          },
        }),
      });

      const json = await res.json();
      if (json.errors) throw new Error(JSON.stringify(json.errors));
      return json.data?.search ?? {};
    };

    // Fetch various segments
    const featuredSearch = await fetchSearch(1, [
      "PODCASTEPISODE",
      "PODCASTSERIES",
    ]);
    const recentSearch = await fetchSearch(2, ["PODCASTEPISODE"]);
    const seriesOnly = await fetchSearch(1, ["PODCASTSERIES"]);

    return NextResponse.json({
      featuredEpisodes: featuredSearch.podcastEpisodes?.slice(0, 5) || [],
      featuredSeries: featuredSearch.podcastSeries?.slice(0, 5) || [],
      recentEpisodes: recentSearch.podcastEpisodes?.slice(0, 10) || [],
      allSeries: seriesOnly.podcastSeries?.slice(0, 20) || [],
    });
  } catch (err) {
    console.error("Taddy API error:", err);
    return NextResponse.json(
      { error: "Failed to fetch podcast data" },
      { status: 500 }
    );
  }
}
