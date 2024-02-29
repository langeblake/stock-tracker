import { useState, useEffect } from 'react';
import fetchPolygonDaily from '@/utils/_UNUSED_api/fetchPolygonDaily';

const usePolygonDaily = () => {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const result = await fetchPolygonDaily();
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