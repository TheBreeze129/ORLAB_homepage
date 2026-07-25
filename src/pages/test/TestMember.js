import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header.js";
import Hero from "./components/Hero.js";
import Footer from "./components/Footer.js";
import profMoImage from "../../assets/profmo.jpg";
import researcherPlaceholder from "../../assets/figma/member-researcher-placeholder.png";
import alumniPlaceholder from "../../assets/figma/member-alumni-placeholder.png";
import professorMailIcon from "../../assets/figma/professor-mail.png";
import professorWebIcon from "../../assets/figma/professor-web.png";
import professorScholarIcon from "../../assets/figma/professor-scholar.png";
import professorEducationIcon from "../../assets/figma/professor-education.png";
import professorBriefcaseIcon from "../../assets/figma/professor-briefcase.png";
import professorMedalIcon from "../../assets/figma/professor-medal.png";
import professorTempleIcon from "../../assets/figma/professor-temple.png";
import professorHandshakeIcon from "../../assets/figma/professor-handshake.png";

const navy = "#113275";

const memberTabs = [
  { id: "professor", label: "Professor", width: "140px" },
  { id: "researchers", label: "Researchers", width: "168px" },
  { id: "alumni", label: "Alumni", width: "114px" },
];

const researcherSections = [
  { key: "pd", title: "Post Doc." },
  { key: "phd", title: "Ph.D." },
  { key: "ms", title: "M.S." },
  { key: "intern", title: "Intern" },
];

const alumniSections = [
  { key: "alumni_phd", title: "Ph.D." },
  { key: "alumni_ms", title: "M.S." },
];

const professorCards = [
  {
    title: "Education",
    icon: professorEducationIcon,
    iconSize: "60px",
    items: [
      "Ph.D., University of California, Berkeley",
      "M.S., University of California, Berkeley",
      "B.S., Seoul National University",
    ],
  },
  {
    title: "Professional Experience",
    icon: professorBriefcaseIcon,
    iconSize: "55px",
    items: [
      "Professor, Yonsei University",
      "KAIST",
      "AT&T Bell Labs",
      "Silicon Valley Startups",
    ],
  },
  {
    title: "Academic Leadership",
    icon: professorMedalIcon,
    iconSize: "55px",
    lineTop: "75.5px",
    lineHeight: "284px",
    wide: true,
    items: [
      "2026: President, Korea Media Management Association",
      "2025: President, Korean Operations Research and Management Science Society",
      "2024: Senior Vice President, Korean Operations Research and Management Science Society",
      "2024: Co-Chair, KORMS/KIIE Joint Spring Conference",
      "2022~2023: Vice President for Industry-Academia Cooperation, Korean Operations Research and Management Science Society",
      "2021: Vice President, Korean Operations Research and Management Science Society",
      "2019~2020: Board Member, Korean Operations Research and Management Science Society",
      "2021~2024: Vice President, Korea Media Management Association",
      "2020: Auditor, Korea Media Management Association",
      "2016, 2019: Board Member, Korea Media Management Association",
      "2021: Vice President, Cybercommunication Academic Society",
      "2018~2019: Board Member, Korean Institute of Communications and Information Sciences",
    ],
  },
  {
    title: "Public Activities",
    icon: professorTempleIcon,
    iconSize: "55px",
    lineTop: "80.5px",
    lineHeight: "208px",
    wide: true,
    items: [
      "2024: Program Director, Engineering Management Program, Graduate School of Engineering, Yonsei University",
      "2019~2020: Program Director, Convergence Technology Management, Graduate School of Engineering, Yonsei University",
      "2018~2020: Program Director, Industrial Information Management, Graduate School of Engineering, Yonsei University",
      "2023~2024: Chair, Economic Convergence Division, Digital Society",
      "2020~2021: Member, Pay-TV Forum, Ministry of Science and ICT",
      "2018~Present: Member, Expert Evaluation Committee for Big Data, Public Procurement Service",
      "2016: Expert Reviewer, Korean Master Craftsman Program, Human Resources Development Service of Korea",
      "2014~2018: Head, Industrial Engineering Division, UNITEF",
      "2016~2017: Committee Member, Pay-TV Research Forum, KT Skylife",
    ],
  },
  {
    title: "Industrial Cooperation",
    icon: professorHandshakeIcon,
    iconSize: "60px",
    lineTop: "70px",
    lineHeight: "106px",
    wide: true,
    items: [
      "2021: Big Data Advisor, Samsung Electronics",
      "2020: Member, Big Data & AI Industry-Academia Cluster, Hyundai Motor Company",
      "2017~2018: Member, Fintech Forum Committee, BC Card",
      "2016~2018: Big Data Advisor, LG Uplus",
      "2008~2020: Editor, Journal of Communications and Networks",
    ],
  },
];

const dummyResearchers = {
  pd: makeDummyResearchers("pd", 3),
  phd: makeDummyResearchers("phd", 3),
  ms: makeDummyResearchers("ms", 9),
  intern: makeDummyResearchers("intern", 3),
};

const dummyAlumni = {
  alumni_phd: makeDummyAlumni("alumni-phd", 6),
  alumni_ms: makeDummyAlumni("alumni-ms", 6),
};

const TestMember = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedTab = searchParams.get("tab");
  const activeTab = memberTabs.some((item) => item.id === requestedTab)
    ? requestedTab
    : "professor";
  const [memberData, setMemberData] = useState({});
  const [loadingKeys, setLoadingKeys] = useState({});
  const [errorKeys, setErrorKeys] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === "professor") return undefined;

    const keys =
      activeTab === "researchers"
        ? researcherSections.map((section) => section.key)
        : alumniSections.map((section) => section.key);
    const controller = new AbortController();
    let isCurrent = true;

    setLoadingKeys((current) => ({
      ...current,
      ...Object.fromEntries(keys.map((key) => [key, true])),
    }));

    keys.forEach(async (key) => {
      try {
        const response = await fetch("/api/student", {
          method: "GET",
          headers: { stdtype: key },
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Member API returned ${response.status}`);
        }

        const data = await response.json();
        if (!Array.isArray(data.results)) {
          throw new Error("Member API returned an invalid response");
        }

        if (isCurrent) {
          setMemberData((current) => ({
            ...current,
            [key]: data.results.length > 0 ? data.results : getDummyMembers(key),
          }));
          setErrorKeys((current) => ({ ...current, [key]: false }));
        }
      } catch (error) {
        if (error.name === "AbortError") return;

        console.error(`Failed to fetch ${key} member data:`, error);
        if (isCurrent) {
          setMemberData((current) => ({ ...current, [key]: getDummyMembers(key) }));
          setErrorKeys((current) => ({ ...current, [key]: false }));
        }
      } finally {
        if (isCurrent) {
          setLoadingKeys((current) => ({ ...current, [key]: false }));
        }
      }
    });

    return () => {
      isCurrent = false;
      controller.abort();
    };
  }, [activeTab]);

  const handleTabChange = (tabId) => {
    setSearchParams(tabId === "professor" ? {} : { tab: tabId });
  };

  return (
    <PageShell>
      <HeaderHeroFrame aria-label="Members header and hero">
        <Header activeSection="member" activeMember={activeTab} />
        <Hero
          title="Members"
          items={memberTabs}
          activeId={activeTab}
          onChange={handleTabChange}
          ariaLabel="Member section selector"
          showDivider={false}
        />
      </HeaderHeroFrame>

      {activeTab === "professor" ? (
        <ProfessorContent />
      ) : activeTab === "researchers" ? (
        <ResearchersContent
          data={memberData}
          errors={errorKeys}
          loading={loadingKeys}
        />
      ) : (
        <AlumniContent
          data={memberData}
          errors={errorKeys}
          loading={loadingKeys}
        />
      )}

      <Footer />
    </PageShell>
  );
};

function makeDummyResearchers(prefix, count) {
  return Array.from({ length: count }, (_, index) => ({
    id: `${prefix}-dummy-${index + 1}`,
    Name: "Hyomin Choi",
    Email: "abc@abc.com",
    interests: "VLM, Smart Factory",
    image: researcherPlaceholder,
  }));
}

function makeDummyAlumni(prefix, count) {
  return Array.from({ length: count }, (_, index) => ({
    id: `${prefix}-dummy-${index + 1}`,
    Name: "Sang Ho Oh",
    Email: "minjeong.kim@yonsei.ac.kr",
    outdate: "August 2021",
    To_go: "Professor at Pukyong National University",
    image: alumniPlaceholder,
  }));
}

function getDummyMembers(key) {
  return dummyResearchers[key] || dummyAlumni[key] || [];
}

const ProfessorContent = () => (
  <ProfessorFrame>
    <ProfessorIntro>
      <ProfessorImage src={profMoImage} alt="Jeonghoon Mo" />
      <ProfessorInfo>
        <ProfessorName>Jeonghoon Mo</ProfessorName>
        <ProfessorRole>
          Professor, Department of Industrial Engineering, Yonsei University
        </ProfessorRole>
        <ProfessorLinks aria-label="Professor contact links">
          <ProfessorLink href="mailto:j.mo@yonsei.ac.kr">
            <ProfessorLinkIcon src={professorMailIcon} alt="" aria-hidden="true" />
            <span>j.mo@yonsei.ac.kr</span>
          </ProfessorLink>
          <ProfessorLink
            href="https://sites.google.com/yonsei.ac.kr/jhmo-yonsei"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ProfessorLinkIcon src={professorWebIcon} alt="" aria-hidden="true" />
            <span>Personal Homepage</span>
          </ProfessorLink>
          <ProfessorLink
            href="https://scholar.google.com/citations?user=t624_PoAAAAJ&hl=en"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ProfessorLinkIcon src={professorScholarIcon} alt="" aria-hidden="true" />
            <span>Google Scholar</span>
          </ProfessorLink>
        </ProfessorLinks>
      </ProfessorInfo>
    </ProfessorIntro>

    <ContentDivider />

    <ProfessorSummaryGrid>
      {professorCards.slice(0, 2).map((card) => {
        return (
          <ProfessorSummaryBlock key={card.title}>
            <CardHeader>
              <CardIcon
                src={card.icon}
                alt=""
                aria-hidden="true"
                $size={card.iconSize}
              />
              <CardTitle>{card.title}</CardTitle>
            </CardHeader>
            <CardList>
              {card.items.map((item) => (
                <li key={item}>{highlightProfessorText(item)}</li>
              ))}
            </CardList>
          </ProfessorSummaryBlock>
        );
      })}
    </ProfessorSummaryGrid>

    <ProfessorActivityList>
      {professorCards.slice(2).map((card) => {
        return (
          <ProfessorActivitySection key={card.title}>
            <ActivityIcon>
              <CardIcon
                src={card.icon}
                alt=""
                aria-hidden="true"
                $size={card.iconSize}
              />
            </ActivityIcon>
            <ActivityBody>
              <CardTitle>{card.title}</CardTitle>
              <CardList>
                {card.items.map((item) => (
                  <li key={item}>{highlightProfessorText(item)}</li>
                ))}
              </CardList>
            </ActivityBody>
          </ProfessorActivitySection>
        );
      })}
    </ProfessorActivityList>
  </ProfessorFrame>
);

const ResearchersContent = ({ data, errors, loading }) => (
  <MembersFrame $minHeight="2240px">
    {researcherSections.map((section) => (
      <ResearcherSection key={section.key}>
        <MemberSectionTitle>{section.title}</MemberSectionTitle>
        <MemberSectionDivider />
        <ResearcherGrid>
          <MemberListStatus
            rows={data[section.key]}
            isLoading={loading[section.key]}
            hasError={errors[section.key]}
            label={section.title}
          />
          {(data[section.key] || []).map((member) => (
            <ResearcherCard key={member.id || member.Email || member.Name}>
              <ResearcherImage src={member.image} alt={member.Name} />
              <ResearcherName>{normalizeName(member.Name)}</ResearcherName>
              <ResearcherMeta>{member.interests}</ResearcherMeta>
              <ResearcherMeta>{member.Email}</ResearcherMeta>
            </ResearcherCard>
          ))}
        </ResearcherGrid>
      </ResearcherSection>
    ))}
  </MembersFrame>
);

const AlumniContent = ({ data, errors, loading }) => (
  <MembersFrame $minHeight="1868px">
    {alumniSections.map((section) => (
      <AlumniSection key={section.key}>
        <MemberSectionTitle>{section.title}</MemberSectionTitle>
        <MemberSectionDivider />
        <AlumniGrid>
          <MemberListStatus
            rows={data[section.key]}
            isLoading={loading[section.key]}
            hasError={errors[section.key]}
            label={section.title}
          />
          {(data[section.key] || []).map((member) => (
            <AlumniCard key={member.id || member.Email || member.Name}>
              <AlumniImage src={member.image} alt={member.Name} />
              <AlumniDetails>
                <AlumniName>{normalizeName(member.Name)}</AlumniName>
                <AlumniMeta>
                  {member.outdate ? `${section.title}, Graduated on ${member.outdate}` : section.title}
                </AlumniMeta>
                <AlumniMeta>{member.Email}</AlumniMeta>
                <AlumniDestination>{member.To_go}</AlumniDestination>
              </AlumniDetails>
            </AlumniCard>
          ))}
        </AlumniGrid>
      </AlumniSection>
    ))}
  </MembersFrame>
);

const MemberListStatus = ({ rows = [], isLoading, hasError, label }) => {
  if (isLoading) {
    return <StatusText role="status">Loading {label}...</StatusText>;
  }

  if (hasError) {
    return <StatusText role="alert">Unable to load {label}.</StatusText>;
  }

  if (rows.length === 0) {
    return <StatusText>No {label} members available.</StatusText>;
  }

  return null;
};

const highlightProfessorText = (value) => {
  const separatorIndex = value.indexOf(": ");
  if (separatorIndex < 0) return value;

  const boldStart = separatorIndex + 2;
  const commaIndex = value.indexOf(", ", boldStart);
  if (commaIndex < 0) return value;

  return (
    <>
      {value.slice(0, boldStart)}
      <strong>{value.slice(boldStart, commaIndex)}</strong>
      {value.slice(commaIndex)}
    </>
  );
};

const normalizeName = (value = "") => value.trim() || "No Name";

const PageShell = styled.main`
  min-height: 100vh;
  background: #ffffff;
  color: #000000;
  font-family: "Inter", "Pretendard", "Helvetica Neue", Arial, sans-serif;
`;

const HeaderHeroFrame = styled.section`
  width: min(100%, 1442px);
  min-height: 452px;
  margin: 0 auto;
  background: #ffffff;
  overflow: visible;

  @media (max-width: 780px) {
    padding: 36px 24px 44px;
    box-sizing: border-box;
  }
`;

const ProfessorFrame = styled.section`
  width: min(1137px, calc(100% - 96px));
  min-height: 1796px;
  margin: 0 auto;
  padding: 38px 0 64px;
  box-sizing: border-box;

  @media (max-width: 980px) {
    width: calc(100% - 48px);
  }
`;

const ProfessorIntro = styled.div`
  display: grid;
  grid-template-columns: 246px 1fr;
  gap: 61px;
  align-items: start;
  padding: 0 0 0;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

const ProfessorImage = styled.img`
  width: 246px;
  height: 339px;
  object-fit: cover;
  border-radius: 4px;
`;

const ProfessorInfo = styled.div`
  max-width: 830px;
  padding-top: 83px;

  @media (max-width: 820px) {
    padding-top: 0;
  }
`;

const ProfessorName = styled.h2`
  margin: 0 0 35px;
  color: ${navy};
  font-family: "Roboto", "Inter", sans-serif;
  font-size: 45px;
  font-weight: 400;
  line-height: 52px;
  letter-spacing: 0;
  overflow-wrap: anywhere;
`;

const ProfessorRole = styled.p`
  margin: 0 0 17px;
  padding-bottom: 23px;
  border-bottom: 3px solid ${navy};
  color: #202020;
  font-family: "Roboto", "Inter", sans-serif;
  font-size: 24px;
  font-weight: 400;
  line-height: 32px;
  overflow-wrap: anywhere;
`;

const ProfessorLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 24px;
`;

const ProfessorLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 16px;
  color: #555555;
  font-size: 24px;
  font-weight: 300;
  line-height: 36px;
  text-decoration: underline;
  text-underline-offset: 3px;
  min-width: 0;
  overflow-wrap: anywhere;
`;

const ProfessorLinkIcon = styled.img`
  width: 30px;
  height: 30px;
  flex: 0 0 auto;
  object-fit: contain;
`;

const ContentDivider = styled.div`
  width: min(1366px, calc(100vw - 76px));
  height: 1px;
  margin: 83px 0 0
    calc((1137px - min(1366px, calc(100vw - 76px))) / 2 + 7.5px);
  background: #d0d0d0;

  @media (max-width: 980px) {
    width: 100%;
    margin-left: 0;
  }
`;

const ProfessorSummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 104px;
  margin-top: 65px;
  padding: 0 42px;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
    gap: 48px;
    padding: 0;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 22px;
  color: ${navy};
`;

const CardIcon = styled.img`
  width: ${(props) => props.$size};
  height: ${(props) => props.$size};
  flex: 0 0 auto;
  object-fit: contain;
`;

const CardTitle = styled.h3`
  margin: 0;
  color: ${navy};
  font-size: 30px;
  font-weight: 700;
  line-height: 36.3068px;
  letter-spacing: -0.6px;
  overflow-wrap: anywhere;
`;

const CardList = styled.ul`
  margin: 0;
  padding-left: 30px;
  color: #333333;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.48;
  overflow-wrap: anywhere;

  strong {
    color: #242424;
    font-weight: 800;
  }
`;

const ProfessorSummaryBlock = styled.article`
  min-width: 0;

  ${CardList} {
    position: relative;
    margin: 0;
    padding-left: 75px;

    &::before {
      content: "";
      position: absolute;

      left: 28px;
      top: 0;
      bottom: 0;

      width: 3px;
      transform: translateX(-50%);
      background: ${navy};
    }
  }
`;

const ProfessorActivityList = styled.div`
  margin-top: 68px;
  padding: 0 0 0 42px;

  @media (max-width: 820px) {
    padding: 0;
  }
`;

const ProfessorActivitySection = styled.section`
  display: grid;
  grid-template-columns: 58px minmax(0, 1fr);
  gap: 24px;
  padding: 0 0 56px;

  &:last-child {
    padding-bottom: 0;
  }
`;

const ActivityIcon = styled.div`
  position: relative;
  z-index: 1;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  color: ${navy};
`;

const ActivityBody = styled.div`
  position: relative;
  min-width: 0;

  &::before {
    content: "";
    position: absolute;

    left: -54px;   /* 아이콘 중심 */
    top: 68px;     /* 제목 아래부터 */
    bottom: 0;

    width: 3px;
    background: ${navy};
  }

  ${CardTitle} {
    margin: 6px 0 22px;
  }

  ${CardList} {
    margin: 0;
    padding-left: 0;
  }
`;

const MembersFrame = styled.section`
  width: min(1177px, calc(100% - 96px));
  min-height: ${(props) => props.$minHeight || "1600px"};
  margin: -16px auto 0;
  padding: 0 0 80px;
  box-sizing: border-box;

  @media (min-width: 981px) {
    width: 1177px;
    margin-left: max(48px, calc((100% - 1177px) / 2 + 7px));
    margin-right: auto;
  }

  @media (max-width: 980px) {
    width: calc(100% - 48px);
    margin: 0 auto;
  }
`;

const ResearcherSection = styled.section`
  margin-bottom: 45px;
`;

const AlumniSection = styled.section`
  margin-bottom: 73px;
`;

const MemberSectionTitle = styled.h2`
  margin: 8px 0 -1px 4px;
  color: ${navy};
  font-family: "Roboto", "Inter", sans-serif;
  font-size: 22px;
  font-weight: 800;
  line-height: 36px;
  letter-spacing: 0px;
`;

const MemberSectionDivider = styled.div`
  width: calc(100% - 4px);
  height: 1px;
  margin-left: 4px;
  margin-bottom: 28px;
  background: #303030;
`;

const ResearcherGrid = styled.div`
  width: 1064px;
  max-width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 236px);
  justify-content: space-between;
  gap: 0;
  padding: 0;

  @media (max-width: 980px) {
    width: 100%;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 236px), 236px));
    justify-content: center;
    gap: 45px 64px;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const ResearcherCard = styled.article`
  width: 236px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-width: 0;

  @media (max-width: 640px) {
    width: 100%;
  }
`;

const ResearcherImage = styled.img`
  width: 190px;
  height: 244px;
  object-fit: cover;
  object-position: center top;
  border-radius: 15px;
  margin-bottom: 25px;
`;

const ResearcherName = styled.h3`
  margin: 0 0 14px;
  color: #000000;
  font-family: "Inter", "Pretendard", "Helvetica Neue", Arial, sans-serif;
  font-size: 30px;
  font-weight: 800;
  line-height: 36px;
  letter-spacing: 0;
  max-width: 100%;
  overflow-wrap: anywhere;
`;

const ResearcherMeta = styled.p`
  margin: 0;
  color: #1f1f1f;
  font-size: 20px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.25px;
  max-width: 100%;
  overflow-wrap: anywhere;
`;

const AlumniGrid = styled.div`
  width: 1177px;
  max-width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 368px);
  justify-content: space-between;
  gap: 42px 0;
  padding: 0;

  @media (max-width: 1180px) {
    grid-template-columns: repeat(auto-fit, 368px);
    justify-content: center;
    gap: 36px 42px;
  }

  @media (max-width: 640px) {
    grid-template-columns: minmax(0, 368px);
  }
`;

const AlumniCard = styled.article`
  width: 368px;
  height: 200px;
  display: grid;
  grid-template-columns: 120px minmax(0, 1fr);
  gap: 0 18px;
  align-items: start;
  padding: 22px 14px 18px 16px;
  border: 1px solid ${navy};
  border-radius: 15px;
  box-sizing: border-box;

  @media (max-width: 680px) {
    width: min(100%, 368px);
    grid-template-columns: 112px minmax(0, 1fr);
    gap: 0 16px;
    padding: 22px 12px 18px 14px;
  }
`;

const AlumniImage = styled.img`
  width: 120px;
  height: 146px;
  border: 0;
  border-radius: 8px;
  object-fit: cover;
  object-position: center top;

  @media (max-width: 680px) {
    width: 112px;
    height: 138px;
  }
`;

const AlumniDetails = styled.div`
  min-width: 0;
  padding-top: 8px;
`;

const AlumniName = styled.h3`
  margin: 0 0 8px;
  color: #000000;
  font-family: "Roboto", "Inter", sans-serif;
  font-size: 22px;
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: 0;
  overflow-wrap: anywhere;

  @media (max-width: 680px) {
    font-size: 21px;
  }
`;

const AlumniMeta = styled.p`
  margin: 0 0 6px;
  color: #222222;
  font-family: "Roboto", "Inter", sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.35;
  letter-spacing: 0.25px;
  overflow-wrap: anywhere;

  @media (max-width: 680px) {
    font-size: 13px;
  }
`;

const AlumniDestination = styled.p`
  margin: 17px 0 0;
  color: ${navy};
  font-family: "Roboto", "Inter", sans-serif;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: 0.25px;
  overflow-wrap: anywhere;

  @media (max-width: 680px) {
    margin-top: 14px;
    font-size: 17px;
  }
`;

const StatusText = styled.div`
  grid-column: 1 / -1;
  min-height: 120px;
  color: #8c8c8c;
  font-size: 18px;
  font-weight: 500;
`;

export default TestMember;
