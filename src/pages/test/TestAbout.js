import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import schoolIcon from "../../assets/school.svg";
import mailIcon from "../../assets/mail.svg";
import phoneIcon from "../../assets/phone.svg";
import quoteLeftIcon from "../../assets/quote_left.svg";
import quoteRightIcon from "../../assets/quote_right.svg";
import stepOneIcon from "../../assets/figma/step-1.svg";
import stepTwoIcon from "../../assets/figma/step-2.svg";
import stepThreeIcon from "../../assets/figma/step-3.svg";
import stepFourIcon from "../../assets/figma/step-4.png";
import aboutDiagram from "../../assets/figma/about-diagram.svg";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";

const navy = "#113275";
const soft = "#e6e6e6";

const aboutTabs = [
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

const applicationItems = [
  { icon: stepOneIcon, text: "CV", emphasized: true },
  { icon: stepTwoIcon, text: "Academic Transcript", emphasized: true },
  {
    icon: stepThreeIcon,
    text: "(recommended) Statement of Research Interests and Relevant Experience",
    emphasized: false,
  },
  {
    icon: stepFourIcon,
    text: "(recommended) Any additional materials that demonstrate the applicant's qualifications or personal strengths",
    emphasized: false,
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
        <ContactLabel $address>VISIT US</ContactLabel>
        <ContactValue $address>
          D1008, 4th Engineering bldg,
          <br />
          50 Yonsei-ro, Seodaemun-gu, Seoul, Republic of Korea
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
        {applicationItems.map(({ emphasized, icon, text }) => (
          <ApplicationItem key={text} $emphasized={emphasized}>
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
  width: 733px;
  height: 58px;
  margin: 0;
  color: ${navy};
  font-size: 48px;
  font-weight: 700;
  line-height: 58.09px;
  letter-spacing: -0.96px;

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
  font-family: inherit;
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
  right: 38px;
  top: 451px;
  width: auto;
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
  width: min(1234px, calc(100% - 208px));
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
  width: 100%;
  height: auto;
  margin: 0 auto;
`;

const AboutDescription = styled.div`
  width: min(1171px, 100%);
  margin: 61px auto 0;
  color: #111111;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0;

  p {
    margin: 0;
  }

  p + p {
    margin-top: 34px;
  }

  strong {
    font-weight: 700;
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
  width: min(100%, 1442px);
  min-height: 1808px;
  margin: 0 auto;
  padding: 67px 0 64px;
  box-sizing: border-box;

  @media (max-width: 900px) {
    width: calc(100% - 48px);
    min-height: auto;
    padding: 56px 0 80px;
  }
`;

const ContactCards = styled.div`
  position: relative;
  width: 100%;
  height: 304px;

  @media (max-width: 900px) {
    height: auto;
    display: grid;
    grid-template-columns: 1fr;
    gap: 34px;
  }
`;

const ContactCard = styled.article`
  position: absolute;
  top: 0;
  height: 304px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border-left: ${(props) => (props.$withBorder ? "1px solid #e4e4e4" : "0")};
  text-align: center;

  &:nth-child(1) {
    left: 95px;
    width: 355px;
  }

  &:nth-child(2) {
    left: 481px;
    width: 481px;
  }

  &:nth-child(3) {
    left: 962px;
    width: 372px;
  }

  @media (max-width: 900px) {
    position: static;
    width: 100%;
    height: auto;
    min-height: auto;
    padding: 0 0 34px;
    border-left: 0;
    border-bottom: 1px solid #e4e4e4;
  }
`;

const IconWrap = styled.div`
  height: 100px;
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
  margin: 0 0 ${(props) => (props.$address ? "38px" : "60px")};
  color: ${navy};
  font-size: 24px;
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: 0;

  @media (max-width: 900px) {
    margin-bottom: 26px;
  }
`;

const ContactValue = styled.p`
  width: ${(props) => (props.$address ? "355px" : "100%")};
  max-width: 100%;
  margin: 0;
  color: ${navy};
  font-size: 24px;
  font-weight: 400;
  line-height: ${(props) => (props.$address ? "29.0455px" : "36px")};
  letter-spacing: ${(props) => (props.$address ? "-0.48px" : "0")};
  overflow-wrap: anywhere;
`;

const ApplicationNote = styled.section`
  position: relative;
  width: 1237px;
  max-width: calc(100% - 48px);
  min-height: 365px;
  margin: 0 0 0 97px;
  padding: 89px 60px 56px 51px;
  box-sizing: border-box;

  @media (max-width: 1340px) {
    margin-left: auto;
    margin-right: auto;
  }

  @media (max-width: 900px) {
    width: 100%;
    min-height: auto;
    padding: 72px 0 56px;
  }
`;

const QuoteLeftIcon = styled.img`
  position: absolute;
  left: 0;
  top: 89px;
  width: 40px;
  height: 40px;
  object-fit: contain;

  @media (max-width: 900px) {
    left: 0;
    top: 40px;
  }
`;

const QuoteRightIcon = styled.img`
  position: absolute;
  right: 0;
  top: 321px;
  width: 40px;
  height: 40px;
  object-fit: contain;

  @media (max-width: 900px) {
    right: 0;
    top: auto;
    bottom: 20px;
  }
`;

const ApplicationIntro = styled.p`
  margin: 0 0 38px;
  color: #000000;
  font-size: 22px;
  font-weight: 500;
  line-height: 33px;
  letter-spacing: 0;
  overflow-wrap: anywhere;

  @media (min-width: 1181px) {
    white-space: nowrap;
  }
`;

const ApplicationList = styled.ul`
  margin: 0;
  padding: 0 0 0 3px;
  list-style: none;
`;

const ApplicationItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 31px;
  color: #000000;
  font-size: 20px;
  font-weight: ${(props) => (props.$emphasized ? 600 : 400)};
  line-height: 30px;
  min-width: 0;

  span {
    min-width: 0;
    overflow-wrap: anywhere;
  }

  & + & {
    margin-top: 15px;
  }

  @media (min-width: 1181px) {
    span {
      white-space: nowrap;
    }
  }
`;

const StepIcon = styled.span`
  width: 35px;
  min-width: 35px;
  height: 35px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const StepImage = styled.img`
  display: block;
  width: 35px;
  height: 35px;
  object-fit: contain;
`;

const MapFrame = styled.div`
  width: 1250px;
  max-width: calc(100% - 48px);
  height: 861px;
  margin: 93px 0 0 96px;
  overflow: hidden;
  background: #edf3f9;

  @media (max-width: 1340px) {
    margin-left: auto;
    margin-right: auto;
  }

  @media (max-width: 900px) {
    width: 100%;
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
`;

export default TestAbout;
