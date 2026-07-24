import React from "react";
import styled from "styled-components";

const navy = "#113275";

const YearRail = ({ years, activeYear, onYearChange }) => {
  return (
    <Rail aria-label="Board years">
      {years.map((year) => (
        <YearButton
          key={year}
          type="button"
          $active={activeYear === year}
          onClick={() => onYearChange(year)}
        >
          {year}
        </YearButton>
      ))}
    </Rail>
  );
};

const Rail = styled.nav`
  width: 285px;
  flex: 0 0 285px;

  @media (max-width: 1080px) {
    width: 100%;
    flex-basis: auto;
  }
`;

const YearButton = styled.button`
  width: 285px;
  height: 58px;
  padding: 0 3px;

  display: flex;
  align-items: center;
  justify-content: flex-start;

  box-sizing: border-box;
  border: 0;
  border-bottom: 1px solid
    ${(props) => (props.$active ? navy : "#e6e6e6")};

  background: transparent;
  color: ${(props) => (props.$active ? navy : "#a6a6a6")};

  font: inherit;
  font-size: 24px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0;

  text-align: left;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    color: ${navy};
  }

  @media (max-width: 1080px) {
    width: 100%;
  }
`;

export default YearRail;
