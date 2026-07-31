import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import BoardCard from "./BoardCard.js";
import BoardList from "./BoardList.js";
import InfiniteScrollTrigger from "./InfiniteScrollTrigger.js";
import YearRail from "./YearRail.js";
import { seminarYears, workshopYears } from "../data/boardContent.js";
import albumPlaceholder from "../../../assets/everyone_withprofmo.jpg";

const ALBUM_PAGE_SIZE = 9;
const LIST_PAGE_SIZE = 6;

const fallbackAlbumRows = Array.from({ length: ALBUM_PAGE_SIZE }, (_, index) => ({
  id: `fallback-album-${index + 1}`,
  title: "2026 춘계공동학술대회",
  dateText: "2026.06.04. ~ 2026.06.05.",
  imageUrl: albumPlaceholder,
  notionId: `preview-${index + 1}`,
  order: ALBUM_PAGE_SIZE - index,
}));

const fallbackEventRows = (eventType, activeYear) =>
  Array.from({ length: LIST_PAGE_SIZE }, (_, index) => ({
    id: `fallback-${eventType}-${activeYear}-${index + 1}`,
    date: `${activeYear}-07-08`,
    name: "Hayoung Ji",
    title:
      eventType === "workshop"
        ? "Operations Research Lab Workshop"
        : "Lifelong Multi-Agent Path Finding in Large-Scale Warehouses",
    link: "#",
    year: activeYear,
  }));

const BoardContent = ({ activeBoard }) => {
  const [albumPages, setAlbumPages] = useState({});
  const [albumPageCount, setAlbumPageCount] = useState(1);
  const [albumErrors, setAlbumErrors] = useState({});
  const [eventPages, setEventPages] = useState({});
  const [eventPageCounts, setEventPageCounts] = useState({});
  const [eventErrors, setEventErrors] = useState({});
  const [activeYears, setActiveYears] = useState({
    seminar: seminarYears[0],
    workshop: workshopYears[0],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingKey, setLoadingKey] = useState(null);
  const [retryRequestId, setRetryRequestId] = useState(0);

  const isAlbum = activeBoard === "album";
  const eventType = isAlbum ? null : activeBoard;
  const listYears = activeBoard === "workshop" ? workshopYears : seminarYears;
  const activeYear =
    activeBoard === "workshop" ? activeYears.workshop : activeYears.seminar;
  const eventContentKey =
    eventType && listYears.includes(activeYear)
      ? `${eventType}:${activeYear}`
      : null;
  const eventPageKey = eventContentKey
    ? `${eventContentKey}:page:${currentPage}`
    : null;
  const albumPageKey = `album:page:${currentPage}`;
  const activePageKey = isAlbum ? albumPageKey : eventPageKey;
  const activeRows = isAlbum
    ? getLoadedAlbumRows(albumPages, currentPage)
    : getLoadedEventRows(eventPages, eventContentKey, currentPage);
  const pageSize = isAlbum ? ALBUM_PAGE_SIZE : LIST_PAGE_SIZE;
  const pageCount = isAlbum
    ? albumPageCount
    : eventPageCounts[eventContentKey] || 1;
  const pageError = isAlbum
    ? albumErrors[currentPage]
    : eventErrors[eventPageKey];
  const isLoading = loadingKey === activePageKey;
  const canLoadMore =
    activeRows.length > 0 &&
    currentPage < pageCount &&
    !isLoading &&
    !pageError;

  useEffect(() => {
    setCurrentPage(1);
  }, [activeBoard, activeYear]);

  useEffect(() => {
    if (!isAlbum) return undefined;

    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    };
    let secondFrameId;
    const firstFrameId = window.requestAnimationFrame(() => {
      scrollToTop();
      secondFrameId = window.requestAnimationFrame(scrollToTop);
    });
    const timeoutId = window.setTimeout(scrollToTop, 100);

    scrollToTop();

    return () => {
      window.cancelAnimationFrame(firstFrameId);
      if (secondFrameId) {
        window.cancelAnimationFrame(secondFrameId);
      }
      window.clearTimeout(timeoutId);
    };
  }, [isAlbum]);

  useEffect(() => {
    if (!isAlbum) return undefined;
    if (albumPages[currentPage] !== undefined) return undefined;

    const controller = new AbortController();
    let isCurrent = true;

    const fetchAlbumPage = async () => {
      setLoadingKey(albumPageKey);
      setAlbumErrors((current) => {
        if (!current[currentPage]) return current;

        const next = { ...current };
        delete next[currentPage];
        return next;
      });

      try {
        const response = await fetch(
          `/api/photo?page=${currentPage}&page_size=${ALBUM_PAGE_SIZE}`,
          {
            method: "GET",
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error(`Photo API returned ${response.status}`);
        }

        const data = await response.json();
        if (!Array.isArray(data.results)) {
          throw new Error("Photo API returned an invalid response");
        }

        const sortedRows = data.results
          .slice()
          .sort((a, b) => (b.order ?? 0) - (a.order ?? 0));
        const isPagedResponse =
          data.page !== undefined ||
          data.pageSize !== undefined ||
          data.total !== undefined;
        const rows = isPagedResponse
          ? sortedRows
          : paginate(sortedRows, currentPage, ALBUM_PAGE_SIZE);
        const nextPageCount = getPageCount(data, sortedRows.length, pageSize);

        if (isCurrent) {
          setAlbumPages((current) => ({
            ...current,
            [currentPage]: rows.map((row) => ({
              id: row.id,
              title: row.subject,
              dateText: row.date,
              imageUrl: row.thumbnail,
              notionId: row.notionId,
              order: row.order,
            })),
          }));
          setAlbumPageCount(nextPageCount);
        }
      } catch (error) {
        if (error.name === "AbortError") return;

        if (isCurrent) {
          if (isLocalApiHtmlFallback(error)) {
            setAlbumPages((current) => ({
              ...current,
              [currentPage]: fallbackAlbumRows,
            }));
            setAlbumPageCount(1);
            setAlbumErrors((current) => {
              const next = { ...current };
              delete next[currentPage];
              return next;
            });
          } else {
            console.error("Failed to fetch album data:", error);
            setAlbumErrors((current) => ({
              ...current,
              [currentPage]: true,
            }));
          }
        }
      } finally {
        if (isCurrent) {
          setLoadingKey((current) =>
            current === albumPageKey ? null : current
          );
        }
      }
    };

    fetchAlbumPage();

    return () => {
      isCurrent = false;
      controller.abort();
    };
  }, [
    albumPageKey,
    albumPages,
    currentPage,
    isAlbum,
    pageSize,
    retryRequestId,
  ]);

  useEffect(() => {
    if (!eventContentKey || !eventPageKey) return undefined;
    if (eventPages[eventPageKey] !== undefined) return undefined;

    const controller = new AbortController();
    let isCurrent = true;

    const fetchEventPage = async () => {
      setLoadingKey(eventPageKey);
      setEventErrors((current) => {
        if (!current[eventPageKey]) return current;

        const next = { ...current };
        delete next[eventPageKey];
        return next;
      });

      try {
        const response = await fetch(
          `/api/seminar?page=${currentPage}&page_size=${LIST_PAGE_SIZE}`,
          {
            method: "GET",
            headers: { dbtoken: activeYear, dbtype: eventType },
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error(`Board API returned ${response.status}`);
        }

        const data = await response.json();
        if (!Array.isArray(data.results)) {
          throw new Error("Board API returned an invalid response");
        }

        const rows = data.results.map((row, index) => ({
          ...row,
          id: `${eventPageKey}-${index}`,
          year: activeYear,
        }));
        const isPagedResponse =
          data.page !== undefined ||
          data.pageSize !== undefined ||
          data.total !== undefined;
        const visibleRows = isPagedResponse
          ? rows
          : paginate(rows, currentPage, LIST_PAGE_SIZE);
        const nextPageCount = getPageCount(data, rows.length, pageSize);

        if (isCurrent) {
          setEventPages((current) => ({
            ...current,
            [eventPageKey]: visibleRows,
          }));
          setEventPageCounts((current) => ({
            ...current,
            [eventContentKey]: nextPageCount,
          }));
        }
      } catch (error) {
        if (error.name === "AbortError") return;

        if (isCurrent) {
          if (isLocalApiHtmlFallback(error)) {
            setEventPages((current) => ({
              ...current,
              [eventPageKey]: fallbackEventRows(eventType, activeYear),
            }));
            setEventPageCounts((current) => ({
              ...current,
              [eventContentKey]: 1,
            }));
            setEventErrors((current) => {
              const next = { ...current };
              delete next[eventPageKey];
              return next;
            });
          } else {
            console.error(`Failed to fetch ${eventType} data:`, error);
            setEventErrors((current) => ({
              ...current,
              [eventPageKey]: true,
            }));
          }
        }
      } finally {
        if (isCurrent) {
          setLoadingKey((current) =>
            current === eventPageKey ? null : current
          );
        }
      }
    };

    fetchEventPage();

    return () => {
      isCurrent = false;
      controller.abort();
    };
  }, [
    activeYear,
    currentPage,
    eventContentKey,
    eventPageKey,
    eventPages,
    eventType,
    pageSize,
    retryRequestId,
  ]);

  useEffect(() => {
    if (currentPage > pageCount) {
      setCurrentPage(pageCount);
    }
  }, [currentPage, pageCount]);

  const handleYearChange = (year) => {
    if (!eventType) return;

    setActiveYears((current) => ({
      ...current,
      [eventType]: year,
    }));
  };

  const handleRetry = () => {
    if (!activePageKey) return;

    if (isAlbum) {
      setAlbumErrors((current) => {
        const next = { ...current };
        delete next[currentPage];
        return next;
      });
      setAlbumPages((current) => {
        const next = { ...current };
        delete next[currentPage];
        return next;
      });
    } else {
      setEventErrors((current) => {
        const next = { ...current };
        delete next[eventPageKey];
        return next;
      });
      setEventPages((current) => {
        const next = { ...current };
        delete next[eventPageKey];
        return next;
      });
    }

    setRetryRequestId((current) => current + 1);
  };

  const handleLoadMore = useCallback(() => {
    if (isLoading || pageError) return;

    setCurrentPage((current) =>
      current >= pageCount ? current : current + 1
    );
  }, [isLoading, pageCount, pageError]);

  return (
    <ContentFrame aria-busy={isLoading} aria-live="polite">
      {isAlbum ? (
        isLoading && activeRows.length === 0 ? (
          <AlbumStatus role="status">Loading albums...</AlbumStatus>
        ) : pageError && activeRows.length === 0 ? (
          <AlbumStatus role="alert">
            <span>Unable to load albums.</span>
            <AlbumRetryButton type="button" onClick={handleRetry}>
              Retry
            </AlbumRetryButton>
          </AlbumStatus>
        ) : activeRows.length === 0 ? (
          <AlbumStatus>No albums available.</AlbumStatus>
        ) : (
          <AlbumGrid>
            {activeRows.map((album) => (
              <BoardCard
                key={album.id}
                imageUrl={album.imageUrl}
                title={album.title}
                dateText={album.dateText}
                to={
                  album.notionId
                    ? `/test/board/photo/${encodeURIComponent(album.notionId)}`
                    : undefined
                }
                state={
                  album.notionId
                    ? {
                        photo: {
                          subject: album.title,
                          date: album.dateText,
                          thumbnail: album.imageUrl,
                          notionId: album.notionId,
                        },
                      }
                    : undefined
                }
              />
            ))}
          </AlbumGrid>
        )
      ) : (
        <ListLayout>
          <YearRail
            years={listYears}
            activeYear={activeYear}
            onYearChange={handleYearChange}
          />
          <BoardList
            rows={activeRows}
            isLoading={isLoading && activeRows.length === 0}
            hasError={Boolean(pageError && activeRows.length === 0)}
            onRetry={handleRetry}
          />
        </ListLayout>
      )}
      <InfiniteScrollTrigger
        disabled={!canLoadMore}
        onLoadMore={handleLoadMore}
      />
      {isLoading && activeRows.length > 0 ? (
        <LoadMoreStatus $isList={!isAlbum} role="status">
          Loading more {isAlbum ? "albums" : "board posts"}...
        </LoadMoreStatus>
      ) : null}
      {pageError && activeRows.length > 0 ? (
        <LoadMoreStatus $isList={!isAlbum} role="alert">
          <span>Unable to load more {isAlbum ? "albums" : "board posts"}.</span>
          <AlbumRetryButton type="button" onClick={handleRetry}>
            Retry
          </AlbumRetryButton>
        </LoadMoreStatus>
      ) : null}
    </ContentFrame>
  );
};

const getLoadedAlbumRows = (albumPages, currentPage) =>
  Array.from({ length: currentPage }, (_, index) => albumPages[index + 1] || [])
    .flat();

const getLoadedEventRows = (eventPages, eventContentKey, currentPage) => {
  if (!eventContentKey) return [];

  return Array.from(
    { length: currentPage },
    (_, index) => eventPages[`${eventContentKey}:page:${index + 1}`] || []
  ).flat();
};

const getPageCount = (data, rowCount, pageSize) => {
  if (Number.isFinite(data.pageCount)) {
    return Math.max(1, data.pageCount);
  }

  if (Number.isFinite(data.total)) {
    return Math.max(1, Math.ceil(data.total / pageSize));
  }

  return Math.max(1, Math.ceil(rowCount / pageSize));
};

const paginate = (items, page, pageSize) => {
  const startIndex = (page - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
};

const isLocalApiHtmlFallback = (error) =>
  error instanceof SyntaxError ||
  /Unexpected token '<'|not valid JSON/i.test(error.message || "");

const ContentFrame = styled.section`
  position: relative;
  width: min(1366px, calc(100% - 76px));
  min-height: 1796px;
  margin: 0 auto;
  padding: 42px 0 120px;
  box-sizing: border-box;

  @media (max-width: 980px) {
    width: calc(100% - 48px);
    min-height: 900px;
    padding-top: 16px;
  }
`;

const AlbumGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 446px);
  gap: 60px 14px;

  @media (max-width: 1360px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 46px 18px;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const AlbumStatus = styled.div`
  min-height: 420px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  color: #8c8c8c;
  font-size: 18px;
  font-weight: 500;
`;

const AlbumRetryButton = styled.button`
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

const ListLayout = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 69px;
  padding: 18px 0 0 26px;

  @media (max-width: 1320px) {
    gap: 44px;
    padding-left: 0;
  }

  @media (max-width: 1080px) {
    flex-direction: column;
    gap: 34px;
    padding-top: 0;

    > nav,
    > div {
      width: 100%;
      flex-basis: auto;
    }
  }
`;

const LoadMoreStatus = styled.div`
  margin-top: ${(props) => (props.$isList ? "54px" : "48px")};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  color: #8c8c8c;
  font-size: 18px;
  font-weight: 500;

  @media (max-width: 980px) {
    margin-top: 40px;
  }
`;

export default BoardContent;
