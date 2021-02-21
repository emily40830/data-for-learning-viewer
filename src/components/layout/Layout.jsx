import React from 'react';
import Sidebar from './Sidebar';
import styled from 'styled-components';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import FootBar from './FootBar';
import Header from './Header';

Router.onRouteChangeStart = (url) => {
  console.log(url);
  NProgress.start();
};

Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();
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
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
        />
      </Head>
      <Sidebar />
      {/* <Header /> */}
      <StyledContainer>{children}</StyledContainer>
      <FootBar />
    </StyledWrapper>
  );
};

export default Layout;
