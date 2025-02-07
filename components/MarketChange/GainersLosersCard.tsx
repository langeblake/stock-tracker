import React from 'react';
import Link from 'next/link';
import gainersData from '../../data/staticPolygonData/gainersData.json';
import losersData from '../../data/staticPolygonData/losersData.json';

const GainersLosersCard = () => {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-4 w-1/2">
        {gainersData.map((ticker, index) => (
          <Link key={index} href={`/ticker/${ticker.ticker}`}>
            <div className="border rounded-lg dark:border-zinc-700 dark:bg-zinc-900/70 dark:hover:bg-zinc-900 hover:bg-zinc-50 bg-white hover:cursor-pointer">
              <TickerCard ticker={ticker} />
            </div>
          </Link>
        ))}
      </div>

      <div className="flex flex-col gap-4 w-1/2">
        {losersData.map((ticker, index) => (
          <Link key={index} href={`/ticker/${ticker.ticker}`}>
            <div className="border rounded-lg dark:border-zinc-700 dark:bg-zinc-900/70 dark:hover:bg-zinc-900 hover:bg-zinc-50 bg-white hover:cursor-pointer">
              <TickerCard ticker={ticker} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GainersLosersCard;

const TickerCard = ({ ticker }) => {
  const changePercClass =
    ticker.todaysChangePerc >= 0 ? "text-green-500" : "text-red-500";

  return (
    <div className="flex p-3 sm:p-6 justify-between">
      <h3 className="font-semibold">{ticker.ticker}</h3>
      <div className="flex flex-col gap-4">
        <p className="pl-2 text-right">${ticker.min.c.toFixed(2)}</p>
        <p className={changePercClass}>{ticker.todaysChangePerc.toFixed(2)}%</p>
      </div>
    </div>
  );
};