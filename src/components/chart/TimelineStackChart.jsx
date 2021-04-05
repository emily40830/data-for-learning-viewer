import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import useResizeObserver from "../../hooks/useResizeObserver";
import {
  select,
  extent,
  max,
  axisBottom,
  axisLeft,
  scaleTime,
  timeFormat,
  line,
  curveBasis,
  scaleSymlog,
} from "d3";

const margin = { top: 20, right: 20, bottom: 30, left: 40 };

const StyledSvg = styled.svg`
  display: block;
  height: 100%;
  width: 100%;
  overflow: visible;
`;
const TimelineStackChart = ({ data, keys, colors, height }) => {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    const canvas = select(svgRef.current);
    if (colors && data && keys) {
      const { width, height } =
        dimensions || wrapperRef.current.getBoundingClientRect();

      // scale
      const xScale = scaleTime()
        .domain(
          extent(data, (d) => {
            return new Date(d.date);
          }),
        )
        .range([0, width]);

      //const maxByKey = keys.map(key=>data)

      const yScale = scaleSymlog()
        .domain([0, max(data, (d) => max([d.start_learners]))])
        .range([height, 0]);

      // render
      canvas.select(".render-chart").remove();
      const chartArea = canvas.append("g").attr("class", "render-chart");
      //canvas.selectAll('.render-line').remove();
      for (let key of keys) {
        //console.log('here!');
        const newData = data
          .map((d) => {
            return { date: d.date, value: d[key] === null ? 0 : d[key] };
          })
          .sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
          });
        //console.log(newData);
        const yAccessor = (d) => d.value;
        const lineGenerator = line()
          .x((d) => xScale(new Date(d.date)))
          .y((d) => yScale(yAccessor(d)))
          .curve(curveBasis);
        //console.log(lineGenerator);

        chartArea
          .append("path")
          .attr("d", lineGenerator(newData))
          .attr("class", "render-line")
          .attr("fill", "none")
          .attr("stroke", colors[key])
          .attr("stroke-width", 1.5)
          .style("mix-blend-mode", "multiply");
      }

      // axis
      const xAxis = axisBottom(xScale)
        .ticks(10)
        .tickSize(2)
        .tickPadding(5)
        .tickFormat(timeFormat("%Y-%m-%d"));
      canvas
        .select(".x-axis")
        .attr("transform", `translate(0,${height})`)
        .call(xAxis)
        .call((g) => g.select(".x-axis>.domain").attr("stroke", "darkgrey"))
        .call((g) =>
          g
            .selectAll(".x-axis>.tick>text")
            .attr("fill", "darkgrey")
            .style("font-size", "8"),
        );

      const yAxis = axisLeft(yScale)
        .tickValues([0, 20, 50, 100, 500, 1000, 2000, 4000])
        .tickSize(0);
      canvas
        .select(".y-axis")
        .call(yAxis)
        .call((g) => g.select(".y-axis>.domain").attr("stroke", "none"))
        .call((g) =>
          g
            .selectAll(".y-axis>.tick>text")
            .attr("fill", "darkgrey")
            .style("font-size", "10"),
        );
    }
  }, [data, colors, keys, dimensions]);

  return (
    <div
      ref={wrapperRef}
      style={{
        height: height ? `${height}%` : "100%",
        width: "100%",
        paddingTop: `${margin.top}px`,
        paddingLeft: `${margin.left}px`,
        paddingRight: `${margin.right}px`,
        paddingBottom: `${margin.bottom}px`,
      }}
    >
      <StyledSvg ref={svgRef}>
        <g className="x-axis"></g>
        <g className="y-axis"></g>
      </StyledSvg>
    </div>
  );
};

export default TimelineStackChart;
