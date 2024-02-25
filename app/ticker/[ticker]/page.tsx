import Breadcrumb from "@/components/Common/Breadcrumb";
import Ticker from "./ticker";


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

type TickerResponse = {
  ticker: TickerData;
  name: string;
  market_cap: number;
  $200sma_value: number;
  $50sma_value: number;
}


const fetchTickerData = async (ticker: string): Promise<TickerResponse | null> => {
  try {
    const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://your-production-domain.com';
    const response = await fetch(`${baseUrl}/api/tickerSS?ticker=${ticker}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch data for ${ticker}`);
    }
    const data = await response.json();
    return data; // Assuming the API returns the data structured as expected.
  } catch (error) {
    console.error(`Error fetching data for ${ticker}:`, error);
    return null;
  }
};


const TickerPage = async ({ params }) => {
  const { ticker } = params;
  const tickerData = await fetchTickerData(ticker);


  return (
      <>
          {/* <Breadcrumb pageName={ticker} description={name} /> */}
          <Breadcrumb pageName={ticker} description={tickerData?.name}/>
          <div className="container mb-20 ">
              <Ticker data={tickerData}/>
          </div>
      </>
  );
};

export default TickerPage;