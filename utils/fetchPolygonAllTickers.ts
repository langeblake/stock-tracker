// utils/fetchPolygonData02.ts
// This fetched Group Daily aggregate data
import { restClient } from '@polygon.io/client-js';

// Create a function to fetch the data for the most recent weekday
async function fetchPolygonAllTickers() {
  try {
    const rest = restClient(process.env.NEXT_PUBLIC_POLYGON_API_KEY);
    

    // Fetch data for the most recent weekday
    const data = await rest.stocks.snapshotAllTickers();
    // const data = await rest.stocks.aggregatesGroupedDaily("2024-01-26");
    
    return data;
  } catch (e) {
    console.error('An error happened:', e);
    throw e;  // Re-throw the error so it can be caught in getServerSideProps
  }
}

export default fetchPolygonAllTickers;
