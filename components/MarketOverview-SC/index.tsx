interface TickerDayData {
  c: number;
  h: number;
  l: number;
  o: number;
  v: number;
  vw: number;
}

interface TickerData {
  day: TickerDayData;
  ticker: string;
  todaysChange: number;
  todaysChangePerc: number;
}

interface TickersResponse {
  count: number;
  status: string;
  tickers: TickerData[];
}



const getAllTickerData = async (): Promise<TickersResponse> => {
  const API_KEY = process.env.NEXT_PUBLIC_POLYGON_API_KEY
  const res = await fetch(`https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers?apiKey=${API_KEY}`);


  return res.json();
}


const MarketOverviewSC = async () => {
  const data = await getAllTickerData()


  const tickerChunks: TickerData[][] = [];
  if (data && data.tickers) {
    // Sort the tickers by daily volume in descending order
    const top20Data = data.tickers
      .sort((a, b) => b.day.v - a.day.v) // Use 'day.v' for sorting by daily volume
      .slice(0, 20);

    // Chunk the sorted data into groups of 5
    const chunkSize = 5;
    for (let i = 0; i < top20Data.length; i += chunkSize) {
      tickerChunks.push(top20Data.slice(i, i + chunkSize));
    }
  }


  return (
    <section className="py-8">
      <div className="container mx-auto px-4 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {tickerChunks.map((chunk, index) => (
            <div key={index} className="shadow-lg rounded-lg p-4">
              <ul>
                {chunk.map((ticker) => (
                  <li key={ticker.ticker} className="flex justify-between items-center py-2">
                    <span className="font-medium">{ticker.ticker}</span>
                    <span className="text-gray-600">{ticker.day.v.toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketOverviewSC;

