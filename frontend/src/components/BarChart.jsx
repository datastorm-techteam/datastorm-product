import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import styled from "styled-components";
import PropTypes from "prop-types";

const Tooltip = styled.div`
  // position: absolute;
  background: rgba(0, 0, 0, 0.75);
  color: white;
  padding: 6px 10px;
  border-radius: 5px;
  font-size: 14px;
  pointer-events: none; 
  opacity: 0;
  transition: opacity 0.2s;
`;

const BarChart = ({ data }) => {
  const svgRef = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    if (!data.length) return;

    const margin = { top: 40, right: 30, bottom: 50, left: 60 };
    const width = 800 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    // Clear previous SVG before re-rendering
    d3.select(svgRef.current).selectAll("*").remove();

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Set up scales
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.year))
      .range([0, width])
      .padding(0.3);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.statutes)])
      .range([height, 0]);

    // X Axis
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    // Y Axis
    svg.append("g")
      .call(d3.axisLeft(yScale).ticks(5));

    // Select tooltip div
    const tooltip = d3.select(tooltipRef.current);

    // Bars
    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", d => xScale(d.year))
      .attr("y", d => yScale(d.statutes))
      .attr("width", xScale.bandwidth())
      .attr("height", d => height - yScale(d.statutes))
      .attr("fill", "#4CAF50")
      .on("mouseover", (event, d) => {
        tooltip.style("opacity", 1)
          .html(`Year: ${d.year}<br>Statutes: ${d.statutes}`);
      })
      .on("mousemove", (event) => {
        const tooltipWidth = tooltip.node().offsetWidth;
        const tooltipHeight = tooltip.node().offsetHeight;
        
        let x = event.clientX + 10; 
        let y = event.clientY - tooltipHeight - 10; 

        if (x + tooltipWidth > window.innerWidth) {
          x = event.clientX - tooltipWidth - 10;
        }
        if (y < 0) {
          y = event.clientY + 20;
        }

        tooltip.style("left", `${x}px`)
          .style("top", `${y}px`);
      })
      .on("mouseout", () => {
        // tooltip.style("opacity", 0);
      });

  }, [data]);

  return (
    <div className="flex flex-col w-full h-full flex justify-center items-center relative">
      <svg ref={svgRef}></svg>
      <Tooltip ref={tooltipRef} />
    </div>
  );
};

BarChart.propTypes = {
  data: PropTypes.array.isRequired,
};

export default BarChart;
