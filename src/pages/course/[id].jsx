import React from 'react';
import { baseURL } from '../../util';
import Layout from '../../components/layout/Layout';
import styled from 'styled-components';
import { formatCourseName } from '../../util';
import ChartCard from '../../components/common/ChartCard';
import SingleValueCard from '../../components/chart/SingleValueCard';
import { useEffect } from 'react';
import { useState } from 'react';
import contentsInfo from '../../data/content_progress_by_date.json';
import DropRateViewer from '../../components/course/DropRateViewer';
import TimeLineForStackChart from '../../components/course/TimeLineForStackChart';
import IntervalHistogramChart from '../../components/course/IntervalHistogramChart';

const StyledContentValueContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 30px;
  margin: 20px 0;

  @media screen and (max-width: 720px) {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    margin-bottom: 1em;
  }
`;

const StyledChartContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 0;
  @media screen and (max-width: 720px) {
    flex-direction: column;
  }
`;

const StyledTimelinesContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  @media screen and (max-width: 720px) {
    margin-left: 0px;
  }
`;

const StyledChartCard = styled(ChartCard)`
  flex: 1;
  @media screen and (max-width: 720px) {
    margin-bottom: 2rem;
  }
`;

const Course = ({ content, contentId }) => {
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
        <StyledChartCard title="Drop rate exploration" style={{ flex: 1 }}>
          <DropRateViewer contentId={contentId} />
        </StyledChartCard>
        <StyledTimelinesContainer>
          <StyledChartCard title="Completed by time">
            <TimeLineForStackChart contentId={contentId} chartHeight="200" />
          </StyledChartCard>
          <ChartCard title="Interval histogram">
            <IntervalHistogramChart contentId={contentId} />
          </ChartCard>
        </StyledTimelinesContainer>
      </StyledChartContainer>
    </Layout>
  );
};

export default Course;

export const getServerSideProps = async ({ params }) => {
  //const res = await fetch(`${baseURL}content_progress_by_date.json`);
  //const contentsInfo = await res.json();
  console.log('course/:id server side props');
  const content = contentsInfo.filter(
    (contentInfo) => contentInfo.program_content_id === params.id,
  );
  return {
    props: {
      content,
      contentId: params.id,
    },
  };
};
