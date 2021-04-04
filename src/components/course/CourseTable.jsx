import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from '@material-ui/icons';
import TableHeading from '../table/TableHeading';
import HeadingButton from '../table/HeadingButton';
import TableRow from '../table/TableRow';
import TableRowCell from '../table/TableRowCell';
import { formatCourseName, orderBy } from '../../util/util';

const CourseTable = ({ contents }) => {
  const [direction, setDirection] = useState(null);
  const [sortBy, setSortBy] = useState(null);

  const orderedContents = orderBy(contents, sortBy, direction);

  const StyledIcon = styled.div`
    color: var(--primary-color);

    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 2px;
  `;
  const SortArrow = ({ direction }) => {
    if (!direction) {
      return <></>;
    }
    if (direction === 'desc') {
      return (
        <StyledIcon>
          <KeyboardArrowDownRounded />
        </StyledIcon>
      );
    } else {
      return (
        <StyledIcon>
          <KeyboardArrowUpRounded />
        </StyledIcon>
      );
    }
  };

  const switchDirection = () => {
    if (!direction) {
      setDirection('desc');
    } else if (direction === 'desc') {
      setDirection('asc');
    } else {
      setDirection(null);
    }
  };

  const setValueAndDirection = (value) => {
    switchDirection();
    setSortBy(value);
  };

  return (
    <div>
      <TableHeading>
        <HeadingButton
          align="left"
          justify="flex-start"
          onClick={() => setValueAndDirection('program_content_id')}
        >
          <div>ContentId</div>
          {sortBy === 'program_content_id' && (
            <SortArrow direction={direction} />
          )}
        </HeadingButton>
        <HeadingButton
          notShowInMobile={true}
          onClick={() => {
            console.log('click', 'published_at');
            setValueAndDirection('published_at');
          }}
        >
          <div>Publish time</div>
          {sortBy === 'published_at' && <SortArrow direction={direction} />}
        </HeadingButton>
        <HeadingButton onClick={() => setValueAndDirection('viewed_cnt')}>
          <div>Numbers of viewed</div>
          {sortBy === 'viewed_cnt' && <SortArrow direction={direction} />}
        </HeadingButton>
        <HeadingButton onClick={() => setValueAndDirection('drop_rate')}>
          <div>drop rate</div>
          {sortBy === 'drop_rate' && <SortArrow direction={direction} />}
        </HeadingButton>
      </TableHeading>
      <div style={{ height: '600px', overflowY: 'scroll' }}>
        {orderedContents.map((video) => {
          return (
            <div key={`${video.program_content_id}`}>
              <Link href={`/course/${video.program_content_id}`}>
                <a>
                  <TableRow>
                    <TableRowCell align="left">
                      {formatCourseName(video.program_content_id)}
                    </TableRowCell>
                    <TableRowCell notShowInMobile={true}>
                      {video.published_at}
                    </TableRowCell>
                    <TableRowCell>{video.viewed_cnt}</TableRowCell>
                    <TableRowCell>{video.drop_rate} %</TableRowCell>
                  </TableRow>
                </a>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseTable;
