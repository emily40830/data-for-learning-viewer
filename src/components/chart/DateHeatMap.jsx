import React from 'react';
import HeatMapDate from 'react-d3-heatmap';

const DateHeatMap = ({ data, minDate, maxDate, colors }) => {
  if (data && minDate && maxDate && colors) {
    return (
      <div>
        <HeatMapDate
          data={data}
          startDate={minDate}
          endDate={maxDate}
          colors={colors}
        />
      </div>
    );
  } else {
    return 'Loading ';
  }
};

export default DateHeatMap;
