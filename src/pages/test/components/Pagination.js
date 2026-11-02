import React from "react";
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import styled from "styled-components";

const navy = "#113275";

const Pagination = ({ currentPage, pageCount, onPageChange }) => {
  const pages = getVisiblePages(currentPage, pageCount);
  const canGoBack = currentPage > 1;
  const canGoForward = currentPage < pageCount;
  const handlePageChange = (page) => {
    if (page === currentPage) return;

    onPageChange(page);
    scrollToPageTop();
  };

  return (
    <PaginationBar aria-label="Pagination">
      <IconButton
        type="button"
        aria-label="First page"
        disabled={!canGoBack}
        onClick={() => handlePageChange(1)}
      >
        <FiChevronsLeft aria-hidden="true" />
      </IconButton>
      <IconButton
        type="button"
        aria-label="Previous page"
        disabled={!canGoBack}
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
      >
        <FiChevronLeft aria-hidden="true" />
      </IconButton>
      {pages.map((page) => (
        <PageButton
          key={page}
          type="button"
          $active={currentPage === page}
          aria-current={currentPage === page ? "page" : undefined}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </PageButton>
      ))}
      <IconButton
        type="button"
        aria-label="Next page"
        disabled={!canGoForward}
        onClick={() => handlePageChange(Math.min(pageCount, currentPage + 1))}
      >
        <FiChevronRight aria-hidden="true" />
      </IconButton>
      <IconButton
        type="button"
        aria-label="Last page"
        disabled={!canGoForward}
        onClick={() => handlePageChange(pageCount)}
      >
        <FiChevronsRight aria-hidden="true" />
      </IconButton>
    </PaginationBar>
  );
};

const getVisiblePages = (currentPage, pageCount) => {
  const visibleCount = Math.min(3, pageCount);

  if (pageCount <= visibleCount) {
    return Array.from({ length: visibleCount }, (_, index) => index + 1);
  }

  const startPage = Math.min(Math.max(currentPage - 1, 1), pageCount - 2);
  return Array.from({ length: visibleCount }, (_, index) => startPage + index);
};

const scrollToPageTop = () => {
  if (typeof window === "undefined") return;

  window.requestAnimationFrame(() => {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } catch (error) {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  });
};

const PaginationBar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const ButtonBase = styled.button`
  width: 44px;
  height: 44px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e9eef6;
  border-radius: 7px;
  background: #ffffff;
  color: #113275;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  cursor: pointer;

  &:disabled {
    color: #9aa4b2;
    cursor: default;
    opacity: 0.68;
  }
`;

const IconButton = styled(ButtonBase)`
  font-size: 16px;
`;

const PageButton = styled(ButtonBase)`
  background: ${(props) => (props.$active ? navy : "#ffffff")};
  color: ${(props) => (props.$active ? "#ffffff" : "#1d2734")};
  border-color: ${(props) => (props.$active ? navy : "#e9eef6")};
`;

export default Pagination;
