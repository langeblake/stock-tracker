"use client"

import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const TreeMap = ({ data, width, height }) => {
    const svgRef = useRef(null);
    const legendRef = useRef(null);
  
    function renderTreemap() {
      const svg = d3.select(svgRef.current);
      svg.selectAll('g').remove();
  
      const legendContainer = d3.select(legendRef.current);
      legendContainer.selectAll('g').remove();
  
      svg.attr('width', width).attr('height', height);
  
      // create root node
      const root = d3
        .hierarchy(data)
        .sum((d) => d.value)
        .sort((a, b) => b.value - a.value);
  
      // create treemap layout
      const treemapRoot = d3.treemap().size([width, height]).padding(1)(root);
  
      // create 'g' element nodes based on data
      const nodes = svg
        .selectAll('g')
        .data(treemapRoot.leaves())
        .join('g')
        .attr('transform', (d) => `translate(${d.x0},${d.y0})`);
  
      // create color scheme and fader
      const fader = (color) => d3.interpolateRgb(color, '#00f285')(0.5);
      const colorScale = d3.scaleOrdinal(d3.schemeCategory10.map(fader));
  
      // add treemap rects
      nodes
        .append('rect')
        .attr('width', (d) => d.x1 - d.x0)
        .attr('height', (d) => d.y1 - d.y0)
        .attr('fill', (d) => colorScale(d.data.category));
  
        
        const fontSize = 12;
        const maxValue = d3.max(data.children, d => d.value);
        const minValue = d3.min(data.children, d => d.value);

        // Define a scale for your font sizes
        const fontSizeScale = d3.scaleSqrt() // scaleSqrt gives a non-linear scale
        .domain([minValue, maxValue]) // Your data's value range
        .range([10, 32]); // The range of font sizes you want to use

        // Sort nodes by value descending and take the top three
        // After computing the treemap layout and sorting the nodes to find the top three
        const topThreeNodes = treemapRoot.leaves()
        .sort((a, b) => b.value - a.value)
        .slice(0, 8);

        // You can create a set for efficient lookup
        const topThreeValues = new Set(topThreeNodes.map(node => node.value));

        nodes
        .append('text')
        // Remove the static font size here, it will be set for each tspan
        .style('fill', 'white')
        .attr('x', 5) // Padding from the left border
        .attr('y', 50) // Padding from the top border
        .selectAll("tspan")
        .data(d => {
            const isTopThree = topThreeValues.has(d.value);
            const fontScaling = isTopThree ? fontSizeScale(d.value) : fontSize;
            return [
            { text: d.data.name, type: 'name', fontSize: fontScaling },
            ...(isTopThree ? [{ text: `${d.data.value.toLocaleString()}`, type: 'value', fontSize: fontScaling }] : [])
            ];
        })
        .join("tspan")
        .attr("x", 16) // Keep tspans aligned with the start of the text
        .attr("dy", (d, i) => i === 0 ? '0' : '1.5em') // Fixed line height for tspan elements
        .style("font-size", d => `${d.fontSize}px`)
        .style("font-weight", d => d.type === 'name' ? 'bold' : 'normal')
        .text(d => d.text);


      
  
      // pull out hierarchy categories
      let categories = root.leaves().map((node) => node.data.category);
      categories = categories.filter(
        (category, index, self) => self.indexOf(category) === index,
      );
  
      legendContainer.attr('width', width).attr('height', height / 4);
  
      // create 'g' elements based on categories
      const legend = legendContainer.selectAll('g').data(categories).join('g');
  
      // create 'rects' for each category
      legend
        .append('rect')
        .attr('width', fontSize)
        .attr('height', fontSize)
        .attr('x', fontSize)
        .attr('y', (_, i) => fontSize * 2 * i)
        .attr('fill', (d: any) => colorScale(d));
  
      // add text to each category key
      legend
        .append('text')
        .attr('transform', `translate(0, ${fontSize})`)
        .attr('x', fontSize * 3)
        .attr('y', (_, i) => fontSize * 2 * i)
        .style('font-size', fontSize)
        .text((d: any) => d);
    }
  
  
    useEffect(() => {
      renderTreemap();
    }, [data]);
  
    return (
      <div>
        <svg ref={svgRef} viewBox="0 0 700 600" preserveAspectRatio="xMidYMid meet" />

      </div>
    );
}
 
export default TreeMap;