import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

const BoardCard = ({ imageUrl, title, dateText, to, state }) => {
  const content = (
    <>
      <ImageFrame>
        {imageUrl ? <CardImage src={imageUrl} alt={title} /> : null}
      </ImageFrame>
      <CardTitle>{title}</CardTitle>
      {dateText ? <CardDate>{dateText}</CardDate> : null}
    </>
  );

  return (
    <Card>
      {to ? (
        <CardLink to={to} state={state}>
          {content}
        </CardLink>
      ) : (
        <CardBody>{content}</CardBody>
      )}
    </Card>
  );
};

const Card = styled.article`
  width: 100%;
`;

const cardBodyStyles = css`
  display: block;
  color: inherit;
  text-decoration: none;
`;

const CardLink = styled(Link)`
  ${cardBodyStyles}

  &:focus-visible {
    outline: 2px solid #113275;
    outline-offset: 5px;
  }
`;

const CardBody = styled.div`
  ${cardBodyStyles}
`;

const ImageFrame = styled.div`
  width: 100%;
  aspect-ratio: 446 / 278;
  background: #e6e6e6;
  overflow: hidden;
  border-radius: 5px;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;

const CardTitle = styled.h2`
  margin: 10px 0 0;
  color: #000000;
  font-size: 18px;
  font-weight: 800;
  line-height: 1.25;
  letter-spacing: 0;
  text-align: center;
`;

const CardDate = styled.p`
  margin: 3px 0 0;
  color: #b4b4b4;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.25;
  letter-spacing: 0;
  text-align: center;
`;

export default BoardCard;
