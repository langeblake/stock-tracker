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


const fetchGainersLosersData = async (): Promise<GainersLosersResponse | null> => {
    try {
      const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://your-production-domain.com';
      const response = await fetch(`${baseUrl}/api/gainers-losers`, { cache: 'no-store' });
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
                <p>${ticker.min.c.toFixed(2)}</p>
                <p className={changePercClass}>{ticker.todaysChangePerc.toFixed(2)}%</p>
            </div>
        </div>
    );
};

const GainersLosers = async () => {
    const data = await fetchGainersLosersData();

    if (!data) {
        return <div></div>; // Adjust based on your loading state handling
      }
  
    
    // Function to filter and sort tickers
    const processTickers = (tickers) => {
        return tickers
            .filter(ticker => Math.abs(ticker.todaysChangePerc) <= 1000) // Filter out tickers with change percentage over 1000%
            .sort((a, b) => Math.abs(b.todaysChangePerc) - Math.abs(a.todaysChangePerc)) // Sort by absolute change percentage
            .slice(0, 4); // Limit to top 4
    };

    // Processed gainers and losers
    const gainers = processTickers(data.gainers.tickers);
    const losers = processTickers(data.losers.tickers);


    return (
        <div>
            <h1 className='font-bold text-2xl py-6'>Gainers & Losers</h1>
            <div className='flex gap-5'>
                <div className='flex flex-col gap-4 w-1/2'>
                    {gainers.map((ticker, index) => (
                        <Link key={index} href={`/ticker/${ticker.ticker}`}>
                            <div className='border rounded-lg dark:border-zinc-700 dark:bg-zinc-900/70  dark:hover:bg-zinc-900 hover:bg-zinc-50 bg-white hover:cursor-pointer'>
                                <TickerCard ticker={ticker} />
                            </div>
                        </Link>
                    ))}
                </div>
                <div className='flex flex-col gap-4 w-1/2'>
                    {losers.map((ticker, index) => (
                        <Link key={index} href={`/ticker/${ticker.ticker}`}>
                            <div className='border rounded-lg dark:border-zinc-700 dark:bg-zinc-900/70  dark:hover:bg-zinc-900 hover:bg-zinc-50 bg-white hover:cursor-pointer'>
                                <TickerCard ticker={ticker} />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GainersLosers;