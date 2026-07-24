import React from "react";
import styled from "styled-components";

const navy = "#113275";
const soft = "#e6e6e6";

const Hero = ({
  title = "Board",
  items,
  activeId,
  onChange,
  ariaLabel,
  meta,
  topGap = 131,
  dividerGap = 40,
  showDivider = true,
  titleSize = 48,
  titleLineHeight,
  activeBoard,
  boardItems,
  onBoardChange,
}) => {
  const resolvedItems = items || boardItems || [];
  const resolvedActiveId = activeId || activeBoard;
  const handleChange = onChange || onBoardChange;
  const activeLabel =
    resolvedItems.find((item) => item.id === resolvedActiveId)?.label || title;

  return (
    <HeroFrame $topGap={topGap}>
      <HeroTitle $size={titleSize} $lineHeight={titleLineHeight}>
        {title}
      </HeroTitle>
      {meta ? <MetaSlot>{meta}</MetaSlot> : null}
      {resolvedItems.length > 0 ? (
        <CategoryTabs aria-label={ariaLabel || `Current section: ${activeLabel}`}>
          {resolvedItems.map((item) => (
            <CategoryButton
              key={item.id}
              type="button"
              $active={resolvedActiveId === item.id}
              $width={item.width}
              onClick={() => handleChange?.(item.id)}
            >
              {item.label}
            </CategoryButton>
          ))}
        </CategoryTabs>
      ) : null}
      {showDivider ? <Divider $gap={dividerGap} /> : null}
    </HeroFrame>
  );
};

const HeroFrame = styled.div`
  margin: ${(props) => props.$topGap}px 38px 0;

  @media (max-width: 780px) {
    margin: 78px 0 0;
  }
`;

const HeroTitle = styled.h1`
  max-width: calc(100% - 73px);
  margin: 0 0 0 73px;
  color: ${navy};
  font-size: ${(props) => props.$size}px;
  font-weight: 700;
  line-height: ${(props) => props.$lineHeight || "1.21"};
  letter-spacing: -0.96px;
  overflow-wrap: break-word;

  @media (max-width: 780px) {
    max-width: 100%;
    width: auto;
    height: auto;
    margin: 0;
    font-size: min(${(props) => props.$size}px, 40px);
    line-height: 1.2;
  }
`;

const MetaSlot = styled.div`
  margin: 30px 0 0 73px;
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;

  @media (max-width: 780px) {
    margin-left: 0;
  }
`;

const CategoryTabs = styled.div`
  margin: 41px 0 0 73px;
  display: flex;
  align-items: center;
  gap: 23px;

  @media (max-width: 780px) {
    margin-left: 0;
  }

  @media (max-width: 640px) {
    gap: 14px;
    flex-wrap: wrap;
  }
`;

const CategoryButton = styled.button`
  width: ${(props) => props.$width || "auto"};
  min-width: ${(props) => (props.$width ? "0" : "106px")};
  height: 54px;
  padding: 0 24px;
  border: 0;
  border-radius: 8px;
  background: ${(props) => (props.$active ? navy : soft)};
  color: ${(props) => (props.$active ? "#ffffff" : "#000000")};
  font-family: inherit;
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
  width: auto;
  height: 1px;
  margin-top: ${(props) => props.$gap}px;
  background: #c3c3c3;

  @media (max-width: 780px) {
    width: auto;
  }
`;

export default Hero;
