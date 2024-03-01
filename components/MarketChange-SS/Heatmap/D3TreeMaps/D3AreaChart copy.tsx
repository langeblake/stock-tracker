'use client'

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface ChartDataItem {
  date: Date;
  value: number;
}

interface D3AreaChartProps {
  data: ChartDataItem[];
}

const D3AreaChart: React.FC<D3AreaChartProps> = ({ data }) => {
  const [tooltip, setTooltip] = useState({ display: false, content: "", x: 0, y: 0 });
  const margin = { top: 70, right: 20, bottom: 50, left: 60 };
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null); // Ref for the chart container
  const [chartSize, setChartSize] = useState({ width: 0, height: 600 - margin.top - margin.bottom }); // State for dynamic chart size

  // Update chart size based on container size
  const updateSize = () => {
    if (containerRef.current) {
      const { width } = containerRef.current.getBoundingClientRect();
      setChartSize({ width: width - margin.left - margin.right, height: 600 - margin.top - margin.bottom });
    }
  };

  useEffect(() => {
    window.addEventListener("resize", updateSize);
    updateSize(); // Initial size update

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear SVG before redrawing

    const { width, height } = chartSize;

    // Set up the x and y scales
    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    // Determine the extent of the data
    const xExtent = d3.extent(data, d => d.date) as [Date, Date];
    const maxValue = d3.max(data, d => d.value) as number;

    // Set the domains of the scales
    x.domain(xExtent);
    y.domain([0, maxValue]);

    // Append the axes
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .style("font-size", "14px")
      .call(d3.axisBottom(x));

    svg.append("g")
      .attr("transform", `translate(${width},0)`)
      .style("font-size", "14px")
      .call(d3.axisRight(y).tickFormat(d => `$${d}`));

    // Line generator
    const line = d3.line<ChartDataItem>()
      .x(d => x(d.date))
      .y(d => y(d.value));

    // Area generator
    const area = d3.area<ChartDataItem>()
      .x(d => x(d.date))
      .y0(height)
      .y1(d => y(d.value));

    // Append the area path
    svg.append("path")
      .datum(data)
      .attr("class", "area")
      .attr("d", area)
      .style("fill", "#85bb65")
      .style("opacity", .5);

    // Append the line path
    svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", "#85bb65")
      .attr("stroke-width", 1)
      .attr("d", line);

    // Tooltip circle
    const circle = svg.append("circle")
      .attr("r", 0)
      .attr("fill", "red")
      .style("stroke", "white")
      .attr("opacity", 0.7)
      .style("pointer-events", "none");

    // Tooltip lines
    const tooltipLineX = svg.append("line")
      .attr("class", "tooltip-line")
      .attr("id", "tooltip-line-x")
      .attr("stroke", "red")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "2,2")
      .style("display", "none");

    const tooltipLineY = svg.append("line")
      .attr("class", "tooltip-line")
      .attr("id", "tooltip-line-y")
      .attr("stroke", "red")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "2,2")
      .style("display", "none");

    // Listening rectangle for mouse events
    const listeningRect = svg.append("rect")
      .attr("width", width)
      .attr("height", height)
      .style("fill", "none")
      .style("pointer-events", "all")

// Inside your mousemove event handler
listeningRect.on("mousemove", function(event) {
    const [xCoord] = d3.pointer(event, this);
    const bisectDate = d3.bisector((d: ChartDataItem) => d.date).left;
    const x0 = x.invert(xCoord);
    const i = bisectDate(data, x0, 1);
  
    // Add a guard clause for bounds of the data
    if (i <= 0 || i >= data.length) {
      circle.style("display", "none");
      tooltipLineX.style("display", "none");
      tooltipLineY.style("display", "none");
      setTooltip({ display: false, content: "", x: 0, y: 0 });
      return; // Exit early if out of bounds
    }
  
    const d0 = data[i - 1];
    const d1 = data[i];
    // Choose the closest data point
    const d = x0.getTime() - d0.date.getTime() > d1.date.getTime() - x0.getTime() ? d1 : d0;
    const xPos = x(d.date);
    const yPos = y(d.value);
  
    circle
      .attr("cx", xPos)
      .attr("cy", yPos)
      .style("display", "block"); // Ensure the circle is visible
  
    tooltipLineX
      .attr("x1", xPos)
      .attr("x2", xPos)
      .attr("y1", 0)
      .attr("y2", height)
      .style("display", "block"); // Ensure the line is visible
  
    tooltipLineY
      .attr("y1", yPos)
      .attr("y2", yPos)
      .attr("x1", 0)
      .attr("x2", width)
      .style("display", "block"); // Ensure the line is visible
  
    // Update the tooltip's state for positioning and content
    setTooltip({
      display: true,
      content: `Value: $${d.value.toFixed(2)}`,
      x: event.pageX,
      y: event.pageY
    });
  })
  
  .on("mouseleave", function() {
    circle.style("display", "none");
    tooltipLineX.style("display", "none");
    tooltipLineY.style("display", "none");
    setTooltip({ display: false, content: "", x: 0, y: 0 });
  });
  

  }, [data, chartSize]);

  return (
    <div id="chart-container" ref={containerRef} className='pt-20 flex justify-center' style={{ width: '100%' }}>
      <svg ref={svgRef} width={chartSize.width + margin.left + margin.right} height={chartSize.height + margin.top + margin.bottom}></svg>
      {tooltip.display && (
        <div
          className="tooltip"
          style={{
            display: 'block',
            position: 'absolute',
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            backgroundColor: 'white',
            padding: '8px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            pointerEvents: 'none',
            transform: 'translate(-50%, -100%)', // Adjust as needed
            whiteSpace: 'nowrap'
          }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
};

export default D3AreaChart;


