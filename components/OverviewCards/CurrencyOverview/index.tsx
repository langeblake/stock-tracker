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

const fetchCurrencyData = async (ticker: string): Promise<CurrencyResponse | null> => {
    const API_KEY = process.env.POLYGON_API_KEY;
    // Create a new Date object for the current date
      const currentDate = new Date();
      // Format the current date as "YYYY-MM-DD"
      const formattedCurrentDate = currentDate.toISOString().split('T')[0];
      
      // Create a new Date object for seven days before the current date
      const sevenDaysBeforeDate = new Date();
      sevenDaysBeforeDate.setDate(currentDate.getDate() - 7);
      // Format the seven days before date as "YYYY-MM-DD"
      const formattedSevenDaysBeforeDate = sevenDaysBeforeDate.toISOString().split('T')[0];
      
      // Use the formatted dates in your API fetch URL
      const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${formattedSevenDaysBeforeDate}/${formattedCurrentDate}?sort=desc&limit=120&apiKey=${API_KEY}`;
      
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

const currencyTickers = ['C:USDEUR','C:USDKRW', 'C:USDGBP', 'C:USDJPY'];


const currencyNames = {
  'C:USDEUR': 'Euro',
  'C:USDKRW': 'Korean Won',
  'C:USDGBP': 'British Pound',
  'C:USDJPY': 'Japanese Yen',
  // Add more mappings as needed
}; 



const CurrencyOverview = async () => {
  const currencyDataPromises = currencyTickers.map(fetchCurrencyData);
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
          <h3 className="font-bold text-lg mb-10">US Dollar Exchange</h3>
          <div className="flex flex-col gap-10 \">
            {currencyTickers.map((ticker, idx) => {
              const currencyInfo = transformedData[ticker];
              return (
                <div key={idx} className='flex justify-between gap-4'>
                  <h1 className="w-2/4">{currencyNames[ticker]}</h1>
                  {currencyInfo ? (
                    <>
                      <div className={`w-1/4 font-light ${currencyInfo.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {currencyInfo.change.toFixed(2)}%
                      </div>
                      <div className="w-1/4 text-right">{currencyInfo.currentDay.c?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) ?? 'N/A'}</div>
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

export default CurrencyOverview;