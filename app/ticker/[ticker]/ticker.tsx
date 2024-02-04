// components/TickerPage.js
'use client'

import useTickerData from '@/hooks/useTickerData'; 
import { Oval } from 'react-loader-spinner';

const Ticker = ({ ticker }) => {
  const { data, isLoading, error } = useTickerData(ticker);

  if (isLoading) return <div>
    <Oval
      visible={true}
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="oval-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />

  </div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div></div>;

  const isPositiveChange = data.ticker.day.c - data.ticker.day.o;

  return (
    <div className='flex justify-between w-1/4 border rounded-lg '>
      <h1 className='p-4'>{data.ticker.ticker}</h1>
      <p className={`p-4 ${isPositiveChange ? 'text-green-500' : 'text-red-500'}`}>${data.ticker.day.c}</p>
      {/* Display more ticker information */}
    </div>
  );
};

export default Ticker;
