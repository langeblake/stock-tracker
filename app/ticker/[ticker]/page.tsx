import Breadcrumb from "@/components/Common/Breadcrumb";
import Ticker from "./ticker";
import { redirect } from "next/navigation";
import StockAreaChart from "@/components/MarketChange-SS/Heatmap/StockAreaChart";


interface TickerData {
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

  interface PublisherData {
    logo_url: string;
    name: string;
  }
  
  interface TickerNewsData {
    title: string;
    author: string;
    published_utc: string;
    article_url: string;
    image_url: string;
    description: string;
    publisher: PublisherData;
  }

interface TickerResponse {
  ticker: TickerData;
  name: string | undefined;
  market_cap: number;
  list_date: string;
  $200sma_value: number;
  $50sma_value: number;
  fiscalPeriod: string;
  fiscalYear: string;
  netIncomLoss: number;
  grossProfit: number;
  earingsPerShare: number;
  revenues: number;
  tickerNews: TickerNewsData;
}


const fetchTickerData = async (ticker: string): Promise<TickerResponse | null> => {

  try {
    const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://your-production-domain.com';
    const response = await fetch(`${baseUrl}/api/tickerSS?ticker=${ticker}`, { cache: 'no-store' });
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

  if (!tickerData?.ticker) {
    redirect('/error')
  }

  return (
      <section className="container mb-20">
          {/* <Breadcrumb pageName={ticker} description={name} /> */}
          <Breadcrumb pageName={ticker} description={tickerData?.name}/>
          <Ticker data={tickerData}/>
          <StockAreaChart ticker={ticker} listDate={ticker?.list_date}/>
      </section>
  );
};

export default TickerPage;