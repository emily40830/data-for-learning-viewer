import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import useResizeObserver from "../../hooks/useResizeObserver";

const margin = { top: 20, right: 20, bottom: 30, left: 20 };

const StyledSvg = styled.svg`
  display: block;
  height: 100%;
  width: 100%;
  overflow: visible;
`;

const DateHeatMap = ({ data, minDate, maxDate, colors, cellSize }) => {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    const canvas = select(svgRef.current);
    if (data) {
      const { width, height } =
        dimensions || wrapperRef.current.getBoundingClientRect();
    }
  }, [data, dimensions]);

  return (
    <div
      ref={wrapperRef}
      style={{
        height: `${
          chartHeight ? chartHeight + margin.top + margin.bottom : 300
        }px`,
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

export default DateHeatMap;
