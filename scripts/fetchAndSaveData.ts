import fs from "fs";
import path from "path";

// Assuming fetchTickerData and tickers are imported from your existing code
import { TickerResponse } from "@/types/stockDataTypes";
export const tickers = [
    "AAPL",
    "MSFT",
    "AMZN",
    "GOOGL",
    "META",
    "TSLA",
    "AVAV",
    "JPM",
    "V",
    "JNJ",
    "WMT",
    "PG",
    "UNH",
    "MA",
    "NVDA",
    "HD",
    "DIS",
    "BAC",
    "VZ",
    "ADBE",
    "CMCSA",
    "KO",
    "NFLX",
    "PFE",
    "T",
    "PYPL",
    "INTC",
    "CSCO",
    "PEP",
    "XOM",
    "COST",
    "CVX",
    "ABT",
    "ACN",
    "CRM",
    "AVGO",
    "ABBV",
    "WFC",
    "MRK",
    "TMO",
    "MCD",
    "MDT",
    "NKE",
    "DHR",
    "TXN",
    "QCOM",
    "HON",
    "LIN",
    "BMY",
    "UNP",
    "ORCL",
    "LLY",
    "PM",
    "UPS",
    "SCHW",
    "LOW",
    "C",
    "BA",
    "IBM",
    "SBUX",
    "AMT",
    "NEE",
    "AMD",
    "NOW",
    "BLK",
    "AMGN",
    "GE",
    "CAT",
    "MMM",
    "GS",
    "MS",
    "INTU",
    "DE",
    "CVS",
    "RTX",
    "SPGI",
    "TGT",
    "ISRG",
    "BKNG",
    "LMT",
    "SYK",
    "MU",
    "ZTS",
    "GILD",
    "FIS",
    "MO",
    "MDLZ",
    "GM",
    "TJX",
    "BDX",
    "CSX",
    "CI",
    "AXP",
    "SO",
    "ADP",
    "CL",
    "COP",
    "USB",
    "PNC",
    "EL",
    "FB",
  ];

export const fetchTickerData = async (
  ticker: string
): Promise<TickerResponse | null> => {
  const API_KEY = "WX2kmKhTkcHqa8X0c_E4CjmdRNLweD79";

  try {
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
    console.error(`Error fetching data for ${ticker}:`, error.message);
    return null;
  }
};

export const formatNumberString = (value: number | undefined) => {
  if (value !== undefined) {
    return value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  return "";
};

const fetchAndSaveData = async () => {
  let tableData: any[] = [];

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
    marketCap: stock.marketCap ? stock.marketCap.toFixed(2) : "N/A",
    sma50: formatNumberString(stock.sma50),
    sma200: formatNumberString(stock.sma200),
    prevClose: stock.twoPrevDayTicker.close,
    twoPrevClose: stock.threePrevDayTicker.close,
  }));

  // Write tableData to a JSON file
  const filePath = path.join(__dirname, "tableData.json");
  console.log(`Writing data to ${filePath}`);
  fs.writeFileSync(filePath, JSON.stringify(tableData, null, 2), "utf-8");
  console.log("Data written successfully");
};

fetchAndSaveData().catch((error) => {
  console.error("Error fetching and saving data:", error);
});
