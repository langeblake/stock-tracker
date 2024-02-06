"use client"
import React, { useEffect } from 'react';
import usePolygonAllTickers from '@/hooks/usePolygonAllTickers';
import { OverviewCard } from './overviewCard';
import usePolygonAllTickersStore from '@/store/PolygonAllTickersStore';


const MarketOverview = () => {
  // const { data, error, isLoading, fetchData } = usePolygonAllTickersStore();
  const { data, error, isLoading, fetchData } = usePolygonAllTickersStore();


  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const shouldShowSkeleton = isLoading || (!data && !isLoading);

  if (error) console.log(error.message);
  

  let chunks = [];
  if (data && data.tickers) {
    // Sort the tickers by daily volume in descending order
    const top20Data = data.tickers
      .sort((a, b) => b.day.v - a.day.v) // Use 'day.v' for sorting by daily volume
      .slice(0, 20);

    // Chunk the sorted data into groups of 5
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
            // Render skeletons
            Array.from({ length: 4 }, (_, index) => (
              <OverviewCard key={index} data={null} isLoading={true} />
            ))
          ) : (
            // Render actual data
            chunks.map((chunk, index) => (
              <OverviewCard key={index} data={chunk} isLoading={false} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default MarketOverview;

