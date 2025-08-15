import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../../components/Header.js";
import Footer from "../../components/Footer.js";
import styled from "styled-components";
import yonseiImage from "../../assets/yonsei.jpg";
import everyone from "../../assets/everyone_withprofmo.jpg";

const Photo = () => {
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState("");
  const year = searchParams.get("year");
  const [blocks, setBlocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (year === "2025") {
      setToken(process.env.REACT_APP_PHOTO_2025);
    } else if (year === "2023") {
      setToken(process.env.REACT_APP_PHOTO_2023);
    } else if (year === "2022") {
      setToken(process.env.REACT_APP_PHOTO_2022);
    }
  }, [year]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/page", {
          method: "GET",
          headers: {
            pageCode: token,
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

    fetchData();
  }, [token]);

  // blocks 배열을 순회하며 연속된 이미지 블록은 Gallery로 묶어 렌더링하는 함수
  const renderBlocks = () => {
    const elements = [];
    let imageGroup = [];

    const flushImageGroup = () => {
      if (imageGroup.length > 0) {
        elements.push(
          <Gallery key={`gallery-${elements.length}`}>
            {imageGroup.map((imgBlock, idx) => {
              const key = imgBlock.url;
              return (
                <PhotoCard key={key}>
                  <Pic
                    src={imgBlock.url}
                    alt="photo"
                    $isLoaded={!!loadedImages[key]}
                    onLoad={() =>
                      setLoadedImages((prev) => ({ ...prev, [key]: true }))
                    }
                  />
                </PhotoCard>
              );
            })}
          </Gallery>
        );
        imageGroup = [];
      }
    };

    blocks.forEach((block, idx) => {
      if (block.type === "image") {
        imageGroup.push(block);
      } else {
        flushImageGroup();
        if (block.type === "divider") {
          elements.push(<HorizontalLine key={idx} />);
        } else if (block.type === "heading_2") {
          elements.push(
            <ContentCard key={idx}>
              <h2>{block.title}</h2>
            </ContentCard>
          );
        } else if (block.type === "paragraph") {
          elements.push(
            <ContentCard key={idx}>
              <p>{block.text}</p>
            </ContentCard>
          );
        } else if (block.type === "bulleted_list_item") {
          elements.push(
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
        }
      }
    });

    flushImageGroup();
    return elements;
  };

  return (
    <Outer>
      <FixedHeader>
        <Header />
      </FixedHeader>

      <HeroContainer>
        <HeroContent>
          <Title>Photo</Title>
          <Description>Our Photos</Description>
        </HeroContent>
        <ImageWrapper>
          <StyledImage src={everyone} alt="Students" />
        </ImageWrapper>
      </HeroContainer>

      <ContentSection>
        {isLoading ? (
          <SkeletonWrapper>
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </SkeletonWrapper>
        ) : blocks.length > 0 ? (
          renderBlocks()
        ) : (
          <Heading>Sorry, No data Available.</Heading>
        )}
      </ContentSection>
      <Footer />
    </Outer>
  );
};

/* 스타일 컴포넌트 */

const Pic = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 4px;
  opacity: ${(props) => (props.$isLoaded ? 1 : 0)};
  transition: opacity 0.5s ease-in;
`;

const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
  margin: 20px 0;
`;

const PhotoCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  text-align: left;
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 60%;
  gap: 10px;
  padding: 80px 20px;
  margin: auto;
  text-align: left;
  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
  }
  p {
    margin: 0;
    font-size: 1rem;
    line-height: 1.6;
  }
  a {
    margin: 0;
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
  margin: 0;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const Description = styled.p`
  font-size: 15px;
  margin-bottom: 20px;
`;

const Outer = styled.div`
  box-sizing: border-box;
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

const ImageWrapper = styled.div`
  width: 500px;
  height: auto;
  position: absolute;
  bottom: -50px;
  right: 20%;
  background: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);

  @media (max-width: 1024px) {
    width: 280px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

export default Photo;
