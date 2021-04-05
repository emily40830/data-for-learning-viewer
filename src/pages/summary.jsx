import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../components/layout/Layout";
import SingleValueCard from "../components/chart/SingleValueCard";
//import ChartContainer from '../components/common/ChartCard';
import ChartCard from "../components/common/ChartCard";
import ActiveUserChart from "../components/summary/ActiveUserChart";
import TopUserTable from "../components/summary/TopUserTable";
import TopCourseTable from "../components/summary/TopCourseTable";

const StyledSummaryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 30px;
  margin: 20px 0;

  @media screen and (max-width: 720px) {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    margin-bottom: 0;
  }
`;

const StyledTimelineContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-bottom: 0;
  margin: 20px 0;
`;

const StyledTopCourseAndMember = styled.div`
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
const getSummaryValues = async () => {
  return [
    {
      title: "Enrolled",
      subtitle: " in course",
      value: "55,000",
      tooltip:
        "總計從平台上線以來註冊的不重複帳號個數(目前為非真實數據結果，僅供參考)",
    },
    {
      title: "Started",
      subtitle: " in course",
      value: "40,300",
      tooltip:
        "總計從平台上線以來，開始學習的人數，以點擊過至少一個content即列入計算(目前為非真實數據結果，僅供參考)",
    },
    {
      title: "Engaged",
      subtitle: " in course",
      value: "10,000",
      tooltip:
        "總計從平台上線以來，有至少一個content閱覽超過80%以上的人數(目前為非真實數據結果，僅供參考)",
    },
    {
      title: "High completed rate",
      subtitle: "",
      value: "85.3",
      tooltip: "",
    },
  ];
};

const Summary = () => {
  const [summaryValues, setSummaryValues] = useState([]);

  useEffect(() => {
    //console.log('effect');
    getSummaryValues()
      .then((values) => {
        //console.log(values);
        setSummaryValues([...values]);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Layout title="summary">
      <div>Summary</div>
      <StyledSummaryContainer>
        {/* {console.log(summaryValues)} */}
        {summaryValues.map((summaryValue) => {
          //console.log('in map', summaryValue);
          return <SingleValueCard key={summaryValue.title} {...summaryValue} />;
        })}
      </StyledSummaryContainer>
      <StyledTimelineContainer>
        <ChartCard title="Active Learners by time">
          <ActiveUserChart height="300" />
        </ChartCard>
      </StyledTimelineContainer>
      <StyledTopCourseAndMember>
        <ChartCard title="Top 10 users">
          <TopUserTable />
        </ChartCard>
        <ChartCard title="Top 10 courses">
          <TopCourseTable />
        </ChartCard>
      </StyledTopCourseAndMember>
    </Layout>
  );
};

export default Summary;
