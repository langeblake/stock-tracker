// allTickersStore.js
import { create } from 'zustand';
import fetchPolygonAllTickers from '@/utils/api/fetchPolygonAllTickers';

const usePolygonAllTickersStore = create((set, get) => ({
  data: { count: 0, status: '', tickers: [] },
  error: null,
  isLoading: false,
  lastFetched: null,

  fetchData: async () => {
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds
    const { lastFetched } = get(); // Use get() to access the current state

    // Check if data was fetched less than 5 minutes ago
    if (lastFetched && now - lastFetched < fiveMinutes) {
      console.log("Data fetched less than 5 minutes ago, skipping fetch.");
      return; // Skip fetching if less than 5 minutes have passed
    }

    set({ isLoading: true });
    try {
      const response = await fetchPolygonAllTickers();
      console.log(response)
      set({
        data: {
          count: response.count ?? 0,
          status: response.status,
          tickers: response.tickers,
        },
        isLoading: false,
      });
    } catch (error) {
      set({ error, isLoading: false });
    }
  },
}));

export default usePolygonAllTickersStore;
