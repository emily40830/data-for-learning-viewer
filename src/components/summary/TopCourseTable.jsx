import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { formatCourseName } from '../../util';
import TableRow from '../table/TableRow';
import TableRowCell from '../table/TableRowCell';

const TopCourseTable = () => {
  const [courses, setCourses] = useState([]);
  const StyledTableContainer = styled.div`
    height: 100%;
  `;

  useEffect(() => {
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
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <StyledTableContainer>
      {courses.map((course) => {
        return (
          <TableRow key={course.program_content_id}>
            <TableRowCell>{course.program_content_id}</TableRowCell>
            <TableRowCell>{course.published_at}</TableRowCell>
            <TableRowCell>{course.viewed_cnt}</TableRowCell>
          </TableRow>
        );
      })}
    </StyledTableContainer>
  );
};

export default TopCourseTable;

const StyledHeading = styled.div`
  display: flex;
  padding: 20px;
`;
