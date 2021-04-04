import React, { useEffect, useState } from 'react';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import Typography from '@material-ui/core/Typography';

import { getColorsMapping } from '../../util/util';
import { Skeleton } from '@material-ui/lab';

const ProgressHeatmap = ({ memberId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [progresses, setProgresses] = useState([]);
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

        setProgresses(newData);

        //console.log(newData);
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

  // return (
  //   <div>
  //     {isLoading ? (
  //       'loading'
  //     ) : (
  //       <DateHeatMap
  //         data={progress}
  //         minDate={minDate}
  //         maxDate={maxDate}
  //         colors={colors}
  //       />
  //     )}
  //   </div>
  // );
  return (
    <React.Fragment>
      {isLoading ? (
        <div style={{ padding: '20px' }}>
          <Skeleton animation="wave" variant="rect" height={50} />
          <br />
          <Skeleton animation="wave" variant="rect" height={50} />
          <br />
          <Skeleton animation="wave" variant="rect" height={50} />
          <br />
          <Skeleton animation="wave" variant="rect" height={50} />
        </div>
      ) : (
        <Timeline align="left">
          {progresses.map((each, index) => {
            // console.log(
            //   each.completed_rate,
            //   getColorsMapping(each.completed_rate),
            // );
            // if (index % 2 === 0) {
            return (
              <TimelineItem>
                <TimelineOppositeContent>
                  <Typography color="textSecondary">{each.date}</Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color="inherit" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Typography>contents read : {each.content_cnt}</Typography>
                  <Typography>
                    completed_rate: {each.completed_rate} %
                  </Typography>
                </TimelineContent>
              </TimelineItem>
            );
            // } else {
            //   return (
            //     <TimelineItem>
            //       <TimelineOppositeContent>
            //         <Typography color="textSecondary">{each.date}</Typography>
            //       </TimelineOppositeContent>
            //       <TimelineSeparator>
            //         <TimelineDot color="inherit" />
            //         <TimelineConnector />
            //       </TimelineSeparator>
            //       <TimelineContent>
            //         <Typography>contents read : {each.content_cnt}</Typography>
            //         <Typography>
            //           completed_rate: {each.completed_rate} %
            //         </Typography>
            //       </TimelineContent>
            //     </TimelineItem>
            //   );
            // }
          })}
        </Timeline>
      )}
    </React.Fragment>
  );
};

export default ProgressHeatmap;
