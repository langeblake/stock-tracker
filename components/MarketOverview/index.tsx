"use client"

import React from 'react';
import usePolygonData from '@/hooks/usePolygonDaily'; // Adjust the path as needed
import { OverviewCard } from './overviewCard';

const MarketOverview = () => {
  const { data, error, isLoading } = usePolygonData();

  const shouldShowSkeleton = isLoading || (!data && !isLoading);

  // Sort by volume
  let chunks = [];
  if (data && data.results) {
    // Sort and slice the top 20 entries
    const top20Data = data.results.sort((a, b) => b.v - a.v).slice(0, 20);
    // Chunk the data into groups of 5
    const chunkSize = 5;
    for (let i = 0; i < top20Data.length; i += chunkSize) {
      chunks.push(top20Data.slice(i, i + chunkSize));
    }
  }

  return (
    <section id="market-overview" className="hidden lg:flex w-full dark:bg-black overflow-hidden bg-gray-100 pb-16 pt-[85px]">
      <div className="container mx-auto pt-24">
        <div className="flex justify-center items-center gap-4">
          {shouldShowSkeleton ? (
            // Here, render as many OverviewCards as you need to show the skeleton
            Array.from({ length: 4 }, (_, index) => (
              <OverviewCard key={index} data={[]}  isLoading={true} />
            ))
          ) : (
            chunks.map((chunk, index) => (
              <OverviewCard key={index} data={chunk}  isLoading={false} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default MarketOverview;

