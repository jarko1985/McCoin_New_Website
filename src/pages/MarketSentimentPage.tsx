import FearAndGreed from '@/components/charts/FearAndGreed'
import CryptoHeatMap from '@/components/widgets/CryptoHeatMap'
import TradingViewMarketOverview from '@/components/widgets/MarketOverview'
import { FiAlertCircle } from "react-icons/fi";

const MarketSentimentPage = () => {
  return (
    <main className="container mx-auto xl:w-[70%] pt-12 px-4 xl:px-0">
       <h2 className="text-3xl font-bold text-white mb-8 pl-6 relative">
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-sm"></span>
       Market Sentiment Overview
      </h2>
      <p className='text-lg text-gray-300 mb-8'>
        Get a pulse on the global crypto market in real time. McCoin’s Market Sentiment dashboard aggregates live data 
        from trusted sources to help you gauge whether the market leans bullish or bearish.
      </p>
      
    <FearAndGreed/>
    <TradingViewMarketOverview/>
   
    <CryptoHeatMap/>
    <div className='mt-12 text-white'>
    <FiAlertCircle className='inline text-yellow-400 mr-2' size={20}/>Disclaimer
    <div className='text-white pt-4'>
    <p>
      The information displayed on this page is provided for general informational purposes only and does not constitute investment advice, financial advice, or trading recommendations.
    </p>
      <p>
      Market sentiment indicators are derived from external data sources and automated analysis, which may not always reflect real-time accuracy or completenes
      </p>
    <p>
      Please do your own research and consult a licensed financial advisor before making any investment decisions. 
      Trading cryptocurrencies involves high risk and may result in significant financial loss.
    </p>
    </div>
    </div>
    </main>
  )
}

export default MarketSentimentPage