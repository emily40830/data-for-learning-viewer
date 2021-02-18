import React from 'react';
import styled from 'styled-components';
import { defaultColors } from '../../util';
import { useState } from 'react';
import { useEffect } from 'react';
import { rollup, sum } from 'd3';
import DropRateValueCard from './DropRateValueCard';
import DropRateHistogram from './DropRateHistogram';
import DropRateByMemberChart from './DropRateByMemberChart';

const StyledValueHistContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin: 20px 0;
`;

const StyledChartContainer = styled.div`
  flex: 1;
  height: 100%;
`;

const DropRateViewer = ({ contentId }) => {
  const [isLoading, setLoading] = useState(false);

  const [chartHeight, setChartHeight] = useState(0);

  const [dropRate, setDropRate] = useState(0);
  const [dropRateList, setDropRateList] = useState([]);
  const [viewingRankByMembers, setViewingRankByMembers] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/drop_rank`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // dropRateList
        const addIsDrop = data.map((d) => {
          return { ...d, is_drop: d.viewing_rank === 0 ? 1 : 0 };
        });
        const groupByprogram = rollup(
          addIsDrop,
          (v) => {
            return {
              drop_cnt: sum(v, (d) => d.is_drop),
              total_cnt: v.length,
            };
          },
          (d) => d.program_content_id,
        );

        const contentList = Array.from(groupByprogram).map((each) => {
          return {
            program_content_id: each[0],
            ...each[1],
          };
        });
        const contentsDropRate = contentList.map((content) => {
          return {
            ...content,
            drop_rate: Number(
              ((content.drop_cnt / content.total_cnt) * 100).toFixed(2),
            ),
          };
        });
        setDropRateList(contentsDropRate);
        // current drop rate
        const targetContent = contentsDropRate.filter(
          (content) => content.program_content_id === contentId,
        );
        if (targetContent.length > 1) {
          const currDropRate = targetContent[0].drop_rate;
          setDropRate(currDropRate);
        }

        // viewingRankByMembers
        const rankBycourse = data.filter(
          (eachData) => eachData.program_content_id === contentId,
        );

        const newData = rankBycourse.map((eachData) => {
          return {
            ...eachData,
            left: eachData.viewing_rank - eachData.max_view_cnt,
            right: eachData.viewing_rank,
          };
        });

        const heights = newData.length * 25 + 10;

        setViewingRankByMembers(newData);
        setChartHeight(heights);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        //  todo: error component
        console.log(err);
      });
  }, []);

  return (
    <>
      <StyledValueHistContainer>
        <DropRateValueCard dropRate={dropRate} />
        <DropRateHistogram
          currentUserDropRate={dropRate}
          dropRateList={dropRateList}
        />
      </StyledValueHistContainer>
      <StyledChartContainer>
        <DropRateByMemberChart
          viewedByMembers={viewingRankByMembers}
          chartHeight={chartHeight}
        />
      </StyledChartContainer>
    </>
  );
};

export default DropRateViewer;
