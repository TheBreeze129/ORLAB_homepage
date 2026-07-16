import React from "react";
import styled from "styled-components";

const NotionContent = ({ blocks, fallbackAlt = "Photo detail" }) => {
  return (
    <BlockStack>
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;

        if (block.type === "image" && block.url) {
          return (
            <ImageBlock key={key}>
              <ContentImage
                src={block.url}
                alt={block.caption || fallbackAlt}
              />
              {block.caption ? <ImageCaption>{block.caption}</ImageCaption> : null}
            </ImageBlock>
          );
        }

        if (block.type === "heading_2" && block.title) {
          return <ContentHeading key={key}>{block.title}</ContentHeading>;
        }

        if (block.type === "paragraph" && block.text) {
          return <ContentParagraph key={key}>{block.text}</ContentParagraph>;
        }

        if (block.type === "bulleted_list_item" && block.text) {
          return (
            <ListItem key={key}>
              {block.href ? (
                <ContentLink
                  href={block.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {block.text}
                </ContentLink>
              ) : (
                block.text
              )}
            </ListItem>
          );
        }

        if (block.type === "divider") {
          return <ContentDivider key={key} />;
        }

        return null;
      })}
    </BlockStack>
  );
};

const BlockStack = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

const ImageBlock = styled.figure`
  width: 100%;
  margin: 0;
`;

const ContentImage = styled.img`
  width: 100%;
  aspect-ratio: 946 / 700;
  display: block;
  object-fit: cover;
  border-radius: 5px;
`;

const ImageCaption = styled.figcaption`
  margin-top: 10px;
  color: #8b8b8b;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
`;

const ContentHeading = styled.h2`
  margin: 8px 0 0;
  color: #113275;
  font-size: 30px;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: 0;
`;

const ContentParagraph = styled.p`
  margin: 0;
  color: #4a4a4a;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.55;
  letter-spacing: 0;
  white-space: pre-wrap;
`;

const ListItem = styled.li`
  margin-left: 22px;
  padding-left: 4px;
  color: #4a4a4a;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.55;
`;

const ContentLink = styled.a`
  color: #113275;
  text-underline-offset: 3px;
`;

const ContentDivider = styled.hr`
  width: 100%;
  height: 1px;
  margin: 8px 0;
  border: 0;
  background: #c3c3c3;
`;

export default NotionContent;
