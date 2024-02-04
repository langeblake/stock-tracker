// hooks/useTickerData.js

import { useState, useEffect } from 'react';
import fetchPolygonTicker from '@/utils/api/fetchPolygonTicker'; 

const useTickerData = (ticker: string) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!ticker) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await fetchPolygonTicker(ticker);
        setData(result);
        setError(null);
      } catch (error) {
        setError(error);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [ticker]); // Refetch when ticker changes

  return { data, isLoading, error };
};

export default useTickerData;
