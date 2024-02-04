// contexts/PolygonDataContext.js
'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import fetchPolygonAllTickers from '@/utils/api/fetchPolygonAllTickers';

const PolygonDataContext = createContext();

export const PolygonDataProvider = ({ children }) => {
  const [data, setData] = useState({ count: 0, status: '', tickers: [] });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetchPolygonAllTickers();
        setData(response); // Assuming response has count, status, tickers
        console.log("Data fetched", response)
      } catch (e) {
        console.error(e);
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <PolygonDataContext.Provider value={{ data, error, isLoading }}>
      {children}
    </PolygonDataContext.Provider>
  );
};

export const usePolygonData = () => useContext(PolygonDataContext);
