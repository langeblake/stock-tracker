// // utils/fetchPolygonTicker.ts
// import { restClient } from '@polygon.io/client-js';

// // Create a function to fetch the data for the most recent weekday
// const fetchPolygonTicker = async (ticker: string) => {
//   try {
//     const rest = restClient(process.env.NEXT_PUBLIC_POLYGON_API_KEY);
    

//     // Fetch data for the most recent weekday
//     const data = await rest.stocks.snapshotTicker(`${ticker}`);
//     // const data = await rest.stocks.snapshotTicker('AMZN');
    
//     return data;
//   } catch (e) {
//     console.error('An error happened:', e);
//     throw e;  // Re-throw the error so it can be caught in getServerSideProps
//   }
// }

// export default fetchPolygonTicker;
