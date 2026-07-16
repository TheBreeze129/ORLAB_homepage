import React from "react";
import styled from "styled-components";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import landingBackground from "../../assets/lannding_background.png";
import buildingIcon from "../../assets/building_icon.svg";
import albumImage from "../../assets/board-album-placeholder.png";
import publicationImage from "../../assets/publication.jpg";

const navy = "#113275";

const projectCards = [
  {
    title:
      "Development of Multi-Modal Foundational Models and AI Accelerators for Zero-shot Intelligent Surveillance System",
    image: albumImage,
    tags: ["Vision AI", "Large Multi-Modal Model", "Zero-shot"],
    partner: "KIAT",
  },
  {
    title: "Dual Twin Fork Stocker Crane Scheduling Optimization",
    image: publicationImage,
    tags: ["Optimization", "Logistics"],
    partner: "LG Energy Solution",
  },
  {
    title: "Battery Charging/Discharging Equipment Assignment Optimization",
    image: publicationImage,
    tags: ["Optimization", "Smart Factory"],
    partner: "LG Energy Solution",
  },
];

const TestLanding = () => (
  <PageShell>
    <LandingFrame>
      <Header activeSection="landing" />

      <HeroCopy>
        <KoreanTitle>경영과학연구실</KoreanTitle>
        <EnglishTitle>
          <BlueText>Operations Research</BlueText> Lab
        </EnglishTitle>
      </HeroCopy>

      <GhostCopy aria-hidden="true">
        <div>Operations Research Lab</div>
        <div>경영과학연구실</div>
      </GhostCopy>

      <HeroImage
        src={landingBackground}
        alt="Yonsei University engineering building"
      />

      <IntroText>
        <p>
          <strong>Operations Research Lab</strong> studies decision-making
          problems arising in industrial systems by formulating them
          mathematically and developing practical solutions through optimization
          and artificial intelligence.
        </p>
        <p>
          Based on the mathematical modeling and analytical methodologies of
          operations research, we address a wide range of operational and
          managerial problems across various industries, including manufacturing,
          telecommunications, and finance.
          <br />
          In particular, we develop data-driven decision-making models and
          algorithms using optimization, reinforcement learning, and deep
          learning.
          <br />
          Our research aims to advance intelligent decision-making technologies
          that can be effectively applied to real-world systems.
        </p>
        <p>
          Our laboratory is currently exploring novel AI methodologies based on
          optimization, reinforcement learning, and deep learning.
          <br />
          We warmly welcome passionate and motivated researchers to join our
          laboratory.
        </p>
      </IntroText>

      <ProjectsTitle>Ongoing Projects</ProjectsTitle>
      <ProjectGrid>
        {projectCards.map((project) => (
          <ProjectCard key={project.title}>
            <ProjectImage src={project.image} alt="" aria-hidden="true" />
            <ProjectTitle>{project.title}</ProjectTitle>
            <TagList>
              {project.tags.map((tag) => (
                <ProjectTag key={tag}>{tag}</ProjectTag>
              ))}
            </TagList>
            <Partner>
              <PartnerIcon src={buildingIcon} alt="" aria-hidden="true" />
              <span>{project.partner}</span>
            </Partner>
          </ProjectCard>
        ))}
      </ProjectGrid>
    </LandingFrame>
    <Footer />
  </PageShell>
);

const PageShell = styled.main`
  min-height: 100vh;
  background: #ffffff;
  color: #000000;
  font-family: "Inter", "Pretendard", "Helvetica Neue", Arial, sans-serif;
`;

const LandingFrame = styled.section`
  position: relative;
  width: min(100%, 1442px);
  min-height: 2204px;
  margin: 0 auto;
  background: #ffffff;
  overflow: visible;

  @media (max-width: 900px) {
    width: 100%;
    min-height: auto;
    padding: 36px 24px 80px;
    box-sizing: border-box;
  }
`;

const HeroCopy = styled.div`
  position: absolute;
  left: 48px;
  top: 201px;

  @media (max-width: 900px) {
    position: static;
    margin-top: 78px;
  }
`;

const KoreanTitle = styled.h1`
  margin: 0 0 5px;
  color: #000000;
  font-size: 45px;
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: 0;

  @media (max-width: 900px) {
    font-size: 36px;
  }
`;

const EnglishTitle = styled.div`
  color: #616161;
  font-size: 45px;
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: 0;

  @media (max-width: 900px) {
    font-size: 36px;
  }
`;

const BlueText = styled.span`
  color: ${navy};
`;

const GhostCopy = styled.div`
  position: absolute;
  right: 46px;
  top: 204px;
  color: #eeeeee;
  font-size: 43px;
  font-weight: 800;
  line-height: 1.2;
  text-align: right;
  letter-spacing: 0;

  @media (max-width: 900px) {
    display: none;
  }
`;

const HeroImage = styled.img`
  position: absolute;
  left: 38px;
  top: 354px;
  width: 1366px;
  height: 592px;
  display: block;
  object-fit: cover;
  border-radius: 5px;

  @media (max-width: 900px) {
    position: static;
    width: 100%;
    height: auto;
    aspect-ratio: 1366 / 592;
    margin-top: 44px;
  }
`;

const IntroText = styled.div`
  position: absolute;
  left: 38px;
  top: 1006px;
  width: 1366px;
  color: #1f1f1f;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.35;
  letter-spacing: 0;

  p {
    margin: 0;
  }

  p + p {
    margin-top: 34px;
  }

  strong {
    font-weight: 800;
  }

  @media (max-width: 900px) {
    position: static;
    width: 100%;
    margin-top: 42px;
    font-size: 17px;
    line-height: 1.55;
  }
`;

const ProjectsTitle = styled.h2`
  position: absolute;
  left: 48px;
  top: 1364px;
  margin: 0;
  color: ${navy};
  font-size: 38px;
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: 0;

  @media (max-width: 900px) {
    position: static;
    margin: 66px 0 30px;
    font-size: 34px;
  }
`;

const ProjectGrid = styled.div`
  position: absolute;
  left: 38px;
  top: 1442px;
  width: 1366px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 38px;

  @media (max-width: 900px) {
    position: static;
    width: 100%;
    grid-template-columns: 1fr;
    gap: 42px;
  }
`;

const ProjectCard = styled.article`
  min-width: 0;
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 342px;
  display: block;
  object-fit: cover;
  border-radius: 5px;

  @media (max-width: 900px) {
    height: auto;
    aspect-ratio: 431 / 342;
  }
`;

const ProjectTitle = styled.h3`
  min-height: 86px;
  margin: 34px 0 0;
  color: #111111;
  font-size: 25px;
  font-weight: 700;
  line-height: 1.28;
  letter-spacing: 0;

  @media (max-width: 900px) {
    min-height: auto;
    margin-top: 24px;
  }
`;

const TagList = styled.div`
  min-height: 81px;
  margin-top: 21px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 10px 23px;
`;

const ProjectTag = styled.span`
  display: inline-flex;
  align-items: center;
  height: 28px;
  padding: 0 12px;
  background: #dedede;
  color: #111111;
  font-size: 19px;
  font-weight: 700;
  line-height: 1;
`;

const Partner = styled.div`
  margin-top: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #111111;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.2;
`;

const PartnerIcon = styled.img`
  width: 27px;
  height: 27px;
  object-fit: contain;
`;

export default TestLanding;
