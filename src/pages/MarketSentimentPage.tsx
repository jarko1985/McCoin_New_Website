import FearAndGreed from '@/components/charts/FearAndGreed'
import CryptoHeatMap from '@/components/widgets/CryptoHeatMap'
import TradingViewMarketOverview from '@/components/widgets/MarketOverview'
import React from 'react'

const MarketSentimentPage = () => {
  return (
    <main className=" container mx-auto xl:w-[70%]">
      <section className='flex flex-col justify-center lg:flex-row'>
    <FearAndGreed/>
    <TradingViewMarketOverview/>
    </section>
    <CryptoHeatMap/>
    </main>
  )
}

export default MarketSentimentPage