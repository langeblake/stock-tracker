// fetchPolygonData.ts

import axios from 'axios';

export interface AggregateBar {
  c: number; // close price
  h: number; // highest price
  l: number; // lowest price
  o: number; // open price
  t: number; // timestamp
  v: number; // trading volume
  // Add any other fields you need
}

export interface AggregateResponse {
  ticker: string;
  adjusted: boolean;
  results: AggregateBar[];
  // Include other response attributes as needed
}

const fetchPolygonData = async (
  stockTicker: string, 
  multiplier: number, 
  timespan: string, 
  fromDate: string, 
  toDate: string,
  limit: number = 365
): Promise<AggregateResponse> => {
  const API_KEY = 'WX2kmKhTkcHqa8X0c_E4CjmdRNLweD79'; // Replace with your actual API key
  const BASE_URL = 'https://api.polygon.io';

  const url = `${BASE_URL}/v2/aggs/ticker/${stockTicker}/range/${multiplier}/${timespan}/${fromDate}/${toDate}?adjusted=true&sort=asc&limit=${limit}&apiKey=${API_KEY}`;

  try {
    const response = await axios.get<AggregateResponse>(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching aggregate bars:', error);
    throw error;
  }
};

export default fetchPolygonData;
