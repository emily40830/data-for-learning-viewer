import React from 'react';
import styled from 'styled-components';

const StyledRowContent = styled.div`
  flex: ${(props) => props.flex || 4};
  margin-right: ${(props) => props.mr || 0};
  justify-content: ${(props) => props.align || 'center'};
  text-align: ${(props) => props.align || 'center'};
  img {
    width: 100%;
    border-radius: 2px;
  }

  @media screen and (max-width: 720px) {
    display: ${(props) => (props.notShowInMobile ? 'none' : 'flex')};
  }
`;

const TableRowCell = ({ children, flex, mr, align, notShowInMobile }) => {
  return (
    <StyledRowContent
      flex={flex}
      mr={mr}
      align={align}
      notShowInMobile={notShowInMobile}
    >
      {children}
    </StyledRowContent>
  );
};

export default TableRowCell;
