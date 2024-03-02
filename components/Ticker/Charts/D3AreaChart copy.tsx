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

  interface TooltipData {
    display: boolean;
    content: string;
    x: number;
    y: number;
    circle?: {
      cx: number;
      cy: number;
      r: number;
    };
    xLine?: {
      x1: number;
      x2: number;
      y1: number;
      y2: number;
    };
    yLine?: {
      x1: number;
      x2: number;
      y1: number;
      y2: number;
    };
  }
  

  const D3AreaChart: React.FC<D3AreaChartProps> = ({ data }) => {
    const margin = { top: 70, right: 20, bottom: 50, left: 60 };
    const [tooltip, setTooltip] = useState<TooltipData>({
        display: false,
        content: "",
        x: 0,
        y: 0,
        // Initially, the circle and lines are not defined (they could be set to a default state if preferred)
      });

    const svgRef = useRef<SVGSVGElement>(null);
    const containerRef = useRef<HTMLDivElement>(null); // Ref for the chart container

    // Refs for the interactive elements
    const circleRef = useRef<SVGCircleElement>(null);
    const lineXRef = useRef<SVGLineElement>(null);
    const lineYRef = useRef<SVGLineElement>(null);

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
  
        const xExtent = d3.extent(data, d => d.date) as [Date, Date];
        const yMax = d3.max(data, d => d.value) as number;
        
        const x = d3.scaleTime()
          .domain(xExtent ?? [new Date(), new Date()]) // Fallback to a default domain if undefined
          .range([0, chartSize.width]);
        
        const y = d3.scaleLinear()
          .domain([0, yMax ?? 0]) // Fallback to a default domain if undefined
          .range([chartSize.height, 0]);
        
        // Check if xExtent and maxValue are defined before using them
        x.domain(xExtent ?? [new Date(), new Date()]); // Providing default dates in case xExtent is null
        y.domain([0, yMax ?? 0]); // Providing default value in case maxValue is null
    
        
  
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

            // Circle for the interactive point
        const circle = d3.select(circleRef.current)
        .attr("r", 5)
        .style("fill", "red")
        .style("stroke", "white")
        .style("opacity", 0.7)
        .style("pointer-events", "none");

        // Lines for the interactive crosshair
        const lineX = d3.select(lineXRef.current)
        .style("stroke", "red")
        .style("stroke-width", "1")
        .style("stroke-dasharray", "3,3");

        const lineY = d3.select(lineYRef.current)
        .style("stroke", "red")
        .style("stroke-width", "1")
        .style("stroke-dasharray", "3,3");

            // Rectangle to capture mouse movements
        const listeningRect = svg.append("rect")
        .attr("width", width)
        .attr("height", height);
      

        // Mouse move event
        listeningRect.on("mousemove", function(event) {
            const [xCoord] = d3.pointer(event, this);
            const bisectDate = d3.bisector((d: ChartDataItem) => d.date).left;
            const x0 = x.invert(xCoord);
            const i = bisectDate(data, x0, 1);
            const d0 = data[i - 1];
            const d1 = data[i];
            const d = x0.getTime() - d0.date.getTime() > d1.date.getTime() - x0.getTime() ? d1 : d0;
            const xPos = x(d.date);
            const yPos = y(d.value);
        
            // Update the positions of the circle and lines
            circle.attr("cx", xPos).attr("cy", yPos).attr("display", null);
            lineX.attr("x1", xPos).attr("x2", xPos).attr("y1", 0).attr("y2", height).attr("display", null);
            lineY.attr("x1", 0).attr("x2", width).attr("y1", yPos).attr("y2", yPos).attr("display", null);

            // Update the tooltip state
            setTooltip({
                display: true,
                content: `$${d.value.toFixed(2)}`,
                x: event.pageX, // Adjust based on the event and element positions
                y: event.pageY, // Adjust based on the event and element positions
                circle: {
                  cx: x(d.date), // Use your x scale to get the position
                  cy: y(d.value), // Use your y scale to get the position
                  r: 5, // The radius of the circle
                },
                xLine: {
                  x1: x(d.date), // Start of the line on the x-axis
                  x2: x(d.date), // End of the line on the x-axis
                  y1: 0, // Start of the line on the y-axis
                  y2: y(d.value), // End of the line on the y-axis
                },
                yLine: {
                  x1: 0, // Start of the line on the x-axis
                  x2: width, // End of the line on the x-axis (full width)
                  y1: y(d.value), // Start of the line on the y-axis
                  y2: y(d.value), // End of the line on the y-axis
                },
              });
        });

        listeningRect.on("mouseleave", function() {
            // Hide the circle and lines
            circle.attr("display", "none");
            lineX.attr("display", "none");
            lineY.attr("display", "none");

            // Hide the tooltip
            setTooltip(prev => ({ ...prev, display: false }));
        });

    }, [data, chartSize]);
  
   
    return (
        <div id="chart-container" ref={containerRef} className='pt-20 flex justify-center' style={{ width: '100%' }}>
        <svg ref={svgRef} width={chartSize.width + margin.left + margin.right} height={chartSize.height + margin.top + margin.bottom}>
          {/* The rest of your chart elements, like axes and area path, go here */}
          
          {/* Tooltip elements */}
          {tooltip.display && (
            <>
              <circle
                cx={tooltip.circle?.cx}
                cy={tooltip.circle?.cy}
                r={5}
                fill='red'
                stroke='white'
                strokeWidth='2'
              />
              <line
                x1={tooltip.xLine?.x1}
                y1={0}
                x2={tooltip.xLine?.x2}
                y2={chartSize.height}
                stroke='red'
                strokeWidth='1'
                strokeDasharray='3,3'
              />
              <line
                x1={0}
                y1={tooltip.yLine?.y1}
                x2={chartSize.width}
                y2={tooltip.yLine?.y2}
                stroke='red'
                strokeWidth='1'
                strokeDasharray='3,3'
              />
            </>
          )}
        </svg>
        {/* Tooltip div for displaying value */}
        {tooltip.display && (
          <div
            className="tooltip"
            style={{
              position: 'absolute',
              left: `${tooltip.x}px`,
              top: `${tooltip.y}px`,
              padding: '5px',
              backgroundColor: 'rgb(11, 40, 65)',
              color: 'white',
              border: '1px solid white',
              borderRadius: '4px',
              fontSize: '14px',
              pointerEvents: 'none',
              opacity: 0.75,
              display: 'block',
              transform: 'translate(-50%, -100%)',
              zIndex: 10
            }}
          >
            {tooltip.content}
          </div>
        )}
      </div>
      );
      
  };
  
  export default D3AreaChart;