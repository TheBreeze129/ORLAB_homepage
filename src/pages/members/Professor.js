import React, { useEffect, useState } from "react";
import Header from "../../components/Header.js";
import Footer from "../../components/Footer.js";
import styled from "styled-components";
import yonseiImage from "../../assets/yonsei.jpg";
import profmoprofile from "../../assets/profmo.jpg";
import profmo2 from "../../assets/profmo_new.jpg";

const Professor = () => {
  const [blocks, setBlocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/page", {
          method: "GET",
          headers: {
            pageCode: process.env.REACT_APP_PROFESSOR,
          },
        });
        const data = await response.json(); // { object: 'list', results: [...] }

        if (data && data.results) {
          setBlocks(data.results);
        }
      } catch (error) {
        console.error("Failed to fetch professor data:", error);
      } finally {
        setIsLoading(false); // API 호출 완료 후 로딩 상태 해제
      }
    };

    fetchData();
  }, []);
  return (
    <Outer>
      <FixedHeader>
        <Header />
      </FixedHeader>

      <HeroContainer>
        <HeroContent>
          <Title>Professor</Title>
          <Title>Jeonghoon Mo (모정훈)</Title>
          <Description>
            Department of Industrial Engineering at Yonsei University.
          </Description>
          <Button
            onClick={() =>
              window.open(
                "https://sites.google.com/yonsei.ac.kr/jhmo-yonsei",
                "_blank",
                "noopener,noreferrer"
              )
            }
          >
            Personal Homepage &gt;
          </Button>
        </HeroContent>
        <ImageWrapper>
          <StyledImage src={profmo2} />
        </ImageWrapper>
      </HeroContainer>

      <ProfessorProfile>
        <ProfileImage src={profmoprofile} alt="Professor" />
        <ProfileDescription>
          <p>
            <strong>Jeonghoon Mo (모정훈)</strong>
          </p>
          <p> E-mail : j.mo@yonsei.ac.kr</p>
          <p>
            Address : D1004, 4-th Engineering bldg, Yonsei University, 50
            Yonsei-ro, Seodaemun-gu, Seoul, Republic of Korea
          </p>
        </ProfileDescription>
      </ProfessorProfile>
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
    font-size: 1.2rem;
    line-height: 1.6;
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

const Description = styled.p`
  font-size: 15px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background: white;
  color: black;
  padding: 12px 24px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  transition: 0.3s ease-in-out;

  &:hover {
    background: gray;
    color: white;
  }
`;

const ImageWrapper = styled.div`
  max-width: 400px;
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

const ProfessorProfile = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 100px;
  gap: 30px;
  width: 60%;
  margin: 0 auto;
`;

const ProfileImage = styled.img`
  width: auto;
  height: 35vh;
  border-radius: 8px;
  object-fit: cover;
`;

const ProfileDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 1.2rem;
  color: #333;
  line-height: 1.4;
  p {
    font-size: 1.5rem;
  }
`;

const HorizontalLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: gray;
  margin: 10px 0;
`;

export default Professor;
