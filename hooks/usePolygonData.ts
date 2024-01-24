// usePolygonData.ts

import { useEffect, useState } from 'react';
import fetchPolygonData, { AggregateResponse } from '@/app/pages/api/fetchPolygonData';

export const usePolygonData = (
    stockTicker: string,
    multiplier: number,
    timespan: string,
    fromDate: string,
    toDate: string,
    limit?: number // Include the optional 'limit' parameter here
  ) => {
    const [data, setData] = useState<AggregateResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetchPolygonData(
            stockTicker,
            multiplier,
            timespan,
            fromDate,
            toDate,
            limit // Pass the 'limit' parameter to the fetchAggregateBars function
          );
          setData(response);
          setLoading(false);
        } catch (err) {
          setError(err);
          setLoading(false);
        }
      };
  
      fetchData();
    }, [stockTicker, multiplier, timespan, fromDate, toDate, limit]); // Include 'limit' in the dependencies array
  
    return { data, loading, error };
  };

export type { AggregateResponse };
