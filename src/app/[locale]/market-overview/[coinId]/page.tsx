import { notFound } from 'next/navigation';
import Image from 'next/image';
import CoinChart from '@/components/charts/CoinChart';

export default async function CoinDetails(context: {
  params: Promise<{ locale: string; coinId: string }>;
}) {
  const { coinId } = await context.params;
  const res = await fetch(`https://pro-api.coingecko.com/api/v3/coins/${coinId}`, {
    headers: {
      'x-cg-pro-api-key': process.env.NEXT_PUBLIC_COINGECKO_API_KEY!,
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) return notFound();

  const coin = await res.json();

  return (
    <section className="bg-[#07153b] text-[#DAE6EA] xl:max-w-[70%] mx-auto py-12 px-4 xl:px-0">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Section */}
        <div className="lg:w-1/2">
          <div className="flex items-center gap-4 mb-6">
            <Image src={coin.image.large} alt={coin.name} width={50} height={50} />
            <div>
              <h1 className="text-3xl font-bold">
                {coin.name} ({coin.symbol.toUpperCase()})
              </h1>
              <p className="text-sm text-gray-400">Rank #{coin.market_cap_rank}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm bg-[#0e1c3d] p-4 rounded-xl shadow mb-6">
            <div>
              <p className="text-gray-400">Price</p>
              <p className="font-semibold text-white">
                ${coin.market_data.current_price.usd.toFixed(4)}
              </p>
            </div>
            <div>
              <p className="text-gray-400">24h %</p>
              <p
                className={`font-semibold ${
                  coin.market_data.price_change_percentage_24h > 0
                    ? 'text-green-400'
                    : 'text-red-400'
                }`}
              >
                {coin.market_data.price_change_percentage_24h.toFixed(2)}%
              </p>
            </div>
            <div>
              <p className="text-gray-400">Market Cap</p>
              <p>${coin.market_data.market_cap.usd.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-400">FDV</p>
              <p>${coin.market_data.fully_diluted_valuation?.usd?.toLocaleString() || '—'}</p>
            </div>
            <div>
              <p className="text-gray-400">24h Vol</p>
              <p>${coin.market_data.total_volume.usd.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-400">Supply</p>
              <p>{coin.market_data.circulating_supply.toLocaleString()}</p>
            </div>
          </div>

          <div className="text-sm bg-[#0e1c3d] p-4 rounded-xl">
            <h2 className="font-semibold text-lg mb-2">Contract Addresses</h2>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {Object.entries(coin.detail_platforms).map(([platform, details]) => {
                const platformDetails = details as { contract_address?: string };
                return platformDetails.contract_address ? (
                  <div key={platform} className="flex justify-between text-xs items-center">
                    <span className="capitalize">{platform}</span>
                    <span className="text-gray-400 truncate">
                      {platformDetails.contract_address}
                    </span>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:w-1/2 lg:mt-[5rem]">
          <CoinChart coinId={coinId} />
        </div>
      </div>
    </section>
  );
}
