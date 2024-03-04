import { format, utcToZonedTime } from "date-fns-tz";

export default async function handler(req, res) {
  // const apiKey = req.headers['x-api-key'];
  // const expectedApiKey = process.env.POLYGON_API_KEY;

  // if (!apiKey || apiKey !== expectedApiKey) {
  //   return res.status(401).json({ message: "Unauthorized access." });
  // }
    const apiKey = process.env.POLYGON_API_KEY;

    const timeZone = 'America/Los_Angeles';
    // Get the current date and time in UTC
    const currentDate = new Date();
    if (currentDate.getDay() === 0) {
      // If it's Sunday, subtract 2 days to get data for Friday
      currentDate.setDate(currentDate.getDate() - 2);
    } else if (currentDate.getDay() === 6) {
      // If it's Saturday, subtract 1 day to get data for Friday
      currentDate.setDate(currentDate.getDate() - 1);
    }
    const oneDayBeforeDate = currentDate;
    oneDayBeforeDate.setDate(currentDate.getDate() - 1);
    const twoDayBeforeDate = currentDate;
    twoDayBeforeDate.setDate(currentDate.getDate() - 3);
    // Format the seven days before date as "YYYY-MM-DD"
    // Convert UTC to the desired timezone
    const prevInPST = utcToZonedTime(oneDayBeforeDate, timeZone);
    // Format the date in the desired format
    const formattedDate = format(prevInPST, 'yyyy-MM-dd');
    const twoPrevInPST = utcToZonedTime(twoDayBeforeDate, timeZone);
    // Format the date in the desired format
    const formattedDateTwo = format(twoPrevInPST, 'yyyy-MM-dd');

  try {
    // Retrieve the ticker from the query parameters
    const { ticker } = req.query;

    // Define the URLs for the API calls
    const tickerDataURL = `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/${ticker}?apiKey=${apiKey}`;
    const tickerDetailsURL = `https://api.polygon.io/v3/reference/tickers/${ticker}?apiKey=${apiKey}`;
    const twoHundredDaySMAURL = `https://api.polygon.io/v1/indicators/sma/${ticker}?timespan=day&adjusted=true&window=200&series_type=close&order=desc&apiKey=${apiKey}`;
    const fiftyDaySMAURL = `https://api.polygon.io/v1/indicators/sma/${ticker}?timespan=day&adjusted=true&window=50&series_type=close&order=desc&apiKey=${apiKey}`;
    const financialsURL = `https://api.polygon.io/vX/reference/financials?ticker=${ticker}&timeframe=quarterly&order=desc&limit=10&sort=period_of_report_date&apiKey=${apiKey}`;
    const tickerNewsURL = `https://api.polygon.io/v2/reference/news?ticker=${ticker}&order=desc&limit=20&apiKey=${apiKey}`;
    const generalNewsURL = `https://api.polygon.io/v2/reference/news?order=desc&limit=50&apiKey=${apiKey}`;
    const twoPrevDayURL = `https://api.polygon.io/v1/open-close/${ticker}/${formattedDate}?adjusted=true&apiKey=${apiKey}`
    const threePrevDayURL = `https://api.polygon.io/v1/open-close/${ticker}/${formattedDateTwo}?adjusted=true&apiKey=${apiKey}`


    // Fetch data from multiple APIs
    const [tickerDataResponse, tickerDetailsResponse, twoHundredDaySMAResponse, fiftyDaySMAResponse, financialsResponse, tickerNewsResponse, generalNewsResponse, twoPrevDayResponse, threePrevDayResponse] = await Promise.all([
      fetch(tickerDataURL).then(res => res.json()),
      fetch(tickerDetailsURL).then(res => res.json()),
      fetch(twoHundredDaySMAURL).then(res => res.json()),
      fetch(fiftyDaySMAURL).then(res => res.json()),
      fetch(financialsURL).then(res => res.json()),
      fetch(tickerNewsURL).then(res => res.json()),
      fetch(generalNewsURL).then(res => res.json()),
      fetch(twoPrevDayURL).then(res => res.json()),
      fetch(threePrevDayURL).then(res => res.json()),
    ]);

    const randomIndex = Math.floor(Math.random() * 50);
    // Combine data into a single structure
    const combinedData = {
      updated: tickerDataResponse.updated,
      ticker: tickerDataResponse.ticker,
      name: tickerDetailsResponse.results?.name,
      marketCap: tickerDetailsResponse.results?.market_cap, 
      list_date: tickerDataResponse.results?.list_date,
      sma200: twoHundredDaySMAResponse.results?.values?.[0]?.value ?? 0, // Use 0 if undefined
      sma50: fiftyDaySMAResponse.results?.values?.[0]?.value ?? 0, // Use 0 if undefined
      fiscalPeriod: financialsResponse.results[0]?.fiscal_period,
      fiscalYear: financialsResponse.results[0]?.fiscal_year,
      netIncomeLoss: financialsResponse.results[0]?.financials?.income_statement?.net_income_loss?.value,
      grossProfit: financialsResponse.results[0]?.financials?.income_statement?.gross_profit?.value,
      earningsPerShare: financialsResponse.results[0]?.financials?.income_statement?.basic_earnings_per_share?.value,
      revenues: financialsResponse.results[0]?.financials?.income_statement?.revenues?.value,
      tickerNews: tickerNewsResponse?.results[0],
      generalNews: generalNewsResponse?.results[randomIndex],
      twoPrevDayTicker: twoPrevDayResponse,
      threePrevDayTicker: threePrevDayResponse,
    };

    // Send the combined data back to the client
    res.status(200).json(combinedData);
  } catch (error) {
    // Handle errors appropriately
    console.error(error); // Log the error for server-side debugging
    res.status(500).json({ message: "An error occurred while fetching data.", error: error.message });
  }
}
