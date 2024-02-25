import fetchPolygonTicker from '@/utils/api/fetchPolygonTicker';
import fetchPolygonTickerDetails from '@/utils/api/fetchPolygonTickerDetails';
import fetch200PolygonSMA from '@/utils/api/fetch200PolygonSMA';
import fetch50PolygonSMA from '@/utils/api/fetch50PolygonSMA';

export default async function handler(req, res) {
    const apiKey = req.headers['x-api-key'];
    const expectedApiKey = process.env.NEXT_PUBLIC_BABYQUANT_API_KEY;

  
    if (!apiKey || apiKey !== expectedApiKey) {
      return res.status(401).json({ message: "Unauthorized access." });
    }
  
    try {
      // Retrieve the ticker from the query parameters
      const { ticker } = req.query;
  
      // Fetch data from multiple APIs
      const [tickerDataResponse, tickerDetailsResponse, twoHundredDaySMA, fiftyDaySMA] = await Promise.all([
        fetchPolygonTicker(ticker),
        fetchPolygonTickerDetails(ticker),
        fetch200PolygonSMA(ticker),
        fetch50PolygonSMA(ticker)
      ]);
  
      // Combine data into a single structure
      const combinedData = {
        ticker: tickerDataResponse.ticker,
        name: tickerDetailsResponse.results.name,
        marketCap: tickerDetailsResponse.results.market_cap, 
        sma200: twoHundredDaySMA.results.values[0].value,
        sma50: fiftyDaySMA.results.values[0].value
      };
  
      // Send the combined data back to the client
      res.status(200).json(combinedData);
    } catch (error) {
      // Handle errors appropriately
      console.error(error); // Log the error for server-side debugging
      res.status(500).json({ message: "An error occurred while fetching data.", error: error.message });
    }
  }
  
  