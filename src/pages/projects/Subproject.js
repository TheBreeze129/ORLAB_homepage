import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../../components/Header.js";
import Footer from "../../components/Footer.js";
import styled from "styled-components";
import yonseiImage from "../../assets/yonsei.jpg";

const SubProject = () => {
  const [searchParams] = useSearchParams();
  const [blocks, setBlocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const [title, setTitle] = useState("");

  const pageCode = searchParams.get("pagecode");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    window.scrollTo(0, 0);
    const fetchTitle = async () => {
      try {
        const response = await fetch("/api/project_name", {
          method: "GET",
          headers: {
            pageCode: pageCode,
          },
        });

        const data = await response.json(); // { object: 'list', results: [...] }

        if (data && data.title) {
          setTitle(data.title);
        }
      } catch (error) {
        console.error("Failed to fetch publication data:", error);
      } finally {
        setIsLoading(false); // API 호출 완료 후 로딩 상태 해제
      }
    };

    const fetchData = async () => {
      try {
        const response = await fetch("/api/page", {
          method: "GET",
          headers: {
            pageCode: pageCode,
          },
        });

        const data = await response.json(); // { object: 'list', results: [...] }

        if (data && data.results) {
          setBlocks(data.results);
        }
      } catch (error) {
        console.error("Failed to fetch publication data:", error);
      } finally {
        setIsLoading(false); // API 호출 완료 후 로딩 상태 해제
      }
    };
    fetchTitle();
    fetchData();
  }, [pageCode]);
  return (
    <Outer>
      <FixedHeader>
        <Header />
      </FixedHeader>

      <HeroContainer>
        <HeroContent>
          <Title>Project</Title>
          <Title2>{title}</Title2>
        </HeroContent>
      </HeroContainer>

      <ContentSection>
        {isLoading ? (
          <SkeletonWrapper>
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </SkeletonWrapper>
        ) : (
          <>
            {blocks.length > 0 ? (
              blocks.map((block, idx) => {
                // divider → 수평선
                if (block.type === "divider") {
                  return <HorizontalLine key={idx} />;
                }
                // heading_2 → h2
                else if (block.type === "heading_2") {
                  return (
                    <ContentCard key={idx}>
                      <h2>{block.title}</h2>
                    </ContentCard>
                  );
                }
                // paragraph → p 태그
                else if (block.type === "paragraph") {
                  return (
                    <ContentCard key={idx}>
                      <p>{block.text}</p>
                    </ContentCard>
                  );
                } else if (block.type === "bulleted_list_item") {
                  return (
                    <ContentCard key={idx}>
                      {block.href === "" ? (
                        <p>• {block.text}</p>
                      ) : (
                        <TitleLink
                          href={block.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          • {block.text}
                        </TitleLink>
                      )}
                    </ContentCard>
                  );
                } else if (block.type === "image") {
                  return (
                    <>
                      <ImageDiv>
                        <ImageCard src={block.url} alt={block.caption} />
                      </ImageDiv>
                      <CaptionDiv>
                        <p>{block.caption}</p>
                      </CaptionDiv>
                    </>
                  );
                }
                return null;
              })
            ) : (
              <Heading>Sorry, No data Available.</Heading>
            )}
          </>
        )}
      </ContentSection>
      <Footer />
    </Outer>
  );
};

const ImageDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const ImageCard = styled.img`
  width: 100%;
  max-width: 800px;
  height: auto;
  display: block;
`;

const CaptionDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  p {
    font-size: 0.8rem;
    margin-top: 10px;
  }
`;

const SkeletonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 50px auto;
  width: 100%;
  max-width: 600px;
`;

const SkeletonRow = styled.div`
  background-color: #eee;
  height: 20px;
  border-radius: 4px;
`;

const Heading = styled.h1`
  font-size: 2rem;
  margin-bottom: 40px;
  text-align: center;
  color: #333;
  text-transform: uppercase;
`;

const ContentCard = styled.div`
  max-width: 100%;
  align-items: left;
  justify-content: left;
  text-align: left;
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 60%;
  gap: 10px;
  justify-content: left;
  padding: 80px 20px;
  margin: auto;
  text-align: left;
  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
    text-align: left;
  }
  p {
    margin: 0px;
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 10px;
  }
  a {
    margin: 0px;
    font-size: 1rem;
    line-height: 1.6;
  }
`;

const TitleLink = styled.a`
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const HeroContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: left;
  padding: 80px 20%;
  background: url(${yonseiImage}) no-repeat center center/cover;
  min-height: 60vh;
  position: relative;
  box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.4);

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 60px 5%;
  }
`;

const HeroContent = styled.div`
  max-width: 50%;
  color: #fff;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: bold;
  margin: 0px;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const Title2 = styled.h1`
  font-size: 25px;
  font-weight: bold;
  margin: 0px;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const Outer = styled.div`
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const FixedHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: white;
  z-index: 1000;
`;

const HorizontalLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: gray;
  margin: 10px 0;
`;

export default SubProject;
