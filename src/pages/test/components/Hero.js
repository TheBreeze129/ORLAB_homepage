import React from "react";
import styled from "styled-components";

const navy = "#113275";
const soft = "#e6e6e6";

const Hero = ({ activeBoard, boardItems, onBoardChange }) => {
  const activeLabel =
    boardItems.find((item) => item.id === activeBoard)?.label || "SEMINAR";

  return (
    <>
      <HeroTitle>Board</HeroTitle>
      <CategoryTabs aria-label={`Current board category: ${activeLabel}`}>
        {boardItems.map((item) => (
          <CategoryButton
            key={item.id}
            type="button"
            $active={activeBoard === item.id}
            $itemId={item.id}
            onClick={() => onBoardChange(item.id)}
          >
            {item.label}
          </CategoryButton>
        ))}
      </CategoryTabs>
      <Divider />
    </>
  );
};

const HeroTitle = styled.h1`
  position: absolute;
  left: 111px;
  top: 258px;
  width: 733px;
  height: 58px;
  margin: 0;
  color: ${navy};
  font-size: 48px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: 0;

  @media (max-width: 780px) {
    position: static;
    width: auto;
    height: auto;
    margin-bottom: 40px;
  }
`;

const CategoryTabs = styled.div`
  position: absolute;
  left: 111px;
  top: 357px;
  display: flex;
  align-items: center;
  gap: 23px;

  @media (max-width: 780px) {
    position: static;
  }

  @media (max-width: 640px) {
    gap: 14px;
    flex-wrap: wrap;
  }
`;

const CategoryButton = styled.button`
  width: ${(props) => {
    if (props.$itemId === "album") return "120px";
    if (props.$itemId === "seminar") return "139px";
    return "165px";
  }};
  height: 54px;
  padding: 0 24px;
  border: 0;
  border-radius: 8px;
  background: ${(props) => (props.$active ? navy : soft)};
  color: ${(props) => (props.$active ? "#ffffff" : "#000000")};
  font-size: 20px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: background 0.18s ease, color 0.18s ease;

  &:hover {
    background: ${(props) => (props.$active ? navy : "#dedede")};
  }

  @media (max-width: 640px) {
    width: auto;
    height: 48px;
    padding: 0 18px;
    font-size: 16px;
  }
`;

const Divider = styled.div`
  position: absolute;
  left: 38px;
  top: 451px;
  width: 1366px;
  height: 1px;
  background: #c3c3c3;

  @media (max-width: 780px) {
    left: 24px;
    right: 24px;
    top: auto;
    bottom: 0;
    width: auto;
  }
`;

export default Hero;
