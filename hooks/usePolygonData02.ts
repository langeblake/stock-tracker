import { useState, useEffect } from 'react';
import fetchPolygonData from '@/utils/fetchPolygonData02';

const usePolygonData = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchPolygonData();
        console.log("Data fetched: ", result);
        setData(result);
      } catch (e) {
        setError(e);
      }
    };

    fetchData();
  }, []); 

  return { data, error };
};

export default usePolygonData;
