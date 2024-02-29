// import { useState, useEffect } from 'react';
// import fetchPolygonTicker from '@/utils/api/fetchPolygonTicker'; 
// import fetchPolygonTickerDetails from '@/utils/api/fetchPolygonTickerDetails';
// import fetch200PolygonSMA from '@/utils/api/fetch200PolygonSMA';
// import fetch50PolygonSMA from '@/utils/api/fetch50PolygonSMA';

// const useTickerData = (ticker: string) => {
//   const [data, setData] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       try {
//         const tickerDataResponse = await fetchPolygonTicker(ticker);
//         const tickerDetailsResponse = await fetchPolygonTickerDetails(ticker);
//         const twoHundredDaySMA = await fetch200PolygonSMA(ticker);
//         const fiftyDaySMA = await fetch50PolygonSMA(ticker);
//         setData({
//           tickerData: tickerDataResponse.ticker,
//           marketCap: tickerDetailsResponse.results.market_cap,
//           sma200Values: twoHundredDaySMA.results.values,
//           sma50Values: fiftyDaySMA.results.values
//         });
//         setError(null);
//       } catch (error) {
//         setError(error);
//         setData(null);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (ticker) {
//       fetchData();
//     }
//   }, [ticker]);

//   return { data, isLoading, error };
// };

// export default useTickerData;
