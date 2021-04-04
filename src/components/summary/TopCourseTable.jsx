import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { formatCourseName } from '../../util/util';
import TableHeading from '../table/TableHeading';
import TableRow from '../table/TableRow';
import TableRowCell from '../table/TableRowCell';
import HeadingItem from '../table/HeadingItem';
import LoadingTable from '../common/LoadingTable';

const TopCourseTable = () => {
  const [isLoading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const StyledTableContainer = styled.div`
    height: 100%;
    padding: 0 20px;
  `;

  useEffect(() => {
    setLoading(true);
    fetch('/top_course.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const newCourse = data.map((d) => {
          return {
            ...d,
            program_content_id: formatCourseName(d.program_content_id),
          };
        });
        setCourses([...newCourse]);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <StyledTableContainer>
      <TableHeading>
        <HeadingItem>Course Id</HeadingItem>
        <HeadingItem>Publish Date</HeadingItem>
        <HeadingItem>Viewed Count</HeadingItem>
      </TableHeading>
      {isLoading ? (
        <LoadingTable />
      ) : (
        courses.map((course) => {
          return (
            <TableRow key={course.program_content_id}>
              <TableRowCell>{course.program_content_id}</TableRowCell>
              <TableRowCell>{course.published_at}</TableRowCell>
              <TableRowCell>{course.viewed_cnt}</TableRowCell>
            </TableRow>
          );
        })
      )}
    </StyledTableContainer>
  );
};

export default TopCourseTable;
