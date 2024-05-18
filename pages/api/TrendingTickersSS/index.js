// api/TrendingTickersSS.js

import { format } from "date-fns-tz";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 300 }); // Cache for 5 minutes

export default async function handler(req, res) {
  const apiKey = req.headers["x-api-key"];
  const expectedApiKey = process.env.POLYGON_API_KEY;

  if (!apiKey || apiKey !== expectedApiKey) {
    return res.status(401).json({ message: "Unauthorized access." });
  }

  const marketHolidays = [
    "2024-03-29",
    "2024-05-27",
    "2024-06-19",
    "2024-07-03",
    "2024-07-04",
    "2024-09-02",
    "2024-11-28",
    "2024-12-24",
    "2024-12-25",
    "2025-01-01",
    "2025-01-20",
    "2025-02-17",
    "2025-04-18",
  ];

  function decrementBusinessDay(date, days) {
    let adjustedDate = new Date(date);
// Function to adjust date if it's a weekend or a holiday
    function adjustIfNonBusinessDay(date) {
      let adjustmentMade = false;
      do {
        adjustmentMade = false;
        if (date.getDay() === 0) {
          // Sunday
          date = new Date(date.setDate(date.getDate() - 2)); // Move to Friday
          adjustmentMade = true;
        } else if (date.getDay() === 6) {
          // Saturday
          date = new Date(date.setDate(date.getDate() - 1)); // Move to Friday 
          adjustmentMade = true;
        } else if (marketHolidays.includes(format(date, "yyyy-MM-dd"))) {
          date = new Date(date.setDate(date.getDate() - 1)); // Move to Friday
          adjustmentMade = true;
        }
      } while (adjustmentMade);  // Repeat if the adjusted day is still a weekend or a holiday
      return date;
    }

    adjustedDate = adjustIfNonBusinessDay(adjustedDate); // Adjust the initial date

    for (let i = 0; i < days; i++) {
      adjustedDate = new Date(adjustedDate.setDate(adjustedDate.getDate() - 1)); // Decrement one day 
      adjustedDate = adjustIfNonBusinessDay(adjustedDate); // Adjust again if needed
    }

    return adjustedDate;
  }

  let currentDate = new Date();
  currentDate = decrementBusinessDay(new Date(currentDate), 0);

  let oneDayBefore = decrementBusinessDay(new Date(currentDate), 1);
  let twoDaysBefore = decrementBusinessDay(new Date(oneDayBefore), 1);

  const formattedCurrentDate = format(currentDate, "yyyy-MM-dd");
  const formattedOneDayBefore = format(oneDayBefore, "yyyy-MM-dd");
  const formattedTwoDaysBefore = format(twoDaysBefore, "yyyy-MM-dd");

  try {
    const { ticker } = req.query;
    const cacheKey = `ticker-${ticker}`;

    // Check if data is in cache
    if (cache.has(cacheKey)) {
      return res.status(200).json(cache.get(cacheKey));
    }

    const tickerDataURL = `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/${ticker}?apiKey=${apiKey}`;
    const tickerDetailsURL = `https://api.polygon.io/v3/reference/tickers/${ticker}?apiKey=${apiKey}`;
    const twoHundredDaySMAURL = `https://api.polygon.io/v1/indicators/sma/${ticker}?timespan=day&adjusted=true&window=200&series_type=close&order=desc&apiKey=${apiKey}`;
    const fiftyDaySMAURL = `https://api.polygon.io/v1/indicators/sma/${ticker}?timespan=day&adjusted=true&window=50&series_type=close&order=desc&apiKey=${apiKey}`;
    const twoPrevDayURL = `https://api.polygon.io/v1/open-close/${ticker}/${formattedOneDayBefore}?adjusted=true&apiKey=${apiKey}`;
    const threePrevDayURL = `https://api.polygon.io/v1/open-close/${ticker}/${formattedTwoDaysBefore}?adjusted=true&apiKey=${apiKey}`;

    const [
      tickerDataResponse,
      tickerDetailsResponse,
      twoHundredDaySMAResponse,
      fiftyDaySMAResponse,
      twoPrevDayResponse,
      threePrevDayResponse,
    ] = await Promise.all([
      fetch(tickerDataURL).then((res) => res.json()),
      fetch(tickerDetailsURL).then((res) => res.json()),
      fetch(twoHundredDaySMAURL).then((res) => res.json()),
      fetch(fiftyDaySMAURL).then((res) => res.json()),
      fetch(twoPrevDayURL).then((res) => res.json()),
      fetch(threePrevDayURL).then((res) => res.json()),
    ]);

    const combinedData = {
      status: tickerDataResponse?.status,
      ticker: tickerDataResponse?.ticker,
      name: tickerDetailsResponse.results?.name,
      marketCap: tickerDetailsResponse.results?.market_cap,
      sma50: fiftyDaySMAResponse.results?.values?.[0]?.value ?? 0,
      sma200: twoHundredDaySMAResponse.results?.values?.[0]?.value ?? 0,
      twoPrevDayTicker: twoPrevDayResponse,
      threePrevDayTicker: threePrevDayResponse,
    };

    // Cache the data
    cache.set(cacheKey, combinedData);

    res.status(200).json(combinedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while fetching data.",
      error: error.message,
    });
  }
}
