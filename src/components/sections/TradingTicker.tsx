'use client';

import React, { useEffect, useRef, useState } from 'react';

interface TradingTickerProps {
  className?: string;
  onLoad?: () => void; // Added onLoad prop
}


const TradingTicker: React.FC<TradingTickerProps> = ({ className = ''}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Only run this effect on the client side
    if (typeof window === 'undefined') return;
    
    const loadWidget = () => {
      try {
        // Remove any existing script to avoid duplicates
        const existingScript = document.getElementById('tradingview-ticker-script');
        if (existingScript) {
          existingScript.remove();
        }
        
        // Clear the container if it already has content
        const widgetContainer = containerRef.current?.querySelector('.tradingview-ticker-container__widget');
        if (widgetContainer) {
          widgetContainer.innerHTML = '';
        }
        
        // Create a new script element
        const script = document.createElement('script');
        script.id = 'tradingview-ticker-script';
        script.type = 'text/javascript';
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
        script.async = true;
        
        script.onload = () => {
          setLoaded(true);
        };
        script.onerror = () => {
          setError('Failed to load Ticker widget');
        };
        
        // Widget configuration
        script.innerHTML = JSON.stringify({
          symbols: [
            {
              description: "Solana",
              proName: "BINANCE:SOLUSD"
            },
            {
              description: "BITCOIN",
              proName: "BINANCE:BTCUSD"
            },
            {
              description: "Cardano",
              proName: "BINANCE:ADAUSD"
            },
            {
              description: "Solana",
              proName: "BINANCE:SOLUSD"
            },
            {
              description: "ex-MATIC",
              proName: "BINANCE:POLUSDT"
            },
            {
              description: "EDGE",
              proName: "COINBASE:EDGEUSD"
            },
            {
              description: "TrumpCoin",
              proName: "BINANCE:TRUMPUSDT"
            },
            {
              description: "Ripple",
              proName: "BINANCE:XRPUSD"
            },
            {
              description: "DODGECOIN",
              proName: "BINANCE:DOGEUSD"
            },
            {
              description: "Avalanche",
              proName: "BINANCE:AVAXUSDT"
            },
            {
              description: "lumen",
              proName: "BINANCE:XLMUSDT"
            },
            {
              description: "Enjin",
              proName: "BINANCE:ENJUSDT"
            },
            {
              description: "Litecoin",
              proName: "BINANCE:LTCUSDT"
            },
            {
              description: "DAI",
              proName: "COINBASE:DAIUSD"
            },
            {
              description: "Monero",
              proName: "CRYPTOCAP:XMR"
            },
            {
              description: "Uniswap",
              proName: "BINANCE:UNIUSDT"
            },
            {
              description: "NEAR",
              proName: "BINANCE:NEARUSDT"
            },
            {
              description: "Binance Coin",
              proName: "BINANCE:BNBUSDT"
            }
          ],
          showSymbolLogo: true,
          isTransparent: true,
          displayMode: "adaptive",
          colorTheme: "dark",
          locale: "en"
        });
        
        // Append the script to the widget container
        if (widgetContainer) {
          widgetContainer.appendChild(script);
        }
      } catch (err) {
        setError('Error initializing ticker widget');
        console.error(err);
      }
    };
    
    loadWidget();
    
    // Cleanup function
    return () => {
      const scriptToRemove = document.getElementById('tradingview-ticker-script');
      if (scriptToRemove && scriptToRemove.parentNode) {
        scriptToRemove.parentNode.removeChild(scriptToRemove);
      }
    };
  }, []);
  
  return (
    <div className={`tradingview-ticker-container relative ${className}`} ref={containerRef}>
      <div className="
        bg-[#07153b]
        rounded-xl
        border
        border-gray-600/30
        overflow-hidden 
        p-[1px]
      ">
        <div className="relative w-full rounded-[11px] overflow-hidden">
          {!loaded && !error && (
            <div className="flex items-center justify-center bg-[#07153b] h-12 rounded-xl">
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500 mr-2"></div>
                <p className="text-gray-300 text-sm">Loading ticker data...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center bg-[#07153b] h-12 rounded-xl">
              <div className="text-center">
                <p className="text-red-300 text-sm">{error}</p>
                <button 
                  onClick={() => {
                    setError(null);
                    setLoaded(false);
                    window.location.reload();
                  }}
                  className="mt-1 px-2 py-1 text-xs bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          <div 
            className="tradingview-ticker-container__widget pointer-events-none" 
            style={{ 
              display: loaded ? 'block' : 'none',
              backgroundColor: 'transparent',
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TradingTicker;
