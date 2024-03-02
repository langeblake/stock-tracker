import React, { Suspense } from 'react';
import { ReCandleStickChart } from './Rechart-CandleStick';

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

interface AgreggateResponse {
    ticker: string;
    resultsCount: number;
    results: TickerData[];
}

const fetchAggregateData = async (ticker: string, listDate: string): Promise<AgreggateResponse | null> => {
    try {
      const apiKey = process.env.POLYGON_API_KEY;
      const currentDate = new Date().toISOString().split('T')[0]; 
      //Start date is hard-coded because of 5 year limit on historical data. Can use 'listDate' for more hist.data.
      const response = await fetch(`https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/2019-01-01/${currentDate}?adjusted=true&sort=desc&limit=65&apiKey=${apiKey}`, { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`Failed to fetch aggregate data for TICKER`);
      } 
      const data = await response.json();
      return data; // Assuming the API returns the data structured as expected.
    } catch (error) {
      console.error(`Error fetching data for TICKER:`, error);
      return null;
    }
  };
  


const StockCandleStickChart = async ({ ticker, listDate }) => {
  const aggregateData = await fetchAggregateData(ticker, listDate);

  if (!aggregateData || !aggregateData.results) {
      console.error('Failed to fetch aggregate data or no results found');
      return null; // Return null or some error component
  }
const chartData = aggregateData.results
  .map(d => ({
    date: new Date(d.t).toISOString().substring(0, 10), // Format date as string for the name
    open_close: [d.o, d.c],
    close_high: [d.l, d.h]
  }))

  const data = [
    {
      date: "2024-05-01",
      open_close: [10, 15], // Open at 10, close at 15
      close_high: [9, 16],  // Low at 9, high at 16
    },
    {
      date: "2024-05-02",
      open_close: [14, 13], // Open at 14, close at 13 (down day)
      close_high: [12, 15], // Low at 12, high at 15
    },
    {
      date: "2024-05-03",
      open_close: [13, 18], // Open at 13, close at 18
      close_high: [5, 25], // Low at 12, high at 19
    },
    {
      date: "2024-05-04",
      open_close: [17, 16], // Open at 17, close at 16 (down day)
      close_high: [15, 18], // Low at 15, high at 18
    },
    {
      date: "2024-05-05",
      open_close: [15, 30], // Open at 15, close at 15 (flat day)
      close_high: [14, 40], // Low at 14, high at 16
    },
  ];
  return (
    <div>
      <ReCandleStickChart data={chartData}/>
    </div>
  ) 
};

export default StockCandleStickChart;
