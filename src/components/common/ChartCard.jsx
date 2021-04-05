import React from "react";
import styled from "styled-components";
import { Help } from "@material-ui/icons";
import ToolTip from "../common/ToolTip";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  margin-bottom: 2rem;

  border-radius: 5px;
  background: #ffffff;
  box-shadow: 5px 5px 13px #ededed, -5px -5px 13px #ffffff;
  position: relative;
  border-top: 6px solid var(--secondary-color);

  .card__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 10px 25px;
  }
  .card__title {
    align-self: flex-start;
    font-size: 16px;
    font-weight: 500;
    color: var(--text-color-third);
  }
`;

const ChartCard = ({ title, children, className, tooltip }) => {
  return (
    <StyledContainer className={className}>
      {/* <rect className="card__border"></rect> */}
      <div className="card__inner">
        <div className="card__title">{title}</div>
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
      {children}
      {/* <StyledCardBody height={height}>{children}</StyledCardBody> */}
    </StyledContainer>
  );
};

export default ChartCard;
