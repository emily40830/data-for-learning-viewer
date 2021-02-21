import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  border: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;

  flex: 4;

  color: var(--text-color-secondary);
  font-weight: 500;

  display: flex;
  justify-content: ${(props) => props.justify || 'center'};
  align-items: center;

  text-align: ${(props) => props.align || 'center'};

  @media screen and (max-width: 720px) {
    display: ${(props) => (props.notShowInMobile ? 'none' : 'flex')};
  }
`;

const HeadingButton = ({
  children,
  justify,
  align,
  notShowInMobile,
  onSort,
}) => {
  return (
    <StyledButton
      justify={justify}
      align={align}
      notShowInMobile={notShowInMobile}
      onClick={onSort && onSort()}
    >
      {children}
    </StyledButton>
  );
};

export default HeadingButton;
