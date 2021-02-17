import React, { useState, useEffect } from 'react';
import TimelineStackChart from '../chart/TimelineStackChart';
import styled from 'styled-components';
import { defaultColors } from '../../util';

const StyledLegendContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0 0.5em;
`;
//const defaultColors = ['#F1BFBD', '#EBD9B9', '#BACBA9', '#7184A6', '#C8C1DB'];

const ActiveUserChart = ({ height }) => {
  const [data, setData] = useState([]);
  const [keys, setKeys] = useState([]);
  const [colors, setColors] = useState();

  useEffect(() => {
    //console.log('in active user effect');
    fetch('/summary_timeline.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        //console.log(data);
        //console.log(Object.keys(data[0]).slice(1));
        setData([...data]);
        const newKeys = Object.keys(data[0]).slice(1);
        setKeys([...newKeys]);

        const newColors = newKeys.reduce(
          (acc, curr, currIndex) => (
            (acc[curr] = defaultColors[currIndex]), acc
          ),
          {},
        );
        setColors({ ...newColors });
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ height: `${height}px` }}>
      <TimelineStackChart data={data} keys={keys} colors={colors} height="85" />
      <StyledLegendContainer></StyledLegendContainer>
    </div>
  );
};

export default ActiveUserChart;
