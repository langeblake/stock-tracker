import { create } from 'zustand';
import fetchPolygonDaily from '@/utils/api/fetchPolygonDaily';

const DailyTickersStore = create((set) => ({
    data: [], // Update structure to hold data array
    isLoading: false,
    error: null,    

  fetchData: async () => {
    set({ isLoading: true });
    try {
      const groupedDaily = await fetchPolygonDaily();
      const tickers = groupedDaily.results.map(bar => bar.T); // Extract ticker symbols correctly
      set({ data: tickers, isLoading: false }); // Set data array directly
      console.log("Fetched Daily Bars")
    } catch (error) {
      set({ error, isLoading: false });
    }
  },
}));

export default DailyTickersStore;
