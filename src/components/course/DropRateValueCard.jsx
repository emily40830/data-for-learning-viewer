import React from 'react';
import styled from 'styled-components';

const StyledDropRateContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 3px;
`;

const DropRateValueCard = ({ dropRate }) => {
  return (
    <StyledDropRateContainer>
      <div style={{ fontSize: '.7rem', paddingLeft: '5px' }}>
        The drop rate of this content is :
      </div>
      <br />
      <div>{dropRate} %</div>
    </StyledDropRateContainer>
  );
};

export default DropRateValueCard;
