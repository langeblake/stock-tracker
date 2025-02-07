'use client';

import React, { useState, Suspense } from 'react';
import Search from "./Search";
import Favorites from "./Favorites";
const TrendList = React.lazy(() => import('./TrendList'));
import LoadingSkeleton from "../Loading/LoadingTickerTable";
import { useFavoritesStore, useUIStore } from '@/store/favortiesStore';

const MarketTrend = () => {
  const [query, setQuery] = useState<string>("");
  const { favorites } = useFavoritesStore();
  const isFavorite = favorites.includes(query);
  const { favoriteToggle, toggleFavoriteVisibility } = useUIStore();



  return (
    <section id="tickerListSection" className="pt-20 pb-4 md:pt-28 md:pb-2 xl:pt-0">
      <div className="px-4 xl:container">
        <div className="flex gap-4 items-center flex-col pb-4 md:pb-0 md:flex-row">
          <h1 className="md:w-2/5 font-bold text-2xl pt-6 md:pb-6">Trending Tickers</h1>
          <div className="flex justify-center items-center gap-4 flex-col md:flex-row">
            <Search setQuery={setQuery} />
            <Favorites />
          </div>
        </div>
        <Suspense fallback={<LoadingSkeleton />}>
          <TrendList query={query} favorites={favorites} favoriteToggle={favoriteToggle}/>
        </Suspense>
      </div>
    </section>
  );
};

export default MarketTrend;