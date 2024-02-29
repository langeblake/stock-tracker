import React from 'react';
import D3AreaChart from './D3TreeMaps/D3AreaChart';

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
      const response = await fetch(`https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2022-01-09/2024-01-09?adjusted=true&sort=asc&limit=120&apiKey=${apiKey}`, { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`Failed to fetch data for ${ticker}`);
      } 
      const data = await response.json();
      return data; // Assuming the API returns the data structured as expected.
    } catch (error) {
      console.error(`Error fetching data for ${ticker}:`, error);
      return null;
    }
  };
  


const StockAreaChart = async ({ ticker, listDate }) => {
    const aggregateData = await fetchAggregateData(ticker, listDate);

    if (!aggregateData || !aggregateData.results) {
        console.error('Failed to fetch aggregate data or no results found');
        return null; // Return null or some error component
    }
    const chartData = aggregateData.results.map(d => ({
        date: new Date(d.t), // Use `d.t` for the date, assuming `t` represents a timestamp
        value: d.c, // Use `d.c` for the closing price
    }));

  return <D3AreaChart data={chartData} />;
};

export default StockAreaChart;
