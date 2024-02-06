// allTickersStore.js
import { create } from 'zustand';
import fetchPolygonAllTickers from '@/utils/api/fetchPolygonAllTickers';

const usePolygonAllTickersStore = create((set) => ({
  data: { count: 0, status: '', tickers: [] },
  error: null,
  isLoading: false,

  fetchData: async () => {
    set({ isLoading: true });
    try {
      const response = await fetchPolygonAllTickers();
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
