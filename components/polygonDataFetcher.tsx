// Testing Component - Used to display data in console, and error messages to main page

"use client"

import React from 'react';
import usePolygonData from '@/hooks/usePolygonData02';

const PolygonDataFetcher = () => {
  const { data, error } = usePolygonData();

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return <div>Data fetched successfully</div>;
};

export default PolygonDataFetcher;
