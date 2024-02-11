import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";

// Adjust the type to match the expected shape of each ticker's data
type TickerData = {
  ticker: {
    ticker: string;
    todaysChangePerc: number;
    todaysChange: number;
    updated: number;
    day: {
      o: number;
      h: number;
      l: number;
      c: number;
      v: number;
      vw: number;
    };
    min: {
      av: number;
      t: number;
      n: number;
      o: number;
      h: number;
      l: number;
      c: number;
      v: number;
      vw: number;
    };
    prevDay: {
      o: number;
      h: number;
      l: number;
      c: number;
      v: number;
      vw: number;
    };
  };
  name: string;
  market_cap: number;
  $200sma_values: number;
  $50sma_values: number;
};


// This component calls an internal API that fetches data from multiple Polygon APIs (pages/api/trendingTickers)
// It still needs dynamic data gor the ticker array. Currently uses static data for testing. 
// Needs data manipulation for the JSX items (e.g Change %)

// Expect an array of TickerData objects
const TrendList: React.FC = () => {
  const [data, setData] = useState<TickerData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTrendingTickers() {
      setLoading(true);
      try {
        //Need to implement a way to generate an array of trending tickers.
        const tickers = [    "TSLA", "AAPL", "AMZN", "GOOGL", "NFLX", 
        "META", "MSFT", "NVDA", "SQ", "PYPL", 
        "AMD", "SHOP", "CRM", "ZM", "ROKU", 
        "NIO", "PLTR", "SPCE", "SNAP", "UBER"].join(',');

        // This API endpoint needs to be secure. Move to server-side!
        const response = await fetch(`/api/trendingTickers?tickers=${tickers}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Use type assertion to expect an array of TickerData objects
        const jsonData: TickerData[] = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    }

    fetchTrendingTickers();
  }, []);

  if (loading) {
    return <Oval color="#4fa94d" height={80} width={80} />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Helper function to format large numbers
function formatMarketCap(value) {
  if (value >= 1e12) {
    return `${(value / 1e12).toFixed(2)}T`;
  } else if (value >= 1e9) {
    return `${(value / 1e9).toFixed(2)}B`;
  } else if (value >= 1e6) {
    return `${(value / 1e6).toFixed(2)}M`;
  } else {
    return `${value.toFixed(2)}`;
  }
}

// Use this function in your JSX to display formatted market cap



  if (data && data.length > 0) {
    return (
      <div>
        <h1 className='font-bold text-2xl py-6'>Trending Tickers</h1>
        {data.map((stock, index) => (
          <div key={index} className="border flex w-full justify-between py-2">
            <div className="border h-8 w-20 flex items-center">{stock.ticker.ticker}</div>
            <div className="border h-8 w-20 flex justify-end items-center">{stock.ticker.day.c}</div>
            <div className="border h-8 w-20 flex justify-end items-center">{formatMarketCap(stock.market_cap)}</div>
            <div className="border h-8 w-20 flex justify-end items-center">{stock.$50sma_values.toFixed(2)}</div>
            <div className="border h-8 w-20 flex justify-end items-center">{stock.$200sma_values.toFixed(2)}</div>
          </div>
        ))}
      </div>
    );
  } else {
    return <div>No data found</div>;
  }
};

export default TrendList;


// Simulated fetch function, replace this with your actual API call
async function fetchTickers(): Promise<TickerData[]> {
  // This is where you would fetch data from an API
  // For demonstration, returning a static subset of your provided data
  return []; // Return your actual fetched data here
}

