import fetchPolygonTicker from '@/utils/api/fetchPolygonTicker'; 
import fetchPolygonTickerDetails from '@/utils/api/fetchPolygonTickerDetails';
import fetch200PolygonSMA from '@/utils/api/fetch200PolygonSMA';
import fetch50PolygonSMA from '@/utils/api/fetch50PolygonSMA';

export const fetchTickerData = async (ticker) => {
  const tickerDataResponse = await fetchPolygonTicker(ticker);
  const tickerDetailsResponse = await fetchPolygonTickerDetails(ticker);
  const twoHundredDaySMA = await fetch200PolygonSMA(ticker);
  const fiftyDaySMA = await fetch50PolygonSMA(ticker);

  return {
    tickerData: tickerDataResponse.ticker,
    market_cap: tickerDetailsResponse.results.market_cap,
    $200sma_values: twoHundredDaySMA.results.values,
    $50sma_values: fiftyDaySMA.results.values
  };
};

export const fetchAllTickerData = async (tickers) => {
  const allTickerData = await Promise.all(
    tickers.map(async (ticker) => await fetchTickerData(ticker))
  );
  return allTickerData;
};

export const getTrendingStocks = (stockData, limit = 20) => {
    const trendingStocks = [];
  
    // Iterate through each stock data
    stockData.forEach(stock => {
      const {
        tickerData,
        market_cap,
        $200sma_values,
        $50sma_values
      } = stock;
  
      const {
        o,
        c,
        h,
        l,
        v,
        vw,
        ticker
      } = tickerData;
  
      // Check if the stock has met trending criteria
      if (c > o && c > h * 0.98 && c < h * 1.02 && v > vw * 1.5 && c > $50sma_values[0].value && c > $200sma_values[0].value) {
        trendingStocks.push({
          ticker: tickerData.ticker,
          tickerData: tickerData,
          marketCap: market_cap,
          fiftyDayAvg: $50sma_values[0].value,
          twoHundredDayAvg: $200sma_values[0].value
        });
      }
    });
  
    // Sort trending stocks by volume
    trendingStocks.sort((a, b) => {
      const volumeA = a.tickerData.v;
      const volumeB = b.tickerData.v;
      return volumeB - volumeA;
    });
  
    // Return only the top `limit` trending stocks
    return trendingStocks.slice(0, limit);
  };
  
