// // TickerStore.js
// import { create } from 'zustand';
// import fetchPolygonTicker from '@/utils/api/fetchPolygonTicker';
// import fetchPolygonTickerDetails from '@/utils/api/fetchPolygonTickerDetails';



// const SMA_Store = create((set) => ({
//   data: { values: []},
//   isLoading: false,
//   error: null,

//   fetchData: async (ticker) => {
//     set({ isLoading: true });
//     try {
//       const TwoHundredDaySMA = await fetchPolygonSMA(ticker)
//       console.log(TwoHundredDaySMA)
//       set({ 
//         data: {
//             values: TwoHundredDaySMA.results.values
//         }, 
//         isLoading: false });
//     } catch (error) {
//       set({ error, isLoading: false });
//     }
//   },
// }));

// export default SMA_Store;