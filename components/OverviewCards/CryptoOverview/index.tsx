import { format, utcToZonedTime } from "date-fns-tz";

interface CurrencyDayData {
    v: number;
    vw: number;
    o: number;
    c: number;
    h: number;
    l: number;
    t: number;
    n: number;
}

interface CurrencyResponse {
    ticker: string;
    queryCount: number;
    resultsCount: number;
    results: CurrencyDayData[];
    status: string;
  }

const fetchCryptoData = async (ticker: string): Promise<CurrencyResponse | null> => {
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
    
    // Use the formatted dates in your API fetch URL
    const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${formattedSevenDaysBeforeDate}/${formattedDate}?sort=desc&limit=120&apiKey=${API_KEY}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch data for ${ticker}`);
      }
      const data = await response.json();
      return { ...data, ticker };
    } catch (error) {
      console.error(`Error fetching data for ${ticker}:`, error);
      return null; // Returning null for failed requests
    }
}


const currencyTickers = ['X:BTCUSD', 'X:ETHUSD', 'X:ADAUSD', 'X:SOLUSD'];


const currencyNames = {
  'X:BTCUSD': 'Bitcoin',
  'X:ETHUSD': 'Etherium',
  'X:ADAUSD': 'Cardano',
  'X:SOLUSD': 'Solana',
  // Add more mappings as needed
}; 



const CryptoOverview = async () => {
  const currencyDataPromises = currencyTickers.map(fetchCryptoData);
  const currencyDataResults = await Promise.all(currencyDataPromises);


  // Transform the results into a more convenient structure, ensuring each currency has two days of data
  const transformedData = currencyDataResults.reduce((acc, currencyData) => {
    if (currencyData && currencyData.results.length >= 2) {
      const currentDay = currencyData.results[0];
      const previousDay = currencyData.results[1];
      const change = ((currentDay.c - previousDay.c) / previousDay.c) * 100; // Calculate percentage change
      acc[currencyData.ticker] = { currentDay, previousDay, change };
    }
    return acc;
  }, {});

  // Example of how you might want to display the data
  return (
    <section className="container w-full shadow-md rounded-lg p-4 border dark:border-zinc-700 dark:bg-zinc-900">
      <div>
          <h3 className="font-bold text-lg mb-10">Cryptocurrency</h3>
          <div className="flex flex-col gap-10 ">
            {currencyTickers.map((ticker, idx) => {
              const currencyInfo = transformedData[ticker];
              return (
                <div key={idx} className='flex justify-between gap-4'>
                  <h1 className="w-3/6">{currencyNames[ticker]}</h1>
                  {currencyInfo ? (
                    <>
                      <div className={`w-1/6 text-left font-light ${currencyInfo.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {currencyInfo.change.toFixed(2)}%
                      </div>
                      <div className="w-2/6 text-right">${currencyInfo.currentDay.c?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) ?? 'N/A'}</div>
                    </>
                  ) : (
                    <div>Data not available</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
    </section>
  );
}

export default CryptoOverview;