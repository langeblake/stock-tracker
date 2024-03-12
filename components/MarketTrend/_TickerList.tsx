'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { IoIosStarOutline } from 'react-icons/io'
import { IoMdArrowDropdown } from "react-icons/io";



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
    const [sortCategory, setSortCategory] = useState("marketCap");
    const [sortOrder, setSortOrder] = useState("desc");

    const pageSize = 20; // Number of items per page
  
    // Calculate the slice of data to be displayed
    const startIndex = currentPage * pageSize;
    const endIndex = startIndex + pageSize;

    
    // Function to handle sorting
    const handleSort = (category) => {
        // If already sorting by the same category, reverse the order
        if (sortCategory === category) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
            setCurrentPage(0)
        } else {
            // If sorting by a different category, set the new category and order
            setSortCategory(category);
            setSortOrder("desc"); // Initially sort in desc order
            setCurrentPage(0);
        }
    };

    // Sort data based on selected category and order
    const sortedData = data.sort((a, b) => {
        let aValue, bValue;
        switch (sortCategory) {
            case 'marketCap':
            case 'sma50':
            case 'sma200':
                // Access the properties directly from the parent object
                aValue = a[sortCategory] || 0;
                bValue = b[sortCategory] || 0;
                break;
            case 'todaysChange':
            case 'todaysChangePerc':
                // Access the properties directly from the 'ticker' object
                aValue = a.ticker[sortCategory] || 0;
                bValue = b.ticker[sortCategory] || 0;
                break;
            case 'day.c':
                // Check if day.c is available, if not, use prevDay.c
                aValue = a.ticker.day.c !== 0 ? a.ticker.day.c : a.ticker.prevDay.c || 0;
                bValue = b.ticker.day.c !== 0 ? b.ticker.day.c : b.ticker.prevDay.c || 0;
                break;
            case 'day.v':
                // Check if day.c is available, if not, use prevDay.c
                aValue = a.ticker.day.v !== 0 ? a.ticker.day.v : a.ticker.prevDay.v || 0;
                bValue = b.ticker.day.v !== 0 ? b.ticker.day.v : b.ticker.prevDay.v || 0;
                break;
            default:
                // Access the properties from the 'ticker' object using bracket notation
                aValue = getProperty(a.ticker, sortCategory) || 0;
                bValue = getProperty(b.ticker, sortCategory) || 0;
                break;
        }
        // Compare the values based on the current sort order
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    });
    
    // Function to get nested property using bracket notation
    function getProperty(obj: any, path: string) {
        return path.split('.').reduce((acc, key) => (acc && acc[key] !== 'undefined') ? acc[key] : undefined, obj);
    }

    const currentData = sortedData.slice(startIndex, endIndex);
  

    // Handle page click
    const handlePageClick = (pageNumber: number) => {
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
    <div className='overflow-x-auto lg:overflow-hidden min-w-[1300px]'>
        <div className="relative flex w-full justify-between pr-6 dark:bg-zinc-900/70 bg-zinc-100">
            <div className="flex w-full">
              <div className="h-full w-full flex justify-start items-center py-3 "></div>
              <div className="h-full w-full flex justify-center items-center py-3 pr-4">Ranking</div>
            </div> 
            <div className="h-full w-full flex justify-start items-center pl-2 py-3">Symbol</div>
            <div className="relative h-full w-full flex justify-end items-center py-3 hover:cursor-pointer" onClick={() => handleSort('day.c')}>
                <span>Price</span>
                <span className={`${sortCategory === 'day.c' ? 'absolute -right-5' : 'hidden'} ${sortOrder === 'desc' ? 'rotate-180 transition' : 'rotate-0 transition'}`}><IoMdArrowDropdown size={20}/></span>
            </div>
            <div className="relative h-full w-full flex justify-end items-center py-3 hover:cursor-pointer" onClick={() => handleSort('todaysChange')}>
                <span>Change</span>
                <span className={`${sortCategory === 'todaysChange' ? 'absolute -right-5' : 'hidden'} ${sortOrder === 'desc' ? 'rotate-180 transition' : 'rotate-0 transition'}`}><IoMdArrowDropdown size={20}/></span>
            </div>
            <div className="relative h-full w-full flex justify-end items-center py-3 hover:cursor-pointer" onClick={() => handleSort('todaysChangePerc')}>
                <span>% Change</span>
                <span className={`${sortCategory === 'todaysChangePerc' ? 'absolute -right-5' : 'hidden'} ${sortOrder === 'desc' ? 'rotate-180 transition' : 'rotate-0 transition'}`}><IoMdArrowDropdown size={20}/></span>
            </div>
            <div className="relative h-full w-full flex justify-end items-center py-3 hover:cursor-pointer" onClick={() => handleSort('day.v')}>
                <span>Volume</span>
                <span className={`${sortCategory === 'day.v' ? 'absolute -right-5' : 'hidden'} ${sortOrder === 'desc' ? 'rotate-180 transition' : 'rotate-0 transition'}`}><IoMdArrowDropdown size={20}/></span>
            </div>
            <div className="relative h-full w-full flex justify-end items-center py-3 hover:cursor-pointer" onClick={() => handleSort('marketCap')}>
                <span>Market Cap</span>
                <span className={`${sortCategory === 'marketCap' ? 'absolute -right-5' : 'hidden'} ${sortOrder === 'desc' ? 'rotate-180 transition' : 'rotate-0 transition'}`}><IoMdArrowDropdown size={20}/></span>
            </div>
            <div className="relative h-full w-full flex justify-end items-center py-3 hover:cursor-pointer" onClick={() => handleSort('sma50')}>
                <span>50-Day SMA</span>
                <span className={`${sortCategory === 'sma50' ? 'absolute -right-5' : 'hidden'} ${sortOrder === 'desc' ? 'rotate-180 transition' : 'rotate-0 transition'}`}><IoMdArrowDropdown size={20}/></span>
            </div>
            <div className="relative h-full w-full flex justify-end items-center py-3 hover:cursor-pointer" onClick={() => handleSort('sma200')}>
                <span>200-Day SMA</span>
                <span className={`${sortCategory === 'sma200' ? 'absolute -right-5' : 'hidden'} ${sortOrder === 'desc' ? 'rotate-180 transition' : 'rotate-0 transition'}`}><IoMdArrowDropdown size={20}/></span>
            </div>
        </div>
        {currentData.map((stock, index) => (
          stock ? (
            <Link href={`/ticker/${stock.ticker.ticker}`} key={stock.ticker.ticker}>
          <div key={index} className={`border-y-[.5px] pr-6 dark:border-zinc-700 border-zinc-300 flex w-full justify-between dark:hover:bg-zinc-900/80 hover:bg-zinc-200 hover:cursor-pointer`} >
            <div className="flex w-full">
              <div className={`h-full w-full flex justify-center items-center py-3 font-light`}><IoIosStarOutline size={15}/></div>
              <div className={`h-full w-full flex justify-center  items-center py-3 font-light pr-4`}>{startIndex + index + 1}</div>
            </div>
            <div className={`h-full w-full flex items-center py-3 pl-2 font-semibold`}>{stock?.ticker.ticker}</div>
            <div className={`h-full w-full flex justify-end items-center py-3 font-light`}>
                ${stock?.ticker.day.c !== 0 ? formatNumberString(stock?.ticker.day.c) : formatNumberString(stock?.ticker.prevDay.c)}
            </div>
            <div className={`h-full w-full flex justify-end items-center py-3 font-light ${stock?.ticker.todaysChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {stock?.ticker.todaysChange?.toFixed(2) ?? 'N/A'}
            </div>

            <div className={`h-full w-full flex justify-end items-center py-3 font-light ${stock.ticker.todaysChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>{stock.ticker.todaysChangePerc.toFixed(2)}%</div>
            <div className={`h-full w-full flex justify-end items-center py-3 font-light`}>
                {stock?.ticker.day.v !== 0 ? formatNumber(stock?.ticker.day.v) : formatNumber(stock?.ticker.prevDay.v)}    
            </div>
            <div className={`h-full w-full flex justify-end items-center py-3 font-light`}>{formatNumber(stock.marketCap)}</div>
            <div className={`h-full w-full flex justify-end items-center py-3`}>{formatNumberString(stock.sma50)}</div> 
            <div className={`h-full w-full flex justify-end items-center py-3`}>{formatNumberString(stock.sma200)}</div> 
          </div>
          </Link>
        ) : (
          <div key={`no-data-${index}`}>No data...</div>
        )))}
      <div className="absolute flex end-0 justify-end pt-6 pr-4 2xl:pr-10">
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