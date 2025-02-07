import Breadcrumb from "@/components/Common/Breadcrumb";
import Ticker from "../../../components/Ticker/ticker";
import ChartSelection from "@/components/Ticker/ChartSelection/ChartSelection";
import StockAreaChart from "@/components/Ticker/AreaChart/StockAreaChart";
import NinetyCandleStickChart from "@/components/Ticker/CandleStickChart/90CandleStickChart";
import ThirtyCandleStickChart from "@/components/Ticker/CandleStickChart/30CandleStickChart";
import SevenCandleStickChart from "@/components/Ticker/CandleStickChart/15CandleStickChart";
import YearStockAreaChart from "@/components/Ticker/AreaChart/YearStockAreaChart";
import path from 'path';
import fs from 'fs';

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

const getTickerData = async (ticker: string): Promise<TickerData | null> => {
  const filePath = path.join(process.cwd(), 'data/staticPolygonData/allTickersData.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const allTickersData: TickerData[] = JSON.parse(fileContents);

  const tickerData = allTickersData.find(data => data.ticker.ticker === ticker);

  return tickerData || null;
};

const TickerPage = async ({ params }: { params: { ticker: string } }) => {
  const { ticker } = params;
  const tickerData = await getTickerData(ticker);
  
  if (!tickerData) {
    return <div>Not Found</div>;
  }
  
  const tickerSymbol = tickerData.ticker.ticker;

  return (
    <section className="container mb-20">
      <Breadcrumb pageName={ticker} description={tickerData?.name} />
      <Ticker data={tickerData} />
      <ChartSelection
        StockAreaChart={
          <StockAreaChart ticker={tickerSymbol} listDate={tickerData?.list_date} />
        }
        YearStockAreaChart={
          <YearStockAreaChart
            ticker={tickerSymbol}
            listDate={tickerData?.list_date}
          />
        }
        NinetyCandleStickChart={
          <NinetyCandleStickChart
            ticker={tickerSymbol}
            listDate={tickerData?.list_date}
          />
        }
        ThirtyCandleStickChart={
          <ThirtyCandleStickChart
            ticker={tickerSymbol}
            listDate={tickerData?.list_date}
          />
        }
        SevenCandleStickChart={
          <SevenCandleStickChart
            ticker={tickerSymbol}
            listDate={tickerData?.list_date}
          />
        }
      />
      {/* <Suspense fallback={<div className="pt-20">Chart Loading...</div>}>
            <StockAreaChart ticker={ticker} listDate={tickerData?.list_date}/>
          </Suspense>
           <StockCandleStickChart ticker={ticker} listDate={tickerData?.list_date} /> */}
    </section>
  );
};

export default TickerPage;
