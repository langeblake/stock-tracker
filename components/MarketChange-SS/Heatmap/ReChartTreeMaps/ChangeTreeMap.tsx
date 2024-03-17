'use client'

import React from 'react'
import { Treemap, ResponsiveContainer } from 'recharts';


const COLORS = {
    positive: '#60d17d', // green for positive values
    negative: '#f07171', // red for negative values
  };
  
const data = [
    {
      children: [
    { name: 'LFWD', size: 710.4965952499585, value: 710.4965952499585 },
    { name: 'VERB', size: 197.0422535211268, value: 197.0422535211268 },
    { name: 'GTI', size: 140.7920792079208, value: 140.7920792079208 },
    {
      name: 'LIAN',
      size: 92.98597194388778,
      value: -92.98597194388778
    },
    { name: 'GERN', size: 91.42857142857143, value: 91.42857142857143 },
    {
      name: 'AEON.WS',
      size: 84.87394957983196,
      value: 84.87394957983196
    },
    {
      name: 'CISS',
      size: 62.65822784810127,
      value: -62.65822784810127
    },
    {
      name: 'BRSHW',
      size: 62.23776223776224,
      value: -62.23776223776224
    },
    {
      name: 'VATEr',
      size: 55.73033707865168,
      value: -55.73033707865168
    },
    {
      name: 'BZFDW',
      size: 46.41068447412355,
      value: -46.41068447412355
    }
      ],
    },
  ];

const ChangeTreeMap = () => {
    return (
        <ResponsiveContainer width="100%" height={500}>
          <Treemap 
            width={400} 
            height={200} 
            data={data} 
            dataKey="size" 
            aspectRatio={4 / 3} 
            stroke="#fff" 
            fill="#8884d8" 
          />
        </ResponsiveContainer>
      );
}

export default ChangeTreeMap