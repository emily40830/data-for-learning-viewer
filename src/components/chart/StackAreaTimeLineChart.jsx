import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import useResizeObserver from "../../hooks/useResizeObserver";
import {
  scaleLinear,
  min,
  max,
  scaleBand,
  axisBottom,
  axisLeft,
  select,
  scaleTime,
  scaleSymlog,
  area,
  timeFormat,
  curveMonotoneX,
  line,
  pointer,
} from "d3";

const margin = { top: 15, right: 20, bottom: 55, left: 35 };
const gridColor = "#AFBABF";
const tickColor = "darkgrey";

const showCircle = (dateString, data, sortBy) => {
  const filteredData = data.filter((course) => course[sortBy] === dateString);
  return filteredData.length === 0 ? false : filteredData[0];
};

const StyledSvg = styled.svg`
  display: block;
  height: 100%;
  width: 100%;
  overflow: visible;
`;

const StackAreaTimeLineChart = ({
  stackKeys,
  stackColors,
  data,
  chartHeight,
  sortBy,
}) => {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    const canvas = select(svgRef.current);
    if (data && stackKeys && stackColors) {
      const { width, height } =
        dimensions || wrapperRef.current.getBoundingClientRect();

      const sortedCourse = [...data].sort((a, b) => {
        return new Date(a[sortBy]) - new Date(b[sortBy]);
      });
      //console.log(sortedCourse);

      // 1. define date range
      const minDate = new Date(
        min(
          sortedCourse.map(
            (courseByTime) => new Date(courseByTime.viewed_date),
          ),
        ),
      );
      const maxDate = new Date(
        max(
          sortedCourse.map(
            (courseByTime) => new Date(courseByTime.viewed_date),
          ),
        ),
      );

      // 2. scale
      const xScale = scaleTime()
        .domain([
          minDate.setDate(minDate.getDate() - 2),
          maxDate.setDate(maxDate.getDate() + 2),
        ])
        .range([0, width]);
      const yScale = scaleSymlog()
        .domain([0, max(sortedCourse.map((d) => d.viewed_cnt))]) //改成不耦合欄位名
        .range([height, 0]);

      // 3. create axis
      // axes
      const xAxis = axisBottom(xScale)
        .tickValues(
          sortedCourse.map((courseByDate) => new Date(courseByDate[sortBy])),
        )
        .tickFormat((d) => timeFormat("%y-%m-%d")(d))
        .tickSize(0 - height)
        .tickPadding(5);
      const xAxiss = canvas
        .select("g.x-axis")
        .attr("transform", `translate(0,${height})`)
        .call(xAxis);

      xAxiss
        .selectAll("text")
        .attr("transform", "translate(0,3)rotate(-40)")
        .style("font-family", "var(--label-font-family)")
        .style("font-size", "8")
        .style("text-anchor", "end")
        .style("fill", `var(--text-color-secondary)`);

      xAxiss
        .selectAll(".tick>line")
        .style("fill", "none")
        .style("stroke", "none")
        .style("shape-rendering", "crispEdges");

      xAxiss.select("path.domain").remove();

      const yAxis = axisLeft(yScale)
        .ticks(5)
        .tickSize(0 - width)
        .tickPadding(6);

      const yAxiss = canvas.select("g.y-axis").call(yAxis);

      yAxiss
        .selectAll("text")
        .style("font-family", "var(--label-font-family)")
        .style("font-size", "8")
        .style("text-anchor", "end")
        .style("fill", `var(--text-color-secondary)`);

      yAxiss
        .selectAll(".tick>line")
        .style("fill", "none")
        .style("stroke", gridColor)
        .style("shape-rendering", "crispEdges");

      yAxiss.select("path.domain").remove();

      // 3. area generator

      // render
      canvas.select(".render-chart").remove();
      const chartArea = canvas.append("g").attr("class", "render-chart");
      //console.log(chartArea);
      for (let stackKey of stackKeys) {
        // 3. area generator
        const AreaGenerator = area()
          .x((d) => {
            return xScale(new Date(d[sortBy]));
          })
          .y0(height)
          .y1((d) => yScale(d[stackKey])) //改成不耦合欄位名
          .curve(curveMonotoneX);

        // console.log(`${stackColors[stackKey]}`);

        chartArea
          .append("path")
          .attr("d", AreaGenerator(sortedCourse))
          .attr("class", "area")
          .transition()
          .attr("fill", `${stackColors[stackKey]}`)
          .attr("fill-opacity", 0.2)
          .attr("stroke", "none");

        // 4. path
        chartArea
          .append("path")
          .attr(
            "d",
            line()
              .x((d) => xScale(new Date(d[sortBy])))
              .y((d) => yScale(d[stackKey]))
              .curve(curveMonotoneX)(sortedCourse),
          )
          .attr("fill", "none")
          .attr("stroke", stackColors[stackKey])
          .attr("stroke-width", 3);
      }
      // 5. tooltips
      canvas.append("line").attr("class", "target-line");

      const tooltipContainer = canvas
        .append("g")
        .attr("class", "tooltip__container")
        .style("display", "none");

      const tooltipContent = tooltipContainer
        .append("rect")
        .attr("class", "tooltip__content")
        .attr("width", 150)
        .attr("height", stackKeys.length * 10 + 20)
        .attr("rx", 5)
        .attr("ry", 5)
        .attr("fill", "darkgrey")
        .attr("fill-opacity", 0.8);

      for (let [index, key] of stackKeys.entries()) {
        const tooltipItem = tooltipContainer
          .append("g")
          .attr("class", `target-hover-group target-hover-group-${key}`);

        tooltipItem
          .append("circle")
          .attr("class", `target-hover-circle target-hover-circle-${key}`);

        tooltipItem
          .append("text")
          .attr("fill", "white")
          .attr("class", `target-hover-text target-hover-text-${key}`)
          .style("font-family", "sans-serif")
          .style("font-size", ".7rem");
      }

      // add vertical line
      canvas
        .append("rect")
        .attr("class", "event__container")
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "none")
        .attr("pointer-events", "all")
        .on("mousemove", (event) => {
          //console.log(d3.pointer(event));
          const x = pointer(event)[0];
          const y = pointer(event)[1];
          const hoveredDate = xScale.invert(x);

          canvas
            .select(".target-line")
            .attr("x1", xScale(hoveredDate))
            .attr("x2", xScale(hoveredDate))
            .attr("y1", 0)
            .attr("y2", height)
            .style("stroke", "var(--text-color)")
            .style("stroke-width", "2px");

          const targetDateString = timeFormat("%Y-%m-%d")(hoveredDate);
          const targetData = showCircle(targetDateString, sortedCourse, sortBy);

          if (targetData) {
            for (let [index, key] of stackKeys.entries()) {
              canvas
                .select(`.target-hover-circle-${key}`)
                .attr("cx", xScale(hoveredDate))
                .attr("cy", yScale(targetData[key]))
                .attr("r", 5)
                .attr("fill", stackColors[key]);

              // 指定文字的位置
              tooltipContainer
                .select(`.target-hover-text-${key}`)
                .attr("x", xScale(hoveredDate) + 18)
                .attr("y", y + 15 + 15 * index)
                .text(`${key}: ${targetData[key]}`);
            }
            tooltipContent.attr("x", xScale(hoveredDate) + 8).attr("y", y);
            tooltipContainer.style("display", "block");
          } else {
            tooltipContainer.style("display", "none");
            for (let key of stackKeys) {
              canvas
                .select(`.target-hover-circle-${key}`)
                .attr("cx", xScale(hoveredDate))
                .attr("cy", yScale(targetData[key]))
                .attr("r", 0)
                .attr("fill", stackColors[key]);

              tooltipContainer.select(`.target-hover-text-${key}`).text(``);
            }
          }
        })
        .on("mouseout", () => {
          tooltipContainer.style("display", "none");
          canvas.select(".target-line").style("stroke-width", "0px");
          canvas.selectAll(".target-hover-circle").attr("r", 0);
          tooltipContainer.selectAll(".target-hover-text").text("");
        });

      return () => {
        //console.log('clean up');
        tooltipContainer.remove();
        canvas.select(".event__container").remove();
        canvas.selectAll(".area").remove();
        canvas.selectAll(".area-path").remove();
        canvas.selectAll(".target-line").remove();
      };
    }
  }, [data, stackKeys, stackColors, dimensions]);

  return (
    <div
      ref={wrapperRef}
      style={{
        height: `${chartHeight ? Number(chartHeight) : 300}px`,
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

export default StackAreaTimeLineChart;
