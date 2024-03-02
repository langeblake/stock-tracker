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
    const margin = { top: 70, right: 20, bottom: 50, left: 60 };
    const svgRef = useRef<SVGSVGElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [chartSize, setChartSize] = useState({ width: 0, height: 600 - margin.top - margin.bottom });
    const [tooltipData, setTooltipData] = useState<{ date: Date; value: number; x: number; y: number } | null>(null);

    const updateSize = () => {
        if (containerRef.current) {
            const { width } = containerRef.current.getBoundingClientRect();
            setChartSize({ width: width - margin.left - margin.right, height: 600 - margin.top - margin.bottom });
        }
    };

    useEffect(() => {
        window.addEventListener("resize", updateSize);
        updateSize();
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    useEffect(() => {
        if (!svgRef.current) return; // Guard clause to ensure svgRef is current
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove(); // Clear SVG before redrawing

        const bounds = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

        // Append a transparent rect to capture mouse events over the entire chart area
        bounds.append("rect")
        .attr("width", chartSize.width)
        .attr("height", chartSize.height)
        .attr("fill", "transparent");



        const { width, height } = chartSize;
        const x = d3.scaleTime().range([0, width]);
        const y = d3.scaleLinear().range([height, 0]);

        // Define domains
        const xExtent = d3.extent(data, d => d.date) as [Date, Date];
        const yMax = d3.max(data, d => d.value) as number;

        x.domain(xExtent);
        y.domain([0, yMax]);

        // Axes
        svg.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x));
        svg.append("g").attr("transform", `translate(${width},0)`).call(d3.axisRight(y));

        // Area generator
        const area = d3.area<ChartDataItem>()
            .x(d => x(d.date))
            .y0(height)
            .y1(d => y(d.value));

        // Line generator
        const line = d3.line<ChartDataItem>()
            .x(d => x(d.date))
            .y(d => y(d.value));

        // Append area
        svg.append("path")
            .datum(data)
            .attr("class", "area")
            .attr("d", area)
            .style("fill", "#85bb65")
            .style("opacity", .5);

        // Append line
        svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke", "#85bb65")
            .attr("stroke-width", 1)
            .attr("d", line);

        // Define mouse move handler within the useEffect to ensure it has access to the latest state
        const handleMouseMove = (event) => {
          const [xPos] = d3.pointer(event, svgRef.current);
          const date = x.invert(xPos);
          const index = d3.bisector((d: ChartDataItem) => d.date).left(data, date, 1);
          const d0 = data[index - 1];
          const d1 = data[index];
  
          if (d0 && d1) {
              const d = date.getTime() - d0.date.getTime() > d1.date.getTime() - date.getTime() ? d1 : d0;
  
              setTooltipData({
                  date: d.date,
                  value: d.value,
                  x: x(d.date),
                  y: y(d.value),
              });
          } else {
              setTooltipData(null);
          }
      };
  
      // Attach the event listener for mouse movement and leave
      svg.on("mousemove", handleMouseMove).on("mouseleave", () => setTooltipData(null));
  
      // Clean up event listeners when the component unmounts or when dependencies change
      return () => {
          svg.on("mousemove", null).on("mouseleave", null);
      };
    }, [data, chartSize]); // Dependencies include data and chartSize to redraw when these change

    return (
        <div id="chart-container" ref={containerRef} className='pt-20 flex justify-center' style={{ width: '100%' }}>
            <svg ref={svgRef} width={chartSize.width + margin.left + margin.right} height={chartSize.height + margin.top + margin.bottom}>
                {tooltipData && (
                    <>
                        <circle cx={tooltipData.x} cy={tooltipData.y} r={5} fill="red" />
                        {/* Additional SVG elements for tooltips and lines can be conditionally rendered here based on tooltipData */}
                    </>
                )}
            </svg>
        </div>
    );
};

export default D3AreaChart;
