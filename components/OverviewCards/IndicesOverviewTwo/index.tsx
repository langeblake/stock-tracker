interface IndexDayData {
  c: number;
  h: number;
  l: number;
  o: number;
  t: number;
}


interface IndexResponse {
  count: number;
  queryCount: number;
  requestId: string;
  results: IndexDayData[];
  status: string;
  ticker: string;
}

const fetchIndexData = async (ticker: string): Promise<IndexResponse | null> => {
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
    const response = await fetch(url, { next: { revalidate: 360 } });
    if (!response.ok) {
      throw new Error(`Failed to fetch data for ${ticker}`);
    }
    const data = await response.json();
    return { ...data, ticker };
  } catch (error) {
    console.error(`Error fetching data for ${ticker}:`, error);
    return null; // Returning null for failed requests
  }
};


// const indicesTickers = ['I:COMP', 'I:DJA', 'I:SPX', 'I:RUT'];
const indicesTickers = ['I:COMP'];

function formatNumber(value) {
  if (value >= 0) {
    return `+${value.toFixed(2)}`;
  } else {
    return `-${value.toFixed(2)}`;
  }
}

const IndicesOverviewTwo = async () => {
  // Fetch data for each index ticker
  const indicesDataPromises = indicesTickers.map(fetchIndexData);
  const indicesData = await Promise.all(indicesDataPromises);

  return (
    <section className="flex flex-col w-full shadow-md rounded-lg p-4 border dark:border-zinc-700 dark:bg-zinc-900">
        <div>
          {indicesData.slice(0, 2).map((indexData, idx) => (
            // Check if indexData is not null or undefined before rendering the card
            indexData ? (
              <div key={idx} >
                <h3 className="font-bold text-lg mb-10">NASDAQ Composite</h3>
                <div className="flex flex-col gap-10">
                  {/* Use optional chaining (?.) and the nullish coalescing operator (??) to handle undefined values */}
                  <div className='flex justify-between gap-4'>
                    <h1 className="w-2/3">Price</h1>
                    <div className={`font-light ${indexData.results[0]?.c > indexData.results[1]?.c ? 'text-green-500' : 'text-red-500'}`}>{formatNumber(((indexData.results[0]?.c ?? 0) - (indexData.results[1]?.c ?? 0)))}</div>
                    <div>${indexData.results[0]?.c?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) ?? 'N/A'}</div>
                  </div>
                  <div className="flex justify-between">
                    <h1>Open</h1>
                    <div>${indexData.results[0]?.o?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })?? 'N/A'}</div>
                  </div>
                  <div className="flex justify-between">
                    <h1>High</h1>
                    <div>${indexData.results[0]?.h?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })?? 'N/A'}</div>
                  </div>
                  <div className="flex justify-between">
                    <h1>Low</h1>
                    <div>${indexData.results[0]?.l?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })?? 'N/A'}</div>
                  </div>
                </div>
              </div>
            ) : (
              // Optionally, render a placeholder or message indicating data could not be fetched
              <div key={idx} className="shadow-lg rounded-lg p-4 border dark:border-zinc-700 dark:bg-zinc-900">
                <p>Data not available</p>
              </div>
            )
          ))}
        </div>
    </section>
  );
};

export default IndicesOverviewTwo;
