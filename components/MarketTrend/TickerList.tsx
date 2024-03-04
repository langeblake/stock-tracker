'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { IoIosStarOutline } from 'react-icons/io'


function formatNumber(value) {
    if (value >= 1e12) {
      return `${(value / 1e12).toFixed(2)}T`;
    } else if (value >= 1e9) {
      return `${(value / 1e9).toFixed(2)}B`;
    } else if (value >= 1e6) {
      return `${(value / 1e6).toFixed(2)}M`;
    } else if (value >= 1e3) {
      return value.toLocaleString();
    } else {
      return `${value}`;
    }
  }

function formatNumberString(value: number) {
  return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export const TickerList = ({ data }) => {
    const [currentPage, setCurrentPage] = useState(0); // currentPage will start at 0 for page 1
    const pageSize = 20; // Number of items per page
  
    // Calculate the slice of data to be displayed
    const startIndex = currentPage * pageSize;
    const endIndex = startIndex + pageSize;
    const currentData = data.slice(startIndex, endIndex);
  
    // Handle page click
    const handlePageClick = (pageNumber) => {
      setCurrentPage(pageNumber);
      const sectionElement = document.getElementById('tickerListSection');
      // Check if the section element exists
      if (sectionElement) {
        // Scroll to the top of the section
        const sectionTop = sectionElement.offsetTop - 80;
        window.scrollTo({
          top: sectionTop,
          behavior: 'smooth'
        });
      } else {
        console.error("Section element not found.");
      }
      
    };

  return (
    <div>
        <h1 className='font-bold text-2xl py-6'>Trending Tickers</h1>
        <div className="flex w-full justify-between dark:bg-zinc-900/70 bg-zinc-100">
            <div className="flex w-full">
              <div className="h-full w-full flex justify-start items-center py-3 "></div>
              <div className="h-full w-full flex justify-center items-center py-3 ">Ranking</div>
            </div> 
            <div className="h-full w-full flex justify-start items-center pl-2 py-3">Symbol</div>
            <div className="h-full w-full flex justify-end items-center py-3">Price</div>
            <div className="h-full w-full flex justify-end items-center py-3">Change</div>
            <div className="h-full w-full flex justify-end items-center py-3">% Change</div>
            <div className="h-full w-full flex justify-end items-center py-3">Volume</div>
            <div className="h-full w-full flex justify-end items-center py-3">Market Cap</div>
            <div className="h-full w-full flex justify-end items-center py-3 pr-4">50-Day SMA</div>
            <div className="h-full w-full flex justify-end items-center py-3 pr-4">200-Day SMA</div>
        </div>
        {currentData.map((stock, index) => (
          stock ? (
            <Link href={`/ticker/${stock.ticker.ticker}`} key={stock.ticker.ticker}>
          <div key={index} className={`border-y-[.5px] dark:border-zinc-700 border-zinc-300 flex w-full justify-between dark:hover:bg-zinc-900/80 hover:bg-zinc-100 hover:cursor-pointer`} >
            <div className="flex w-full">
              <div className={`h-full w-full flex justify-center items-center py-3 font-light`}><IoIosStarOutline size={15}/></div>
              <div className={`h-full w-full flex justify-center  items-center py-3 font-light`}>{startIndex + index + 1}</div>
            </div>
            <div className={`h-full w-full flex items-center py-3 pl-2 font-semibold`}>{stock?.ticker.ticker}</div>
            <div className={`h-full w-full flex justify-end items-center py-3 font-light`}>${formatNumberString(stock?.ticker.day.c)}</div>
            <div className={`h-full w-full flex justify-end items-center py-3 font-light ${stock?.ticker.todaysChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {stock?.ticker.todaysChange?.toFixed(2) ?? 'N/A'}
            </div>

            <div className={`h-full w-full flex justify-end items-center py-3 font-light ${stock.ticker.todaysChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>{stock.ticker.todaysChangePerc.toFixed(2)}%</div>
            <div className={`h-full w-full flex justify-end items-center py-3 font-light`}>{formatNumber(stock.ticker.day.v)}</div>
            <div className={`h-full w-full flex justify-end items-center py-3 font-light`}>{formatNumber(stock.marketCap)}</div>
            <div className={`h-full w-full flex justify-end items-center py-3 pr-4`}>{formatNumberString(stock.sma50)}</div> 
            <div className={`h-full w-full flex justify-end items-center py-3 pr-4`}>{formatNumberString(stock.sma200)}</div> 
          </div>
          </Link>
        ) : (
          <div key={`no-data-${index}`}>No data...</div>
        )))}
      <div className="flex gap-1 justify-end pt-4">
        {[...Array(5)].map((_, i) => ( // Assuming you have 5 pages
          <button
            key={i}
            className={`w-8 h-8 border border-zinc-400 dark:border-zinc-600  rounded-sm ${i === currentPage ? 'dark:bg-zinc-700 bg-zinc-400 text-white' : 'bg-transparent dark:hover:bg-zinc-800 hover:bg-zinc-200'}`}
            onClick={() => handlePageClick(i)}
          >
            <p>{i + 1}</p>
          </button>
        ))}
      </div>
      </div>
  )
}
