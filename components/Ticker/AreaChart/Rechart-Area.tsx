'use client'

import { format, getDate, getMonth, getYear, parseISO } from 'date-fns';
import React, { PureComponent, useCallback, useRef } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Ticker from '../ticker';
import { useTheme } from 'next-themes';


  

export const ReAreaChart = ({ data }) => {
    const { theme } = useTheme(); // 'light' or 'dark'
    // This variable will hold the last year we showed on the x-axis.
    let lastYearShown;

    const tickFormatter = (str) => {
    const date = parseISO(str);
    const year = getYear(date);

    // Check if this tick's year is different from the last one we showed.
    if (year !== lastYearShown) {
        lastYearShown = year; // Update the last year shown.
        return format(date, "yyyy"); // Return the year as a string.
    }
    
    // For all other ticks, return an empty string to not show a label.
    return "";
    };


    return (
      <div className='pt-16 text-black'>
        <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          width={1200}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                <stop offset="50%" stopColor='#2451B7' stopOpacity={0.9}/>
                <stop offset="95%" stopColor='#2451B7' stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="date" 
            axisLine={false}
            tickLine={false}
            tickFormatter={tickFormatter}
          />
          <YAxis 
            orientation="right" 
            dataKey="close" 
            axisLine={false} 
            tickLine={false} 
            tickCount={4} 
            tickFormatter={(number) => `$${number.toFixed(2)}`}
          />
          <Tooltip content={<CustomToolTip active={undefined} payload={undefined} label={undefined} />}/>
          <Area type="monotone" dataKey="close" stroke="#2451B7" fill="url(#color)" />
          <CartesianGrid opacity={0.1} vertical={false} stroke={theme === 'dark' ? "white" : "black"}/>
        </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const CustomToolTip = ({ active, payload, label }) => {
    if (active) {
        return (
            <div className='flex flex-col justify-content items-center gap-2 bg-zinc-900/70 text-white p-4 rounded-lg'>
                <h4 className='font-bold'>{format(parseISO(label), "eeee, d MMM, yyyy")}</h4>
                <p>${payload[0].value.toFixed(2)}</p>
            </div>
        )
    }
  }