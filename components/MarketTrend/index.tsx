import { Search } from "./Search";
import Favorites from "./Favorites";
import React, { Suspense } from 'react';
const TrendList = React.lazy(() => import('./TrendList'));
 // Import the LoadingSkeleton component
import { columns } from "./TickerTable/columns"; // Import your columns definition
import LoadingSkeleton from "../Loading/LoadingTickerTable";

export interface ITickerListParams {
  search?: string;
  favorites?: string;
}

const MarketTrend = ({ search, favorites }) => {
  const query = favorites ? favorites : search;

  return (
    <section id="tickerListSection" className="pt-20 pb-4 md:pt-28 md:pb-2 xl:pt-0">
      <div className="px-4 xl:container">
        <div className="flex gap-4 items-center flex-col pb-4 md:pb-0 md:flex-row">
          <h1 className="md:w-2/5 font-bold text-2xl pt-6 md:pb-6">Trending Tickers</h1>
          <div className="flex justify-center items-center gap-4 flex-col md:flex-row">
            <Search />
            <Favorites />
          </div>
        </div>
        <Suspense fallback={<LoadingSkeleton />}> {/* Pass columns prop to LoadingSkeleton */}
          <TrendList query={query} />
        </Suspense>
      </div>
    </section>
  );
};

export default MarketTrend;
