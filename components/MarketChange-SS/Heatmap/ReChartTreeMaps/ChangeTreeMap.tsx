'use client'

import React from 'react'
import { Treemap, ResponsiveContainer } from 'recharts';

// const data = [
//     {
//       children: [
//     { name: 'HELLO', size: 710.4965952499585, actualValue: 710.4965952499585 },
//     { name: 'VERB', size: 197.0422535211268, actualValue: 197.0422535211268 },
//     { name: 'GTI', size: 140.7920792079208, actualValue: 140.7920792079208 },
//     {
//       name: 'LIAN',
//       size: 92.98597194388778,
//       actualValue: -92.98597194388778
//     },
//     { name: 'GERN', size: 91.42857142857143, actualValue: 91.42857142857143 },
//     {
//       name: 'AEON.WS',
//       size: 84.87394957983196,
//       actualValue: 84.87394957983196
//     },
//     {
//       name: 'CISS',
//       size: 62.65822784810127,
//       actualValue: -62.65822784810127
//     },
//     {
//       name: 'BRSHW',
//       size: 62.23776223776224,
//       actualValue: -62.23776223776224
//     },
//     {
//       name: 'VATEr',
//       size: 55.73033707865168,
//       actualValue: -55.73033707865168
//     },
//     {
//       name: 'BZFDW',
//       size: 46.41068447412355,
//       actualValue: -46.41068447412355
//     }
//       ],
//     },
//   ];

const COLORS = {
    positive: '#60d17d', // green for positive values
    negative: '#f07171', // red for negative values
  };

  const CustomizedContent = (props) => {
    const { x, y, width, height, name, actualValue } = props;
    
  
    // Determine fill color based on the sign of the value
    const fillColor = actualValue > 0 ? COLORS.positive : COLORS.negative;
  
    // Format the absolute value for display (optional)
  
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: fillColor, // Use determined fill color
            stroke: '#fff',
            strokeWidth: 2,
          }}
        />
        {/* Render the name text */}
        <text
          x={x + width / 2}
          y={y + height / 2}
          textAnchor="middle"
          fill="#fff"
          fontSize={14}
          dominantBaseline="central" // Vertically center the text
        >
          {name}
        </text>
        {/* Render the formatted absolute value text */}
        <text
          x={x + width / 2}
          y={y + height / 2 + 20} // Offset the y position to render below the name
          textAnchor="middle"
          fill="#fff"
          fontSize={12}
          dominantBaseline="central" // Vertically center the text
        >
          {actualValue}
        </text>
      </g>
    );
  };
  
const ChangeTreeMap = ({ data }) => {
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
            content={<CustomizedContent colors={COLORS} />}
          />
        </ResponsiveContainer>
      );
}

export default ChangeTreeMap