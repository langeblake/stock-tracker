"use client"

import React, { useEffect, useState } from 'react';
import { restClient } from '@polygon.io/client-js';
import { OverviewCard } from './overviewCard';

const API_KEY = process.env.NEXT_PUBLIC_POLYGON_API_KEY; // Ensure this is set in your .env.local and .env.production

const stockTickers = ['AAPL']; // Replace with the actual tickers you're interested in

const TopStocks: React.FC = () => {
  const [stockData, setStockData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    const rest = restClient(API_KEY);

    const fetchDataForTicker = async (ticker: string) => {
      try {
        const multiplier = 1;
        const timespan = 'day';
        const from = '2024-01-19';
        const to = '2024-01-20';

        const response = await rest.stocks.aggregates(
          ticker,
          multiplier,
          timespan,
          from,
          to
        );

        return { ticker, data: response.results };
      } catch (err) {
        throw err;
      }
    };

    const fetchAllData = async () => {
      try {
        const allData = await Promise.all(
          stockTickers.map((ticker) => fetchDataForTicker(ticker))
        );

        setStockData(allData);
        console.log(allData)
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;

  return (
    <div className="stocks-container">
      {stockData.map((stock: any, index: number) => (
        <div className="stock-card border-2 rounded-lg" key={index}>
          <h3>{stock.ticker}</h3>
          {stock.data.map((bar: any, barIndex: number) => (
            <div key={barIndex}>
              <p>Close: {bar.c}</p>
              <p>High: {bar.h}</p>
              <p>Low: {bar.l}</p>
              <p>Open: {bar.o}</p>
              <p>Volume: {bar.v}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TopStocks;
