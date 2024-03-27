import { redirect } from "next/navigation";
import { Suspense } from "react";

import Breadcrumb from "@/components/Common/Breadcrumb";
import Ticker from "../../../components/Ticker/ticker";
import ChartSelection from "@/components/Ticker/ChartSelection/ChartSelection";

import StockAreaChart from "@/components/Ticker/AreaChart/StockAreaChart";
import NinetyCandleStickChart from "@/components/Ticker/CandleStickChart/90CandleStickChart";
import ThirtyCandleStickChart from "@/components/Ticker/CandleStickChart/30CandleStickChart";
import SevenCandleStickChart from "@/components/Ticker/CandleStickChart/15CandleStickChart";
import YearStockAreaChart from "@/components/Ticker/AreaChart/YearStockAreaChart";
import LoadingTickerCharts from "@/components/Loading/LoadingTickerCharts";
// import MonthStockAreaChart from "@/components/Ticker/AreaChart/MonthStockAreaChart";


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
    const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await fetch(`/api/tickerSS?ticker=${ticker}`, { cache: 'no-store' });
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
          <ChartSelection 
            StockAreaChart={<StockAreaChart ticker={ticker} listDate={tickerData?.list_date}/>}
            YearStockAreaChart={<YearStockAreaChart ticker={ticker} listDate={tickerData?.list_date}/>}
            // MonthStockAreaChart={<MonthStockAreaChart ticker={ticker} listDate={tickerData?.list_date}/>}
            NinetyCandleStickChart={<NinetyCandleStickChart ticker={ticker} listDate={tickerData?.list_date}/>}
            ThirtyCandleStickChart={<ThirtyCandleStickChart ticker={ticker} listDate={tickerData?.list_date}/>}
            SevenCandleStickChart={<SevenCandleStickChart ticker={ticker} listDate={tickerData?.list_date}/>}
          />
          {/* <Suspense fallback={<div className="pt-20">Chart Loading...</div>}>
            <StockAreaChart ticker={ticker} listDate={tickerData?.list_date}/>
          </Suspense>
           <StockCandleStickChart ticker={ticker} listDate={tickerData?.list_date} /> */}
           
      </section>
  );
};

export default TickerPage;