import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Pagination from "./components/Pagination.js";
import buildingIcon from "../../assets/building_icon.svg";

const navy = "#113275";
const soft = "#e6e6e6";
const PUBLICATION_PAGE_SIZE = 6;
const PROJECT_PAGE_SIZE = 4;

const researchTabs = [
  { id: "project", label: "Project" },
  { id: "publication", label: "Publication" },
];

const publicationCategories = [
  {
    id: "international-journal",
    label: "International Journal",
    type: "international journal",
  },
  {
    id: "domestic-journal",
    label: "Domestic Journal",
    type: "domestic journal",
  },
  {
    id: "international-conference",
    label: "International Conference",
    type: "international conference",
  },
  {
    id: "domestic-conference",
    label: "Domestic Conference",
    type: "domestic conference",
  },
  { id: "patent", label: "Patent", type: "patent" },
];

const projectTabs = [
  { id: "ongoing", label: "Ongoing Projects" },
  { id: "finished", label: "Finished Projects" },
];

const TestResearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedTab = searchParams.get("tab");
  const activeTab = requestedTab === "publication" ? "publication" : "project";
  const [activeCategory, setActiveCategory] = useState("international-journal");
  const [publicationPage, setPublicationPage] = useState(1);
  const [publications, setPublications] = useState([]);
  const [publicationPageCount, setPublicationPageCount] = useState(1);
  const [isPublicationLoading, setIsPublicationLoading] = useState(false);
  const [hasPublicationError, setHasPublicationError] = useState(false);
  const [projectStatus, setProjectStatus] = useState("ongoing");
  const [projectPage, setProjectPage] = useState(1);
  const [projects, setProjects] = useState([]);
  const [projectPageCount, setProjectPageCount] = useState(1);
  const [isProjectLoading, setIsProjectLoading] = useState(false);
  const [hasProjectError, setHasProjectError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setPublicationPage(1);
  }, [activeCategory]);

  useEffect(() => {
    setProjectPage(1);
  }, [projectStatus]);

  const activeCategoryData = useMemo(
    () =>
      publicationCategories.find((item) => item.id === activeCategory) ||
      publicationCategories[0],
    [activeCategory]
  );

  useEffect(() => {
    if (activeTab !== "publication") return undefined;

    const controller = new AbortController();
    let isCurrent = true;

    const fetchPublications = async () => {
      setIsPublicationLoading(true);
      setHasPublicationError(false);

      try {
        const params = new URLSearchParams({
          type: activeCategoryData.type,
          page: String(publicationPage),
          page_size: String(PUBLICATION_PAGE_SIZE),
        });
        const response = await fetch(`/api/publications?${params.toString()}`, {
          method: "GET",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Publication API returned ${response.status}`);
        }

        const data = await response.json();
        if (!Array.isArray(data.results)) {
          throw new Error("Publication API returned an invalid response");
        }

        if (isCurrent) {
          setPublications(data.results);
          setPublicationPageCount(Math.max(1, Number(data.pageCount) || 1));
        }
      } catch (error) {
        if (error.name === "AbortError") return;

        console.error("Failed to fetch publication data:", error);
        if (isCurrent) {
          setHasPublicationError(true);
          setPublications([]);
          setPublicationPageCount(1);
        }
      } finally {
        if (isCurrent) {
          setIsPublicationLoading(false);
        }
      }
    };

    fetchPublications();

    return () => {
      isCurrent = false;
      controller.abort();
    };
  }, [activeCategoryData.type, activeTab, publicationPage]);

  const handleResearchTabChange = (tabId) => {
    setSearchParams({ tab: tabId });
  };

  useEffect(() => {
    if (activeTab !== "project") return undefined;

    const controller = new AbortController();
    let isCurrent = true;

    const fetchProjects = async () => {
      setIsProjectLoading(true);
      setHasProjectError(false);

      try {
        const params = new URLSearchParams({
          status: projectStatus,
          page: String(projectPage),
          page_size: String(PROJECT_PAGE_SIZE),
        });
        const response = await fetch(`/api/project_idx?${params.toString()}`, {
          method: "GET",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Project API returned ${response.status}`);
        }

        const data = await response.json();
        if (!Array.isArray(data.results)) {
          throw new Error("Project API returned an invalid response");
        }

        if (isCurrent) {
          setProjects(data.results);
          setProjectPageCount(Math.max(1, Number(data.pageCount) || 1));
        }
      } catch (error) {
        if (error.name === "AbortError") return;

        console.error("Failed to fetch project data:", error);
        if (isCurrent) {
          setHasProjectError(true);
          setProjects([]);
          setProjectPageCount(1);
        }
      } finally {
        if (isCurrent) {
          setIsProjectLoading(false);
        }
      }
    };

    fetchProjects();

    return () => {
      isCurrent = false;
      controller.abort();
    };
  }, [activeTab, projectPage, projectStatus]);

  return (
    <PageShell>
      <HeaderHeroFrame aria-label="Research header and hero">
        <Header activeSection="research" activeResearch={activeTab} />
        <HeroTitle>Research</HeroTitle>
        <TopTabs aria-label="Research section selector">
          {researchTabs.map((item) => (
            <TopTabButton
              key={item.id}
              type="button"
              $active={activeTab === item.id}
              onClick={() => handleResearchTabChange(item.id)}
            >
              {item.label}
            </TopTabButton>
          ))}
        </TopTabs>
        <HeroDivider />
      </HeaderHeroFrame>

      <ContentFrame
        aria-busy={activeTab === "project" ? isProjectLoading : isPublicationLoading}
        aria-live="polite"
      >
        {activeTab === "project" ? (
          <>
            <ProjectStatusTabs aria-label="Project status selector">
              {projectTabs.map((item) => (
                <ProjectStatusButton
                  key={item.id}
                  type="button"
                  $active={projectStatus === item.id}
                  onClick={() => setProjectStatus(item.id)}
                >
                  {item.label}
                </ProjectStatusButton>
              ))}
            </ProjectStatusTabs>

            <ProjectGrid aria-label={`${projectStatus} project list`}>
              {isProjectLoading ? (
                <StatusText role="status">Loading projects...</StatusText>
              ) : hasProjectError && projects.length === 0 ? (
                <StatusText role="alert">Unable to load projects.</StatusText>
              ) : projects.length === 0 ? (
                <StatusText>No projects available.</StatusText>
              ) : (
                projects.map((item) => <ProjectCard key={item.id} item={item} />)
              )}
            </ProjectGrid>

            {projectPageCount > 1 ? (
              <ProjectPaginationSlot>
                <Pagination
                  currentPage={projectPage}
                  pageCount={projectPageCount}
                  onPageChange={setProjectPage}
                />
              </ProjectPaginationSlot>
            ) : null}
          </>
        ) : (
          <>
            <ContentLayout>
              <CategoryRail aria-label="Publication categories">
                {publicationCategories.map((item) => (
                  <CategoryButton
                    key={item.id}
                    type="button"
                    $active={activeCategory === item.id}
                    onClick={() => setActiveCategory(item.id)}
                  >
                    {item.label}
                  </CategoryButton>
                ))}
              </CategoryRail>

              <PublicationList aria-label="Publication list">
                {isPublicationLoading ? (
                  <StatusText role="status">Loading publications...</StatusText>
                ) : hasPublicationError && publications.length === 0 ? (
                  <StatusText role="alert">Unable to load publications.</StatusText>
                ) : publications.length === 0 ? (
                  <StatusText>No publications available.</StatusText>
                ) : (
                  publications.map((item) => (
                    <PublicationItem key={item.id}>
                      <Authors>{item.authors}</Authors>
                      <PublicationTitle>{item.title}</PublicationTitle>
                      {item.venue ? <Venue>{item.venue}</Venue> : null}
                    </PublicationItem>
                  ))
                )}
              </PublicationList>
            </ContentLayout>

            {publicationPageCount > 1 ? (
              <PaginationSlot>
                <Pagination
                  currentPage={publicationPage}
                  pageCount={publicationPageCount}
                  onPageChange={setPublicationPage}
                />
              </PaginationSlot>
            ) : null}
          </>
        )}
      </ContentFrame>

      <Footer />
    </PageShell>
  );
};

const ProjectCard = ({ item }) => {
  const content = (
    <ProjectCardInner>
      <ProjectThumbWrap>
        {item.thumbnail ? (
          <ProjectThumb src={item.thumbnail} alt="" aria-hidden="true" />
        ) : (
          <ProjectThumbFallback />
        )}
      </ProjectThumbWrap>
      <ProjectCardBody>
        <ProjectCardTitle>{item.name || item.Name}</ProjectCardTitle>
        <ProjectMetaRow>
          <ProjectDate>{item.date}</ProjectDate>
          {item.organization ? (
            isImageUrl(item.organization) ? (
              <OrganizationLogo
                src={item.organization}
                alt="Project organization"
              />
            ) : (
              <OrganizationText>
                <OrganizationIcon src={buildingIcon} alt="" aria-hidden="true" />
                <span>{item.organization}</span>
              </OrganizationText>
            )
          ) : null}
        </ProjectMetaRow>
      </ProjectCardBody>
    </ProjectCardInner>
  );

  if (!item.notionId && !item.url) {
    return <ProjectCardBox>{content}</ProjectCardBox>;
  }

  return (
    <ProjectCardLink to={`/test/subproject?pagecode=${item.notionId || item.url}`}>
      {content}
    </ProjectCardLink>
  );
};

const isImageUrl = (value = "") =>
  /^https?:\/\//i.test(value) || /\.(png|jpe?g|gif|webp|svg)(\?.*)?$/i.test(value);

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
  }
`;

const TopTabButton = styled.button`
  min-width: 116px;
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

const ContentFrame = styled.section`
  position: relative;
  width: min(1366px, calc(100% - 76px));
  min-height: 1796px;
  margin: 0 auto;
  padding: 42px 0 120px;
  box-sizing: border-box;

  @media (max-width: 980px) {
    width: calc(100% - 48px);
    min-height: 900px;
    padding-top: 54px;
  }
`;

const ProjectStatusTabs = styled.div`
  display: flex;
  align-items: center;
  gap: 23px;
  padding: 0 0 0 73px;

  @media (max-width: 980px) {
    padding: 0;
    flex-wrap: wrap;
  }
`;

const ProjectStatusButton = styled.button`
  min-width: 212px;
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
`;

const ProjectGrid = styled.div`
  width: 1222px;
  margin: 42px auto 0;
  display: grid;
  grid-template-columns: repeat(2, 574px);
  gap: 40px 74px;

  @media (max-width: 1320px) {
    width: 100%;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 40px;
  }

  @media (max-width: 780px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCardBox = styled.article`
  display: block;
`;

const ProjectCardLink = styled(Link)`
  display: block;
  color: inherit;
  text-decoration: none;
`;

const ProjectCardInner = styled.div`
  min-height: 485px;
  background: #ffffff;
  border: 1px solid #c9c9c9;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.26);
  box-sizing: border-box;
  transition: transform 0.16s ease, box-shadow 0.16s ease;

  ${ProjectCardLink}:hover & {
    transform: translateY(-2px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.22);
  }
`;

const ProjectThumbWrap = styled.div`
  height: 273px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #d6d6d6;
  overflow: hidden;
`;

const ProjectThumb = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
`;

const ProjectThumbFallback = styled.div`
  width: 100%;
  height: 100%;
  background: #f5f7fb;
`;

const ProjectCardBody = styled.div`
  min-height: 210px;
  padding: 22px 40px 19px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const ProjectCardTitle = styled.h2`
  margin: 0;
  color: ${navy};
  font-size: 22px;
  font-weight: 500;
  line-height: 1.55;
  letter-spacing: 0;
`;

const ProjectMetaRow = styled.div`
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 36px;
`;

const ProjectDate = styled.span`
  color: #777777;
  font-size: 17px;
  font-weight: 500;
  line-height: 1.2;
`;

const OrganizationLogo = styled.img`
  max-width: 104px;
  max-height: 31px;
  display: block;
  object-fit: contain;
`;

const OrganizationText = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #222222;
  font-size: 17px;
  font-weight: 700;
  line-height: 1.2;
`;

const OrganizationIcon = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
`;

const ProjectPaginationSlot = styled.div`
  margin-top: 58px;

  @media (max-width: 980px) {
    margin-top: 72px;
  }
`;

const ContentLayout = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 48px;
  padding: 18px 0 0 26px;

  @media (max-width: 980px) {
    flex-direction: column;
    gap: 34px;
    padding-left: 0;
  }
`;

const CategoryRail = styled.nav`
  width: 310px;
  flex: 0 0 310px;

  @media (max-width: 980px) {
    width: 100%;
    flex-basis: auto;
  }
`;

const CategoryButton = styled.button`
  position: relative;
  width: 310px;
  height: 54px;
  padding: 0;
  display: flex;
  align-items: flex-start;
  border: 0;
  background: transparent;
  color: ${(props) => (props.$active ? navy : "#a9a9a9")};
  font: inherit;
  font-size: 24px;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: 0;
  text-align: left;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    color: ${navy};
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 35px;
    width: 310px;
    height: 1px;
    background: ${(props) => (props.$active ? navy : "#e6e6e6")};
  }

  @media (max-width: 980px) {
    width: 100%;
    font-size: 20px;

    &::after {
      width: 100%;
    }
  }
`;

const PublicationList = styled.div`
  width: auto;
  flex: 1 1 auto;
  min-width: 0;
  margin-top: 66px;

  @media (max-width: 980px) {
    width: 100%;
    flex-basis: auto;
    margin: 0;
  }
`;

const PublicationItem = styled.article`
  position: relative;
  min-height: 191px;
  padding: 0 0 51px 23px;
  box-sizing: border-box;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 31px;
    width: 100%;
    height: 1px;
    background: #c6c6c6;
  }

  @media (max-width: 1360px) {
    &::after {
      width: 100%;
    }
  }

  @media (max-width: 980px) {
    width: 100%;
    min-height: 150px;
    padding: 0 0 76px;

    &::after {
      bottom: 32px;
      width: 100%;
    }
  }
`;

const Authors = styled.p`
  margin: 0 0 32px;
  color: #b6b6b6;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.45;
  letter-spacing: 0;
`;

const titleStyles = `
  display: block;
  margin: 0 0 24px;
  color: #1d1d1d;
  font-size: 24px;
  font-weight: 600;
  line-height: 1.35;
  letter-spacing: 0;
  text-decoration: none;
`;

const PublicationTitle = styled.h2`
  ${titleStyles}
`;

const Venue = styled.p`
  margin: 0;
  color: #b6b6b6;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.45;
  letter-spacing: 0;
`;

const StatusText = styled.div`
  min-height: 420px;
  color: #8c8c8c;
  font-size: 18px;
  font-weight: 500;
`;

const PaginationSlot = styled.div`
  margin-top: 86px;

  @media (max-width: 980px) {
    margin-top: 72px;
  }
`;

export default TestResearch;
