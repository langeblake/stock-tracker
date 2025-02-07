import React, { Suspense } from 'react';
import { FifteenReCandleStickChart } from './15Rechart-CandleStick';
import { fetchAggregateData } from '../AreaChart/StockAreaChart';
import { fetchAggregateCandlestickData } from './90CandleStickChart';

interface TickerData {
    c: number;
    h: number;
    l: number;
    n: number;
    o: number;
    t: number;
    v: number;
    vw: number;
    
}

const FifteenCandleStickChart = async ({ ticker, listDate }) => {
  const aggregateData = await fetchAggregateCandlestickData(ticker, 15);

  if (!aggregateData || !aggregateData.results) {
      console.error('Failed to fetch aggregate data or no results found');
      return null; // Return null or some error component
  }
const chartData = aggregateData.results
  .map(d => ({
    date: new Date(d.t).toISOString().substring(0, 10), // Format date as string for the name
    open_close: [d.o, d.c],
    low_high: [d.l, d.h]
  }))

  return (
    <div className='pt-4'>
      <FifteenReCandleStickChart data={chartData}/>
    </div>
  ) 
};

export default FifteenCandleStickChart;
