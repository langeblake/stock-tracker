export default async function handler(req, res) {
  // const apiKey = req.headers['x-api-key'];
  // const expectedApiKey = process.env.POLYGON_API_KEY;

  // if (!apiKey || apiKey !== expectedApiKey) {
  //   return res.status(401).json({ message: "Unauthorized access." });
  // }
  const apiKey = process.env.POLYGON_API_KEY
  
  try {
    // Retrieve the ticker from the query parameters
    const { ticker } = req.query;

    // Define the URLs for the API calls
    const tickerDataURL = `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/${ticker}?apiKey=${apiKey}`;
    const tickerDetailsURL = `https://api.polygon.io/v3/reference/tickers/${ticker}?apiKey=${apiKey}`;
    const twoHundredDaySMAURL = `https://api.polygon.io/v1/indicators/sma/${ticker}?timespan=day&adjusted=true&window=200&series_type=close&order=desc&apiKey=${apiKey}`;
    const fiftyDaySMAURL = `https://api.polygon.io/v1/indicators/sma/${ticker}?timespan=day&adjusted=true&window=50&series_type=close&order=desc&apiKey=${apiKey}`;
    const financials = `https://api.polygon.io/vX/reference/financials?ticker=${ticker}&timeframe=quarterly&order=desc&limit=10&sort=period_of_report_date&apiKey=${apiKey}`;


    // Fetch data from multiple APIs
    const [tickerDataResponse, tickerDetailsResponse, twoHundredDaySMAResponse, fiftyDaySMAResponse, financialsResponse] = await Promise.all([
      fetch(tickerDataURL).then(res => res.json()),
      fetch(tickerDetailsURL).then(res => res.json()),
      fetch(twoHundredDaySMAURL).then(res => res.json()),
      fetch(fiftyDaySMAURL).then(res => res.json()),
      fetch(financials).then(res => res.json()),
    ]);

    // Combine data into a single structure
    const combinedData = {
      ticker: tickerDataResponse.ticker, 
      name: tickerDetailsResponse.results.name, 
      marketCap: tickerDetailsResponse.results.market_cap, 
      sma200: twoHundredDaySMAResponse.results?.values?.[0]?.value ?? 0, // Use 0 if undefined
      sma50: fiftyDaySMAResponse.results?.values?.[0]?.value ?? 0, // Use 0 if undefined
      fiscalPeriod: financialsResponse.results[0]?.fiscal_period,
      fiscalYear: financialsResponse.results[0]?.fiscal_year,
      netIncomeLoss: financialsResponse.results[0]?.financials?.income_statement?.net_income_loss?.value,
      grossProfit: financialsResponse.results[0]?.financials?.income_statement?.gross_profit?.value,
      earningsPerShare: financialsResponse.results[0]?.financials?.income_statement?.basic_earnings_per_share?.value,
      revenues: financialsResponse.results[0]?.financials?.income_statement?.revenues?.value,
    };

    // Send the combined data back to the client
    res.status(200).json(combinedData);
  } catch (error) {
    // Handle errors appropriately
    console.error(error); // Log the error for server-side debugging
    res.status(500).json({ message: "An error occurred while fetching data.", error: error.message });
  }
}
