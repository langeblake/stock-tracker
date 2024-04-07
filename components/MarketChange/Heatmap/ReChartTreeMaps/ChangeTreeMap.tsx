"use client";

import React from "react";
import { Treemap, ResponsiveContainer } from "recharts";

const COLORS = {
  positive: "#60d17d", // green for positive values
  negative: "#f07171", // red for negative values
};

const CustomizedContent = (props) => {
  const { x, y, width, height, name, actualValue } = props;

  // Determine fill color based on the sign of the value
  const fillColor = actualValue > 0 ? COLORS.positive : COLORS.negative;

  const relativeFontSize = Math.min(width, height) / 6; // Scaling factor
  const fontWeight = "bold";

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: fillColor, // Use determined fill color
          stroke: "#fff",
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
        {actualValue}%
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
        animationDuration={150}
      />
    </ResponsiveContainer>
  );
};

export default ChangeTreeMap;
