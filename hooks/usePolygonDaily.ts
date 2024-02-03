import { useState, useEffect } from 'react';
import fetchPolygonData from '@/utils/fetchPolygonDaily';

const usePolygonDaily = () => {
  const [data, setData] = useState({ results: [] });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const result = await fetchPolygonData();
        console.log("Data fetched: ", result);
        setData(result);
        setIsLoading(false)
      } catch (e) {
        setError(e);
      }
    };

    fetchData();
    // setIsLoading(false);
  }, []); 
  
  return { data, error, isLoading };
};

export default usePolygonDaily;