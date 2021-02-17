import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const StyledNav = styled.nav`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100px;
  min-height: 100vh;
  background-color: var(--sidebar-background-color);

  @media screen and (max-width: 720px) {
    display: none;
  }
`;

const StyledNavItem = styled.div`
  margin: 1rem;
`;

const Sidebar = () => {
  return (
    <StyledNav>
      <Link href={`/summary`}>
        <StyledNavItem>summary</StyledNavItem>
      </Link>
      <Link href={`/member`}>
        <StyledNavItem>member</StyledNavItem>
      </Link>
      <Link href={`/course`}>
        <StyledNavItem>course</StyledNavItem>
      </Link>
    </StyledNav>
  );
};

export default Sidebar;
