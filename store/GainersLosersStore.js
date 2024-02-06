import { create } from 'zustand';
import { restClient } from '@polygon.io/client-js';

// Assuming fetchGainersLosers is a utility function you've created or you'll replace it with the API call logic.
const fetchGainersLosers = async (type) => {
    const rest = restClient(process.env.NEXT_PUBLIC_POLYGON_API_KEY);
    return await rest.stocks.snapshotGainersLosers(type);
};

const useGainersLosersStore = create((set) => ({
  data: { gainers: { status: '', tickers: [] }, losers: { status: '', tickers: [] } },
  isLoading: false,
  error: null,

  fetchData: async () => {
    set({ isLoading: true, error: null }); // Reset error state on new fetch and indicate loading
    try {
      // Fetch both gainers and losers in parallel to speed up the process
      const [gainersResponse, losersResponse] = await Promise.all([
        fetchGainersLosers("gainers"),
        fetchGainersLosers("losers"),
      ]);

      // Update state with fetched data
      set((state) => ({
        data: {
          gainers: gainersResponse || state.data.gainers,
          losers: losersResponse || state.data.losers,
        },
        isLoading: false,
      }));
    } catch (error) {
      console.error("Error fetching gainers and losers:", error);
      set({ error, isLoading: false });
    }    
  },
}));

export default useGainersLosersStore;