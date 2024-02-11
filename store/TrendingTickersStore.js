// // TickerStore.js
// import { create } from 'zustand';
// import fetch50PolygonSMA from '@/utils/api/fetch50PolygonSMA';
// import fetch200PolygonSMA from '@/utils/api/fetch200PolygonSMA';
// import fetchPolygonTicker from '@/utils/api/fetchPolygonTicker';
// import fetchPolygonTickerDetails from '@/utils/api/fetchPolygonTickerDetails';
// import fetchPolygonDaily from '@/utils/api/fetchPolygonDaily';

// const TrendingTickersStore = create((set) => ({
//   data: [],
//   isLoading: false,
//   error: null,

//   fetchData: async () => {
//     set({ isLoading: true });
//     try {
//       // Fetch all ticker symbols
//       const allTickerData = await fetchPolygonDaily();
//       const allTickerSymbols = allTickerData.results.map(result => result.T);

//       // Take only the first 20 tickers to fetch detailed data
//       const first20Tickers = allTickerSymbols.slice(0, 20);

//       // Iterate over each ticker symbol and fetch its data
//       const tickerData = await Promise.all(
//         first20Tickers.map(async (ticker) => {
//           const tickerDataResponse = await fetchPolygonTicker(ticker);
//           const tickerDetailsResponse = await fetchPolygonTickerDetails(ticker);
//           const twoHundredDaySMA = await fetch200PolygonSMA(ticker);
//           const fiftyDaySMA = await fetch50PolygonSMA(ticker);

//           // Assemble data for the ticker
//           return {
//             ticker: tickerDataResponse.ticker,
//             name: tickerDetailsResponse.results.name,
//             logo: tickerDetailsResponse.results.logo_url,
//             market_cap: tickerDetailsResponse.results.market_cap,
//             $200sma_values: twoHundredDaySMA.results.values,
//             $50sma_values: fiftyDaySMA.results.values
//           };
//         })
//       );

//       // Update store state with aggregated data
//       set({ data: tickerData, isLoading: false });
//     } catch (error) {
//       console.error(error);
//       set({ error, isLoading: false });
//     }
//   },
// }));

// export default TrendingTickersStore;
