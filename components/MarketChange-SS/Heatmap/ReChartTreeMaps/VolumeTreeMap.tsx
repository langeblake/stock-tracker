'use client'

import React from 'react'
import { Treemap, ResponsiveContainer } from 'recharts';


const COLORS = {
    positive: '#60d17d', // green for positive values
    negative: '#f07171', // red for negative values
  };

  const CustomizedContent = (props) => {
    const { x, y, width, height, name, size, actualValue } = props;
    
  
    // Determine fill color based on the sign of the value
    const fillColor = actualValue > 0 ? COLORS.positive : COLORS.negative;
  
    const relativeFontSize = Math.min(width, height) / 5; // Example scaling factor
    const fontWeight = 'bold';

    const formatNumber = (value: number) => {
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
          y={y + height / 2 - relativeFontSize / 2} // Adjust text position based on font size
          textAnchor="middle"
          fill="#fff"
          fontSize={relativeFontSize} // Use calculated font size
          fontWeight={fontWeight}
          dominantBaseline="central" // Vertically center the text
        >
          {name}
        </text>
        {/* Render the formatted absolute value text */}
        <text
          x={x + width / 2}
          y={y + height / 2 + relativeFontSize / 2} // Adjust text position based on font size
          textAnchor="middle"
          fill="#fff"
          fontSize={relativeFontSize * 0.7} // Slightly smaller font size for the value
          dominantBaseline="central" // Vertically center the text
        >
          {formatNumber(size)}
        </text>
      </g>
    );
  };
  
const VolumeTreeMap = ({ data }) => {
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
            animationDuration={150}
          />
        </ResponsiveContainer>
      );
}

export default VolumeTreeMap