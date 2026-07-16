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
  width: 260px;
  flex: 0 0 260px;
`;

const YearButton = styled.button`
  position: relative;
  width: 260px;
  height: 54px;
  padding: 0;
  display: flex;
  align-items: flex-start;
  border: 0;
  background: transparent;
  color: ${(props) => (props.$active ? navy : "#a6a6a6")};
  font: inherit;
  font-size: 24px;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: 0;
  text-align: left;
  cursor: pointer;

  &:hover {
    color: ${navy};
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 35px;
    width: 260px;
    height: 1px;
    background: ${(props) => (props.$active ? navy : "#e6e6e6")};
  }
`;

export default YearRail;
