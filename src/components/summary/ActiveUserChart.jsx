import React, { useState, useEffect } from 'react';
import TimelineStackChart from '../chart/TimelineStackChart';
import styled from 'styled-components';
import { defaultColors } from '../../util';
import Legend from '../common/Legend';

const StyledLegendContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 0 0.5em;
`;
//const defaultColors = ['#F1BFBD', '#EBD9B9', '#BACBA9', '#7184A6', '#C8C1DB'];

const ActiveUserChart = ({ height }) => {
  const [data, setData] = useState([]);
  const [keys, setKeys] = useState([]);
  const [allKeys, setAllKeys] = useState([]);
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
        setAllKeys([...newKeys]);
        const newColors = newKeys.reduce(
          (acc, curr, currIndex) => (
            (acc[curr] = defaultColors[currIndex]), acc
          ),
          {},
        );
        console.log(newColors);
        setColors({ ...newColors });
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ height: `${height}px` }}>
      <TimelineStackChart data={data} keys={keys} colors={colors} height="85" />
      {console.log(keys)}
      <StyledLegendContainer>
        {allKeys.map((legendKey) => {
          return (
            <Legend
              key={legendKey}
              color={colors ? colors[legendKey] : '#fff'}
              title={legendKey}
              isSelect={keys.includes(legendKey)}
              onSelect={(props) => {
                const { isSelect, target } = props;
                //console.log('isSelect', isSelect);
                //console.log('target', target);
                if (isSelect) {
                  setKeys(Array.from(new Set([...keys, target])));
                } else {
                  const FilteredKeys = keys.filter((eachKey) => {
                    return eachKey !== target;
                  });
                  //console.log(FilteredKeys);
                  setKeys(FilteredKeys);
                }
              }}
            />
          );
        })}
      </StyledLegendContainer>
    </div>
  );
};

export default ActiveUserChart;
