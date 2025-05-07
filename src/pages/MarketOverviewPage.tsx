import CryptoMarketCapChart from '@/components/charts/MarketCapChart'
import Hero from '@/components/market-overview/Hero'
import React from 'react'

const MarketOverviewPage = () => {
  return (
    <div className='container mx-auto xl:w-[70%] py-12 px-4 md:px-0'>
        <Hero/>
        <section className='mt-8'>

        <CryptoMarketCapChart/>
        </section>
    </div>
  )
}

export default MarketOverviewPage