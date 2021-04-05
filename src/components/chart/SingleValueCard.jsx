import React from "react";
import styled from "styled-components";
import { Help } from "@material-ui/icons";
import ToolTip from "../common/ToolTip";
// import { Tooltip, withStyles } from "@material-ui/core";

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
    padding: 10px 20px;
  }
  .singleValue__header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    min-height: 50px;
  }
  .singleValue__title {
    align-self: flex-start;

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

// const CustomToolTip = withStyles(() => ({
//   tooltip: {
//     boxShadow: "1px 1px",
//     backgroundColor: "#555",
//     fontSize: ".5rem",
//     lineHeight: "1rem",
//     maxWidth: 300,
//   },
// }))(Tooltip);

const SingleValueCard = ({ title, subtitle, value, unit, tooltip }) => {
  return (
    <StyledCard>
      {/* <rect className="card__border"></rect> */}
      <div className="card__inner">
        <div className="singleValue__header">
          <div className="singleValue__title">
            {title}
            <span className="singleValue__subTitle">{subtitle}</span>
          </div>

          {tooltip ? (
            <span class="singleValue__tooltip">
              <ToolTip title={<p>{tooltip}</p>}>
                <Help
                  style={{ color: "var(--text-color-third)", opacity: ".5" }}
                  fontSize="2rem"
                />
              </ToolTip>{" "}
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="singleValue__value">{value}</div>
      </div>
    </StyledCard>
  );
};

export default SingleValueCard;
