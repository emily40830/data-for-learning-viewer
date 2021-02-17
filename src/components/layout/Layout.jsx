import React from 'react';
import Sidebar from './Sidebar';
import styled from 'styled-components';
import Head from 'next/head';
import FootBar from './footBar';

const StyledWrapper = styled.div`
  display: flex;

  position: relative;
  text-decoration: none;
`;

const StyledContainer = styled.div`
  padding: 24px 30px;
  height: 100%;
  width: 100%;

  display: grid;
  grid-template-rows: auto 1fr auto;

  max-width: 1100px;
  margin: 0 auto;
  margin-bottom: 100px;
`;

const Layout = ({ title, children }) => {
  return (
    <StyledWrapper>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar />
      <StyledContainer>{children}</StyledContainer>
      <FootBar />
    </StyledWrapper>
  );
};

export default Layout;
