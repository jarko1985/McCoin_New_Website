import { useEffect, useState } from 'react';
import Slider from './Slider';
import { useParams } from 'next/navigation';

interface Coin {
  id: string;
  name: string;
  image: string;
  price: number;
  price_change: number;
  percent_change: number;
}

interface SliderConfig {
  id: string;
  coins: Coin[];
  direction: 'left' | 'right';
}

const MultiSwiper = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [sliders, setSliders] = useState<SliderConfig[]>([]);
  const locale = (useParams() as { locale?: string })?.locale ?? 'en';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/${locale}/api/screener`);
        const data = await res.json();

        if (Array.isArray(data)) {
          setCoins(data);
        } else {
          console.error('API returned non-array:', data);
          setCoins([]);
        }
      } catch (err) {
        console.error('Error fetching screener data:', err);
        setCoins([]);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [locale]);

  // Split coins into 3 sliders when coins data changes
  useEffect(() => {
    if (coins.length > 0) {
      const coinsPerSlider = Math.ceil(coins.length / 3);
      const newSliders: SliderConfig[] = [
        {
          id: 'slider1',
          coins: coins.slice(0, coinsPerSlider),
          direction: 'left',
        },
        {
          id: 'slider2',
          coins: coins.slice(coinsPerSlider, coinsPerSlider * 2),
          direction: 'right',
        },
        {
          id: 'slider3',
          coins: coins.slice(coinsPerSlider * 2),
          direction: 'left',
        },
      ];
      setSliders(newSliders);
    }
  }, [coins]);

  return (
    <section className="sliders-container my-6">
      {sliders.map(slider => (
        <Slider key={slider.id} id={slider.id} coins={slider.coins} direction={slider.direction} />
      ))}
      {sliders.length === 0 && (
        <div className="text-center text-white/70 py-8">Loading sliders...</div>
      )}
    </section>
  );
};

export default MultiSwiper;
