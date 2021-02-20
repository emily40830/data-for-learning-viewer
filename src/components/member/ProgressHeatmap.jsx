import React, { useEffect, useState } from 'react';
// import CalendarHeatmap from 'reactjs-calendar-heatmap';
import HeatMapDate from 'react-d3-heatmap';
import { getColorsMapping } from '../../util';

const ProgressHeatmap = ({ memberId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState([]);
  const [minDate, setMinDate] = useState(null);
  const [maxDate, setMaxDate] = useState(null);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch('/member_learning_progress.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const newData = data.filter(
          (eachData) => eachData.member_id === memberId,
        );
        const userProgress = newData.map((eachData) => {
          return {
            date: new Date(eachData.date),
            count: Number(eachData.completed_rate),
          };
        });

        const minDate = Math.min(
          userProgress.map((eachRecord) => eachRecord.date),
        );
        const maxDate = Math.max(
          userProgress.map((eachRecord) => eachRecord.date),
        );

        const colorsMapping = userProgress.map((eachRecord) => {
          return {
            count: eachRecord.count,
            color: getColorsMapping(eachRecord.count),
          };
        });

        setProgress(userProgress);
        setMinDate(minDate);
        setMaxDate(maxDate);
        setColors(colorsMapping);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [memberId]);

  return (
    <div>
      {isLoading ? (
        'loading'
      ) : (
        <DateHeatMap
          data={progress}
          minDate={minDate}
          maxDate={maxDate}
          colors={colors}
        />
      )}
    </div>
  );
};

export default ProgressHeatmap;
