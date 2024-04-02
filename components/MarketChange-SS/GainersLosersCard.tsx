// GainersLosers.js

import Link from "next/link";

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
  };

interface GainersLosersResponse {
    gainers: { tickers: TickerData[] };
    losers: { tickers: TickerData[] };
  }

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
    twoPrevDayTicker: TwoPrevDayTicker;
    threePrevDayTicker: ThreePrevDayTicker;
    status: string;
  };
  
  interface TwoPrevDayTicker {
    afterHours: number,
    close: number | null,
    from: Date,
    high: number,
    low: number,
    open: number,
    preMarket: number,
    status: string,
    symbol: string,
    volume: number
  }
  interface ThreePrevDayTicker {
    afterHours: number,
    close: number | null,
    from: Date,
    high: number,
    low: number,
    open: number,
    preMarket: number,
    status: string,
    symbol: string,
    volume: number
  }
  

  const fetchTickerData = async (ticker: string): Promise<TickerResponse | null> => {
    const API_KEY = process.env.POLYGON_API_KEY;
    
    try {
      const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://lumiere-pied.vercel.app';
      const response = await fetch(`https://lumiere-pied.vercel.app/api/TrendingTickersSS?ticker=${ticker}`, {
        headers: {
            // Include the API key in the request headers
            // IMPORTANT: Securely manage and inject the API key in a production environment
            'x-api-key': API_KEY!
        }
      },)
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

// 'FB' is a a test for tickers that don't return data; status !== "OK"
const tickers = [
  'AAPL', 'MSFT', 'AMZN', 'GOOGL', 'META', 'TSLA', 'AVAV', 'JPM', 'V', 'JNJ',
  'WMT', 'PG', 'UNH', 'MA', 'NVDA', 'HD', 'DIS', 'BAC', 'VZ', 'ADBE',
  'CMCSA', 'KO', 'NFLX', 'PFE', 'T', 'PYPL', 'INTC', 'CSCO', 'PEP', 'XOM',
  'COST', 'CVX', 'ABT', 'ACN', 'CRM', 'AVGO', 'ABBV', 'WFC', 'MRK', 'TMO',
  'MCD', 'MDT', 'NKE', 'DHR', 'TXN', 'QCOM', 'HON', 'LIN', 'BMY', 'UNP',
  'ORCL', 'LLY', 'PM', 'UPS', 'SCHW', 'LOW', 'C', 'BA', 'IBM', 'SBUX',
  'AMT', 'NEE', 'AMD', 'NOW', 'BLK', 'AMGN', 'GE', 'CAT', 'MMM', 'GS',
  'MS', 'INTU', 'DE', 'CVS', 'RTX', 'SPGI', 'TGT', 'ISRG', 'BKNG', 'LMT',
  'SYK', 'MU', 'ZTS', 'GILD', 'FIS', 'MO', 'MDLZ', 'GM', 'TJX', 'BDX',
  'CSX', 'CI', 'AXP', 'SO', 'ADP', 'CL', 'COP', 'USB', 'PNC', 'EL', 'FB'
]



const fetchGainersLosersData = async (): Promise<GainersLosersResponse | null> => {
    try {
      // const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://localhost:3000';
      const response = await fetch(`https://lumiere-pied.vercel.app/api/gainers-losers`, { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`Failed to fetch data Gainers-Losers`);
      }
      const data = await response.json();
      return data; // Assuming the API returns the data structured as expected.
    } catch (error) {
      console.error(`Error fetching data for Gainers-Losers:`, error);
      return null;
    }
  };

const TickerCard = ({ ticker }) => {
    const changePercClass = ticker.todaysChangePerc >= 0 ? 'text-green-500' : 'text-red-500';

    return (
        <div className='flex p-6 justify-between'>
            <h3 className='font-semibold'>{ticker.ticker}</h3>
            <div className='flex flex-col gap-4'>
                <p className="pl-2 text-right">${ticker.min.c.toFixed(2)}</p>
                <p className={changePercClass}>{ticker.todaysChangePerc.toFixed(2)}%</p>
            </div>
        </div>
    );
};

const StaticTickerCard = ({ ticker }) => {
  // Recalculate or use the existing todaysChangePerc
  const calculatedChangePerc = ticker.ticker.todaysChangePerc !== 0
      ? ticker.ticker.todaysChangePerc
      : ((((ticker.twoPrevDayTicker.close ?? 0) - (ticker.threePrevDayTicker.close ?? 0)) / (ticker.threePrevDayTicker.close ?? 0)) * 100);

  // Determine the class based on the calculated or existing todaysChangePerc
  const changePercClass = calculatedChangePerc >= 0 ? 'text-green-500' : 'text-red-500';

  return (
      <div className='flex p-3 sm:p-6 justify-between'>
          <h3 className='font-semibold'>{ticker.ticker.ticker}</h3>
          <div className='flex flex-col gap-4'>
              <p className="pl-2 text-right">${
                ticker.ticker.min.c !== 0 ?
                ticker.ticker.min.c.toFixed(2) :
                ticker.twoPrevDayTicker.close.toFixed(2)
                }</p>
              <p className={`${changePercClass} pl-6`}>{
                calculatedChangePerc.toFixed(2)
                }%</p>
          </div>
      </div>
  );
};


const GainersLosers = async () => {
    const tickerDataPromises = tickers.map(fetchTickerData);
    const tickerData = await Promise.all(tickerDataPromises);
    const dataNotNull = tickerData.filter((item): item is TickerResponse => item !== null && item.status === "OK");
    const sortedData = dataNotNull.sort((a, b) => {
      // Calculate or use existing todaysChangePerc for 'a'
      const aChangePerc = a.ticker.todaysChangePerc !== 0 && a.ticker.todaysChangePerc != null
        ? a.ticker.todaysChangePerc
        : (((a.ticker.prevDay.c ?? 0) - (a.twoPrevDayTicker.close ?? 0)) / (a.twoPrevDayTicker.close ?? 0)) * 100;
      
      // Calculate or use existing todaysChangePerc for 'b'
      const bChangePerc = b.ticker.todaysChangePerc !== 0 && b.ticker.todaysChangePerc != null
        ? b.ticker.todaysChangePerc
        : (((b.ticker.prevDay.c ?? 0) - (b.twoPrevDayTicker.close ?? 0)) / (b.twoPrevDayTicker.close ?? 0)) * 100;
      
      // Perform sort based on calculated or existing todaysChangePerc values
      return bChangePerc - aChangePerc;
    });
    


    // Setting the top 4 gainers and losers
    const staticGainers = sortedData.slice(0, 4);
    const staticLosers = sortedData.slice(-4).reverse(); // Assuming you want the lowest negative change percentages


    const data = await fetchGainersLosersData();

    if (!data) {
        return <div></div>; // Adjust based on your loading state handling
      }
  
    
    // Function to filter and sort tickers
    const processTickers = (tickers) => {
        return tickers
            .filter(ticker => Math.abs(ticker.todaysChangePerc) <= 1000 && ticker.ticker.length <= 5) // Filter out tickers with change percentage over 1000%
            .sort((a, b) => Math.abs(b.todaysChangePerc) - Math.abs(a.todaysChangePerc)) // Sort by absolute change percentage
            .slice(0, 4); // Limit to top 4
    };

    // Processed gainers and losers
    const gainers = processTickers(data.gainers.tickers);
    const losers = processTickers(data.losers.tickers);

    return (
        <div>
            <div className='flex gap-5'>
              <div className='flex flex-col gap-4 w-1/2'>
                {gainers.length > 0 ? (
                  gainers.map((ticker, index) => (
                    <Link key={index} href={`/ticker/${ticker.ticker}`}>
                      <div className='border rounded-lg dark:border-zinc-700 dark:bg-zinc-900/70  dark:hover:bg-zinc-900 hover:bg-zinc-50 bg-white hover:cursor-pointer'>
                        <TickerCard ticker={ticker} />
                      </div>
                    </Link>
                  ))
                ) : (
                  staticGainers.map((ticker, index) => (
                    <Link key={index} href={`/ticker/${ticker.ticker.ticker}`}>
                      <div className='border rounded-lg dark:border-zinc-700 dark:bg-zinc-900/70  dark:hover:bg-zinc-900 hover:bg-zinc-50 bg-white hover:cursor-pointer'>
                        <StaticTickerCard ticker={ticker} />
                      </div>
                    </Link>
                  ))
                )}
              </div>

              <div className='flex flex-col gap-4 w-1/2'>
                {losers.length > 0 ? (
                  losers.map((ticker, index) => (
                    <Link key={index} href={`/ticker/${ticker.ticker}`}>
                      <div className='border rounded-lg dark:border-zinc-700 dark:bg-zinc-900/70  dark:hover:bg-zinc-900 hover:bg-zinc-50 bg-white hover:cursor-pointer'>
                        <TickerCard ticker={ticker} />
                      </div>
                    </Link>
                  ))
                ) : (
                  staticLosers.map((ticker, index) => (
                    <Link key={index} href={`/ticker/${ticker.ticker.ticker}`}>
                      <div className='border rounded-lg dark:border-zinc-700 dark:bg-zinc-900/70  dark:hover:bg-zinc-900 hover:bg-zinc-50 bg-white hover:cursor-pointer'>
                        <StaticTickerCard ticker={ticker} />
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
        </div>
    );
};

export default GainersLosers;