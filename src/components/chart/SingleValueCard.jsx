import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 70px;
  max-height: 150px;
  border-radius: 5px;
  background: #ffffff;
  box-shadow: 5px 5px 13px #ededed, -5px -5px 13px #ffffff;
  position: relative;
  border-top: 6px solid var(--secondary-color);
  .card__border {
    width: 100%;
    position: relative;
    top: 0px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    height: 6px;
    background-color: var(--secondary-color);
    z-index: 10;
  }
  .card__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 10px 25px;
  }
  .singleValue__title {
    align-self: flex-start;
    min-height: 50px;
    font-size: 16px;
    font-weight: 500;
    color: var(--text-color-third);
  }
  .singleValue__subTitle {
    font-size: 12px;
    font-weight: normal;
    color: var(--text-color-third);
  }
  .singleValue__value {
    color: var(--text-color);
    font-size: 2.2rem;

    margin-top: 1rem;
  }
`;

const SingleValueCard = ({ title, subtitle, value, unit, tootip }) => {
  return (
    <StyledCard>
      {/* <rect className="card__border"></rect> */}
      <div className="card__inner">
        <div className="singleValue__title">
          {title}
          <span className="singleValue__subTitle">{subtitle}</span>
        </div>
        <div className="singleValue__value">{value}</div>
      </div>
    </StyledCard>
  );
};

export default SingleValueCard;
