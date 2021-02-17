import React from 'react';
import styled from 'styled-components';

const StyledCardBody = styled.div`
  height: ${(props) => (props.height ? `${props.height}px` : '70px')};
`;

const ChartContainer = ({ height, children }) => {
  return <StyledCardBody height={height}>{children}</StyledCardBody>;
};

export default ChartContainer;
