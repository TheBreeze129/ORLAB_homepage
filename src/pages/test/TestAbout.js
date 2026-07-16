import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import schoolIcon from "../../assets/school.svg";
import mailIcon from "../../assets/mail.svg";
import phoneIcon from "../../assets/phone.svg";
import quoteLeftIcon from "../../assets/quote_left.svg";
import quoteRightIcon from "../../assets/quote_right.svg";
import stepOneIcon from "../../assets/n_1.svg";
import stepTwoIcon from "../../assets/n_2.svg";
import stepThreeIcon from "../../assets/n_3.svg";
import stepFourIcon from "../../assets/n_4.png";
import aboutDiagram from "../../assets/about.svg";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";

const navy = "#113275";
const soft = "#e6e6e6";

const aboutTabs = [
  { id: "about", label: "ABOUT" },
  { id: "contact", label: "CONTACT" },
];

const applicationItems = [
  { icon: stepOneIcon, text: "CV" },
  { icon: stepTwoIcon, text: "Academic Transcript" },
  {
    icon: stepThreeIcon,
    text: "(recommended) Statement of Research Interests and Relevant Experience",
  },
  {
    icon: stepFourIcon,
    text: "(recommended) Any additional materials that demonstrate the applicant's qualifications or personal strengths",
  },
];

const mapCenter = {
  lat: 37.56184,
  lng: 126.93613,
};
const kakaoMapLevel = 3;
const embedMapZoom = 17;

const TestAbout = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedTab = searchParams.get("tab");
  const activeTab = requestedTab === "contact" ? "contact" : "about";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const handleTabChange = (tabId) => {
    setSearchParams(tabId === "about" ? {} : { tab: tabId });
  };

  return (
    <PageShell>
      <HeaderHeroFrame aria-label="About header and hero">
        <Header activeSection="about" activeAbout={activeTab} />
        <HeroTitle>Operations Research Lab</HeroTitle>
        <TopTabs aria-label="About section selector">
          {aboutTabs.map((item) => (
            <TopTabButton
              key={item.id}
              type="button"
              $active={activeTab === item.id}
              onClick={() => handleTabChange(item.id)}
            >
              {item.label}
            </TopTabButton>
          ))}
        </TopTabs>
        <HeroDivider />
      </HeaderHeroFrame>

      {activeTab === "contact" ? <ContactContent /> : <AboutContent />}
      <Footer />
    </PageShell>
  );
};

const AboutContent = () => (
  <AboutFrame>
    <AboutDiagram
      src={aboutDiagram}
      alt="Operations Research Lab research framework diagram"
    />
    <AboutDescription>
      <p>
        <strong>Operations Research Lab</strong> addresses complex
        decision-making problems in real-world industrial environments by
        leveraging artificial intelligence and optimization technologies.
      </p>
      <p>
        Our goal is to create tangible value for industry by developing
        approaches in which AI understands real-world problems and optimization
        provides practical and executable solutions.
      </p>
      <p>
        We study intelligent systems that support better decision-making by
        utilizing diverse forms of data, including images, videos, and
        documents.
        <br />A central focus of our research is the development of practical AI
        and optimization methodologies that incorporate domain knowledge and
        real-world operational constraints.
      </p>
      <p>
        Our major research areas include multimodal artificial intelligence,
        Vision-Language Models, OCR-based document understanding, RAG-based AI
        agents, reinforcement learning, metaheuristics, mathematical
        optimization, scheduling, and resource allocation optimization.
      </p>
      <p>
        We address problems closely connected to real-world industries,
        including manufacturing, advanced logistics, and travel and concierge
        service automation.
        <br />
        Through active collaboration with industry partners, we further develop
        our research outcomes to ensure that they can be effectively deployed
        and applied in practical settings.
      </p>
    </AboutDescription>
  </AboutFrame>
);

const ContactContent = () => (
  <ContactFrame>
    <ContactCards aria-label="ORLAB contact summary">
      <ContactCard>
        <IconWrap>
          <Pictogram src={schoolIcon} alt="" aria-hidden="true" />
        </IconWrap>
        <ContactLabel>VISIT US</ContactLabel>
        <ContactValue>
          D1008, 4th Engineering bldg,
          <br />
          50 Yonsei-ro, Seodaemun-gu, Seoul,
          <br />
          Republic of Korea
        </ContactValue>
      </ContactCard>

      <ContactCard $withBorder>
        <IconWrap>
          <Pictogram src={mailIcon} alt="" aria-hidden="true" />
        </IconWrap>
        <ContactLabel>CONTACT US</ContactLabel>
        <ContactValue>kh.lee@yonsei.ac.kr (KeonHee Lee)</ContactValue>
      </ContactCard>

      <ContactCard $withBorder>
        <IconWrap>
          <Pictogram src={phoneIcon} alt="" aria-hidden="true" />
        </IconWrap>
        <ContactLabel>CALL US</ContactLabel>
        <ContactValue>82+ 2-2123-7473</ContactValue>
      </ContactCard>
    </ContactCards>

    <ApplicationNote aria-label="Application materials">
      <QuoteLeftIcon src={quoteLeftIcon} alt="" aria-hidden="true" />
      <ApplicationIntro>
        Applicants should combine all required documents into a single file and submit their application via email
      </ApplicationIntro>
      <ApplicationList>
        {applicationItems.map(({ icon, text }) => (
          <ApplicationItem key={text}>
            <StepIcon>
              <StepImage src={icon} alt="" aria-hidden="true" />
            </StepIcon>
            <span>{text}</span>
          </ApplicationItem>
        ))}
      </ApplicationList>
      <QuoteRightIcon src={quoteRightIcon} alt="" aria-hidden="true" />
    </ApplicationNote>

    <ContactMap />
  </ContactFrame>
);

const ContactMap = () => {
  const mapRef = useRef(null);
  const [fallbackMap, setFallbackMap] = useState(false);
  const kakaoKey = process.env.REACT_APP_KAKAO_MAP_API_KEY;
  const shouldUseKakao = Boolean(kakaoKey) && !fallbackMap;

  useEffect(() => {
    if (!shouldUseKakao || !mapRef.current) return;

    const renderMap = () => {
      if (!window.kakao?.maps || !mapRef.current) {
        setFallbackMap(true);
        return;
      }

      window.kakao.maps.load(() => {
        const center = new window.kakao.maps.LatLng(mapCenter.lat, mapCenter.lng);
        const map = new window.kakao.maps.Map(mapRef.current, {
          center,
          level: kakaoMapLevel,
        });

        new window.kakao.maps.Marker({
          map,
          position: center,
          title: "ORLAB",
        });
      });
    };

    const existingScript = document.getElementById("kakao-map-sdk");
    if (existingScript) {
      if (window.kakao?.maps) {
        renderMap();
      } else {
        existingScript.addEventListener("load", renderMap, { once: true });
        existingScript.addEventListener("error", () => setFallbackMap(true), {
          once: true,
        });
      }
      return;
    }

    const script = document.createElement("script");
    script.id = "kakao-map-sdk";
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&autoload=false`;
    script.onload = renderMap;
    script.onerror = () => setFallbackMap(true);
    document.head.appendChild(script);
  }, [kakaoKey, shouldUseKakao]);

  return (
    <MapFrame aria-label="ORLAB location map">
      {shouldUseKakao ? (
        <MapCanvas ref={mapRef} />
      ) : (
        <MapIframe
          title="ORLAB location near Yonsei University"
          src={`https://maps.google.com/maps?q=${mapCenter.lat},${mapCenter.lng}&z=${embedMapZoom}&output=embed`}
          referrerPolicy="no-referrer-when-downgrade"
        />
      )}
    </MapFrame>
  );
};

const PageShell = styled.main`
  min-height: 100vh;
  background: #ffffff;
  color: #000000;
  font-family: "Inter", "Pretendard", "Helvetica Neue", Arial, sans-serif;
`;

const HeaderHeroFrame = styled.section`
  position: relative;
  width: min(100%, 1442px);
  height: 452px;
  margin: 0 auto;
  background: #ffffff;
  overflow: visible;

  @media (max-width: 780px) {
    height: auto;
    min-height: 452px;
    padding: 36px 24px 44px;
    box-sizing: border-box;
  }
`;

const HeroTitle = styled.h1`
  position: absolute;
  left: 111px;
  top: 258px;
  margin: 0;
  color: ${navy};
  font-size: 48px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: 0;

  @media (max-width: 780px) {
    position: static;
    margin-bottom: 40px;
    font-size: 40px;
  }
`;

const TopTabs = styled.div`
  position: absolute;
  left: 111px;
  top: 357px;
  display: flex;
  align-items: center;
  gap: 23px;

  @media (max-width: 780px) {
    position: static;
    flex-wrap: wrap;
  }
`;

const TopTabButton = styled.button`
  min-width: 120px;
  height: 54px;
  padding: 0 24px;
  border: 0;
  border-radius: 8px;
  background: ${(props) => (props.$active ? navy : soft)};
  color: ${(props) => (props.$active ? "#ffffff" : "#000000")};
  font-size: 20px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

const HeroDivider = styled.div`
  position: absolute;
  left: 38px;
  top: 451px;
  width: 1366px;
  height: 1px;
  background: #c3c3c3;

  @media (max-width: 780px) {
    left: 24px;
    right: 24px;
    top: auto;
    bottom: 0;
    width: auto;
  }
`;

const AboutFrame = styled.section`
  width: min(1366px, calc(100% - 76px));
  min-height: 1842px;
  margin: 0 auto;
  padding: 58px 0 76px;
  box-sizing: border-box;

  @media (max-width: 780px) {
    width: calc(100% - 48px);
    min-height: 960px;
    padding: 56px 0 80px;
  }
`;

const AboutDiagram = styled.img`
  display: block;
  width: min(1311px, 100%);
  height: auto;
  margin: 0 auto;
`;

const AboutDescription = styled.div`
  margin: 61px 0 0;
  color: #111111;
  font-size: 20px;
  font-weight: 600;
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

  @media (max-width: 780px) {
    margin-top: 46px;
    font-size: 17px;
    line-height: 1.55;

    p + p {
      margin-top: 26px;
    }
  }
`;

const ContactFrame = styled.section`
  width: min(1366px, calc(100% - 76px));
  min-height: 1808px;
  margin: 0 auto;
  padding: 76px 0 64px;
  box-sizing: border-box;

  @media (max-width: 900px) {
    width: calc(100% - 48px);
    min-height: auto;
    padding: 56px 0 80px;
  }
`;

const ContactCards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  min-height: 302px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 34px;
  }
`;

const ContactCard = styled.article`
  min-height: 302px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border-left: ${(props) => (props.$withBorder ? "1px solid #e4e4e4" : "0")};
  text-align: center;

  @media (max-width: 900px) {
    min-height: auto;
    padding: 0 0 34px;
    border-left: 0;
    border-bottom: 1px solid #e4e4e4;
  }
`;

const IconWrap = styled.div`
  height: 84px;
  margin: 0 0 37px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Pictogram = styled.img`
  display: block;
  width: 100px;
  height: 100px;
  object-fit: contain;
`;

const ContactLabel = styled.h2`
  margin: 0 0 70px;
  color: ${navy};
  font-size: 24px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: 0;

  @media (max-width: 900px) {
    margin-bottom: 26px;
  }
`;

const ContactValue = styled.p`
  margin: 0;
  color: ${navy};
  font-size: 22px;
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: 0;
`;

const ApplicationNote = styled.section`
  position: relative;
  min-height: 342px;
  padding: 101px 60px 56px 286px;
  box-sizing: border-box;

  @media (max-width: 900px) {
    min-height: auto;
    padding: 72px 0 56px;
  }
`;

const QuoteLeftIcon = styled.img`
  position: absolute;
  left: 58px;
  top: 99px;
  width: 41px;
  height: 41px;
  object-fit: contain;

  @media (max-width: 900px) {
    left: 0;
    top: 40px;
  }
`;

const QuoteRightIcon = styled.img`
  position: absolute;
  right: 56px;
  bottom: 45px;
  width: 41px;
  height: 41px;
  object-fit: contain;

  @media (max-width: 900px) {
    right: 0;
    bottom: 20px;
  }
`;

const ApplicationIntro = styled.p`
  margin: 0 0 25px;
  color: #000000;
  font-size: 21px;
  font-weight: 700;
  line-height: 1.55;
  letter-spacing: 0;
`;

const ApplicationList = styled.ul`
  margin: 0;
  padding: 0 0 0 36px;
  list-style: none;
`;

const ApplicationItem = styled.li`
  display: flex;
  align-items: center;
  gap: 28px;
  color: #000000;
  font-size: 19px;
  font-weight: 700;
  line-height: 1.55;

  & + & {
    margin-top: 15px;
  }
`;

const StepIcon = styled.span`
  width: 34px;
  min-width: 34px;
  height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const StepImage = styled.img`
  display: block;
  width: 36px;
  height: 36px;
  object-fit: contain;
`;

const MapFrame = styled.div`
  width: 100%;
  height: 894px;
  overflow: hidden;
  background: #edf3f9;

  @media (max-width: 900px) {
    height: 520px;
  }
`;

const MapCanvas = styled.div`
  width: 100%;
  height: 100%;
`;

const MapIframe = styled.iframe`
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
  opacity: 0.78;
`;

export default TestAbout;
