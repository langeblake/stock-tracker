"use client"
import { useRef, useEffect } from 'react';
import * as d3 from 'd3';




const TreeMap = ({ data, width, height }) => {
    const svgRef = useRef(null);

    

    function renderTreemap() {
      const svg = d3.select(svgRef.current);
  
      svg.attr('width', width).attr('height', height);
  
      const root = d3
        .hierarchy(data)
        .sum((d) => d.value)
        .sort((a, b) => b.value - a.value);
  
      const treemapRoot = d3.treemap().size([width, height]).padding(1)(root);

      const nodes = svg
      .selectAll('g')
      .data(treemapRoot.leaves())
      .join('g')
      .attr('transform', (d) => `translate(${d.x0},${d.y0})`);

      const fader = (color) => d3.interpolateRgb(color, '#11ed23')(0.3);
      const colorScale = d3.scaleOrdinal(d3.schemeCategory10.map(fader));
  
      nodes
        .append('rect')
        .attr('width', (d) => d.x1 - d.x0)
        .attr('height', (d) => d.y1 - d.y0)
        .attr('fill', (d) => colorScale(d.data.category));

        const fontSize = 12;
  
        nodes
        .append('text')
        .text((d) => `${d.data.name} ${d.data.value}`)
        .attr('data-width', (d) => d.x1 - d.x0)
        .attr('font-size', `${fontSize}px`)
        .attr('x', 3)
        .attr('y', fontSize)
        // .call(wrapText);
    }
  
    useEffect(() => {
      renderTreemap();
    }, [data]);
  
    return (
      <div>
        <svg ref={svgRef} />
      </div>
    );
}
 
export default TreeMap;