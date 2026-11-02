import { useEffect, useRef } from "react";
import styled from "styled-components";

const InfiniteScrollTrigger = ({
  disabled = false,
  onLoadMore,
  rootMargin = "360px 0px",
}) => {
  const markerRef = useRef(null);

  useEffect(() => {
    if (disabled || typeof IntersectionObserver === "undefined") {
      return undefined;
    }

    const marker = markerRef.current;
    if (!marker) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onLoadMore();
        }
      },
      { rootMargin }
    );

    observer.observe(marker);

    return () => {
      observer.disconnect();
    };
  }, [disabled, onLoadMore, rootMargin]);

  return <Marker ref={markerRef} aria-hidden="true" />;
};

const Marker = styled.div`
  width: 100%;
  height: 1px;
`;

export default InfiniteScrollTrigger;
