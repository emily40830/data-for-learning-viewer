import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Layout from "../components/layout/Layout";
import SearchInput from "../components/common/SearchInput";

import LoadingTable from "../components/common/LoadingTable";
import CourseTable from "../components/course/CourseTable";
import TableHeading from "../components/table/TableHeading";
import HeadingButton from "../components/table/HeadingButton";

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
  const [isLoading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  const [filteredContents, setFilteredContents] = useState([]);
  const [keyword, setKeyword] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  useEffect(() => {
    setLoading(true);

    fetch("/video_list.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setVideos(data);
        setFilteredContents([...data]);
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

  useEffect(() => {
    if (keyword === "") {
      setFilteredContents(videos);
    } else {
      const filteredContents = videos.filter((content) =>
        content.program_content_id.toLowerCase().includes(keyword),
      );
      setFilteredContents(filteredContents);
    }
  }, [keyword]);

  return (
    <Layout title="contents">
      <div>Contents</div>
      <StyledInputContainer>
        <StyledCount>Found {filteredContents.length} contents</StyledCount>
        <div className="input">
          <SearchInput placeholder="Filter by name" onChange={handleChange} />
        </div>
      </StyledInputContainer>
      {isLoading ? (
        <div>
          <TableHeading>
            <HeadingButton align="left" justify="flex-start">
              <div>ContentId</div>
            </HeadingButton>
            <HeadingButton>
              <div>Publish time</div>
            </HeadingButton>
            <HeadingButton>
              <div>Numbers of viewed</div>
            </HeadingButton>
            <HeadingButton>
              <div>drop rate</div>
            </HeadingButton>
          </TableHeading>
          <div style={{ height: "600px", overflowY: "scroll" }}>
            <LoadingTable />
          </div>
        </div>
      ) : (
        <CourseTable contents={filteredContents} />
      )}
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
