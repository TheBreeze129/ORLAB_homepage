import React from "react";
import styled from "styled-components";

const BoardList = ({
  rows,
  isLoading = false,
  hasError = false,
  onRetry,
}) => {
  if (isLoading) {
    return <ListStatus role="status">Loading board posts...</ListStatus>;
  }

  if (hasError) {
    return (
      <ListStatus role="alert">
        <span>Unable to load board posts.</span>
        <RetryButton type="button" onClick={onRetry}>
          Retry
        </RetryButton>
      </ListStatus>
    );
  }

  if (rows.length === 0) {
    return <EmptyState>No board posts available.</EmptyState>;
  }

  return (
    <List aria-label="Board posts">
      {rows.map((row) => (
        <ListItem key={row.id || `${row.date}-${row.name}-${row.title}`}>
          <Meta>
            <span>{formatDate(row.date)}</span>
            <DividerText>｜</DividerText>
            <span>{row.name}</span>
          </Meta>
          {row.link && row.link !== "#" ? (
            <TitleLink href={row.link} target="_blank" rel="noopener noreferrer">
              {row.title}
            </TitleLink>
          ) : (
            <TitleText>{row.title}</TitleText>
          )}
        </ListItem>
      ))}
    </List>
  );
};

const formatDate = (value) => {
  if (!value) return "";

  if (/^\d{6}$/.test(value)) {
    return `20${value.slice(0, 2)}-${value.slice(2, 4)}-${value.slice(4, 6)}`;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;

  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const List = styled.div`
  width: 959px;
  flex: 0 0 959px;
  margin-top: 50px;
  min-width: 0;

  @media (max-width: 1320px) {
    width: 100%;
    flex: 1 1 auto;
  }
`;

const ListItem = styled.article`
  position: relative;
  min-height: 185px;
  padding: 0 0 91px 23px;
  box-sizing: border-box;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 41px;
    width: 100%;
    height: 2px;
    background: #c6c6c6;
  }

  @media (max-width: 980px) {
    width: 100%;
    min-height: 150px;
    padding: 0 0 76px;

    &::after {
      bottom: 32px;
      width: 100%;
    }
  }
`;

const Meta = styled.p`
  margin: 0 0 32px;
  color: #b6b6b6;
  font-size: 19px;
  font-weight: 300;
  line-height: 28.5px;
  letter-spacing: 0;
  overflow-wrap: anywhere;
`;

const DividerText = styled.span`
  margin: 0 5px;
`;

const TitleText = styled.h2`
  margin: 0;
  color: #000000;
  font-size: 25px;
  font-weight: 500;
  line-height: 37.5px;
  letter-spacing: 0;
  overflow-wrap: anywhere;
`;

const TitleLink = styled.a`
  display: block;
  color: #000000;
  font-size: 25px;
  font-weight: 500;
  line-height: 37.5px;
  letter-spacing: 0;
  text-decoration: none;
  overflow-wrap: anywhere;

  &:hover {
    color: #113275;
  }
`;

const EmptyState = styled.p`
  width: 959px;
  flex: 0 0 959px;
  margin: 40px 0 0;
  color: #a6a6a6;
  font-size: 18px;
  font-weight: 500;
  overflow-wrap: anywhere;

  @media (max-width: 1320px) {
    width: 100%;
    flex-basis: auto;
  }
`;

const ListStatus = styled(EmptyState)`
  display: flex;
  align-items: center;
  gap: 16px;
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

export default BoardList;
