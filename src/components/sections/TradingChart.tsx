'use client';

import { useEffect, useState } from 'react';

export default function TradingViewCryptoScreener() {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWidget = () => {
      try {
        const container = document.querySelector('.tradingview-widget-container__widget');
        if (container) container.innerHTML = '';

        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-screener.js';
        script.async = true;
        script.onload = () => {
          setLoaded(true);
          setTimeout(applyCustomStyles, 500);
        };
        script.onerror = () => setError('Failed to load TradingView widget');
        
        script.innerHTML = JSON.stringify({
          "width": "100%",
          "height": 550,
          "defaultColumn": "overview",
          "screener_type": "crypto_mkt",
          "displayCurrency": "BTC",
          "colorTheme": "dark",
          "backgroundColor": "rgba(0,0,0,0)",
          "locale": "en",
          "isTransparent": true,
          "market": "crypto"
        });

        document.querySelector('.tradingview-widget-container__widget')?.appendChild(script);
      } catch (err) {
        setError('Error initializing widget');
        console.error(err);
      }
    };

    const applyCustomStyles = () => {
      const style = document.createElement('style');
      style.innerHTML = `
        .tv-screener__content-pane {
          border-radius: 12px !important;
          overflow: hidden !important;
        }
        .tv-screener-table__row:hover {
          background-color: #0a1f4d !important;
        }
      `;
      document.head.appendChild(style);
    };

    loadWidget();

    return () => {
      const script = document.querySelector('.tradingview-widget-container__widget script');
      if (script) {
        document.querySelector('.tradingview-widget-container__widget')?.removeChild(script);
      }
    };
  }, []);

  return (
    <div className='container mx-auto xl:w-[70%]'>
      <h1 className='text-center text-[#DAE6EA] font-[600] xl:text-[2.225rem]'>Market Trend</h1>
      <p className='text-center text-[#DAE6EA] font-[400] xl:text-[1.5rem] mt-6 mb-12'>Crypto market leaderboard express</p>
      <div className="tradingview-widget-container relative min-h-[550px]">
        <div className="
          bg-[#07153b]
          rounded-xl
          border
          border-gray-600/30
          overflow-hidden 
          p-[1px]
        ">
          <div className="relative h-full w-full rounded-[11px] overflow-hidden">
            {!loaded && !error && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#07153b] rounded-xl">
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                  <p className="text-gray-300">Loading market data...</p>
                </div>
              </div>
            )}

            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#07153b] rounded-xl">
                <div className="text-center p-4">
                  <p className="text-red-300 font-medium">{error}</p>
                  <button 
                    onClick={() => {
                      setError(null);
                      setLoaded(false);
                      window.location.reload();
                    }}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Retry
                  </button>
                </div>
              </div>
            )}

            <div 
              className="tradingview-widget-container__widget h-full" 
              style={{ 
                display: loaded ? 'block' : 'none',
                backgroundColor: 'transparent',
              }}
            ></div>
          </div>
          
          <div className="tradingview-widget-copyright text-xs text-center mt-2 text-gray-400 pb-2 px-2">
            <a 
              href="https://www.tradingview.com/" 
              rel="noopener nofollow" 
              target="_blank"
              className="text-blue-400 hover:text-blue-300"
            >
              Track all markets on TradingView
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}