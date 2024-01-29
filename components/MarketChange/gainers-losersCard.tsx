// GainersLosers.js
"use client"

import React from 'react';
import usePolygonGL from '@/hooks/usePolygonGL';

const TickerCard = ({ ticker }) => {
    const changePercClass = ticker.todaysChangePerc >= 0 ? 'text-green-500' : 'text-red-500';

    return (
        <div className='flex p-6 justify-between'>
            <h3 className='font-semibold'>{ticker.ticker}</h3>
            <div className='flex flex-col gap-4'>
                <p>${ticker.day.c.toFixed(2)}</p>
                <p className={changePercClass}>{ticker.todaysChangePerc.toFixed(2)}%</p>
            </div>
        </div>
    );
};


const GainersLosers = () => {
    const { data, loading, error } = usePolygonGL();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading data: {error.message}</p>;

    // Sort and slice the top 4 gainers and losers
    const topGainers = [...data.gainers.tickers].sort((a, b) => b.todaysChangePerc - a.todaysChangePerc).slice(0, 4);
    const topLosers = [...data.losers.tickers].sort((a, b) => a.todaysChangePerc - b.todaysChangePerc).slice(0, 4);

    return (
        <div className='w-full'>
            <h1 className='font-bold text-2xl py-6'>Gainers & Losers</h1>
            <div className='flex gap-5'>
                <div className='flex flex-col gap-4 w-1/2'>
                    {topGainers.map((ticker, index) => (
                        <div className='border rounded-lg dark:border-zinc-700 dark:bg-zinc-900'>
                            <TickerCard key={index} ticker={ticker} />
                        </div>
                        
                    ))}
                </div>
                <div className='flex flex-col gap-4 w-1/2'>
                    {topLosers.map((ticker, index) => (
                        <div className='border rounded-lg dark:border-zinc-700 dark:bg-zinc-900'>
                            <TickerCard key={index} ticker={ticker} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GainersLosers;
