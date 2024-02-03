// GainersLosers.js
"use client"

import React from 'react';
import usePolygonGL from '@/hooks/usePolygonGL';

const TickerSkeleton = () => {
    return (
        <div className='flex flex-col p-6 justify-between gap-4 animate-pulse'>
            <div className='flex gap-8'>
                <div className='h-6 bg-gray-600 rounded-full w-1/2'></div>
                <div className='h-6 bg-gray-600 rounded-full w-1/2'></div>
            </div>
            <div className='flex gap-8'>
                <div className='h-6 bg-gray-600 rounded-full w-1/2'></div>
                <div className='h-6 bg-gray-600 rounded-full w-1/2'></div>
            </div>
        </div>
    );
};


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

    if (error) return <p>Error loading data: {error.message}</p>;

    // Determine the number of skeletons to render
    const skeletonCount = 4; // Or dynamically determine based on container size or other factors

    return (
        <div className='w-full'>
            <h1 className='font-bold text-2xl py-6'>Gainers & Losers</h1>
            <div className='flex gap-5'>
                <div className='flex flex-col gap-4 w-1/2'>
                    {loading ? (
                        Array.from({ length: skeletonCount }).map((_, index) => (
                            <div key={index} className='border rounded-lg dark:border-zinc-700 dark:bg-zinc-900 bg-white'>
                                <TickerSkeleton />
                            </div>
                        ))
                    ) : (
                        data.gainers.tickers.sort((a, b) => b.todaysChangePerc - a.todaysChangePerc).slice(0, 4).map((ticker, index) => (
                            <div key={ticker.ticker + '-gainer'} className='border rounded-lg dark:border-zinc-700 dark:bg-zinc-900  dark:hover:bg-zinc-800 bg-white hover:cursor-pointer'>
                                <TickerCard key={index} ticker={ticker} />
                            </div>
                        ))
                    )}
                </div>
                <div className='flex flex-col gap-4 w-1/2'>
                    {loading ? (
                        Array.from({ length: skeletonCount }).map((_, index) => (
                            <div key={index} className='border rounded-lg dark:border-zinc-700 dark:bg-zinc-900 bg-white'>
                                <TickerSkeleton />
                            </div>
                        ))
                    ) : (
                        data.losers.tickers.sort((a, b) => a.todaysChangePerc - b.todaysChangePerc).slice(0, 4).map((ticker, index) => (
                            <div key={ticker.ticker + '-loser'} className='border rounded-lg dark:border-zinc-700 dark:bg-zinc-900  dark:hover:bg-zinc-800 bg-white'>
                                <TickerCard key={index} ticker={ticker} />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default GainersLosers;