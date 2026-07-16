import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import NotionContent from "./components/NotionContent.js";
import { boardItems } from "./data/boardContent.js";

const PhotoDetail = () => {
  const { notionId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const routePhoto =
    location.state?.photo?.notionId === notionId ? location.state.photo : null;
  const [photo, setPhoto] = useState(routePhoto);
  const [blocks, setBlocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [requestId, setRequestId] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [notionId]);

  useEffect(() => {
    if (!notionId) {
      setHasError(true);
      setIsLoading(false);
      return undefined;
    }

    const controller = new AbortController();
    let isCurrent = true;

    const fetchPhotoDetail = async () => {
      setIsLoading(true);
      setHasError(false);
      setPhoto(routePhoto);
      setBlocks([]);

      const photoRequest = fetch(
        `/api/photo?notion_id=${encodeURIComponent(notionId)}`,
        {
          method: "GET",
          signal: controller.signal,
        }
      )
        .then(async (response) => {
          if (!response.ok) {
            throw new Error(`Photo API returned ${response.status}`);
          }

          const data = await response.json();
          if (!data.result) {
            throw new Error("Photo API returned an invalid response");
          }

          if (isCurrent) {
            setPhoto(data.result);
          }
        })
        .catch((error) => {
          if (error.name === "AbortError") return;
          console.error("Failed to fetch photo metadata:", error);
          if (isCurrent && !routePhoto) {
            setHasError(true);
          }
        });

      const pageRequest = fetch("/api/page", {
        method: "GET",
        headers: { pageCode: notionId },
        signal: controller.signal,
      })
        .then(async (response) => {
          if (!response.ok) {
            throw new Error(`Notion page API returned ${response.status}`);
          }

          const data = await response.json();
          if (!Array.isArray(data.results)) {
            throw new Error("Notion page API returned an invalid response");
          }

          if (isCurrent) {
            setBlocks(data.results);
          }
        })
        .catch((error) => {
          if (error.name === "AbortError") return;
          console.error("Failed to fetch photo body:", error);
          if (isCurrent) {
            setHasError(true);
          }
        })
        .finally(() => {
          if (isCurrent) {
            setIsLoading(false);
          }
        });

      await Promise.allSettled([photoRequest, pageRequest]);
    };

    fetchPhotoDetail();

    return () => {
      isCurrent = false;
      controller.abort();
    };
  }, [notionId, requestId, routePhoto]);

  const handleBoardChange = (boardId) => {
    navigate(boardId === "album" ? "/test/board" : `/test/board?board=${boardId}`);
  };
  const bodyBlocks =
    photo?.thumbnail && blocks[0]?.type === "image" ? blocks.slice(1) : blocks;
  const hasImmediatePhoto = Boolean(photo?.thumbnail);

  return (
    <PageShell>
      <DetailTopFrame aria-label="Photo detail header">
        <Header
          activeBoard="album"
          boardItems={boardItems}
          onBoardChange={handleBoardChange}
        />
        <DetailTitle>{photo?.subject || "Photo"}</DetailTitle>
        {photo?.date ? <DateBadge>{photo.date}</DateBadge> : null}
        <HeroDivider />
      </DetailTopFrame>

      <DetailContent aria-busy={isLoading} aria-live="polite">
        {hasImmediatePhoto ? (
          <LeadImageBlock>
            <LeadImage src={photo.thumbnail} alt={photo.subject || "Album photo"} />
          </LeadImageBlock>
        ) : null}
        {hasError ? (
          <DetailState role="alert">
            <span>Unable to load this album.</span>
            <RetryButton type="button" onClick={() => setRequestId((id) => id + 1)}>
              Retry
            </RetryButton>
          </DetailState>
        ) : isLoading ? (
          <LoadingState role="status">
            {!hasImmediatePhoto ? <SkeletonImage /> : null}
            <SkeletonLine />
          </LoadingState>
        ) : bodyBlocks.length === 0 && !hasImmediatePhoto ? (
          <DetailState>No album details available.</DetailState>
        ) : (
          <NotionContent blocks={bodyBlocks} fallbackAlt={photo?.subject} />
        )}
      </DetailContent>

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

const DetailTopFrame = styled.section`
  position: relative;
  width: min(100%, 1442px);
  height: 452px;
  margin: 0 auto;
  background: #ffffff;
  overflow: visible;

  @media (max-width: 780px) {
    height: auto;
    min-height: 520px;
    padding: 36px 24px 64px;
    box-sizing: border-box;
  }
`;

const DetailTitle = styled.h1`
  position: absolute;
  left: 111px;
  top: 268px;
  max-width: 900px;
  margin: 0;
  color: #113275;
  font-size: 38px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: 0;

  @media (max-width: 780px) {
    position: static;
    margin-bottom: 30px;
    font-size: 32px;
  }
`;

const DateBadge = styled.div`
  position: absolute;
  left: 111px;
  top: 348px;
  min-width: 213px;
  height: 42px;
  padding: 0 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border-radius: 7px;
  background: #e6e6e6;
  color: #111111;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;

  @media (max-width: 780px) {
    position: static;
    min-width: 0;
    width: fit-content;
  }
`;

const HeroDivider = styled.div`
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

const DetailContent = styled.section`
  width: min(946px, calc(100% - 48px));
  min-height: 1796px;
  margin: 0 auto;
  padding: 40px 0 120px;
  box-sizing: border-box;

  @media (max-width: 780px) {
    min-height: 900px;
    padding-top: 32px;
  }
`;

const DetailState = styled.div`
  min-height: 420px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  color: #8c8c8c;
  font-size: 18px;
  font-weight: 500;
`;

const LeadImageBlock = styled.figure`
  width: 100%;
  margin: 0 0 22px;
`;

const LeadImage = styled.img`
  width: 100%;
  aspect-ratio: 946 / 700;
  display: block;
  object-fit: cover;
  border-radius: 5px;
`;

const LoadingState = styled(DetailState)`
  flex-direction: column;
  gap: 18px;
`;

const SkeletonLine = styled.div`
  width: 45%;
  height: 22px;
  border-radius: 4px;
  background: #e8e8e8;
`;

const SkeletonImage = styled.div`
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 5px;
  background: #eeeeee;
`;

const RetryButton = styled.button`
  border: 1px solid #113275;
  background: #ffffff;
  color: #113275;
  padding: 8px 14px;
  font: inherit;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background: #113275;
    color: #ffffff;
  }
`;

export default PhotoDetail;
