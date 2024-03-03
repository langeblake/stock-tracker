
import { IoIosStarOutline } from "react-icons/io";
import { format, utcToZonedTime } from "date-fns-tz";
import Link from "next/link";

// Adjust the type to match the expected shape of each ticker's data
interface TickerResponse {
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
  marketCap: number;
  sma200: number;
  sma50: number;
};



// Expect an array of TickerData objects

  
  const fetchTickerData = async (ticker: string): Promise<TickerResponse | null> => {
    const API_KEY = process.env.POLYGON_API_KEY;
    // Create a new Date object for the current date
    const timeZone = 'America/Los_Angeles';

    // Get the current date and time in UTC
    const nowUTC = new Date();

    // Convert UTC to the desired timezone
    const nowInPST = utcToZonedTime(nowUTC, timeZone);

    // Format the date in the desired format
    const formattedDate = format(nowInPST, 'yyyy-MM-dd');
      
      // Create a new Date object for seven days before the current date
      const sevenDaysBeforeDate = new Date();
      sevenDaysBeforeDate.setDate(nowUTC.getDate() - 7);
      // Format the seven days before date as "YYYY-MM-DD"
      const formattedSevenDaysBeforeDate = sevenDaysBeforeDate.toISOString().split('T')[0];
      
    
      try {
        const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://your-production-domain.com';
        const response = await fetch(`${baseUrl}/api/TrendingTickersSS?ticker=${ticker}`, {
          headers: {
              // Include the API key in the request headers
              // IMPORTANT: Securely manage and inject the API key in a production environment
              'X-API-Key': API_KEY!
          }
        })
        if (!response.ok) {
          throw new Error(`Failed to fetch data for ${ticker}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(`Error fetching data for ${ticker}:`, error);
        return null; // Returning null for failed requests
      }
}


  
  const tickers = ["TSLA", "AAPL", "AMZN", "GOOGL", "NFLX", 
  "META", "MSFT", "NVDA", "SQ", "PYPL", 
  "AMD", "SHOP", "CRM", "ZM", "ROKU", 
  "NIO", "PLTR", "SPCE", "SNAP", "UBER"]

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

const TickerList = async () => {
  const tickerDataPromises = tickers.map(fetchTickerData)
  const data = await Promise.all(tickerDataPromises)


    return (
      <div>
        <h1 className='font-bold text-2xl py-6'>Trending Tickers</h1>
        <div className="flex w-full justify-between dark:bg-zinc-900/70 bg-zinc-100">
            <div className="flex w-full">
              <div className="h-full w-full flex justify-start items-center py-3 "></div>
              <div className="h-full w-full flex justify-center items-center py-3 ">Ranking</div>
            </div> 
            <div className="h-full w-full flex justify-start items-center pl-2 py-3">Symbol</div>
            <div className="h-full w-full flex justify-end items-center py-3">Price</div>
            <div className="h-full w-full flex justify-end items-center py-3">Change</div>
            <div className="h-full w-full flex justify-end items-center py-3">% Change</div>
            <div className="h-full w-full flex justify-end items-center py-3">Volume</div>
            <div className="h-full w-full flex justify-end items-center py-3">Market Cap</div>
            <div className="h-full w-full flex justify-end items-center py-3 pr-4">50-Day SMA</div>
            <div className="h-full w-full flex justify-end items-center py-3 pr-4">200-Day SMA</div>
          </div>
        {data.map((stock, index) => (
          stock ? (
            <Link href={`/ticker/${stock.ticker.ticker}`} key={stock.ticker.ticker}>
          <div key={index} className={`border-y-[.5px] dark:border-zinc-700 border-zinc-300 flex w-full justify-between dark:hover:bg-zinc-900/80 hover:bg-zinc-100 hover:cursor-pointer`} >
            <div className="flex w-full">
              <div className={`h-full w-full flex justify-center items-center py-3 font-light`}><IoIosStarOutline size={15}/></div>
              <div className={`h-full w-full flex justify-center  items-center py-3 font-light`}>{index + 1}</div>
            </div>
            <div className={`h-full w-full flex items-center py-3 pl-2 font-semibold`}>{stock?.ticker.ticker}</div>
            <div className={`h-full w-full flex justify-end items-center py-3 font-light`}>${stock?.ticker.day.c}</div>
            <div className={`h-full w-full flex justify-end items-center py-3 font-light ${stock?.ticker.todaysChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {stock?.ticker.todaysChange?.toFixed(2) ?? 'N/A'}
            </div>

            <div className={`h-full w-full flex justify-end items-center py-3 font-light ${stock.ticker.todaysChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>{stock.ticker.todaysChangePerc.toFixed(2)}%</div>
            <div className={`h-full w-full flex justify-end items-center py-3 font-light`}>{formatNumber(stock.ticker.day.v)}</div>
            <div className={`h-full w-full flex justify-end items-center py-3 font-light`}>{formatNumber(stock.marketCap)}</div>
            <div className={`h-full w-full flex justify-end items-center py-3 pr-4`}>{stock.sma50.toFixed(2)}</div> 
            <div className={`h-full w-full flex justify-end items-center py-3 pr-4`}>{stock.sma200.toFixed(2)}</div> 
          </div>
          </Link>
        ) : (
          <div key={`no-data-${index}`}>No data...</div>
        )))}
      </div>
    )
        };

export default TickerList;

