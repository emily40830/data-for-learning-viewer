import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Layout from '../components/layout/Layout';
import SearchInput from '../components/common/SearchInput';
import TableHeading from '../components/table/TableHeading';
import HeadingButton from '../components/table/HeadingButton';
import TableRow from '../components/table/TableRow';
import TableRowCell from '../components/table/TableRowCell';
import { formatCourseName } from '../util';

const StyledInputContainer = styled.div`
  margin-bottom: 40px;
  @media screen and (min-width: 720px) {
    display: flex;
    justify-content: space-between;
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

const course = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch('/video_list.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setVideos([...data]);
        // const newUser = data.map((d) => {
        //   return { ...d, member_id: formatUserName(d.member_id) };
        // });
        // setMembers([...newUser]);
      })
      .catch((err) => console.log(err));
  }, []);
  //const [keyword,]
  return (
    <Layout title="contents">
      <div>Contents</div>
      <StyledInputContainer>
        <StyledCount>Found {videos.length} contents</StyledCount>
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
            <div>ContentId</div>
            {/* {value === 'name' && <SortArrow direction={direction} />} */}
          </HeadingButton>
          <HeadingButton
            notShowInMobile={true}
            // onClick={() => setValueAndDirection('population')}
          >
            <div>Publish time</div>
            {/* {value === 'population' && <SortArrow direction={direction} />} */}
          </HeadingButton>
          <HeadingButton>
            <div>Numbers of viewed</div>
          </HeadingButton>
          <HeadingButton>
            <div>drop rate</div>
          </HeadingButton>
        </TableHeading>
        <div style={{ height: '600px', overflowY: 'scroll' }}>
          {videos.map((video) => {
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
    </Layout>
  );
};

export default course;

// {
// 	"program_content_id" : "003f0d9b-5031-49f2-b989-0fd5e8eea686",
// 	"program_content_name" : "4. 整體細化（一）",
// 	"viewed_cnt" : 18,
// 	"drop_cnt" : 0,
// 	"drop_rate" : 0.00,
// 	"published_at" : "2020-09-16 19:12:41"
// },
