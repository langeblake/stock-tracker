import { DataTable } from "./TickerTable/data-table";
import { columns } from "./TickerTable/columns";
import { tickers } from "data/tickers-static.js";
import { TickerResponse } from "@/types/stockDataTypes";


const fetchTickerData = async (
  ticker: string
): Promise<TickerResponse | null> => {
  const API_KEY = process.env.POLYGON_API_KEY;

  try {
    // const baseUrl =
    //   process.env.NODE_ENV === "development"
    //     ? "http://localhost:3000"
    //     : "https://lumiere-pied.vercel.app";
    const response = await fetch(
      `https://lumiere-pied.vercel.app/api/TrendingTickersSS?ticker=${ticker}`,
      {
        headers: {
          "x-api-key": API_KEY!,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch data for ${ticker}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching data for ${ticker}:`, error);
    return null; 
  }
};

const formatNumberString = (value: number | undefined) => {
  if (value !== undefined) {
    return value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  return "";
};

const TrendList = async ({ query }: { query: string | undefined }) => {
  let tableData: any[] = [];

  if (query === undefined || null) {
    // Static data
    const tickerDataPromises = tickers.map(fetchTickerData);
    const tickerData = await Promise.all(tickerDataPromises);
    const dataNotNull = tickerData.filter(
      (item): item is TickerResponse => item !== null && item.status === "OK"
    );
    const data = dataNotNull.sort((a, b) => b.ticker.day.v - a.ticker.day.v);
    tableData = data.map((stock) => ({
      symbol: stock.ticker.ticker,
      price:
        stock.ticker.day.c !== 0 ? stock.ticker.day.c : stock.ticker.prevDay.c,
      change: stock.ticker.todaysChange
        ? stock.ticker.todaysChange.toFixed(2)
        : (
            (stock.twoPrevDayTicker.close ?? 0) -
            (stock.threePrevDayTicker.close ?? 0)
          ).toFixed(2),
      todaysChangePerc: stock.ticker.todaysChangePerc
        ? stock.ticker.todaysChangePerc.toFixed(2)
        : (
            (((stock.twoPrevDayTicker.close ?? 0) -
              (stock.threePrevDayTicker.close ?? 0)) /
              (stock.threePrevDayTicker.close ?? 0)) *
            100
          ).toFixed(2),
      volume:
        stock.ticker.day.v !== 0 ? stock.ticker.day.v : stock.ticker.prevDay.v,
      marketCap: stock.marketCap.toFixed(2),
      sma50: formatNumberString(stock.sma50),
      sma200: formatNumberString(stock.sma200),
      prevClose: stock.twoPrevDayTicker.close,
      twoPrevClose: stock.threePrevDayTicker.close,
    }));
  } else {
    const queryTickers = query.split(",");
    const queryTickersPromises = queryTickers.map(fetchTickerData);
    const queryTickersData = await Promise.all(queryTickersPromises);
    const queryTickersDataNotNull = queryTickersData.filter(
      (item): item is TickerResponse => item !== null && item.status === "OK"
    );
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
      tableData = data.map((stock) => ({
        symbol: stock.ticker.ticker,
        price:
          stock.ticker.day.c !== 0
            ? stock.ticker.day.c
            : stock.ticker.prevDay.c,
        change: stock.ticker.todaysChange
          ? stock.ticker.todaysChange.toFixed(2)
          : (
              (stock.twoPrevDayTicker.close ?? 0) -
              (stock.threePrevDayTicker.close ?? 0)
            ).toFixed(2),
        todaysChangePerc: stock.ticker.todaysChangePerc
          ? stock.ticker.todaysChangePerc.toFixed(2)
          : (
              (((stock.twoPrevDayTicker.close ?? 0) -
                (stock.threePrevDayTicker.close ?? 0)) /
                (stock.threePrevDayTicker.close ?? 0)) *
              100
            ).toFixed(2),
        volume:
          stock.ticker.day.v !== 0
            ? stock.ticker.day.v
            : stock.ticker.prevDay.v,
        marketCap: stock.marketCap?.toFixed(2),
        sma50: formatNumberString(stock.sma50),
        sma200: formatNumberString(stock.sma200),
        prevClose: stock.twoPrevDayTicker.close,
        twoPrevClose: stock.threePrevDayTicker.close,
      }));
      // } else {
      //   console.error("Incomplete data received for the query:", query);
      //   // Handle the case where necessary properties are missing from the response data
      //   // You can set a default value or display an error message
      // }
    } else {
      console.error("Failed to fetch data for the query:", query);
    }
  }

  return (
    <section id="tickerListSection" className="">
      <div className="">
        <DataTable columns={columns} data={tableData} />
      </div>
    </section>
  );
};

export default TrendList;
