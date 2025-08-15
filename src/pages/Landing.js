import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import styled from "styled-components";
import yonseiImage from "../assets/yonsei.jpg";
import SSRC_G from "../assets/SSRC_G.png";
import LGES from "../assets/LGES.png";
import VLM_G from "../assets/VLM_G.png";
import PIC_1 from "../assets/2_1.jpg";
import PIC_2 from "../assets/2_2.jpg";
import PIC_3 from "../assets/2_3.jpg";
import PIC_4 from "../assets/2_5.jpg";
import PIC_5 from "../assets/2_7.jpg";
import PIC_6 from "../assets/2_8.jpg";
import PIC_7 from "../assets/2_9.jpg";
import PIC_8 from "../assets/2_10.jpg";
import PIC_9 from "../assets/2_11.jpg";
import PIC_10 from "../assets/2_12.jpg";
import PIC_11 from "../assets/2_13.jpg";

const Landing = () => {
  const imageList = [
    PIC_1,
    PIC_2,
    PIC_3,
    PIC_4,
    PIC_5,
    PIC_6,
    PIC_7,
    PIC_8,
    PIC_9,
    PIC_10,
    PIC_11,
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animatingImage, setAnimatingImage] = useState(null); // 애니메이션용 이미지
  const [direction, setDirection] = useState("left"); // 왼쪽으로 슬라이드
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % imageList.length;
      setAnimatingImage(nextIndex);
      setDirection("left"); // 슬라이드 방향

      setTimeout(() => {
        setCurrentIndex(nextIndex);
        setAnimatingImage(null); // 애니메이션 끝나면 제거
      }, 1000);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <Outer>
      <FixedHeader>
        <Header />
      </FixedHeader>
      <HeroContainer>
        <HeroContent>
          <Title>Operation Reasearch Lab</Title>
          <Description>
            We embrace a multi-disciplinary approach that blends mathematics,
            computer science, economics, psychology, physiology, and various
            engineering disciplines.
          </Description>
        </HeroContent>
        <ImageWrapper>
          <SlideImage src={imageList[currentIndex]} className="current" />
          {animatingImage !== null && (
            <SlideImage
              src={imageList[animatingImage]}
              className={`enter-${direction}`}
            />
          )}
        </ImageWrapper>
      </HeroContainer>

      <ContentSection>
        <ContentCard>
          <h2>Operations Research</h2>
          <p>
            Operations Research (OR) is dedicated to creating mathematical
            models for intricate engineering and management challenges, then
            employing analysis to uncover potential solutions. Our research, in
            particular, centers on optimization within domains like
            manufacturing, telecommunications, and healthcare, among others.
          </p>
        </ContentCard>
        <HorizontalLine />
        <ContentCard>
          <h2>Requirements</h2>
          <p>
            At least a bachelor degree in Industrial Engineering, Mathematics,
            Economics, Electrical & Electronic Engineering, Computer Science or
            any other related majors is required. If you are interested in any
            of our research area, please feel free to contact us. We sincerely
            look forward to your joining.
          </p>
        </ContentCard>
      </ContentSection>

      <ResearchSection>
        <h1>We are interested in</h1>
        <ResearchGrid>
          <ResearchCard>
            <h3>OPTIMIZATION</h3>
            <p>
              Optimization involves the process of choosing the best solution
              from a set of available alternatives. In optimization problems,
              the objective is to either maximize or minimize a real function by
              methodically selecting input values from a predefined set and
              calculating the function’s corresponding value.
            </p>
          </ResearchCard>
          <ResearchCard>
            <h3>REINFORCEMENT LEARNING</h3>
            <p>
              Reinforcement learning (RL) is an area of machine learning
              concerned with how intelligent agents ought to take actions in an
              environment in order to maximize the notion of cumulative reward.
              RL is one of three basic machine learning paradigms, alongside
              supervised learning and unsupervised learning.
            </p>
          </ResearchCard>
          <ResearchCard>
            <h3>DEEP LEARNING</h3>
            <p>
              Deep learning, a subset of machine learning, relies on artificial
              neural networks with representation learning. Its algorithms aim
              to extract essential information or functions from extensive and
              complex data through a combination of nonlinear transformation
              techniques. This approach enables the creation of high-level
              abstractions, making it suitable for handling large datasets and
              intricate materials across various domains.
            </p>
          </ResearchCard>
        </ResearchGrid>
      </ResearchSection>

      <ProjectsSection>
        <h1>Ongoing Projects</h1>
        <ProjectsGrid>
          {cardData.map((card) => (
            <Card key={card.id}>
              <CardImage src={card.image} alt={card.title} />
              <CardContent>
                <CardTitle>{card.title}</CardTitle>
              </CardContent>

              <CardFooter>
                <ReadMore to={card.url} key={card.url}>
                  View details →
                </ReadMore>
              </CardFooter>
            </Card>
          ))}
        </ProjectsGrid>
      </ProjectsSection>

      <Footer />
    </Outer>
  );
};

const cardData = [
  {
    id: 1,
    title:
      "Zero-shot 지능형 선별관제 시스템을 위한 Multimodal 파운데이션 모델 학습 및 연구",
    url: "https://nemo.yonsei.ac.kr/subproject?pagecode=1ced35be31ec8003a633f28976b412b5",
    image: VLM_G,
  },
  {
    id: 2,
    title: "컨베이어 시스템을 위한 물류 흐름 최적화 (LG Energy Solution)",
    url: "https://nemo.yonsei.ac.kr/subproject?pagecode=1d6d35be31ec80eb8053d7556ff42704",
    image: LGES,
  },
  {
    id: 3,
    title: "2025 학생창의-자율과제 (SSRC)",
    url: "https://nemo.yonsei.ac.kr/subproject?pagecode=1d6d35be31ec8069af41f0a5a574df60",
    image: SSRC_G,
  },
];

const HorizontalLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: gray;
  margin: 10px 0;
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

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff; /* 카드 전체의 기본 배경 */
  border-radius: 10px;
  max-width: 300px;
  height: 350px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  justify-content: space-between;
  transition: transform 0.3s ease-in-out;
  margin: 10px 0;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

/* 상단 영역 (흰 배경, 검은 글씨) */
const CardContent = styled.div`
  background: #fff; /* 흰 배경 */
  flex: 1;
  color: #000; /* 검은 글씨 */
  padding: 20px;
`;

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

const ContentSection = styled.div`
  display: flex;
  max-width: 60%;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  padding: 80px 20px;
  margin: auto;
  text-align: left;
  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
  }
  p {
    font-size: 1.2rem;
    line-height: 1.6;
  }
`;

const ResearchSection = styled.section`
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

const ResearchGrid = styled.div`
  display: flex;
  max-width: 95%;
  gap: 30px;
  flex-wrap: wrap;
  justify-content: center;
`;

const ContentCard = styled.div`
  max-width: 100%;
  align-items: left;
`;

const ResearchCard = styled.div`
  background: white;
  padding: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  max-width: 100%;
  text-align: left;
  h3 {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }
  p {
    font-size: 1rem;
    line-height: 1.5;
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

const SlideImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 1s ease-in-out;
  opacity: 1;
  transform: translateX(0);
  z-index: 1;

  &.current {
    z-index: 2;
  }

  &.enter-left {
    animation: slide-in-left 1s forwards;
    z-index: 3;
  }

  @keyframes slide-in-left {
    0% {
      opacity: 0;
      transform: translateX(100%);
    }
    100% {
      opacity: 1;
      transform: translateX(0%);
    }
  }
`;

const ImageWrapper = styled.div`
  position: absolute;
  width: 500px;
  height: 300px;
  bottom: -50px;
  right: 20%;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);

  @media (max-width: 1024px) {
    width: 280px;
    height: 170px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export default Landing;
