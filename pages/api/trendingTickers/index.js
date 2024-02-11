// API Route: pages/api/tickersData.js
import fetchPolygonTicker from '@/utils/api/fetchPolygonTicker';
import fetchPolygonTickerDetails from '@/utils/api/fetchPolygonTickerDetails';
import fetch200PolygonSMA from '@/utils/api/fetch200PolygonSMA';
import fetch50PolygonSMA from '@/utils/api/fetch50PolygonSMA';


export default async function handler(req, res) {

    try {
        // Extract tickers from the query string and split into an array
        const { tickers } = req.query;
        const tickerArray = tickers.split(',');

        // Fetch data for each ticker
        const dataPromises = tickerArray.map(async (ticker) => {
            const [tickerDataResponse, tickerDetailsResponse, twoHundredDaySMA, fiftyDaySMA] = await Promise.all([
                fetchPolygonTicker(ticker),
                fetchPolygonTickerDetails(ticker),
                fetch200PolygonSMA(ticker),
                fetch50PolygonSMA(ticker),
            ]);

            return {
                ticker: tickerDataResponse.ticker,
                name: tickerDetailsResponse.results.name,
                price: tickerDataResponse.ticker.c,
                market_cap: tickerDetailsResponse.results.market_cap,
                $200sma_values: twoHundredDaySMA.results.values[0].value,
                $50sma_values: fiftyDaySMA.results?.values[0].value,
            };
        });

        const tickerData = await Promise.all(dataPromises);

        // Sort the data by market cap in descending order
        const sortedData = tickerData.sort((a, b) => b.market_cap - a.market_cap);

        res.status(200).json(sortedData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while fetching data.", error: error.message });
    }
}
