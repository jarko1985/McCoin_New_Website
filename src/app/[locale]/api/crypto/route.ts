// app/api/crypto/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.COINMARKETCAP_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "API key not configured" },
      { status: 500 }
    );
  }

  try {
    const headers = {
      "X-CMC_PRO_API_KEY": apiKey,
    };

    // Fetch current top 10 listings
    const listingsUrl = new URL(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest"
    );
    listingsUrl.searchParams.set("start", "1");
    listingsUrl.searchParams.set("limit", "10");
    listingsUrl.searchParams.set("convert", "USD");

    const listingsRes = fetch(listingsUrl.toString(), { headers });

    // Fetch current global market cap
    const globalUrl =
      "https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest";
    const globalRes = fetch(globalUrl, { headers });

    // Fetch historical market cap values (last 1 year, monthly)
    const today = new Date();
    const lastYear = new Date(today);
    lastYear.setFullYear(today.getFullYear() - 1);

    const historicalUrl = new URL(
      "https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/historical"
    );
    historicalUrl.searchParams.set("time_start", lastYear.toISOString());
    historicalUrl.searchParams.set("time_end", today.toISOString());
    historicalUrl.searchParams.set("interval", "monthly");

    const historicalRes = fetch(historicalUrl.toString(), { headers });

    // Wait for all responses
    const [listingsData, globalData, historicalData] = await Promise.all([
      listingsRes.then((res) => res.json()),
      globalRes.then((res) => res.json()),
      historicalRes.then((res) => res.json()),
    ]);

    // Calculate yearly performance (first and last value from historical data)
    const quotes = historicalData?.data?.quotes;

    if (!quotes || !Array.isArray(quotes)) {
      return NextResponse.json(
        {
          error: "Invalid or missing historical market cap data",
          historicalData,
        },
        { status: 500 }
      );
    }

    const startCap = quotes[0]?.quote?.USD?.total_market_cap;
    const endCap = quotes[quotes.length - 1]?.quote?.USD?.total_market_cap;
    const yearlyPerformance =
      startCap && endCap ? ((endCap - startCap) / startCap) * 100 : null;

    return NextResponse.json({
      listings: listingsData.data,
      currentMarketCap: globalData.data.total_market_cap_usd,
      historicalMarketCap: quotes,
      yearlyPerformancePercent: yearlyPerformance?.toFixed(2),
    });
  } catch (error) {
    console.error("Error fetching crypto dashboard data:", error);
    return NextResponse.json(
      { error: "Failed to fetch crypto dashboard data" },
      { status: 500 }
    );
  }
}
