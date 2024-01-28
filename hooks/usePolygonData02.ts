import { useState, useEffect } from 'react';
import fetchPolygonData from '@/utils/fetchPolygonData02';
import { toast } from 'react-toastify';

const usePolygonData = () => {
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
        toast.error('Uh oh! Something went wrong fetching data.', {
          position: 'top-right', // Position of the toast
          autoClose: 5000,       // Auto close the toast after 5 seconds (ms)
          hideProgressBar: false, // Show progress bar
          closeOnClick: true,     // Close the toast when clicked
          pauseOnHover: true,     // Pause the timer on hover
          draggable: true,        // Allow dragging the toast
        });
      }
    };

    fetchData();
    // setIsLoading(false);
  }, []); 
  
  return { data, error, isLoading };
};

export default usePolygonData;