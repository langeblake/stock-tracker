// utils/fetchPolygonTicker.ts
import { restClient } from '@polygon.io/client-js';

// Create a function to fetch the data for the most recent weekday
const fetchPolygon200SMA = async (ticker: string) => {
    const API_KEY = process.env.NEXT_PUBLIC_POLYGON_API_KEY; // Ensure the API key is correctly set in your environment variables
    const baseURL = "https://api.polygon.io";
    const endpoint = `/v1/indicators/sma/${ticker}?timespan=day&adjusted=true&window=50&series_type=close&order=desc&apiKey=${API_KEY}`;
  
    try {
      const response = await fetch(`${baseURL}${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (e) {
      console.error('An error happened:', e);
      throw e; // Re-throw the error so it can be caught by the calling function
    }
  }
  
  export default fetchPolygon200SMA;
  
