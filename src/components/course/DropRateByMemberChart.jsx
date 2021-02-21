import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import useResizeObserver from '../../hooks/useResizeObserver';
import {
  scaleLinear,
  min,
  max,
  scaleBand,
  axisBottom,
  axisLeft,
  select,
} from 'd3';

const margin = { top: 20, right: 30, bottom: 70, left: 30 };

const StyledSvg = styled.svg`
  display: block;
  height: 100%;
  width: 100%;
  overflow: visible;
`;

const DropRateByMemberChart = ({ viewedByMembers, chartHeight }) => {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    const canvas = select(svgRef.current);
    //console.log(chartHeight);
    //console.log(viewedByMembers);
    if (viewedByMembers && chartHeight) {
      const { width, height } =
        dimensions || wrapperRef.current.getBoundingClientRect();

      //console.log('height', height);
      //console.log('width', width);
      // Add X axis
      const xScale = scaleLinear()
        .domain([
          min(viewedByMembers.map((row) => row.left)),
          max(viewedByMembers.map((row) => row.right)),
        ])
        .range([0, width]);

      const xAxis = canvas
        .select('.x-axis')
        .attr('transform', 'translate(0,' + chartHeight + ')')
        .call(axisBottom(xScale));

      xAxis
        .selectAll('text')
        .attr('transform', 'translate(-10,0)rotate(-45)')
        .style('text-anchor', 'end')
        .style('fill', 'darkgray');

      // 改x 刻度顏色
      xAxis.selectAll('line').attr('stroke', 'darkgrey');

      // 改x軸顏色
      xAxis.select('path.domain').attr('stroke', 'darkgrey');

      // Add Y axis
      const yScale = scaleBand()
        .domain(viewedByMembers.map((row) => row.member_id))
        .range([0, chartHeight])
        .padding(1);
      const yAxis = canvas
        .select('.y-axis')
        .attr('transform', `translate(${xScale(0)},0)`)
        .call(axisLeft(yScale));
      yAxis.selectAll('text').remove();
      yAxis.selectAll('.tick').remove();
      yAxis.select('path.domain').attr('stroke', 'darkgrey');

      // render
      canvas.select('.render-chart').remove();
      const chartArea = canvas.append('g').attr('class', 'render-chart');

      // Lines
      chartArea
        .selectAll('.course_by_member_line')
        .data(viewedByMembers)
        .enter()
        .append('line')
        .attr('x1', (d) => xScale(d.left))
        .attr('x2', (d) => xScale(d.right))
        .transition()
        .attr('y1', (d) => yScale(d.member_id))
        .attr('y2', (d) => yScale(d.member_id))
        .attr('stroke', 'grey');

      // Circles-left
      chartArea
        .selectAll('.course_by_member_circle_l')
        .data(viewedByMembers)
        .enter()
        .append('circle')
        .attr('cx', (d) => xScale(d.left))
        .attr('cy', (d) => yScale(d.member_id))
        .transition()
        .attr('r', 4)
        .style('fill', '#69b3a2');

      // Circles-right
      chartArea
        .selectAll('.course_by_member_circle_r')
        .data(viewedByMembers)
        .enter()
        .append('circle')
        .attr('cx', (d) => xScale(d.right))
        .attr('cy', (d) => yScale(d.member_id))
        .transition()
        .attr('r', 4)
        .style('fill', 'lightblue');
    }
  }, [viewedByMembers, chartHeight, dimensions]);

  return (
    <>
      <h3>List of numbers of contents by viewers</h3>
      <div
        ref={wrapperRef}
        style={{
          height: `${
            chartHeight ? chartHeight + margin.top + margin.bottom : 300
          }px`,
          width: '100%',
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
    </>
  );
};

export default DropRateByMemberChart;
