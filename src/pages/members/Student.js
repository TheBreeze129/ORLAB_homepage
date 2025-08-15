import React, { useEffect, useState } from "react";
import Header from "../../components/Header.js";
import Footer from "../../components/Footer.js";
import styled from "styled-components";
import yonseiImage from "../../assets/yonsei.jpg";
import everyone from "../../assets/everyone.jpg";
import clickSound from "../../assets/dj_scream.mp3";

const Student = () => {
  const [msData, setMsData] = useState([]);
  const [phdData, setPhdData] = useState([]);
  const [internData, setInternData] = useState([]);

  const [isLoadingPhd, setIsLoadingPhd] = useState(true);
  const [isLoadingMs, setIsLoadingMs] = useState(true);
  const [isLoadingIntern, setIsLoadingIntern] = useState(true);

  const [clickTimestamps, setClickTimestamps] = useState([]);

  const playClickSound = () => {
    const audio = new Audio(clickSound);
    audio.play();
  };

  const handleTripleClick = () => {
    const now = Date.now();
    const filtered = clickTimestamps.filter((ts) => now - ts < 1000); // 최근 1초 이내 클릭
    const updated = [...filtered, now];
    setClickTimestamps(updated);

    if (updated.length >= 3) {
      playClickSound();
      setClickTimestamps([]); // 초기화
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchMsData = async () => {
      try {
        const response = await fetch("/api/student", {
          method: "GET",
          headers: {
            stdtype: "ms",
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
            stdtype: "phd",
          },
        });
        const notionData = await response.json();
        setPhdData(notionData.results);
      } catch (error) {
        console.error("Failed to fetch Ph.D. data:", error);
      } finally {
        setIsLoadingPhd(false);
      }
    };
    /*
    const fetchInternData = async () => {
      try {
        const response = await fetch("/api/student", {
          method: "GET",
          headers: {
            stdtype: "intern",
          },
        });
        const notionData = await response.json();
        setInternData(notionData.results);
      } catch (error) {
        console.error("Failed to fetch Intern data:", error);
      } finally {
        setIsLoadingIntern(false);
      }
    };
*/
    fetchPhDData();
    fetchMsData();
    //fetchInternData();
  }, []); // 컴포넌트 마운트 시 한 번만 호출

  return (
    <Outer>
      <FixedHeader>
        <Header />
      </FixedHeader>

      <HeroContainer>
        <HeroContent>
          <Title>Students</Title>
          <Description>Students in Operation Research Lab.</Description>
        </HeroContent>
        <ImageWrapper>
          <StyledImage src={everyone} alt="Students" />
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
                    <h4>Research Interests</h4>
                    <CardDescription>{card.interests}</CardDescription>
                    <CardDescription>{card.Email}</CardDescription>
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
        <h1>M.S.</h1>
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
                <Card
                  key={card.id}
                  onClick={() => {
                    if (card.Name === "DONGJUN, KIM") {
                      handleTripleClick();
                    }
                  }}
                >
                  <CardImage src={card.image} alt={card.Name} />
                  <CardContent>
                    <CardTitle>{card.Name}</CardTitle>
                    <h4>Research Interests</h4>
                    <CardDescription>{card.interests}</CardDescription>
                    <CardDescription>{card.Email}</CardDescription>
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

/* 인턴 들어올시 복구.
      <StudentSection>
        <h1>Intern</h1>
        {isLoadingIntern ? (
          <SkeletonWrapper>
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </SkeletonWrapper>
        ) : (
          <StudentGrid>
            {internData.length > 0 ? (
              internData.map((card) => (
                <Card key={card.id}>
                  <CardImage src={card.image} alt={card.Name} />
                  <CardContent>
                    <CardTitle>{card.Name}</CardTitle>
                    <h4>Research Interests</h4>
                    <CardDescription>{card.interests}</CardDescription>
                    <CardDescription>{card.Email}</CardDescription>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Heading>No Intern data available.</Heading>
            )}
          </StudentGrid>
        )}
      </StudentSection>
*/

/* 스켈레톤 스타일 */
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

/* 기존 스타일들 */
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

const Heading = styled.h1`
  font-size: 2rem;
  margin-bottom: 40px;
  text-align: center;
  color: #333;
  text-transform: uppercase;
`;

const StudentSection = styled.section`
  padding: 40px 20px;
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

const StudentGrid = styled.div`
  display: grid;
  width: 100%;
  justify-content: center;
  padding: 20px 20px;
  margin: auto;
  text-align: left;
  align-items: center;
  place-items: center;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: auto;
`;

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

export default Student;
