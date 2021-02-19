import React, { useRef, useEffect, useState } from 'react';
import { defaultColors } from '../../util';
import StackAreaTimeLineChart from '../chart/StackAreaTimeLineChart';

const TimeLineForStackChart = ({ contentId, chartHeight }) => {
  const [isLoading, setLoading] = useState(false);
  const [contentViewedBytime, setContentViewedBytime] = useState([]);
  const [keys, setKeys] = useState([]);
  const [colors, setColors] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('/content_progress_by_date.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log('data', data);
        const courseBytime = data.filter(
          (eachData) => eachData.program_content_id === contentId,
        );
        setContentViewedBytime(courseBytime);
        setKeys(['completed_cnt', 'completed_half_cnt', 'viewed_cnt']);
        setColors({
          completed_cnt: defaultColors[3],
          completed_half_cnt: defaultColors[2],
          viewed_cnt: defaultColors[0],
        });
        setLoading(true);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [contentId, chartHeight]);

  return (
    <div style={{ height: `${Number(chartHeight) + 70}px` }}>
      <StackAreaTimeLineChart
        stackKeys={keys}
        stackColors={colors}
        data={contentViewedBytime}
        chartHeight={Number(chartHeight) + 70}
        sortBy="viewed_date"
      />
    </div>
  );
};

export default TimeLineForStackChart;
