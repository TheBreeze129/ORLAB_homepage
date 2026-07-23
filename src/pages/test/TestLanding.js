import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import LandingPopup from "./components/LandingPopup.js";
import { landingPopupEvent } from "./data/landingPopup.js";
import landingBackground from "../../assets/figma/landing-background.png";
import companyIcon from "../../assets/figma/company-icon.svg";
import landingProjectKiat from "../../assets/figma/landing-project-kiat.png";
import landingProjectLges from "../../assets/figma/landing-project-lges.png";

const navy = "#113275";

const projectCards = [
  {
    notionId: "landing-project-multimodal-surveillance",
    title:
      "Development of Multi-Modal Foundational Models and AI Accelerators for Zero-shot Intelligent Surveillance System",
    image: landingProjectKiat,
    tags: ["Vision AI", "Large Multi-Modal Model"],
    partner: "KIAT",
  },
  {
    notionId: "landing-project-stocker-crane",
    title: "Dual Twin Fork Stocker Crane Scheduling Optimization",
    image: landingProjectLges,
    tags: ["Optimization", "Logistics"],
    partner: "LG Energy Solution",
  },
  {
    notionId: "landing-project-battery-assignment",
    title: "Battery Charging/Discharging Equipment Assignment Optimization",
    image: landingProjectLges,
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
          <ProjectLink
            key={project.title}
            to={`/test/research/project/${project.notionId}`}
            state={{
              project: {
                name: project.title,
                organization: project.partner,
              },
            }}
            aria-label={`${project.title} project detail`}
          >
            <ProjectCard>
              <ProjectImage src={project.image} alt="" aria-hidden="true" />
              <ProjectTitle>{project.title}</ProjectTitle>
              <TagList>
                {project.tags.map((tag) => (
                  <ProjectTag key={tag}>{tag}</ProjectTag>
                ))}
              </TagList>
              <Partner>
                <PartnerIcon src={companyIcon} alt="" aria-hidden="true" />
                <span>{project.partner}</span>
              </Partner>
            </ProjectCard>
          </ProjectLink>
        ))}
      </ProjectGrid>
    </LandingFrame>
    <Footer />
    <LandingPopup event={landingPopupEvent} />
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
  min-height: 2248px;
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
  left: max(15px, calc((100% - 1282px) / 2));
  top: 196px;

  @media (max-width: 900px) {
    position: static;
    margin-top: 78px;
  }
`;

const KoreanTitle = styled.h1`
  margin: 0;
  color: #000000;
  font-size: 40px;
  font-weight: 700;
  line-height: 48.4091px;
  letter-spacing: -0.8px;

  @media (max-width: 900px) {
    font-size: 36px;
  }
`;

const EnglishTitle = styled.div`
  color: #616161;
  font-size: 40px;
  font-weight: 700;
  line-height: 48.4091px;
  letter-spacing: -0.8px;

  @media (max-width: 900px) {
    font-size: 36px;
  }
`;

const BlueText = styled.span`
  color: ${navy};
`;

const GhostCopy = styled.div`
  position: absolute;
  right: max(15px, calc((100% - 1282px) / 2));
  top: 196px;
  width: 587px;
  color: #eeeeee;
  font-size: 40px;
  font-weight: 700;
  line-height: 48.4091px;
  text-align: right;
  letter-spacing: -0.8px;

  @media (max-width: 900px) {
    display: none;
  }
`;

const HeroImage = styled.img`
  position: absolute;
  left: max(0px, calc((100% - 1282px) / 2));
  top: 324px;
  width: 1282px;
  height: 590px;
  display: block;
  object-fit: cover;
  border-radius: 8px;

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
  left: max(0px, calc((100% - 1282px) / 2));
  top: 946px;
  width: 1282px;
  color: #000000;
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
  letter-spacing: 0;

  p {
    margin: 0;
  }

  p + p {
    margin-top: 30px;
  }

  strong {
    font-weight: 700;
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
  left: max(8px, calc((100% - 1282px) / 2 + 8px));
  top: 1340px;
  margin: 0;
  color: ${navy};
  font-size: 40px;
  font-weight: 600;
  line-height: 48.4091px;
  letter-spacing: -0.8px;

  @media (max-width: 900px) {
    position: static;
    margin: 66px 0 30px;
    font-size: 34px;
  }
`;

const ProjectGrid = styled.div`
  position: absolute;
  left: max(0px, calc((100% - 1282px) / 2));
  top: 1423px;
  width: 1282px;
  display: grid;
  grid-template-columns: repeat(3, 404px);
  gap: 35px;

  @media (max-width: 1180px) {
    left: 24px;
    width: calc(100% - 48px);
    grid-template-columns: repeat(2, minmax(0, 404px));
    gap: 56px 35px;
  }

  @media (max-width: 900px) {
    position: static;
    width: 100%;
    grid-template-columns: 1fr;
    gap: 42px;
  }
`;

const ProjectLink = styled(Link)`
  display: block;
  color: inherit;
  text-decoration: none;
`;

const ProjectCard = styled.article`
  position: relative;
  width: 404px;
  height: 529px;
  min-width: 0;

  @media (max-width: 900px) {
    width: 100%;
    height: auto;
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 227px;
  display: block;
  object-fit: cover;
  border-radius: 8px;

  @media (max-width: 900px) {
    height: auto;
    aspect-ratio: 404 / 227;
  }
`;

const ProjectTitle = styled.h3`
  width: 415px;
  max-width: calc(100% + 11px);
  height: 120px;
  margin: 35px 0 0;
  color: #111111;
  font-size: 24px;
  font-weight: 500;
  line-height: 36px;
  letter-spacing: 0;
  overflow-wrap: normal;
  word-break: normal;

  @media (max-width: 900px) {
    height: auto;
    margin-top: 24px;
  }
`;

const TagList = styled.div`
  position: absolute;
  left: 0;
  top: 430px;
  min-height: 81px;
  margin-top: 0;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 10px 23px;

  @media (max-width: 900px) {
    position: static;
    min-height: auto;
    margin-top: 24px;
  }
`;

const ProjectTag = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  padding: 0 0;
  background: #dedede;
  color: #111111;
  font-size: 20px;
  font-weight: 500;
  line-height: 30px;
  text-align: center;
  overflow-wrap: anywhere;
`;

const Partner = styled.div`
  position: absolute;
  left: 0;
  top: 493px;
  margin-top: 0;
  display: flex;
  align-items: center;
  gap: 6.45px;
  color: #111111;
  font-size: 20px;
  font-weight: 500;
  line-height: 30px;

  span {
    min-width: 0;
    overflow-wrap: normal;
  }

  @media (max-width: 900px) {
    position: static;
    margin-top: 24px;
  }
`;

const PartnerIcon = styled.img`
  width: 33.9068px;
  height: 33.9068px;
  object-fit: contain;
  flex: 0 0 auto;
`;

export default TestLanding;
