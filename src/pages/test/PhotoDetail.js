import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header.js";
import Hero from "./components/Hero.js";
import Footer from "./components/Footer.js";
import NotionContent from "./components/NotionContent.js";
import { boardItems } from "./data/boardContent.js";
import albumPlaceholder from "../../assets/everyone_withprofmo.jpg";

const previewPhoto = {
  subject: "2026 춘계공동학술대회",
  date: "2026.06.04. ~ 2026.06.05.",
  thumbnail: albumPlaceholder,
  notionId: "preview",
};

const previewBlocks = [
  {
    type: "paragraph",
    text:
      "Operations Research Lab members gathered for the 2026 spring joint conference. This preview content is shown only when the local development server returns the React app shell for /api requests.",
  },
];

const PhotoDetail = () => {
  const { notionId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const routePhoto =
    location.state?.photo?.notionId === notionId ? location.state.photo : null;
  const isPreviewPhoto = notionId?.startsWith("preview");
  const [photo, setPhoto] = useState(routePhoto || (isPreviewPhoto ? previewPhoto : null));
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
      setPhoto(routePhoto || (isPreviewPhoto ? previewPhoto : null));
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
          if (isCurrent) {
            if (isLocalApiHtmlFallback(error) && (routePhoto || isPreviewPhoto)) {
              setPhoto(routePhoto || previewPhoto);
            } else {
              console.error("Failed to fetch photo metadata:", error);
              if (!routePhoto) {
                setHasError(true);
              }
            }
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
          if (isCurrent) {
            if (isLocalApiHtmlFallback(error) && (routePhoto || isPreviewPhoto)) {
              setBlocks(previewBlocks);
            } else {
              console.error("Failed to fetch photo body:", error);
              setHasError(true);
            }
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
  }, [isPreviewPhoto, notionId, requestId, routePhoto]);

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
        <Hero
          title={photo?.subject || "Photo"}
          topGap={141}
          dividerGap={61}
          titleSize={38}
          titleLineHeight="1.2"
          meta={photo?.date ? <DateBadge>{photo.date}</DateBadge> : null}
        />
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

const isLocalApiHtmlFallback = (error) =>
  error instanceof SyntaxError ||
  /Unexpected token '<'|not valid JSON/i.test(error.message || "");

const DetailTopFrame = styled.section`
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

const DateBadge = styled.div`
  min-width: 213px;
  height: 42px;
  margin: 0;
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
  overflow-wrap: anywhere;

  @media (max-width: 780px) {
    min-width: 0;
    width: fit-content;
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
