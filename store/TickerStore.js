// TickerStore.js
import { create } from 'zustand';
import fetch50PolygonSMA from '@/utils/api/fetch50PolygonSMA';
import fetch200PolygonSMA from '@/utils/api/fetch200PolygonSMA';
import fetchPolygonTicker from '@/utils/api/fetchPolygonTicker';
import fetchPolygonTickerDetails from '@/utils/api/fetchPolygonTickerDetails';



const TickerStore = create((set) => ({
  // tickerData: { request_id: '', status: '', ticker: {}, , market_cap: null},
  isLoading: false,
  error: null,

  fetchData: async (ticker) => {
    set({ isLoading: true });
    try {
      const tickerDataResponse = await fetchPolygonTicker(ticker)
      const tickerDetailsResponse = await fetchPolygonTickerDetails(ticker);
      const twoHundredDaySMA = await fetch200PolygonSMA(ticker);
      const fiftyDaySMA = await fetch50PolygonSMA(ticker);
      console.log(tickerDataResponse, tickerDetailsResponse, twoHundredDaySMA)
      set({ 
        data: {
            request_id: tickerDataResponse.request_id,
            status: tickerDataResponse.status,
            ticker: tickerDataResponse.ticker,
            name: tickerDetailsResponse.results.name,
            logo: tickerDetailsResponse.results.logo_url,
            market_cap: tickerDetailsResponse.results.market_cap,
            $200sma_values: twoHundredDaySMA.results.values,
            $50sma_values: fiftyDaySMA.results.values

        }, 
        isLoading: false });
    } catch (error) {
      set({ error, isLoading: false });
    }
  },
}));

export default TickerStore;