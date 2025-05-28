"use client";
import React, { useEffect, useRef, memo } from 'react';

function TradingViewWidget() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-crypto-coins-heatmap.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      "dataSource": "Crypto",
      "blockSize": "market_cap_calc",
      "blockColor": "24h_close_change|5",
      "locale": "en",
      "symbolUrl": "",
      "colorTheme": "dark",
      // "hasTopBar": true,
      "isDataSetEnabled": true,
      "isZoomEnabled": true,
      "hasSymbolTooltip": true,
      "isMonoSize": false,
      "width": "100%",
      "height": "100%",
      "showSymbolLogo": true,
      "showFloatingTooltip": true,  
    });
    
    container.current?.appendChild(script);

    return () => {
      if (container.current?.contains(script)) {
        container.current.removeChild(script);
      }
    };
  }, []);

  return (
    <div 
      className="tradingview-widget-container h-[650px]! bg-[#07153b]! rounded-2xl! mt-8!"
      ref={container}
      style={{
        height: '600px',
        margin: '0 auto',
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: '#07153b'
      }}
    >
      <h2 className="text-xl font-bold text-white mb-8 pl-6 relative">
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-sm"></span>
       Crypto Heat Map
      </h2>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
}

export default memo(TradingViewWidget);