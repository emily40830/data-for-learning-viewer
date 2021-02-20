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
  histogram,
  scaleSymlog,
} from 'd3';

const margin = { top: 20, right: 20, bottom: 30, left: 20 };

const StyledSvg = styled.svg`
  display: block;
  height: 100%;
  width: 100%;
  overflow: visible;
`;

const DropRateHistogram = ({
  currentUserDropRate,
  dropRateList,
  chartHeight,
}) => {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    const canvas = select(svgRef.current);

    if (currentUserDropRate !== undefined && dropRateList) {
      // console.log('dropratehist', currentUserDropRate);
      const { width, height } =
        dimensions || wrapperRef.current.getBoundingClientRect();
      // start chart
      const xScale = scaleLinear().domain([0, 100]).range([0, width]);
      const xAxisGenerator = axisBottom(xScale)
        .ticks(5)
        .tickSize(0)
        .tickFormat((d) => `${d} %`);

      const xAxis = canvas
        .select('.x-axis')
        .attr('transform', `translate(0,${height})`)
        .call(xAxisGenerator);

      xAxis
        .selectAll('text')
        .style('font-size', '.6rem')
        .style('font-family', 'var(--label-font-family)')
        .style('text-anchor', 'end')
        .attr('fill', 'darkgray');

      // 改x刻度顏色
      xAxis.selectAll('line').attr('stroke', 'darkgrey');

      // 改x軸顏色
      xAxis.select('path.domain').attr('stroke', 'darkgrey');

      const histogramGenerator = histogram()
        .value((d) => d.drop_rate)
        .domain(xScale.domain())
        .thresholds(xScale.ticks(50));

      const bins = histogramGenerator(dropRateList);

      const yScale = scaleSymlog().range([height, 0]);

      yScale.domain([0, max(bins, (d) => d.length)]);

      const yAxisGenerator = axisLeft(yScale)
        .ticks(4)
        .tickSize(0 - width)
        .tickPadding(5);

      const yAxis = canvas.select('.y-axis').call(yAxisGenerator);

      yAxis
        .selectAll('text')
        .style('font-size', '.6rem')
        .style('font-family', 'var(--label-font-family)')
        .style('text-anchor', 'end')
        .attr('fill', 'darkgray');

      // 改x刻度顏色
      yAxis.selectAll('line').attr('stroke', 'var(--chart-grid-color)');

      // 改x軸顏色
      yAxis.select('path.domain').attr('stroke', 'none');

      // render bars
      const chartArea = canvas.append('g').attr('class', 'drop_rate_hist');
      chartArea
        .selectAll('rect')
        .data(bins)
        .enter()
        .append('rect')
        .attr('class', 'drop_rate_bin')
        .attr('x', 1)
        .attr(
          'transform',
          (d) => `translate(${xScale(d.x0)},${yScale(d.length)})`,
        )
        .attr('width', (d) => {
          //console.log('x1', d.x1);
          //console.log('x0', d.x0);
          return xScale(d.x1) - xScale(d.x0);
        })
        .attr('height', (d) => {
          return height - yScale(d.length);
        })
        .style('fill', 'var(--secondary-color)')
        .style('fill-opacity', 0.7);

      // target rate
      const targetPosition = canvas.append('g').attr('class', 'target__range');

      targetPosition
        .append('line')
        .attr('x1', xScale(currentUserDropRate))
        .attr('x2', xScale(currentUserDropRate))
        .transition()
        .attr('y1', 0)
        .attr('y2', height)
        .attr('stroke', '#124a63');
    }

    return () => {
      canvas.select('g.drop_rate_hist').remove();
      canvas.selectAll('rect.drop_rate_bin').remove();
      canvas.select('.target__range').remove();
    };
  }, [currentUserDropRate, dropRateList, dimensions]);
  return (
    <div
      ref={wrapperRef}
      style={{
        height: chartHeight
          ? Number(chartHeight) + margin.top + margin.bottom
          : 300,
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
  );
};

export default DropRateHistogram;
