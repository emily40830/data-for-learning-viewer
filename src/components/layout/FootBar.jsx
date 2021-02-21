import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import ViewListRoundedIcon from '@material-ui/icons/ViewListRounded';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

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
  height: 80px;
  width: 100%;
  align-items: center;

  @media screen and (min-width: 720px) {
    display: none;
  }
`;
const StyledNav = styled.nav`
  display: flex;
  width: 100%;
  padding-top: 5px;
  border-top: 1.5px solid lightgrey;
`;
const StyledNavItem = styled.div`
  height: 70px;
  display: flex;

  align-items: center;
  padding: 0 13px;
  border-right: 1px solid var(--background-color-light);
`;
const StyledNavLink = styled.a`
  flex: 1;
  background-color: var(--background-color-light);
  justify-content: center;
  text-align: center;
  align-items: center;
  cursor: pointer;
  padding-top: 5px;
  h4 {
    margin-top: 1px;
  }
`;

const FootBar = () => {
  return (
    <>
      <StyledClear />
      <StyledNavContainer>
        <StyledNav>
          <Link href={`/summary`}>
            <StyledNavLink>
              <ViewListRoundedIcon />
              <h4>Summary</h4>
            </StyledNavLink>
          </Link>
          <Link href={`/member`}>
            <StyledNavLink>
              <PeopleAltIcon />
              <h4>Members</h4>
            </StyledNavLink>
          </Link>
          <Link href={`/course`}>
            <StyledNavLink>
              <LibraryBooksIcon />
              <h4>Courses</h4>
            </StyledNavLink>
          </Link>
        </StyledNav>
      </StyledNavContainer>
    </>
  );
};

export default FootBar;
