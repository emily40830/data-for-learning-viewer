import React from 'react';
import { baseURL } from '../../util';
import Layout from '../../components/layout/Layout';
import styled from 'styled-components';
import { formatUserName } from '../../util';
import ChartCard from '../../components/common/ChartCard';
import SingleValueCard from '../../components/chart/SingleValueCard';
import membersInfo from '../../../public/user_list.json';
import ProgressHeatmap from '../../components/member/ProgressHeatmap';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 24px;
  @media screen and (min-width: 900px) {
    grid-template-columns: repeat(12, 1fr);
  }
`;
const LeftContent = styled.div`
  @media screen and (min-width: 900px) {
    grid-column: 1 / span 4;
  }
`;
const RightContent = styled.div`
  @media screen and (min-width: 900px) {
    grid-column: 5 / span 8;
  }
`;
const StyledMemberInfo = styled.div`
  padding: 20px;
  border-radius: 8px;
  box-shadow: var(--box-shadow);
  background-color: var(--background-color-light);
  border-top: 6px solid var(--secondary-color);
  margin: 20px 0;
  .member__name {
    text-align: center;
    font-size: 14px;
    font-weight: 300;
    margin-top: 4px;
    margin-bottom: 24px;
  }
`;
const StyledMemberInfoItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  text-align: center;
`;
const StyledMemberInfoLabel = styled.div`
  font-size: 14px;
  color: var(--text-color-secondary);
`;

const StyledMemberContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 30px;
  margin: 20px 0;

  @media screen and (max-width: 900px) {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    margin-bottom: 0;
  }
`;

const StyledLearningProgressContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-bottom: 0;
  margin: 20px 0;
`;

const Member = ({ member }) => {
  //console.log(member);
  return (
    <Layout title={member.member_id}>
      <Container>
        <LeftContent>
          <StyledMemberInfo>
            <div className="member__name">
              {formatUserName(member.member_id)}
            </div>
            <StyledMemberInfoItem>
              <div>
                <div>{member.created_at}</div>
                <StyledMemberInfoLabel>Register time</StyledMemberInfoLabel>
              </div>
              <div>
                <div>{member.last_login_at}</div>
                <StyledMemberInfoLabel>Last login time</StyledMemberInfoLabel>
              </div>
            </StyledMemberInfoItem>
          </StyledMemberInfo>
        </LeftContent>
        <RightContent>
          <StyledMemberContainer>
            <SingleValueCard
              title="Numbers of contents read"
              value={member.total_contents_cnt}
            />
            <SingleValueCard
              title="Total learning "
              subtitle="minutes"
              value={member.total_learning_time}
            />
            <SingleValueCard
              title="Completion rate "
              subtitle="(%)"
              value={member.completed_rate}
            />
          </StyledMemberContainer>
          <StyledLearningProgressContainer>
            <ChartCard title="Learning Progress">
              <ProgressHeatmap memberId={member.member_id} />
            </ChartCard>
          </StyledLearningProgressContainer>
        </RightContent>
      </Container>
    </Layout>
  );
};

export default Member;

export const getServerSideProps = async ({ params }) => {
  //process.env.FOO

  const member = membersInfo.filter(
    (memberInfo) => memberInfo.member_id === params.id,
  )[0];
  return {
    props: {
      member,
    },
  };
};
