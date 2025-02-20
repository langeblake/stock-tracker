import React, { Suspense } from "react";
import { NinetyReCandleStickChart } from "./90Rechart-CandleStick";

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

export const fetchAggregateCandlestickData = async (ticker: string, limit: number): Promise<AgreggateResponse | null> => {
  try {
    const apiKey = process.env.POLYGON_API_KEY;
    const currentDate = new Date().toISOString().split('T')[0]; 
    //Start date is hard-coded because of 5 year limit on historical data. Can use 'listDate' for more hist.data.
    const response = await fetch(`https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/2019-01-01/${currentDate}?adjusted=true&sort=desc&limit=${limit}&apiKey=${apiKey}`, { cache: 'no-store' });
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

const NinetyCandleStickChart = async ({ ticker, listDate }) => {
  const aggregateData = await fetchAggregateCandlestickData(ticker, 90);

  if (!aggregateData || !aggregateData.results) {
    console.error("Failed to fetch aggregate data or no results found");
    return null; // Return null or some error component
  }
  const chartData = aggregateData.results.map((d) => ({
    date: new Date(d.t).toISOString().substring(0, 10), // Format date as string for the name
    open_close: [d.o, d.c],
    low_high: [d.l, d.h],
  }));

  return (
    <div className="pt-4">
      <NinetyReCandleStickChart data={chartData} />
    </div>
  );
};

export default NinetyCandleStickChart;
