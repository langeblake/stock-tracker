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
  
        // Set up the x scale with proper error handling
        const x = d3.scaleTime()
        .range([0, width]);

        const y = d3.scaleLinear()
        .range([height, 0]);


      
        const xExtent = d3.extent(data.map(d => d.date)) as [Date, Date] | undefined;
        const maxValue = d3.max(data.map(d => d.value)) as number | undefined;
        
        // Check if xExtent and maxValue are defined before using them
        x.domain(xExtent ?? [new Date(), new Date()]); // Providing default dates in case xExtent is null
        y.domain([0, maxValue ?? 0]); // Providing default value in case maxValue is null
    
        
  
        svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .style("font-size", "14px")
        .call(d3.axisBottom(x));
        
        // Add the y-axis
        
        svg.append("g")
        .attr("transform", `translate(${width},0)`)
        .style("font-size", "14px")
        .call(d3.axisRight(y).tickFormat((d: number) => {
            if (isNaN(d)) return "";
            return `$${d.toFixed(2)}`;
      })
    );
    console.log(xExtent)
        // Set up the line generator
    
        const line = d3.line<ChartDataItem>()
        .x(d => x(d.date))
        .y(d => y(d.value));
    
        // Create an area generator
     
        const area = d3.area<ChartDataItem>()
        .x(d => x(d.date))
        .y0(height)
        .y1(d => y(d.value));
    
    
        // Add the area path
        
        svg.append("path")
        .datum(data)
        .attr("class", "area")
        .attr("d", area)
        .style("fill", "#85bb65")
        .style("opacity", .5);
        
        // Add the line path
        svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("fill", "none")
        .attr("stroke", "#85bb65")
        .attr("stroke-width", 1)
        .attr("d", line);

        console.log(data)
    }, [data, chartSize]);
  
   
    return (
        <div id="chart-container" ref={containerRef} className='pt-20 flex justify-center' style={{ width: '100%' }}>
        <svg ref={svgRef} width={chartSize.width + margin.left + margin.right} height={chartSize.height + margin.top + margin.bottom}></svg>
      </div>
        )
  };
  
  export default D3AreaChart;