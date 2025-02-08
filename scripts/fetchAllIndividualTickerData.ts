import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

const tickers = [
  "AAPL", "MSFT", "AMZN", "GOOGL", "META", "TSLA", "AVAV", "JPM", "V", "JNJ",
  "WMT", "PG", "UNH", "MA", "NVDA", "HD", "DIS", "BAC", "VZ", "ADBE",
  "CMCSA", "KO", "NFLX", "PFE", "T", "PYPL", "INTC", "CSCO", "PEP", "XOM",
  "COST", "CVX", "ABT", "ACN", "CRM", "AVGO", "NKE", "MRK", "MDT", "NEE",
  "LLY", "TXN", "PM", "LIN", "ORCL", "HON", "IBM", "QCOM", "UPS", "RTX",
  "UNP", "LOW", "MS", "GS", "BLK", "SCHW", "AMGN", "BA", "CAT", "MMM",
  "SPGI", "PLD", "TMO", "AXP", "CVS", "DE", "DHR", "DUK", "ISRG", "BKNG",
  "LMT", "SYK", "MDLZ", "MO", "ADI", "AMT", "BMY", "CI", "COP", "EL",
  "MMC", "NOW", "PNC", "SO", "TGT", "USB", "WFC", "ZTS", "ADP", "AON",
  "APD", "BDX", "C", "CCI", "CL", "D", "DG", "ECL", "ETN", "EW", "FIS",
  "FISV", "GILD", "HUM", "ITW", "JNPR", "KMB", "LRCX", "MAR", "MCD", "MET",
  "MMC", "MSCI", "NOC", "NSC", "NTRS", "ORLY", "PAYX", "PEG", "PGR", "PNR",
  "PPG", "PRU", "PSA", "PXD", "REGN", "ROK", "ROP", "SBUX", "SHW", "SRE",
  "STT", "STZ", "SWK", "SYF", "SYY", "TFC", "TJX", "TRV", "TSN", "TT",
  "TWTR", "TXN", "UAL", "UDR", "UHS", "USB", "VFC", "VLO", "VRSK", "VTR",
  "VZ", "WBA", "WDC", "WEC", "WELL", "WMB", "WM", "WMT", "WRB", "WST",
  "WTRG", "XEL", "XLNX", "XYL", "YUM", "ZBH", "ZBRA", "ZION", "ZTS"
];


const fetchTickerData = async (ticker: string): Promise<any> => {
    // const API_KEY = process.env.POLYGON_API_KEY;
    const API_KEY = 'WX2kmKhTkcHqa8X0c_E4CjmdRNLweD79';

  try {
    const response = await fetch(
      `https://lumiere-pied.vercel.app/api/tickerSS?ticker=${ticker}`,
      {
        cache: "no-store",
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

const fetchAllTickersData = async () => {
  const allData: any[] = [];

  for (const ticker of tickers) {
    const data = await fetchTickerData(ticker);
    if (data) {
      allData.push(data);
    }
  }

  const filePath = path.join(__dirname, 'amdTickerData.json');
  fs.writeFileSync(filePath, JSON.stringify(allData, null, 2), 'utf-8');
  console.log(`Data written to ${filePath}`);
};

fetchAllTickersData().catch((error) => {
  console.error('Error fetching all tickers data:', error);
});