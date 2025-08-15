import React, { useEffect, useState } from "react";
import Header from "../../components/Header.js";
import Footer from "../../components/Footer.js";
import styled from "styled-components";
import yonseiImage from "../../assets/yonsei.jpg";
import projectimage from "../../assets/projects.png";
import { Link } from "react-router-dom";

const Project = () => {
  const [ongoingblocks, setOngoingblocks] = useState([]);
  const [finishedblocks, setFinishedblocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchOngoingData = async () => {
      try {
        const response = await fetch("/api/project_idx", {
          method: "GET",
          headers: {
            pjType: "Ongoing",
          },
        });
        const data = await response.json(); // { object: 'list', results: [...] }
        setOngoingblocks(data.results);
      } catch (error) {
        console.error("Failed to fetch publication data:", error);
      }
    };

    const fetchFinishedData = async () => {
      try {
        const response = await fetch("/api/project_idx", {
          method: "GET",
          headers: {
            pjType: "Finished",
          },
        });
        const data = await response.json(); // { object: 'list', results: [...] }
        setFinishedblocks(data.results);
      } catch (error) {
        console.error("Failed to fetch publication data:", error);
      }
    };

    fetchOngoingData();
    fetchFinishedData();
    setIsLoading(false);
  }, []);

  return (
    <Outer>
      <FixedHeader>
        <Header />
      </FixedHeader>
      <HeroContainer>
        <HeroContent>
          <Title>Project</Title>
          <Description>
            Research Projects at the Operations Research Lab
          </Description>
        </HeroContent>
        <ImageWrapper>
          <StyledImage src={projectimage} />
        </ImageWrapper>
      </HeroContainer>

      <ProjectsSection>
        <h1>Ongoing Projects</h1>
        {isLoading ? (
          <SkeletonWrapper>
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </SkeletonWrapper>
        ) : (
          <ProjectsGrid>
            {ongoingblocks.map((page) => (
              <Card>
                {/* 흰 배경 영역 */}
                <CardContent>
                  <CardTitle>{page.Name}</CardTitle>
                </CardContent>

                {/* 검은 배경 영역 */}
                <CardFooter>
                  <ReadMore
                    to={`/subproject?pagecode=${page.url}`}
                    key={page.url}
                  >
                    View details →
                  </ReadMore>
                </CardFooter>
              </Card>
            ))}
          </ProjectsGrid>
        )}
      </ProjectsSection>
      <LineDiv>
        <HorizontalLine />
      </LineDiv>

      <ProjectsSection>
        <h1>Finished Projects</h1>
        {isLoading ? (
          <SkeletonWrapper>
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </SkeletonWrapper>
        ) : (
          <ProjectsGrid>
            {finishedblocks.map((page) => (
              <Card>
                {/* 흰 배경 영역 */}
                <CardContent>
                  <CardTitle>{page.Name}</CardTitle>
                </CardContent>

                {/* 검은 배경 영역 */}
                <CardFooter>
                  <ReadMore
                    to={`/subproject?pagecode=${page.url}`}
                    key={page.url}
                  >
                    View details →
                  </ReadMore>
                </CardFooter>
              </Card>
            ))}
          </ProjectsGrid>
        )}
      </ProjectsSection>

      <Footer />
    </Outer>
  );
};

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff; /* 카드 전체의 기본 배경 */
  border-radius: 10px;
  max-width: 300px;
  height: 250px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  justify-content: space-between;
  transition: transform 0.3s ease-in-out;
  margin: 10px 0;

  &:hover {
    transform: translateY(-5px);
  }
`;

/* 상단 영역 (흰 배경, 검은 글씨) */
const CardContent = styled.div`
  background: #fff; /* 흰 배경 */
  flex: 1;
  color: #000; /* 검은 글씨 */
  padding: 20px;
`;

/* 카드 제목 스타일 */
const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

/* 하단 영역 (검은 배경, 흰 글씨) */
const CardFooter = styled.div`
  background: rgba(34, 77, 96, 0.3); /* 검은 배경 */
  color: #fff; /* 흰 글씨 */
  padding: 10px 20px;
`;

const LineDiv = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  justify-content: center;
  align-items: center;
`;

const HorizontalLine = styled.div`
  width: 100%;
  height: 1px;
  max-width: 60%;
  background-color: gray;
  margin: 10px 0;
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

const ProjectsSection = styled.section`
  padding: 80px 20px;
  max-width: 60%;
  margin: auto;
  text-align: left;
  h1 {
    font-size: 2.5rem;
  }
  h2 {
    font-size: 2rem;
    margin-bottom: 40px;
  }
`;

const ReadMore = styled(Link)`
  display: block;
  text-align: right;
  font-size: 20px;
  color: white;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  width: 100%;
  justify-content: center;
  padding: 20px 20px;
  margin: auto;
  text-align: left;
  align-items: center;
  place-items: center;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  h1 {
    font-size: 2.5rem;
  }
  h2 {
    font-size: 2rem;
    margin-bottom: 40px;
  }
`;

const Outer = styled.div`
  box-sizing: border-box;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const FixedHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: white;
  z-index: 1000;
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
  max-width: 40%;
  color: #fff;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const Description = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
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

export default Project;
