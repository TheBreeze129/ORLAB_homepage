import React from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header.js";
import Hero from "./components/Hero.js";
import BoardContent from "./components/BoardContent.js";
import Footer from "./components/Footer.js";
import { boardItems } from "./data/boardContent.js";

const TestBoard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedBoard = searchParams.get("board");
  const activeBoard = boardItems.some((item) => item.id === requestedBoard)
    ? requestedBoard
    : "album";

  const handleBoardChange = (boardId) => {
    setSearchParams(boardId === "album" ? {} : { board: boardId });
  };

  return (
    <PageShell>
      <HeaderHeroFrame aria-label="Board header and hero">
        <Header
          activeBoard={activeBoard}
          boardItems={boardItems}
          onBoardChange={handleBoardChange}
        />
        <Hero
          activeBoard={activeBoard}
          boardItems={boardItems}
          onBoardChange={handleBoardChange}
        />
      </HeaderHeroFrame>
      <BoardContent activeBoard={activeBoard} />
      <Footer />
    </PageShell>
  );
};

const PageShell = styled.main`
  min-height: 100vh;
  background: #ffffff;
  color: #000000;
  font-family: "Inter", "Pretendard", "Helvetica Neue", Arial, sans-serif;
`;

const HeaderHeroFrame = styled.section`
  width: min(100%, 1442px);
  min-height: 452px;
  margin: 0 auto;
  background: #ffffff;
  overflow: visible;

  @media (max-width: 780px) {
    min-height: auto;
    padding: 36px 24px 24px;
    box-sizing: border-box;
  }
`;

export default TestBoard;
