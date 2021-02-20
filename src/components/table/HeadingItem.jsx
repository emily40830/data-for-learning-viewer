import React from 'react';
import styled from 'styled-components';

const StyledHeading = styled.div`
  border: none;
  background-color: transparent;
  outline: none;

  flex: 4;

  color: var(--text-color-secondary);
  font-weight: 400;

  display: flex;
  justify-content: ${(props) => props.justify || 'center'};
  align-items: center;

  text-align: ${(props) => props.align || 'center'};

  @media screen and (max-width: 720px) {
    display: ${(props) => (props.notShowInMobile ? 'none' : 'flex')};
  }
`;

const HeadingItem = ({ children, justify, align, notShowInMobile }) => {
  return (
    <StyledHeading
      justify={justify}
      align={align}
      notShowInMobile={notShowInMobile}
    >
      {children}
    </StyledHeading>
  );
};

export default HeadingItem;
