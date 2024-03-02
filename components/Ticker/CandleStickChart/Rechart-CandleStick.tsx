'use client'

import { format, getYear, parseISO } from 'date-fns';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, Rectangle } from 'recharts';

// Custom shape for the body of the candlestick
const CandlestickShape = (props) => {
  const { x, y, width, height, payload } = props;
  const [open, close] = payload.open_close;
  const fill = open < close ? 'green' : 'red';
  const newY = open < close ? y : y + height;
  const newHeight = Math.abs(height);

  return <Rectangle fill={fill} x={x - width} y={newY} width={30} height={newHeight} />;
};

// Custom shape for the wick of the candlestick
const WickShape = (props) => {
  const { x, width, payload, y, height } = props;
  const [open, close, high, low] = [...payload.open_close, ...payload.close_high];
  const fill = open < close ? 'green' : 'red';
  const wickX = x + width  ; // Align the wick to the center of the bar
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

export const ReCandleStickChart = ({ data }) => {

  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart data={sortedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="date" />
        <YAxis domain={['dataMin - 10', 'dataMax + 10']} orientation="right" />
        <Tooltip />
        {/* Render the body of the candlestick */}
        <Bar dataKey="close_high"  shape={<WickShape />} />
        <Bar dataKey="open_close" fill="#000000" shape={<CandlestickShape width={18}/>} />
        {/* Render the wick of the candlestick */}
      </BarChart>
    </ResponsiveContainer>
  );
};
