'use client'

import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
  

export const ReAreaChart = ({ data }) => {
    // A simple tickFormatter that will display the year
    const formatXAxis = (tickItem: string) => {
      // Only extract the year part to display
      return tickItem.split('-')[0];
    };
    
    return (
      <div className='p-20 text-black'>
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
          <XAxis dataKey="name" tickFormatter={formatXAxis} />
          <YAxis orientation="right" dataKey="close" />
          <Tooltip />
          <Area type="monotone" dataKey="close" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  };