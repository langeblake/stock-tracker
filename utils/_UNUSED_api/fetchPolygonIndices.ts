// // utils/fetchPolygonIndices.ts
// // This fetches Indices aggregate data
// import { IAggs, restClient } from '@polygon.io/client-js';


// export interface ApiResponse {
//   count: number;
//   queryCount: number;
//   request_id: string;
//   results: IndexData[];
//   status: string;
//   ticker: string;
// }

// interface IndexData {
//   c: number; 
//   h: number;
//   l: number;
//   o: number;
//   t: number;
// }


// // Create a function to fetch the data for the most recent weekday
// const fetchPolygonIndexData = async (ticker: string): Promise<ApiResponse> => {
//   try {
//     const rest = restClient(process.env.NEXT_PUBLIC_POLYGON_API_KEY);
    
//     // Get today's date
//     const currentDate = new Date();

//     // Subtract 1 day from the current date (if API doesn't allow up-to-date data)
//     // currentDate.setDate(currentDate.getDate() - 1);
    
//     // Ensure currentDate is not a weekend (Saturday or Sunday)
//     if (currentDate.getDay() === 0) {
//       // If it's Sunday, subtract 2 days to get data for Friday
//       currentDate.setDate(currentDate.getDate() - 2);
//     } else if (currentDate.getDay() === 6) {
//       // If it's Saturday, subtract 1 day to get data for Friday
//       currentDate.setDate(currentDate.getDate() - 1);
//     }
    
//     // Format the date as "YYYY-MM-DD"
//     const formattedDate = currentDate.toISOString().split('T')[0];
    
//     // Fetch data for the most recent weekday
//     const data = await rest.indices.aggregates(ticker, 1, "day", "2024-02-16", "2024-02-16");
//     // const data = await rest.stocks.aggregatesGroupedDaily("2024-02-07");
    
//     return data as unknown as ApiResponse;
//   } catch (e) {
//     console.error('An error happened:', e);
//     throw e;  // Re-throw the error so it can be caught in getServerSideProps
//   }
// }

// export default fetchPolygonIndexData;
