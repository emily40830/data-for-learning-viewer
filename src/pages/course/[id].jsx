import React from 'react';
import { baseURL } from '../../util';
import Layout from '../../components/layout/Layout';
import styled from 'styled-components';
import { formatCourseName } from '../../util';
import ChartCard from '../../components/common/ChartCard';
import SingleValueCard from '../../components/chart/SingleValueCard';
import { useEffect } from 'react';
import { useState } from 'react';

const StyledContentValueContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 30px;
  margin: 20px 0;

  @media screen and (max-width: 720px) {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    margin-bottom: 0;
  }
`;

const StyledChartContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 20px 0;
  @media screen and (max-width: 720px) {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    margin-bottom: 0;
  }
`;

const StyledTimelinesContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  @media screen and (max-width: 720px) {
    margin-left: 0px;
  }
`;

const Course = ({ content }) => {
  // single value
  const sumOftotalviewers =
    content &&
    content.reduce((prev, cur) => {
      return prev + cur.viewed_cnt;
    }, 0);
  const sumOfHalfviewers =
    content &&
    content.reduce((prev, cur) => {
      return prev + cur.completed_half_cnt;
    }, 0);
  const sumOfFullviewers =
    content &&
    content.reduce((prev, cur) => {
      return prev + cur.completed_cnt;
    }, 0);

  return (
    <Layout title="content">
      <StyledContentValueContainer>
        <SingleValueCard title="Total viewers" value={sumOftotalviewers} />
        <SingleValueCard title="Viewed Up to 50%" value={sumOfHalfviewers} />
        <SingleValueCard title="Completeted" value={sumOfFullviewers} />
      </StyledContentValueContainer>
      <StyledChartContainer>
        <ChartCard title="Drop rate exploration"></ChartCard>
        <StyledTimelinesContainer>
          <ChartCard title="Completed by time"></ChartCard>
          <ChartCard title="Interval histogram"></ChartCard>
        </StyledTimelinesContainer>
      </StyledChartContainer>
    </Layout>
  );
};

export default Course;

export const getServerSideProps = async ({ params }) => {
  const res = await fetch(`${baseURL}content_progress_by_date.json`);
  const contentsInfo = await res.json();

  const content = contentsInfo.filter(
    (contentInfo) => contentInfo.program_content_id === params.id,
  );
  return {
    props: {
      content,
    },
  };
};
