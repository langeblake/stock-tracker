// components/StockList.jsx

import { useEffect, useState } from "react";

// interface StockListProps {
//     tickers: string[];
//   }

export const StockList= ({ tickers }) => {
    const [stocks, setStocks] = useState([]);
  
    useEffect(() => {
      // Mock function to simulate fetching data
      const fetchDataForTickers = async (tickers: string[]) => {
        // Replace this with the actual data fetching logic
        return tickers.map(ticker => ({
          ticker,
          price: Math.random() * 100,
          change: Math.random() * 10 - 5,
          open: Math.random() * 100,
          high: Math.random() * 100,
          low: Math.random() * 100,
          volume: Math.floor(Math.random() * 10000),
        }));
      };
  
      fetchDataForTickers(tickers).then(data => {
        setStocks(data);
      });
    }, [tickers]);
  
    return (
      <div className="stock-list">
        <div className="stock-list-header">
          {/* Header Row */}
        </div>
        {stocks.map(stock => (
          <div key={stock.ticker} className="stock-row">
            <div className="stock-cell">{stock.ticker}</div>
            <div className="stock-cell">{stock.price.toFixed(2)}</div>
            <div className="stock-cell">{stock.change.toFixed(2)}</div>
            <div className="stock-cell">{stock.open.toFixed(2)}</div>
            <div className="stock-cell">{stock.high.toFixed(2)}</div>
            <div className="stock-cell">{stock.low.toFixed(2)}</div>
            <div className="stock-cell">{stock.volume.toLocaleString()}</div>
          </div>
        ))}
      </div>
    );
  };
  