import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import projectPlaceholder from "../../assets/board-album-placeholder.png";

const navy = "#113275";

const previewProject = {
  title: "VLM-based OCR for Handwritten Form Understanding",
  sponsor: "GMISSION",
  period: "2026.01 ~ 2026.11",
  image: projectPlaceholder,
};

const projectSections = [
  {
    title: "Research Overview",
    body:
      "Real-world industrial forms often contain handwritten values entered over printed field labels, or a mixture of handwritten entries and printed text within tables. As a result, conventional OCR models often struggle to achieve accurate text recognition while preserving the document's structural information.\nThis research focuses on VLM-based OCR for form documents containing a mixture of handwriting, printed text, and tables, with the aim of improving both character recognition accuracy and structured information extraction. By leveraging state-of-the-art VLM-based OCR models and general-purpose multimodal foundation models, the study seeks to enhance handwriting recognition across diverse document formats in the manufacturing and financial domains. It also aims to build an OCR pipeline that jointly understands textual content and document layout through schema-based structured output.",
    image: true,
  },
  {
    title: "Research Objectives",
    body:
      "Real-world industrial forms often contain handwritten values entered above printed field labels, or a mixture of handwritten entries and printed text within tables. Consequently, conventional OCR models often struggle to accurately recognize text while preserving the document's structural information.\nThis research focuses on VLM-based OCR for form documents containing a mixture of handwriting, printed text, and tables, with the aim of improving both character recognition accuracy and structured information extraction. By leveraging state-of-the-art VLM-based OCR models and general-purpose multimodal foundation models, the study seeks to enhance handwriting recognition across various document formats in the manufacturing and financial domains. It also aims to build an OCR pipeline that jointly understands textual content and document layout through schema-based structured output.",
  },
  {
    title: "Research Outcomes",
    body:
      "Real-world industrial forms often contain handwritten values entered above printed field labels, or a mixture of handwritten entries and printed text within tables. Consequently, conventional OCR models often struggle to accurately recognize text while preserving the document's structural information.\nThis research focuses on VLM-based OCR for form documents containing a mixture of handwriting, printed text, and tables, with the aim of improving both character recognition accuracy and structured information extraction. By leveraging state-of-the-art VLM-based OCR models and general-purpose multimodal foundation models, the study seeks to enhance handwriting recognition across various document formats in the manufacturing and financial domains. It also aims to build an OCR pipeline that jointly understands textual content and document layout through schema-based structured output.",
  },
];

const ProjectDetail = () => {
  const { notionId } = useParams();
  const location = useLocation();
  const project = location.state?.project || {};
  const title = project.name || project.Name || previewProject.title;
  const sponsor =
    project.organizationName ||
    (isImageUrl(project.organization) ? previewProject.sponsor : project.organization) ||
    previewProject.sponsor;
  const period = project.date || previewProject.period;
  const image = project.detailImage || project.image || previewProject.image;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [notionId]);

  return (
    <PageShell>
      <DetailTopFrame aria-label="Project detail header">
        <Header activeSection="research" activeResearch="project" />
        <ProjectTitle>{title}</ProjectTitle>
        <ProjectMeta>
          <SponsorBadge>{sponsor}</SponsorBadge>
          <ProjectPeriod>{period}</ProjectPeriod>
        </ProjectMeta>
        <HeroDivider />
      </DetailTopFrame>

      <DetailContent data-project-id={notionId || "preview"}>
        {projectSections.map((section) => (
          <ResearchSection key={section.title}>
            <SectionTitle>{section.title}</SectionTitle>
            <SectionBody>{section.body}</SectionBody>
            {section.image ? (
              <PreviewImageFrame>
                <PreviewImage src={image} alt="" aria-hidden="true" />
                <PreviewImageLabel>사진 삽입 예비용</PreviewImageLabel>
              </PreviewImageFrame>
            ) : null}
          </ResearchSection>
        ))}

        <InstitutionSection>
          <SectionTitle>Collaborating Institution</SectionTitle>
          <InstitutionImage src={image} alt="" aria-hidden="true" />
        </InstitutionSection>
      </DetailContent>

      <Footer />
    </PageShell>
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

const DetailTopFrame = styled.section`
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

const ProjectTitle = styled.h1`
  position: absolute;
  left: 112px;
  top: 286px;
  width: min(958px, calc(100% - 224px));
  margin: 0;
  color: ${navy};
  font-size: 35px;
  font-weight: 700;
  line-height: 42.3579px;
  letter-spacing: -0.7px;
  overflow-wrap: anywhere;

  @media (max-width: 780px) {
    position: static;
    width: auto;
    margin-bottom: 28px;
    font-size: 30px;
  }
`;

const ProjectMeta = styled.div`
  position: absolute;
  left: 115px;
  top: 369px;
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 780px) {
    position: static;
    flex-wrap: wrap;
  }
`;

const SponsorBadge = styled.span`
  width: 143px;
  height: 41px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: #e6e6e6;
  color: #000000;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  text-align: center;
`;

const ProjectPeriod = styled.span`
  color: #c3c3c3;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
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

const DetailContent = styled.section`
  width: min(1252px, calc(100% - 96px));
  min-height: 1796px;
  margin: 0 auto;
  padding: 41px 0 54px;
  box-sizing: border-box;

  @media (max-width: 780px) {
    width: calc(100% - 48px);
    min-height: auto;
    padding: 48px 0 80px;
  }
`;

const ResearchSection = styled.section`
  padding: 0 23px 65px 45px;
  border-bottom: 1px solid #c3c3c3;

  & + & {
    padding-top: 46px;
  }

  @media (max-width: 780px) {
    padding-left: 0;
    padding-right: 0;
  }
`;

const SectionTitle = styled.h2`
  margin: 0 0 20px;
  color: ${navy};
  font-size: 24px;
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: 0;
`;

const SectionBody = styled.p`
  width: min(1184px, 100%);
  margin: 0;
  color: #000000;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0;
  white-space: normal;
  overflow-wrap: anywhere;

  @media (max-width: 780px) {
    font-size: 17px;
    line-height: 1.58;
  }
`;

const PreviewImageFrame = styled.figure`
  position: relative;
  width: 482px;
  height: 285px;
  margin: 36px auto 0;
  overflow: hidden;
  border-radius: 8px;
  background: #e6e6e6;
  box-sizing: border-box;

  @media (max-width: 640px) {
    width: 100%;
    height: auto;
    aspect-ratio: 482 / 285;
  }
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;

const PreviewImageLabel = styled.figcaption`
  position: absolute;
  left: 0;
  right: 0;
  top: 31px;
  color: #000000;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.2;
  text-align: center;
`;

const InstitutionSection = styled.section`
  padding: 46px 23px 0 45px;

  @media (max-width: 780px) {
    padding-left: 0;
    padding-right: 0;
  }
`;

const InstitutionImage = styled.img`
  width: 309px;
  height: 183px;
  display: block;
  margin: 78px auto 0;
  object-fit: cover;
  box-sizing: border-box;
  border-radius: 8px;
`;

export default ProjectDetail;
