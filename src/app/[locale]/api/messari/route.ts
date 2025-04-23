import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const apikey = process.env.MESSARI_API_KEY;
  const url = `https://data.messari.io/api/v1/news`;
  try {
    const response = await fetch(url, {
      headers: {
        "x-messari-api-key": apikey || "",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Messari API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data.data);
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}
