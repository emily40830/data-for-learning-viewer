import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import ViewListRoundedIcon from '@material-ui/icons/ViewListRounded';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

const LogoArea = styled.div`
  height: 100px;
`;

const StyledNav = styled.nav`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 180px;
  min-height: 100vh;
  background-color: var(--sidebar-background-color);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.38);
  @media screen and (max-width: 720px) {
    display: none;
  }
`;

const StyledNavItem = styled.div`
  height: 70px;
  display: flex;

  align-items: center;
  padding: 0 7px;
  border-bottom: 1px solid var(--background-color-light);
  margin: ;
`;
const StyledNavLink = styled.a`
  display: flex;
  align-items: center;

  cursor: pointer;
  height: fit-content;
  svg {
    width: 35px;
    height: 35px;
    fill: var(--background-color-light);
  }
  h3 {
    margin-left: 5px;
  }
`;

const Sidebar = () => {
  return (
    <StyledNav>
      <LogoArea>LOGO</LogoArea>
      <StyledNavItem>
        <Link href={`/summary`}>
          <StyledNavLink>
            <ViewListRoundedIcon />
            <h3>Summary</h3>
          </StyledNavLink>
        </Link>
      </StyledNavItem>
      <StyledNavItem>
        <Link href={`/member`}>
          <StyledNavLink>
            <PeopleAltIcon />
            <h3>Members</h3>
          </StyledNavLink>
        </Link>
      </StyledNavItem>
      <StyledNavItem>
        <Link href={`/course`}>
          <StyledNavLink>
            <LibraryBooksIcon />
            <h3>Courses</h3>
          </StyledNavLink>
        </Link>
      </StyledNavItem>
    </StyledNav>
  );
};

export default Sidebar;
