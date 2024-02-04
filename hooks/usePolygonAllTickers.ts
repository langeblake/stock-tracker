import { useState, useEffect } from 'react';
import fetchPolygonAllTickers from '@/utils/api/fetchPolygonAllTickers';

const usePolygonAllTickers = () => {
  // Adjusting the initial state to match the expected structure for clarity
  const [data, setData] = useState({ count: 0, status: '', tickers: [] });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
        setIsLoading(true);
        try {
          const response = await fetchPolygonAllTickers();
          console.log("Data fetched: ", response);
      
          // Providing a default value for `count` if it's missing
          setData({
            count: response.count ?? 0, // Use ?? operator to provide a default value of 0
            status: response.status,
            tickers: response.tickers,
          });
          setIsLoading(false);
        } catch (e) {
          console.error(e);
          setError(e);
          setIsLoading(false);
        }
      };

    fetchData();
  }, []); // Dependency array is empty, so this effect runs only once after the initial render
  
  return { data, error, isLoading };
};

export default usePolygonAllTickers;
