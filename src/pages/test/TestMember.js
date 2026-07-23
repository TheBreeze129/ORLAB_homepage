import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import {
  FaBriefcase,
  FaGraduationCap,
  FaHandshake,
  FaMedal,
  FaUniversity,
} from "react-icons/fa";
import { FiGlobe, FiMail } from "react-icons/fi";
import { SiGooglescholar } from "react-icons/si";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import profMoImage from "../../assets/profmo.jpg";

const navy = "#113275";
const soft = "#e6e6e6";

const memberTabs = [
  { id: "professor", label: "PROFESSOR", width: "148px" },
  { id: "researchers", label: "RESEARCHERS", width: "174px" },
  { id: "alumni", label: "ALUMNI", width: "128px" },
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
    icon: FaGraduationCap,
    items: [
      "Ph.D., University of California, Berkeley",
      "M.S., University of California, Berkeley",
      "B.S., Seoul National University",
    ],
  },
  {
    title: "Professional Experience",
    icon: FaBriefcase,
    items: [
      "Professor, Yonsei University",
      "KAIST",
      "AT&T Bell Labs",
      "Silicon Valley Startups",
    ],
  },
  {
    title: "Academic Leadership",
    icon: FaMedal,
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
    icon: FaUniversity,
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
    icon: FaHandshake,
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
        <HeroTitle>Members</HeroTitle>
        <TopTabs aria-label="Member section selector">
          {memberTabs.map((item) => (
            <TopTabButton
              key={item.id}
              type="button"
              $active={activeTab === item.id}
              $width={item.width+30}
              onClick={() => handleTabChange(item.id)}
            >
              {item.label}
            </TopTabButton>
          ))}
        </TopTabs>
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
    image: profMoImage,
  }));
}

function makeDummyAlumni(prefix, count) {
  return Array.from({ length: count }, (_, index) => ({
    id: `${prefix}-dummy-${index + 1}`,
    Name: "Sang Ho Oh",
    Email: "minjeong.kim@yonsei.ac.kr",
    outdate: "August 2021",
    To_go: "Professor at Pukyong National University",
    image: profMoImage,
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
            <FiMail aria-hidden="true" />
            <span>j.mo@yonsei.ac.kr</span>
          </ProfessorLink>
          <ProfessorLink
            href="https://sites.google.com/yonsei.ac.kr/jhmo-yonsei"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiGlobe aria-hidden="true" />
            <span>Personal Homepage</span>
          </ProfessorLink>
          <ProfessorLink
            href="https://scholar.google.com/citations?user=t624_PoAAAAJ&hl=en"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiGooglescholar aria-hidden="true" />
            <span>Google Scholar</span>
          </ProfessorLink>
        </ProfessorLinks>
      </ProfessorInfo>
    </ProfessorIntro>

    <ContentDivider />

    <ProfessorCardGrid>
      {professorCards.map((card) => {
        const Icon = card.icon;
        return (
          <ProfessorCard key={card.title} $wide={card.wide}>
            <CardHeader>
              <Icon aria-hidden="true" />
              <CardTitle>{card.title}</CardTitle>
            </CardHeader>
            <CardList>
              {card.items.map((item) => (
                <li key={item}>{highlightProfessorText(item)}</li>
              ))}
            </CardList>
          </ProfessorCard>
        );
      })}
    </ProfessorCardGrid>
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
              </AlumniDetails>
              <AlumniDestination>{member.To_go}</AlumniDestination>
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

const normalizeName = (value = "") =>
  value
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ") || "No Name";

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
  width: ${(props) => props.$width};
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

  @media (max-width: 640px) {
    width: auto;
    height: 48px;
    font-size: 16px;
  }
`;

const ProfessorFrame = styled.section`
  width: min(1280px, calc(100% - 76px));
  min-height: 1685px;
  margin: 0 auto;
  padding: 42px 0 64px;
  box-sizing: border-box;
`;

const ProfessorIntro = styled.div`
  display: grid;
  grid-template-columns: 255px 1fr;
  gap: 42px;
  align-items: center;
  padding: 70px 40px 35px;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
    padding: 44px 0 35px;
  }
`;

const ProfessorImage = styled.img`
  width: 255px;
  height: 344px;
  object-fit: cover;
  border-radius: 4px;
`;

const ProfessorInfo = styled.div`
  max-width: 760px;
`;

const ProfessorName = styled.h2`
  margin: 0 0 32px;
  color: ${navy};
  font-size: 42px;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: 0;
`;

const ProfessorRole = styled.p`
  margin: 0 0 18px;
  padding-bottom: 20px;
  border-bottom: 2px solid ${navy};
  color: #202020;
  font-size: 22px;
  font-weight: 400;
  line-height: 1.45;
`;

const ProfessorLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 26px;
`;

const ProfessorLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 14px;
  color: #555555;
  font-size: 22px;
  font-weight: 400;
  line-height: 1.35;
  text-decoration: underline;
  text-underline-offset: 3px;

  svg {
    color: ${navy};
    font-size: 28px;
    flex: 0 0 auto;
  }
`;

const ContentDivider = styled.div`
  width: 100%;
  height: 1px;
  margin: 0 0 36px;
  background: #d0d0d0;
`;

const ProfessorCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px;
  padding: 0 8px;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

const ProfessorCard = styled.article`
  grid-column: ${(props) => (props.$wide ? "1 / -1" : "auto")};
  min-height: ${(props) => (props.$wide ? "auto" : "242px")};
  padding: 32px 30px 28px;
  border: 1px solid #d2d2d2;
  border-radius: 8px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 34px;
  margin-bottom: 34px;
  color: ${navy};

  svg {
    width: 60px;
    height: 60px;
    flex: 0 0 auto;
  }
`;

const CardTitle = styled.h3`
  margin: 0;
  color: ${navy};
  font-size: 32px;
  font-weight: 700;
  line-height: 1.2;
`;

const CardList = styled.ul`
  margin: 0;
  padding-left: 18px;
  color: #4f4f4f;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.45;

  strong {
    color: #242424;
    font-weight: 800;
  }
`;

const MembersFrame = styled.section`
  width: min(1120px, calc(100% - 160px));
  min-height: ${(props) => props.$minHeight || "1600px"};
  margin: 0 auto;
  padding: 32px 0 80px;
  box-sizing: border-box;

  @media (max-width: 980px) {
    width: calc(100% - 48px);
  }
`;

const ResearcherSection = styled.section`
  margin-bottom: 66px;
`;

const AlumniSection = styled.section`
  margin-bottom: 78px;
`;

const MemberSectionTitle = styled.h2`
  margin: 0 0 6px;
  color: ${navy};
  font-size: 20px;
  font-weight: 700;
  line-height: 1.25;
`;

const MemberSectionDivider = styled.div`
  width: 100%;
  height: 1px;
  margin-bottom: 28px;
  background: #303030;
`;

const ResearcherGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 54px 120px;
  padding: 0 58px;

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 46px 40px;
    padding: 0;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const ResearcherCard = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
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
  font-size: 30px;
  font-weight: 800;
  line-height: 1.15;
  text-transform: uppercase;
`;

const ResearcherMeta = styled.p`
  margin: 0;
  color: #1f1f1f;
  font-size: 20px;
  font-weight: 400;
  line-height: 1.22;
`;

const AlumniGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 378px);
  justify-content: center;
  gap: 28px 36px;
  padding: 0;

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, 378px);
  }

  @media (max-width: 820px) {
    grid-template-columns: minmax(0, 378px);
  }
`;

const AlumniCard = styled.article`
  width: 378px;
  min-height: 205px;
  display: grid;
  grid-template-columns: 112px 1fr;
  grid-template-rows: auto 1fr;
  gap: 0 22px;
  align-items: start;
  padding: 24px 16px 19px 20px;
  border: 1.5px solid ${navy};
  border-radius: 14px;
  box-sizing: border-box;

  @media (max-width: 430px) {
    width: 100%;
    grid-template-columns: 104px 1fr;
  }
`;

const AlumniImage = styled.img`
  width: 104px;
  height: 104px;
  border: 1px solid #dfdfdf;
  border-radius: 50%;
  object-fit: cover;
  object-position: center top;
  grid-row: 1;
`;

const AlumniDetails = styled.div`
  min-width: 0;
  padding-top: 15px;
`;

const AlumniName = styled.h3`
  margin: 0 0 17px;
  color: #000000;
  font-size: 24px;
  font-weight: 800;
  line-height: 1.12;
  text-transform: uppercase;
`;

const AlumniMeta = styled.p`
  margin: 0 0 8px;
  color: #222222;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.22;
  white-space: nowrap;
`;

const AlumniDestination = styled.p`
  grid-column: 1 / -1;
  margin: 12px 0 0 20px;
  color: ${navy};
  font-size: 20px;
  font-weight: 700;
  line-height: 1.08;
  max-width: 300px;
`;

const StatusText = styled.div`
  grid-column: 1 / -1;
  min-height: 120px;
  color: #8c8c8c;
  font-size: 18px;
  font-weight: 500;
`;

export default TestMember;
