"use client"

import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { transformDataForTreeMap } from '@/utils/transformDataForTreeMap';

const TreeMapScale = ({ apiData }) => {
  const svgRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 680, height: 580 });
  const [numberOfTickers, setNumberOfTickers] = useState(10); // Default to 10 tickers

  // Function to update the dimensions state based on the container size
  const updateContainerSize = () => {
    if (svgRef.current) {
      const { width, height } = svgRef.current.getBoundingClientRect();
      setContainerSize({ width, height });

      // Adjust number of tickers based on width
      setNumberOfTickers(width > 1200 ? 15 : 10);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', updateContainerSize);
    updateContainerSize(); // Set initial size

    return () => {
      window.removeEventListener('resize', updateContainerSize);
    };
  }, []);

  useEffect(() => {
    if (apiData && containerSize.width && containerSize.height) {
      const transformedData = transformDataForTreeMap(apiData, numberOfTickers);
      renderTreemap(transformedData);
    }
  }, [apiData, containerSize, numberOfTickers]);

  const renderTreemap = (data) => {
    // Use the container size for the treemap dimensions
    const { width, height } = containerSize;
    const svg = d3.select(svgRef.current);
    svg.selectAll('g').remove();
  
    const fader = (color) => d3.interpolateRgb(color, '#00f285')(0.5);
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10.map(fader));

  
    // Process the data
    const root = d3.hierarchy(data)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value);
  
    d3.treemap()
      .size([width, height])
      .padding(1)
      (root);
  
    // Find the range of values in the data
    const minValue = d3.min(root.leaves(), d => d.value);
    const maxValue = d3.max(root.leaves(), d => d.value);
  
    // Define a scale for font sizes
    const fontSizeScale = d3.scaleSqrt()
      .domain([minValue, maxValue])
      .range([12, 32]); // Adjust font size range as needed
  
    // Sort nodes by value to find the top #
    const topFiveValues = root.leaves()
      .sort((a, b) => b.value - a.value)
      .slice(0, 6)
      .map(node => node.value);
  
    
     const gapScale = d3.scaleSqrt()
      .domain([minValue, maxValue])
      .range([1.5, 1.1]); // Adjust this range to control the gap
    

    // Draw rectangles for each node
    const nodes = svg.selectAll('g')
      .data(root.leaves())
      .enter()
      .append('g')
      .attr('transform', d => `translate(${d.x0},${d.y0})`);
    
    nodes.append('rect')
      .attr('width', d => d.x1 - d.x0)
      .attr('height', d => d.y1 - d.y0)
      .attr('fill', d => colorScale(d.data.category));
    
    // Add the name text to each node
    nodes.append('text')
      .attr('x', 10)
      .attr('y', 35) // Initial y position of the name
      .text(d => d.data.name)
      .style("font-weight", "bold")
      .style('font-family', 'Helvetica')
      // .attr('font-size', d => `${fontSizeScale(d.value)}px`)
      .attr('font-size', (d) => {
        const cellWidth = d.x1 - d.x0;
        const cellHeight = d.y1 - d.y0;
        return `${calculateFontSize(cellWidth, cellHeight)}px`;
      })
      .attr('fill', 'white')
      .attr("text-anchor", "start") // Align text to start to fit in smaller cells
      .each(function(d) { // Truncate text to fit in cell
          const self = d3.select(this);
          let textLength = self.node().getComputedTextLength();
          let text = self.text();
          while (textLength > (d.x1 - d.x0 - 6) && text.length > 0) { // Subtract padding or margin as necessary
              text = text.slice(0, -1);
              self.text(`${text}...`);
              textLength = self.node().getComputedTextLength();
          }
      });
    
    // Add the value text only for the top five nodes
    nodes.filter(d => topFiveValues.includes(d.value))
      .append('text')
      .attr('x', 10)
      .attr('y', d => 30 + fontSizeScale(d.value) * gapScale(d.value)) // Calculate gap based on value
      .text(d => `${d.value.toLocaleString()}`)
      // .attr('font-size', d => `${fontSizeScale(d.value)}px`)
      .attr('font-size', (d) => {
        const cellWidth = d.x1 - d.x0;
        const cellHeight = d.y1 - d.y0;
        return `${calculateFontSize(cellWidth, cellHeight)}px`;
      })
      .style('font-family', 'Helvetica')
      .style("font-weight", "bold")
      .attr('fill', 'white')
      .each(function(d) { // Truncate text to fit in cell
        const self = d3.select(this);
        let textLength = self.node().getComputedTextLength();
        let text = self.text();
        while (textLength > (d.x1 - d.x0 - 6) && text.length > 0) { // Subtract padding or margin as necessary
            text = text.slice(0, -1);
            self.text(`${text}...`);
            textLength = self.node().getComputedTextLength();
        }
    });
      
  }
  

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <svg ref={svgRef} width="100%" height="100%" viewBox={`0 0 ${containerSize.width} ${containerSize.height}`} preserveAspectRatio="xMidYMid meet" />
    </div>
  );
};

export default TreeMapScale;
function calculateFontSize(cellWidth: number, cellHeight: number) {
  throw new Error('Function not implemented.');
}

