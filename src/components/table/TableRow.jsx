import React from "react";
import styled from "styled-components";

const StyledTableRow = styled.div`
  display: flex;
  padding: 20px;

  text-align: center;

  background-color: var(--background-color-light);
  border-radius: 8px;
  margin-bottom: 16px;

  box-shadow: var(--box-shadow);
  font-weight: 500;
  transition: transform 200ms ease-in-out, box-shadow 200ms ease-in-out;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
  }
`;

const TableRow = ({ children }) => {
  return <StyledTableRow>{children}</StyledTableRow>;
};

export default TableRow;
