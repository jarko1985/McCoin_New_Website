import React, { useEffect, useState } from 'react';
import CoinCard from './CoinCard';

interface Coin {
  id: string;
  name: string;
  image: string;
  price: number;
  price_change: number;
  percent_change: number;
}

interface SliderProps {
  id: string;
  coins: Coin[];
  direction: 'left' | 'right';
}

const Slider = ({ id, coins, direction }: SliderProps) => {
  const [slides, setSlides] = useState<Coin[]>([]);

  useEffect(() => {
    setSlides([...coins, ...coins]);
  }, [coins]);

  return (
    <div className="multi_slider" id={id}>
      <div className={`multi_slider-track ${direction === 'right' ? 'scrollRight' : 'scrollLeft'}`}>
        {slides.map((coin, index) => (
          <div className="multi_slider-slide" key={`${coin.id}-${index}`}>
            <CoinCard coin={coin} />
          </div>
        ))}
      </div>
      {slides.length === 0 && (
        <div className="text-center text-white/50 text-sm py-4">No coins in {id}</div>
      )}
    </div>
  );
};

export default Slider;
