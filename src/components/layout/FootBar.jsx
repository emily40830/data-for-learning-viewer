import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const StyledClear = styled.div`
  clear: both;
  height: 109px;
  @media screen and (min-width: 720px) {
    display: none;
  }
`;
const StyledNavContainer = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  justify-self: flex-end;
  background-color: var(--background-color-light);
  height: 99px;
  width: 100%;
  align-items: center;
  @media screen and (min-width: 720px) {
    display: none;
  }
`;
const StyledNav = styled.nav`
  display: flex;
  width: 100%;
`;

const StyledNavLink = styled.a`
  flex: 1;
  background-color: var(--background-color-light);
  justify-content: center;
  text-align: center;
  align-items: center;
  cursor: pointer;
`;

const FootBar = () => {
  return (
    <>
      <StyledClear />
      <StyledNavContainer>
        <StyledNav>
          <Link href={`/summary`}>
            <StyledNavLink>summary</StyledNavLink>
          </Link>
          <Link href={`/member`}>
            <StyledNavLink>member</StyledNavLink>
          </Link>
          <Link href={`/course`}>
            <StyledNavLink>course</StyledNavLink>
          </Link>
        </StyledNav>
      </StyledNavContainer>
    </>
  );
};

export default FootBar;
