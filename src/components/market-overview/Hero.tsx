import React from 'react';

const Hero = () => {
  return (
    <section>
      <h1 className="text-white lg:text-3xl text-lg font-semibold tracking-wider lg:text-left text-center">
        Spot Market Overview
      </h1>
      <p className="text-gray-400 mt-4 lg:text-[1rem] lg:text-base lg:text-left text-center lg:max-w-6xl">
        Welcome to McCoin’s Spot Market Overview — your one-stop dashboard for analyzing real-time
        crypto market data. Track the global crypto market cap, historical trends, trading volume,
        and market dominance across centralized (CEX) and decentralized exchanges (DEX). Dive into
        comparative volume share, monitor yearly highs/lows, and follow top news stories impacting
        market sentiment.
      </p>
      <p className="text-gray-400 mt-4 lg:text-[1rem] lg:text-base lg:text-left text-center lg:max-w-6xl">
        Whether you're an active trader, analyst, or just crypto-curious, this page offers powerful
        insight to support smarter decision-making.
      </p>
    </section>
  );
};

export default Hero;
