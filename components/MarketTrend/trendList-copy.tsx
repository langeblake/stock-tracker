import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { IoIosStarOutline } from "react-icons/io";

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

  const API_KEY = process.env.NEXT_PUBLIC_BABYQUANT_API_KEY

  const router = useRouter()

  const handleClick = (ticker: string) => {
    router.push(`/ticker/${ticker}`);
  
  }

  useEffect(() => {
    async function fetchTickersByVolume() {
      setLoading(true);
      try {
        // Fetch the top tickers by volume
        const volumeResponse = await fetch('/api/highest-volume', {
          headers: {
            'X-API-Key': API_KEY!,
          },
        });
        if (!volumeResponse.ok) {
          throw new Error('Failed to fetch top tickers by volume');
        }
        const volumeTickers = await volumeResponse.json();

        // Now fetch the trending tickers using these top volume tickers
        await fetchTrendingTickers(volumeTickers);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTickersByVolume();
  }, []);

  async function fetchTrendingTickers(tickerSymbols) {
    try {
      const tickersQueryString = tickerSymbols.join(',');
      const detailsResponse = await fetch(`/api/trendingTickers-copy?tickers=${tickersQueryString}`, {
        headers: {
          'X-API-Key': API_KEY!,
        },
      });
      if (!detailsResponse.ok) {
        throw new Error('Failed to fetch ticker details');
      }
      const detailsData: TickerData[] = await detailsResponse.json();
      setData(detailsData);
    } catch (error) {
      setError(error.message);
    }
  }

  if (loading) {
    return <Oval color="#4fa94d" height={80} width={80} />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Helper function to format large numbers
function formatNumber(value) {
  if (value >= 1e12) {
    return `${(value / 1e12).toFixed(2)}T`;
  } else if (value >= 1e9) {
    return `${(value / 1e9).toFixed(2)}B`;
  } else if (value >= 1e6) {
    return `${(value / 1e6).toFixed(2)}M`;
  } else {
    return `${value}`;
  }
}

// Use this function in your JSX to display formatted market cap



  if (data && data.length > 0) {
    return (
      <div>
        <h1 className='font-bold text-2xl py-6'>Trending Tickers</h1>
        <div className="flex w-full justify-between dark:bg-zinc-900/70 bg-zinc-100">
            <div className="flex w-full">
              <div className=" h-full w-full flex justify-start items-center py-3 "></div>
              <div className=" h-full w-full flex justify-center items-center py-3 ">Ranking</div>
            </div> 
            <div className=" h-full w-full flex justify-start items-center pl-2 py-3">Symbol</div>
            <div className=" h-full w-full flex justify-end items-center py-3">Price</div>
            <div className=" h-full w-full flex justify-end items-center py-3">Change</div>
            <div className=" h-full w-full flex justify-end items-center py-3">% Change</div>
            <div className=" h-full w-full flex justify-end items-center py-3">Volume</div>
            <div className=" h-full w-full flex justify-end items-center py-3">Market Cap</div>
            {/* <div className=" h-full w-full flex justify-end items-center py-3 pr-4">50-Day SMA</div> */}
            {/* <div className="border-[1px] h-full w-full flex justify-end items-center py-3">{stock.$200sma_values.toFixed(2)}</div> */}
          </div>
        {data.map((stock, index) => (
          <div key={index} onClick={() => handleClick(stock.ticker.ticker)} className={`border-y-[.5px] dark:border-zinc-700 border-zinc-300 flex w-full justify-between dark:hover:bg-zinc-900/80 hover:bg-zinc-100 hover:cursor-pointer`}>
            <div className="flex w-full">
              <div className={`h-full w-full flex justify-center items-center py-3 font-light`}><IoIosStarOutline size={15}/></div>
              <div className={`h-full w-full flex justify-center  items-center py-3 font-light`}>{index + 1}</div>
            </div>
            <div className={`h-full w-full flex items-center py-3 pl-2 font-semibold`}>{stock.ticker.ticker}</div>
            <div className={`h-full w-full flex justify-end items-center py-3 font-light`}>${stock.ticker.day.c}</div>
            <div className={`h-full w-full flex justify-end items-center py-3 font-light ${stock.ticker.todaysChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>{stock.ticker.todaysChange.toFixed(2)}</div>
            <div className={`h-full w-full flex justify-end items-center py-3 font-light ${stock.ticker.todaysChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>{stock.ticker.todaysChangePerc.toFixed(2)}%</div>
            <div className={`h-full w-full flex justify-end items-center py-3 font-light`}>{formatNumber(stock.ticker.day.v)}</div>
            <div className={`h-full w-full flex justify-end items-center py-3 font-light`}>{stock.market_cap !== undefined ? formatNumber(stock.market_cap) : 'NA'}</div>
            {/* <div className={`h-full w-full flex justify-end items-center py-3 pr-4`}>{stock.$50sma_values.toFixed(2)}</div> 
            <div className="border-[1px] h-full w-full flex justify-end items-center py-3">{stock.$200sma_values.toFixed(2)}</div>  */}
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