// utils/fetchPolygonAllTickers.ts

import { restClient } from '@polygon.io/client-js';

const fetchPolygonAllTickers = async () => {
  try {
    const rest = restClient(process.env.NEXT_PUBLIC_POLYGON_API_KEY);
    
    const data = await rest.stocks.snapshotAllTickers();

    
    return data;
  } catch (e) {
    console.error('An error happened:', e);
    throw e;  
  }
}

export default fetchPolygonAllTickers;
