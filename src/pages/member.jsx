import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Layout from '../components/layout/Layout';
import SearchInput from '../components/common/SearchInput';
import TableHeading from '../components/table/TableHeading';
import HeadingButton from '../components/table/HeadingButton';
import TableRow from '../components/table/TableRow';
import TableRowCell from '../components/table/TableRowCell';
import { formatUserName } from '../util/util';
import LoadingTable from '../components/common/LoadingTable';

const StyledInputContainer = styled.div`
  margin-bottom: 40px;
  @media screen and (min-width: 720px) {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    .input {
      flex: 2;
    }
  }
`;

const StyledCount = styled.div`
  margin: 12px 0;
  color: var(--text-color-secondary);
  @media screen and (min-width: 720px) {
    flex: 1;
  }
`;

const member = () => {
  const [isLoading, setLoading] = useState(false);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch('/user_list.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setMembers([...data]);
        setLoading(false);
        // const newUser = data.map((d) => {
        //   return { ...d, member_id: formatUserName(d.member_id) };
        // });
        // setMembers([...newUser]);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  //const [keyword,]
  return (
    <Layout title="members">
      <div>Members</div>
      <StyledInputContainer>
        <StyledCount>Found {members.length} members</StyledCount>
        <div className="input">
          <SearchInput placeholder="Filter by name" onChange={() => {}} />
        </div>
      </StyledInputContainer>
      <div>
        <TableHeading>
          <HeadingButton
            align="left"
            justify="flex-start"
            // onClick={() => setValueAndDirection('name')}
          >
            <div>UserId</div>
            {/* {value === 'name' && <SortArrow direction={direction} />} */}
          </HeadingButton>
          <HeadingButton
            notShowInMobile={true}
            // onClick={() => setValueAndDirection('population')}
          >
            <div>Register time</div>
            {/* {value === 'population' && <SortArrow direction={direction} />} */}
          </HeadingButton>
          <HeadingButton notShowInMobile={true}>
            <div>Last login time</div>
          </HeadingButton>
          <HeadingButton>
            <div>completed_rate</div>
          </HeadingButton>
        </TableHeading>
        <div style={{ height: '600px', overflowY: 'scroll' }}>
          {isLoading ? (
            <LoadingTable />
          ) : (
            members.map((member) => {
              return (
                <div key={`memberRow-${member.member_id}`}>
                  <Link href={`/member/${member.member_id}`}>
                    <a>
                      <TableRow>
                        <TableRowCell align="left">
                          {formatUserName(member.member_id)}
                        </TableRowCell>
                        <TableRowCell notShowInMobile={true}>
                          {member.created_at}
                        </TableRowCell>
                        <TableRowCell notShowInMobile={true}>
                          {member.last_login_at}
                        </TableRowCell>
                        <TableRowCell>{member.completed_rate} %</TableRowCell>
                      </TableRow>
                    </a>
                  </Link>
                </div>
              );
            })
          )}
        </div>
      </div>
    </Layout>
  );
};
// "member_id" : "005393ad-268d-46b5-baea-abb2eafd9114",
// 		"created_at" : "2020-07-16 10:39:27",
// 		"last_login_at" : "2020-09-23 17:28:32",
// 		"total_contents_cnt" : 64,
// 		"completed_cnt" : 56.7500,
// 		"completed_rate" : 88.700,
// 		"total_learning_time" : 421.50

export default member;
