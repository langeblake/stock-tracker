
import { format, utcToZonedTime } from "date-fns-tz";
import { Input } from "@/components/ui/input"
import { TickerList } from "./TickerList";
import { FiSearch } from "react-icons/fi";
import TickerTable from "./TickerTable/_TickerTable";
import { DataTable } from "./TickerTable/data-table";
import { columns } from "./TickerTable/columns";

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
  status: string;
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


// 'FB' is a a test for tickers that don't return data; status !== "OK"
const tickers = [
  'AAPL', 'MSFT', 'AMZN', 'GOOGL', 'META', 'TSLA', 'BRK.A', 'JPM', 'V', 'JNJ',
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

const TrendList = async () => {
  const tickerDataPromises = tickers.map(fetchTickerData)
  const tickerData = await Promise.all(tickerDataPromises)
  const dataNotNull = tickerData.filter((item): item is TickerResponse => item !== null && item.status === "OK" );
  const data = dataNotNull.sort((a, b) => b.marketCap - a.marketCap);


  return (
    <section >
      <div className="flex items-center">
        <h1 className='w-2/5 font-bold text-2xl py-6'>Trending Tickers</h1>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="dark:text-gray-400" />
          </span>
          <Input
            className="pl-10 bg-zinc-100 dark:bg-black w-64 focus:border-none"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        {/* <TickerList data={data} /> */}
        <DataTable columns={columns} data={data}/>
      </div>
    </section>
  )
};

export default TrendList;

