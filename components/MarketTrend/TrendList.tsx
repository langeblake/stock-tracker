
import { format, utcToZonedTime } from "date-fns-tz";
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
        const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : process.env.NEXT_PUBLIC_API_BASE_URL;
        const response = await fetch(`https://lumiere-pied.vercel.app/api/TrendingTickersSS?ticker=${ticker}`, {
          headers: {
              // Include the API key in the request headers
              // IMPORTANT: Securely manage and inject the API key in a production environment
              'X-API-Key': API_KEY!
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


const formatNumberString = (value: number | undefined) => {
  if (value !== undefined) {
    return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  return ""; // Or any default value you prefer if the value is undefined
}

const TrendList = async ({ query }: { query: string | undefined }) => {
  let tableData: any[] = [];

  if (query === undefined || null ) {
    // Static ticker array data
    const tickerDataPromises = tickers.map(fetchTickerData);
    const tickerData = await Promise.all(tickerDataPromises);
    const dataNotNull = tickerData.filter((item): item is TickerResponse => item !== null && item.status === "OK");
    const data = dataNotNull.sort((a, b) => b.ticker.day.v - a.ticker.day.v);

    console.log(data)

    tableData = data.map(stock => ({
      symbol: stock.ticker.ticker,
      price: stock.ticker.day.c !== 0 ? stock.ticker.day.c : stock.ticker.prevDay.c,
      change: stock.ticker.todaysChange ? 
      stock.ticker.todaysChange.toFixed(2) : 
      ((stock.twoPrevDayTicker.close ?? 0) - (stock.threePrevDayTicker.close ?? 0)).toFixed(2),  
      todaysChangePerc: stock.ticker.todaysChangePerc ? stock.ticker.todaysChangePerc.toFixed(2) : ((((stock.twoPrevDayTicker.close ?? 0) - (stock.threePrevDayTicker.close ?? 0)) / (stock.threePrevDayTicker.close ?? 0)) * 100).toFixed(2),
      volume: stock.ticker.day.v !== 0 ? stock.ticker.day.v : stock.ticker.prevDay.v,
      marketCap: stock.marketCap.toFixed(2),
      sma50: formatNumberString(stock.sma50),
      sma200: formatNumberString(stock.sma200),
      prevClose: stock.twoPrevDayTicker.close,  
      twoPrevClose: stock.threePrevDayTicker.close
    }));
  } else {
    const queryTickers = query.split(",");
    const queryTickersPromises = queryTickers.map(fetchTickerData)
    const queryTickersData = await Promise.all(queryTickersPromises);
    const queryTickersDataNotNull = queryTickersData.filter((item): item is TickerResponse => item !== null && item.status === "OK");
    const data = queryTickersDataNotNull;
    if (data) {
      // Check if all necessary properties exist in the response data
      // if (queryTickerData.ticker && queryTickerData.ticker.ticker &&
      //     queryTickerData.ticker.day && queryTickerData.ticker.day.c &&
      //     queryTickerData.ticker.prevDay && queryTickerData.ticker.prevDay.c &&
      //     queryTickerData.ticker.todaysChange && queryTickerData.ticker.todaysChangePerc &&
      //     queryTickerData.ticker.day.v && queryTickerData.marketCap &&
      //     queryTickerData.sma50 && queryTickerData.sma200) {
        // Manipulate data based on the query
        tableData = data.map(stock => ({
          symbol: stock.ticker.ticker,
          price: stock.ticker.day.c !== 0 ? stock.ticker.day.c : stock.ticker.prevDay.c,
          change: stock.ticker.todaysChange.toFixed(2),
          todaysChangePerc: stock.ticker.todaysChangePerc.toFixed(2),
          volume: stock.ticker.day.v !== 0 ? stock.ticker.day.v : stock.ticker.prevDay.v,
          marketCap: stock.marketCap?.toFixed(2),
          sma50: formatNumberString(stock.sma50),
          sma200: formatNumberString(stock.sma200),
          prevClose: stock.twoPrevDayTicker.close,  
          twoPrevClose: stock.threePrevDayTicker.close
        }));
      // } else {
      //   console.error("Incomplete data received for the query:", query);
      //   // Handle the case where necessary properties are missing from the response data
      //   // You can set a default value or display an error message
      // }
    } else {
      console.error("Failed to fetch data for the query:", query);
      // Handle the case where the query response is not OK
      // You can set a default value or display an error message
    }
  }

  return (
    <section id="tickerListSection" className="">
      <div className="">
        <DataTable columns={columns} data={tableData}/>
      </div>
    </section>
  );
};

export default TrendList;

