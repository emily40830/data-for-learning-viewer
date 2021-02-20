import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { formatUserName } from '../../util';
import TableRow from '../table/TableRow';
import TableRowCell from '../table/TableRowCell';
import HeadingItem from '../table/HeadingItem';
import TableHeading from '../table/TableHeading';

const TopUserTable = () => {
  const [users, setUsers] = useState([]);
  const StyledTableContainer = styled.div`
    height: 100%;
    padding: 0 20px;
  `;

  useEffect(() => {
    fetch('/api/top_users', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const newUser = data.map((d) => {
          return { ...d, member_id: formatUserName(d.member_id) };
        });
        setUsers([...newUser]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <StyledTableContainer>
      <TableHeading>
        <HeadingItem>User Id</HeadingItem>
        <HeadingItem>Last viewed Date</HeadingItem>
        <HeadingItem>Viewing hour(hr)</HeadingItem>
      </TableHeading>
      {users.map((user) => {
        return (
          <TableRow key={user.member_id}>
            <TableRowCell>{user.member_id}</TableRowCell>
            <TableRowCell>{user.last_viewing_date}</TableRowCell>
            <TableRowCell>{user.total_viewing_hr}</TableRowCell>
          </TableRow>
        );
      })}
    </StyledTableContainer>
  );
};

export default TopUserTable;
