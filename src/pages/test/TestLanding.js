import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import landingBackground from "../../assets/figma/landing-background.png";
import companyIcon from "../../assets/figma/company-icon.svg";
import landingProjectMultimodal from "../../assets/figma/landing-project-multimodal.png";
import landingProjectStockerCrane from "../../assets/figma/landing-project-stocker-crane.png";
import skaxAgfThumbnail from "../../assets/skax-agf-overview.png";

const navy = "#113275";
const projectPageCodes = {
  multimodalSurveillance: "1ced35be31ec8003a633f28976b412b5",
  stockerCrane: "38fd35be31ec804f8fefc71bc74b3dae",
  skaxAgfSolution: "3aed35be31ec80069308ccf684e024bc",
};

const projectCards = [
  {
    pageCode: projectPageCodes.multimodalSurveillance,
    title:
      "Development of Multi-Modal Foundational Models and AI Accelerators for Zero-shot Intelligent Surveillance System",
    image: landingProjectMultimodal,
    tags: ["Vision AI", "Large Multi-Modal Model"],
    partner: "KIAT",
  },
  {
    pageCode: projectPageCodes.skaxAgfSolution,
    title: "AGF Solution 고도화 과제",
    image: skaxAgfThumbnail,
    tags: ["Vision AI", "Logistics"],
    partner: "SK AX",
  },
  {
    pageCode: projectPageCodes.stockerCrane,
    title: "Dual Twin Fork Stocker Crane Scheduling Optimization",
    image: landingProjectStockerCrane,
    tags: ["Optimization", "Logistics"],
    partner: "LG Energy Solution",
  },
];

const TestLanding = () => (
    <PageShell>
      <LandingFrame>
        <Header activeSection="landing" />

        <ContentRail>
          <HeroTextRow>
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
          </HeroTextRow>

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
                to={`/test/subproject?pagecode=${project.pageCode}`}
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
        </ContentRail>
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
  width: min(100%, 1442px);
  margin: 0 auto;
  padding-bottom: 112px;
  background: #ffffff;
  overflow: visible;

  @media (max-width: 900px) {
    width: 100%;
    padding: 36px 24px 80px;
    box-sizing: border-box;
  }
`;

const ContentRail = styled.div`
  width: min(1282px, calc(100% - 64px));
  margin: 0 auto;

  @media (max-width: 900px) {
    width: 100%;
  }

  @media (max-width: 520px) {
    width: 100%;
  }
`;

const HeroTextRow = styled.div`
  margin-top: 69px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 40px;

  @media (max-width: 1180px) {
    justify-content: flex-start;
  }

  @media (max-width: 900px) {
    margin-top: 78px;
  }
`;

const HeroCopy = styled.div`
  min-width: 0;
`;

const KoreanTitle = styled.h1`
  margin: 0;
  color: #000000;
  font-size: clamp(30px, 3.05vw, 40px);
  font-weight: 700;
  line-height: 1.2;
  font-family: "Inter";
  letter-spacing: -0.8px;

  @media (max-width: 520px) {
    font-size: 28px;
  }
`;

const EnglishTitle = styled.div`
  color: #616161;
  font-size: clamp(30px, 3.05vw, 40px);
  font-weight: 700;
  font-family: "Inter";
  line-height: 1.2;
  letter-spacing: -0.8px;

  @media (max-width: 520px) {
    font-size: 28px;
  }
`;

const BlueText = styled.span`
  color: ${navy};
`;

const GhostCopy = styled.div`
  width: 587px;
  flex: 0 1 587px;
  color: #eeeeee;
  font-family: "Inter";
  font-size: clamp(30px, 3.05vw, 40px);
  font-weight: 700;
  line-height: 1.2;
  text-align: right;
  letter-spacing: -0.8px;

  @media (max-width: 1180px) {
    display: none;
  }
`;

const HeroImage = styled.img`
  width: 100%;
  height: 590px;
  display: block;
  margin: 32px auto 0;
  object-fit: cover;
  border-radius: 8px;

  @media (max-width: 900px) {
    height: auto;
    aspect-ratio: 1366 / 592;
    margin-top: 44px;
  }
`;

const IntroText = styled.div`
  width: 100%;
  margin: 38px auto 0;
  color: #000000;
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
  font-family: "Inter";
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
    margin-top: 42px;
    font-size: 17px;
    line-height: 1.55;
  }
`;

const ProjectsTitle = styled.h2`
  margin: 66px 0 0;
  color: ${navy};
  font-size: clamp(22px, 2.1vw, 36px);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.8px;

  @media (max-width: 900px) {
    margin-top: 66px;
  }
`;

const ProjectGrid = styled.div`
  width: 100%;
  margin: 18px auto 0;

  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  justify-content: space-between;
  gap: clamp(20px, 2.3vw, 32px);

  @media (max-width: 760px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 36px 24px;
  }

  @media (max-width: 520px) {
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
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
`;

const ProjectImage = styled.img`
  width: 100%;
  aspect-ratio: 404 / 227;
  height: auto;
  display: block;
  object-fit: cover;
  border-radius: 4px;
`;

const ProjectTitle = styled.h3`
  width: 100%;
  height: 150px;
  margin: 21px 0 18px;

  color: #111111;
  font-size: clamp(15px, 1.55vw, 24px);
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0;

  overflow-wrap: normal;
  word-break: normal;

  @media (max-width: 900px) {
    height: 92px;
    margin-top: 16px;
  }

  @media (max-width: 760px) {
    height: auto;
  }
`;

const TagList = styled.div`
  height: 74px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 10px;
`;

const ProjectTag = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 32px;
  padding: 0 12px;
  background: #dedede;
  color: #111111;
  font-size: clamp(12px, 1.25vw, 20px);
  font-weight: 500;
  line-height: 1.5;
  text-align: center;
  overflow-wrap: anywhere;
`;

const Partner = styled.div`
  margin-top: 0;
  display: flex;
  align-items: center;
  gap: 6.45px;
  color: #111111;
  font-size: clamp(13px, 1.35vw, 20px);
  font-weight: 500;
  line-height: 1.5;

  span {
    min-width: 0;
    overflow-wrap: normal;
  }

`;

const PartnerIcon = styled.img`
  width: clamp(18px, 2.35vw, 33.9068px);
  height: clamp(18px, 2.35vw, 33.9068px);
  object-fit: contain;
  flex: 0 0 auto;
`;

export default TestLanding;
