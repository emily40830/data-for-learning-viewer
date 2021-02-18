import React from 'react';
import styled from 'styled-components';
import { defaultColors } from '../../util';
import { useState } from 'react';
import { useEffect } from 'react';

const StyledValueHistContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin: 20px 0;
`;

const StyledChartContainer = styled.div`
  flex: 1;
`;

const DropRateViewer = ({ contentId }) => {
  const [dropRate, setDropRate] = useState(0);
  const [dropRateList, setDropRateList] = useState([]);
  const [viewingRankByMembers, setViewingRankByMembers] = useState([]);

  useEffect(() => {
    fetch(`/api/drop_rank/${contentId}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <StyledValueHistContainer></StyledValueHistContainer>
      <StyledChartContainer></StyledChartContainer>
    </>
  );
};

export default DropRateViewer;
