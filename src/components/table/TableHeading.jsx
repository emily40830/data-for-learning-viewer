import React from 'react';
import styled from 'styled-components';
const StyledHeading = styled.div`
  display: flex;
  padding: 20px;
`;

const TableHeading = ({ children }) => {
  return <StyledHeading>{children}</StyledHeading>;
};

export default TableHeading;
