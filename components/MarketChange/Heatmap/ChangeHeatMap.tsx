import { transformChangeDataForTreeMap } from "@/utils/helper/transformChangeDataForTreeMapReChart";
import ChangeTreeMap from "./ReChartTreeMaps/ChangeTreeMap";
import { transformStaticChangeDataForTreeMap } from "@/utils/helper/transformStaticChangeDataForTreeMapReChart";
import { tickers } from "data/tickers-static.js";

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

interface GainersLosersResponse {
  gainers: { tickers: TickerData[] };
  losers: { tickers: TickerData[] };
}

interface TickerResponse {
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
  name: string;
  marketCap: number;
  sma200: number;
  sma50: number;
  twoPrevDayTicker: TwoPrevDayTicker;
  threePrevDayTicker: ThreePrevDayTicker;
  status: string;
}

interface TwoPrevDayTicker {
  afterHours: number;
  close: number | null;
  from: Date;
  high: number;
  low: number;
  open: number;
  preMarket: number;
  status: string;
  symbol: string;
  volume: number;
}
interface ThreePrevDayTicker {
  afterHours: number;
  close: number | null;
  from: Date;
  high: number;
  low: number;
  open: number;
  preMarket: number;
  status: string;
  symbol: string;
  volume: number;
}

const fetchTickerData = async (
  ticker: string
): Promise<TickerResponse | null> => {
  const API_KEY = process.env.POLYGON_API_KEY;

  try {
    const baseUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://lumiere-pied.vercel.app";
    const response = await fetch(
      `https://lumiere-pied.vercel.app/api/TrendingTickersSS?ticker=${ticker}`,
      {
        headers: {
          // Include the API key in the request headers
          // IMPORTANT: Securely manage and inject the API key in a production environment
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
    return null; // Returning null for failed requests
  }
};

const fetchGainersLosersData =
  async (): Promise<GainersLosersResponse | null> => {
    try {
      const baseUrl =
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : "http://localhost:3000";
      const response = await fetch(
        `https://lumiere-pied.vercel.app/api/gainers-losers`,
        { cache: "no-store" }
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch data Gainers-Losers`);
      }
      const data = await response.json();

      return data; // Assuming the API returns the data structured as expected.
    } catch (error) {
      console.error(`Error fetching data for Gainers-Losers:`, error);
      return null;
    }
  };

const ChangeHeatMap = async () => {
  const tickerDataPromises = tickers.map(fetchTickerData);
  const tickerData = await Promise.all(tickerDataPromises);
  const dataNotNull = tickerData.filter(
    (item): item is TickerResponse => item !== null && item.status === "OK"
  );
  const sortedData = dataNotNull.sort((a, b) => {
    // Calculate or use existing todaysChangePerc for 'a'
    const aChangePerc =
      a.ticker.todaysChangePerc !== 0 && a.ticker.todaysChangePerc != null
        ? a.ticker.todaysChangePerc
        : (((a.ticker.prevDay.c ?? 0) - (a.twoPrevDayTicker.close ?? 0)) /
            (a.twoPrevDayTicker.close ?? 0)) *
          100;

    // Calculate or use existing todaysChangePerc for 'b'
    const bChangePerc =
      b.ticker.todaysChangePerc !== 0 && b.ticker.todaysChangePerc != null
        ? b.ticker.todaysChangePerc
        : (((b.ticker.prevDay.c ?? 0) - (b.twoPrevDayTicker.close ?? 0)) /
            (b.twoPrevDayTicker.close ?? 0)) *
          100;

    // Perform sort based on calculated or existing todaysChangePerc values
    return bChangePerc - aChangePerc;
  });

  // Setting the top 4 gainers and losers
  const staticGainers = sortedData.slice(0, 4);
  const staticLosers = sortedData.slice(-4).reverse(); // Assuming you want the lowest negative change percentages
  const combinedStaticData = {
    gainers: staticGainers,
    losers: staticLosers,
  };

  const data = await fetchGainersLosersData();

  // Transform the data right before rendering the tree map
  const treeMapData =
    data?.gainers.tickers.length !== 0
      ? transformChangeDataForTreeMap(data)
      : transformStaticChangeDataForTreeMap(combinedStaticData);

  return (
    <div className="w-full max-h-[700px] min-h-[500px]">
      <div className=" w-full h-full rounded-lg">
        {/* <TreeMap data={data} height={580} width={680}/> */}
        {/* <TreeMapScale data={data}/> */}
        {/* <D3ChangeTree data={treeMapData}/> */}
        <ChangeTreeMap data={treeMapData} />
      </div>
    </div>
  );
};

export default ChangeHeatMap;
