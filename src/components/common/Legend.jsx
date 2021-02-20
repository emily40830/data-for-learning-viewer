import React, { useRef, useEffect } from 'react';
import { select } from 'd3';
import useResizeObserver from '../../hooks/useResizeObserver';

const Legend = ({ title, color }) => {
  const wrapperRef = useRef();
  const svgRef = useRef();

  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    const canvas = select(svgRef.current);
    if ((title, color)) {
      const { width, height } =
        dimensions || wrapperRef.current.getBoundingClientRect();

      const legendArea = canvas.append('g').attr('class', 'legend');
      legendArea
        .append('circle')
        .attr('cx', 30)
        .attr('cy', 30)
        .attr('r', 6)
        .style('fill', color);

      legendArea
        .append('text')
        .attr('x', 30 + 20)
        .attr('y', 30)
        .text(title)
        .attr('alignment-baseline', 'middle')
        .attr('fill', 'var(--label-font-color)')
        .style('font-size', 'var(--label-font-family)');
    }

    return () => {
      canvas.select('g').remove();
    };
  }, [title, color, dimensions]);

  return (
    <div ref={wrapperRef}>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default Legend;
