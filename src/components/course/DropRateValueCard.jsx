import React from 'react';
import styled from 'styled-components';

const StyledDropRateContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DropRateValueCard = ({ dropRate }) => {
  return <StyledDropRateContainer>{dropRate} %</StyledDropRateContainer>;
};

export default DropRateValueCard;
