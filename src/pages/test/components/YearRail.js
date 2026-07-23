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
  position: relative;
  width: 285px;
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
  line-height: 36px;
  letter-spacing: 0;
  text-align: left;
  cursor: pointer;
  overflow-wrap: anywhere;

  &:hover {
    color: ${navy};
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 35px;
    width: 285px;
    height: 1px;
    background: ${(props) => (props.$active ? navy : "#e6e6e6")};
  }

  @media (max-width: 1080px) {
    width: 100%;

    &::after {
      width: 100%;
    }
  }
`;

export default YearRail;
