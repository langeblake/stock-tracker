// utils/fetchPolygonData02.ts
// This fetched Group Daily aggregate data
import { restClient } from '@polygon.io/client-js';

// Create a function to fetch the data for the most recent weekday
async function fetchPolygonData() {
  try {
    const rest = restClient(process.env.NEXT_PUBLIC_POLYGON_API_KEY);
    
    // Get today's date
    const currentDate = new Date();

    // Subtract 1 day from the current date (API doesn't allow up-to-date data)
    currentDate.setDate(currentDate.getDate() - 1);
    
    // Ensure currentDate is not a weekend (Saturday or Sunday)
    if (currentDate.getDay() === 0) {
      // If it's Sunday, subtract 2 days to get data for Friday
      currentDate.setDate(currentDate.getDate() - 2);
    } else if (currentDate.getDay() === 6) {
      // If it's Saturday, subtract 1 day to get data for Friday
      currentDate.setDate(currentDate.getDate() - 1);
    }
    
    // Format the date as "YYYY-MM-DD"
    const formattedDate = currentDate.toISOString().split('T')[0];
    
    // Fetch data for the most recent weekday
    // const data = await rest.stocks.aggregatesGroupedDaily(formattedDate);
    const data = await rest.stocks.aggregatesGroupedDaily("2024-01-26");
    
    return data;
  } catch (e) {
    console.error('An error happened:', e);
    throw e;  // Re-throw the error so it can be caught in getServerSideProps
  }
}

export default fetchPolygonData;
