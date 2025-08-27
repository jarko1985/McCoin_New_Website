import Image from 'next/image';
import React from 'react';

interface CoinCardProps {
  coin: {
    id: string;
    name: string;
    image: string;
    price: number;
    price_change: number;
    percent_change: number;
  };
}

const CoinCard: React.FC<CoinCardProps> = ({ coin }) => {
  const isPositive_percent = coin.percent_change >= 0;

  return (
    <div className="flex flex-col backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-2xl p-4 hover:bg-white/15 transition-all duration-300 hover:shadow-3xl hover:border-white/30">
      <div className="coin-info">
        <div className="py-2">
          <div className="w-10 h-10 mx-auto rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
            <Image
              src={coin.image}
              alt={coin.name}
              width={32}
              height={32}
              className="rounded-full"
            />
          </div>
        </div>
        <div className="flex flex-row justify-between px-2">
          <strong className="coin-name dark:text-white/90 text-[#07153B] font-semibold text-sm">
            {coin.name.substring(0, 19)}
          </strong>
          <span className="coin-price dark:text-white text-[#07153B] font-bold text-sm">
            ${coin.price.toFixed(4)}
          </span>
        </div>
      </div>
      <div className="flex flex-row justify-between px-2 py-1">
        <strong className="dark:text-white/70 text-[#07153B] text-xs">Price change:</strong>
        <p className="dark:text-white/80 text-[#07153B] text-xs font-medium">
          {coin.price_change.toFixed(4)}
        </p>
      </div>
      <div className="flex flex-row justify-between px-2 py-1">
        <strong className="dark:text-white/70 text-[#07153B] text-xs">Percent:</strong>
        <p
          className={`dark:text-white/80 text-[#07153B] text-xs font-bold ${
            isPositive_percent ? 'text-green-400' : 'text-red-400'
          } drop-shadow-sm`}
        >
          {isPositive_percent ? '+' : ''}
          {coin.percent_change.toFixed(3)}%
        </p>
      </div>
    </div>
  );
};

export default CoinCard;
