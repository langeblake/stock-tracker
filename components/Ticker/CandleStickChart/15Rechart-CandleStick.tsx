'use client'

import { format, getMonth, getYear, parseISO } from 'date-fns';
import { useTheme } from 'next-themes';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, Rectangle, CartesianGrid } from 'recharts';

// Custom shape for the body of the candlestick
const CandlestickShape = (props) => {
  const { x, y, width, height, payload } = props;
  const [open, close] = payload.open_close;
  const fill = open < close ? 'rgba(0, 209, 42)' : 'rgba(255, 0, 0)';
  const newY = open < close ? y : y + height;
  const newHeight = Math.abs(height);

  return <Rectangle fill={fill} x={(x) - width * 3.4} y={newY} width={60} height={newHeight} />;
};

// Custom shape for the wick of the candlestick
const WickShape = (props) => {
  const { x, width, payload, y, height } = props;
  const [open, close, high, low] = [...payload.open_close, ...payload.low_high];
  const fill = open < close ? 'rgba(30, 255, 0)' : 'rgba(255, 0, 0)';
  const wickX = (x + 2)+ width; // Align the wick to the center of the bar
  const wickStrokeWidth = 1; // Thin wick line

  // Calculate top and bottom Y positions based on the scale of YAxis
  const topY = y + Math.max(height - (high - Math.max(open, close)), 0);
  const bottomY = y + height + Math.max(Math.min(open, close) - low, 0);

  return (
    <g>
      <line x1={wickX} y1={y} x2={wickX} y2={topY} stroke={fill} strokeWidth={wickStrokeWidth} />
      <line x1={wickX} y1={y + height} x2={wickX} y2={bottomY} stroke={fill} strokeWidth={wickStrokeWidth} />
    </g>
  );
};

const CustomToolTip = ({ active, payload, label }) => {
  if (active && payload) {
    const data = payload.reduce((acc, entry) => ({ ...acc, ...entry.payload }), {});
    
    // Now data should have the properties { date, open_close, low_high } with the appropriate values
    const { open_close, low_high } = data;
    const [open, close] = open_close;
    const [low, high] = low_high;

    // Format the label correctly as a date
    const dateLabel = format(parseISO(label), "eeee, MMM d, yyyy");

    return (
      <div className='flex flex-col justify-content items-center gap-2 bg-zinc-900/60 text-white p-4 rounded-lg'>
        <h4 className='font-bold'>{dateLabel}</h4>
        <div className='flex flex-col'>
          <div className='w-28 flex justify-between'>
            <p className='font-bold'>Close</p>
            <p>{close?.toFixed(2)}</p>
          </div>
          <div className='w-28 flex justify-between'>
            <p className='font-bold'>Open</p>
            <p>{open?.toFixed(2)}</p>
          </div>
          <div className='w-28 flex justify-between'>
          <p className='font-bold'>High</p>
          <p>{high?.toFixed(2)}</p>
          </div>
          <div className='w-28 flex justify-between'>
            <p className='font-bold'>Low</p>
            <p>{low?.toFixed(2)}</p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};


export const FifteenReCandleStickChart = ({ data }) => {
  const { theme } = useTheme(); // 'light' or 'dark'

  const sortedData = [...data].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateA - dateB;
  });
  
  let lastMonthShown: number;

  const XAxistickFormatter = (str: string) => {
  const date = parseISO(str);
  const year = getMonth(date);

  // Check if this tick's year is different from the last one we showed.
  if (year !== lastMonthShown) {
      lastMonthShown = year; // Update the last year shown.
      return format(date, "MMM, d"); // Return the year as a string.
  }
  
  // For all other ticks, return an empty string to not show a label.
  return "";
  };

  // const roundToNearestTen = (num) => Math.round(num / 10) * 10;
  // const YAxisTickFormatter = (tick) => {
  //   const roundedTick = roundToNearestTen(tick);
  //   return roundedTick.toString();
  // };

  const maxValue = Math.max(...data.map((d) => d.low_high[1])); // Replace with your actual way to get the max value
  const minValue = Math.min(...data.map((d) => d.low_high[0])); // Replace with your actual way to get the min value

  const roundedMax = Math.ceil(maxValue / 10) * 10;
  const roundedMin = Math.floor(minValue / 10) * 10;

  // The number of intervals you want between ticks
  const intervalCount = (roundedMax - roundedMin) / 10; 

  return (
    <div className='overflow-x-auto lg:overflow-hidden'>
    <ResponsiveContainer width="100%" minWidth={1000} height={500}>
      <BarChart data={sortedData} margin={{ top: 20, right: 0, left: 0, bottom: 5 }}>
        <XAxis 
          dataKey="date" 
          // tickFormatter={XAxistickFormatter}
          tickFormatter={str => {
            const date = parseISO(str);
            return format(date, "MMM, d")
          }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis 
          domain={[roundedMin, roundedMax]} 
          orientation="right" 
          tickLine={false}
          axisLine={false}
          tickCount={intervalCount + 1}
        />
        <Tooltip 
          content={<CustomToolTip active={undefined} payload={undefined} label={undefined} />} 
          cursor={{ fill: 'rgba(140, 140, 140, 0.3)' }} // Style the cursor as needed
          offset={30}
          
        />
        {/* Render the body of the candlestick */}
        <Bar dataKey="low_high"  shape={<WickShape />} />
        <Bar dataKey="open_close"  shape={<CandlestickShape width={9}/>} />
        <CartesianGrid opacity={0.2} vertical={false} stroke={theme === 'dark' ? "white" : "black"} />
      </BarChart>
    </ResponsiveContainer>
    </div>
  );
};
