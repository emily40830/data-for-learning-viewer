import React, { useRef, useEffect } from 'react';
import { select } from 'd3';
import useResizeObserver from '../../hooks/useResizeObserver';
import styled from 'styled-components';

const unClickColor = 'lightgrey';

const StyledButton = styled.button`
  background-color: white;
  border: 0px;
`;

const Legend = ({ title, color, isSelect, onSelect }) => {
  const wrapperRef = useRef();
  const svgRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    const canvas = select(svgRef.current);
    if ((title, color)) {
      const { width, height } =
        dimensions || wrapperRef.current.getBoundingClientRect();
      console.log(width, height);
      const legendArea = canvas.append('g').attr('class', 'legend');
      legendArea
        .append('circle')
        .attr('cx', 15)
        .attr('cy', 15)
        .attr('r', 6)
        .style('fill', isSelect ? color : unClickColor);

      legendArea
        .append('text')
        .attr('x', 15 + 20)
        .attr('y', 15)
        .text(title)
        .attr('alignment-baseline', 'middle')
        .attr('fill', isSelect ? 'var(--label-font-color)' : unClickColor)
        .style('font-size', 'var(--label-font-family)');
    }

    return () => {
      canvas.select('g').remove();
    };
  }, [title, color, dimensions, isSelect]);

  return (
    <StyledButton
      onClick={() => {
        onSelect && onSelect({ isSelect: !isSelect, target: title });
      }}
    >
      <div style={{ height: '30px' }} ref={wrapperRef}>
        <svg height="30px" ref={svgRef}></svg>
      </div>
    </StyledButton>
  );
};

export default Legend;
