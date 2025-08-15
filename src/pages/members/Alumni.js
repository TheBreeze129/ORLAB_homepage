import React, { useEffect, useState } from "react";
import Header from "../../components/Header.js";
import Footer from "../../components/Footer.js";
import styled from "styled-components";
import yonseiImage from "../../assets/yonsei.jpg";

const Alumni = () => {
  const [msData, setMsData] = useState([]);
  const [phdData, setPhdData] = useState([]);
  const [isLoadingPhd, setIsLoadingPhd] = useState(true);
  const [isLoadingMs, setIsLoadingMs] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchMsData = async () => {
      try {
        const response = await fetch("/api/student", {
          method: "GET",
          headers: {
            stdtype: "alumni_ms",
          },
        });
        const notionData = await response.json();

        setMsData(notionData.results);
      } catch (error) {
        console.error("Failed to fetch M.S. data:", error);
      } finally {
        setIsLoadingMs(false);
      }
    };

    const fetchPhDData = async () => {
      try {
        const response = await fetch("/api/student", {
          method: "GET",
          headers: {
            stdtype: "alumni_phd",
          },
        });
        const notionData = await response.json();

        setPhdData(notionData.results);
      } catch (error) {
        console.error("Failed to fetch M.S. data:", error);
      } finally {
        setIsLoadingPhd(false);
      }
    };

    fetchPhDData();
    fetchMsData();
  }, []); // 의존성 배열이 빈값이면, 컴포넌트 마운트 시 한 번만 호출

  return (
    <Outer>
      <FixedHeader>
        <Header />
      </FixedHeader>

      <HeroContainer>
        <HeroContent>
          <Title>Alumnis</Title>
          <Description>Alumni in Operation Research Lab.</Description>
        </HeroContent>
        <ImageWrapper>
          <StyledImage src={yonseiImage} alt="Students" />
        </ImageWrapper>
      </HeroContainer>

      <StudentSection>
        <h1>Ph.D.</h1>
        {isLoadingPhd ? (
          <SkeletonWrapper>
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </SkeletonWrapper>
        ) : (
          <StudentGrid>
            {phdData.length > 0 ? (
              phdData.map((card) => (
                <Card key={card.id}>
                  <CardImage src={card.image} alt={card.Name} />
                  <CardContent>
                    <CardTitle>{card.Name}</CardTitle>
                    <CardDescription>{card.Email}</CardDescription>
                    <CardDescription>{card.outdate}</CardDescription>
                    <CardDescription>{card.To_go}</CardDescription>{" "}
                  </CardContent>
                </Card>
              ))
            ) : (
              <Heading>No Ph.D. data available.</Heading>
            )}
          </StudentGrid>
        )}
      </StudentSection>

      <StudentSection>
        <h1>MS</h1>
        {isLoadingMs ? (
          <SkeletonWrapper>
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </SkeletonWrapper>
        ) : (
          <StudentGrid>
            {msData.length > 0 ? (
              msData.map((card) => (
                <Card key={card.id}>
                  <CardImage src={card.image} alt={card.Name} />
                  <CardContent>
                    <CardTitle>{card.Name}</CardTitle>
                    <CardDescription>{card.Email}</CardDescription>
                    <CardDescription>{card.outdate}</CardDescription>
                    <CardDescription>{card.To_go}</CardDescription>{" "}
                  </CardContent>
                </Card>
              ))
            ) : (
              <Heading>No M.S. data available.</Heading>
            )}
          </StudentGrid>
        )}
      </StudentSection>

      <Footer />
    </Outer>
  );
};

const Card = styled.div`
  background: #fff;
  border-radius: 10px;
  max-width: 200px;
  height: 400px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 20px;
  h4 {
    margin-top: 5px;
    margin-bottom: 5px;
  }
`;

const CardTitle = styled.h3`
  font-size: 15px;
  font-weight: bold;
  margin-top: 0px;
  margin-bottom: 10px;
`;

const CardDescription = styled.p`
  font-size: 12px;
  color: #555;
  margin-top: 5px;
  margin-bottom: 0px;
`;

const StudentGrid = styled.div`
  display: grid;
  width: 100%;
  justify-content: center;
  padding: 20px 20px;
  margin: auto;
  text-align: center;
  align-items: center;
  place-items: center;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: auto;
  h1 {
    font-size: 2.5rem;
  }
  h2 {
    font-size: 2rem;
    margin-bottom: 40px;
  }
`;

const StudentSection = styled.section`
  padding: 40px 20px;
  max-width: 60%;
  margin: auto;
  text-align: left;
  align-items: center;
  justify-content: center;
  h1 {
    font-size: 2.5rem;
  }
  h2 {
    font-size: 2rem;
    margin-bottom: 40px;
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
  font-size: 48px;
  font-weight: bold;
  margin: 0px;

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

const SkeletonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 50px auto;
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

export default Alumni;
