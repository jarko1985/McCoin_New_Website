'use client';

import { useEffect, useRef, useState } from 'react';

export default function EthereumWidget({ onLoad }: { onLoad: () => void }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadWidget = () => {
      try {
        if (widgetRef.current) widgetRef.current.innerHTML = '';

        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js';
        script.async = true;
        script.onload = () => {
          setLoaded(true);
          onLoad();
        };
        script.onerror = () => {
          setError('Failed to load Ethereum widget');
          onLoad();
        };

        script.innerHTML = JSON.stringify({
          symbol: 'BINANCE:ETHUSDT',
          width: '100%',
          isTransparent: true,
          colorTheme: 'dark',
          locale: 'en',
        });

        widgetRef.current?.appendChild(script);
      } catch (err) {
        setError('Error initializing ETH widget');
        console.error(err);
        onLoad();
      }
    };

    loadWidget();

    return () => {
      if (widgetRef.current) widgetRef.current.innerHTML = '';
    };
  }, [onLoad]);

  return (
    <div className='container mx-auto'>
      <div className="tradingview-widget-container relative min-h-[120px]">
        <div className="
          bg-[#07153b]
          rounded-xl
          border
          border-gray-600/30
          overflow-hidden 
          p-[1px]
        ">
          <div className="relative h-full w-full rounded-[11px] overflow-hidden border border-gray-600 transition-all duration-500 hover:border-gray-100">
            {!loaded && !error && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#07153b] rounded-xl">
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
                  <p className="text-gray-300 text-sm">Loading ETH data...</p>
                </div>
              </div>
            )}

            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#07153b] rounded-xl">
                <div className="text-center p-4">
                  <p className="text-red-300 font-medium text-sm">{error}</p>
                  <button 
                    onClick={() => {
                      setError(null);
                      setLoaded(false);
                      window.location.reload();
                    }}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                  >
                    Retry
                  </button>
                </div>
              </div>
            )}

            <div 
              ref={widgetRef}
              className="h-full pointer-events-none"
              style={{ 
                display: loaded ? 'block' : 'none',
                backgroundColor: 'transparent',
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}