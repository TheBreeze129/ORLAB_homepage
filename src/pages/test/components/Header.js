import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import orlabLogo from "../../../assets/logo.svg";

const navy = "#113275";

const aboutItems = [
  { id: "about", label: "About", to: "/test/about" },
  { id: "contact", label: "Contact", to: "/test/about?tab=contact" },
];

const memberItems = [
  { id: "professor", label: "Professor", to: "/test/member?tab=professor" },
  {
    id: "researchers",
    label: "Researchers",
    to: "/test/member?tab=researchers",
  },
  { id: "alumni", label: "Alumni", to: "/test/member?tab=alumni" },
];

const researchItems = [
  { id: "project", label: "Project", to: "/test/research?tab=project" },
  { id: "publication", label: "Publication", to: "/test/research?tab=publication" },
];

const boardNavItems = [
  { id: "album", label: "Album", to: "/test/board" },
  { id: "seminar", label: "Seminar", to: "/test/board?board=seminar" },
  { id: "workshop", label: "Workshop", to: "/test/board?board=workshop" },
];

const Header = ({
  activeAbout,
  activeBoard,
  activeMember,
  activeResearch,
  activeSection = "board",
}) => {
  return (
    <HeaderFrame>
      <LogoLink to="/test" aria-label="ORLAB home">
        <LogoImage src={orlabLogo} alt="ORLAB Operations Research Lab" />
      </LogoLink>

      <NavArea aria-label="Primary navigation">
        <DropdownNav>
          <AboutButton to="/test/about" $active={activeSection === "about"}>
            ABOUT
          </AboutButton>
          <DropdownMenu $width="139px">
            {aboutItems.map((item) => (
              <DropdownLink
                key={item.to}
                to={item.to}
                $active={activeAbout === item.id}
              >
                {item.label}
              </DropdownLink>
            ))}
          </DropdownMenu>
        </DropdownNav>

        <DropdownNav>
          <MemberButton
            to="/test/member?tab=professor"
            $active={activeSection === "member"}
          >
            MEMBERS
          </MemberButton>
          <DropdownMenu $width="139px">
            {memberItems.map((item) => (
              <DropdownLink
                key={item.to}
                to={item.to}
                $active={activeMember === item.id}
              >
                {item.label}
              </DropdownLink>
            ))}
          </DropdownMenu>
        </DropdownNav>

        <DropdownNav>
          <ResearchButton
            to="/test/research?tab=project"
            $active={activeSection === "research"}
          >
            RESEARCH
          </ResearchButton>
          <DropdownMenu $width="139px">
            {researchItems.map((item) => (
              <DropdownLink
                key={item.to}
                to={item.to}
                $active={activeResearch === item.id}
              >
                {item.label}
              </DropdownLink>
            ))}
          </DropdownMenu>
        </DropdownNav>

        <DropdownNav>
          <BoardButton to="/test/board" $active={activeSection === "board"}>
            BOARD
          </BoardButton>
          <DropdownMenu $width="139px">
            {boardNavItems.map((item) => (
              <DropdownLink
                key={item.to}
                to={item.to}
                $active={activeBoard === item.id}
              >
                {item.label}
              </DropdownLink>
            ))}
          </DropdownMenu>
        </DropdownNav>

        <OptntechLink
          href="https://www.optntech.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          OPTNTECH
        </OptntechLink>
      </NavArea>
    </HeaderFrame>
  );
};

const HeaderFrame = styled.header`
  width: min(1282px, calc(100% - 220px));
  height: 127px;
  margin: 0 auto;
  padding-top: 77px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 48px;
  box-sizing: border-box;

  @media (max-width: 780px) {
    width: 100%;
    height: auto;
    padding-top: 0;
    flex-direction: column;
    gap: 34px;
  }
`;

const LogoLink = styled(Link)`
  width: 115px;
  height: 40px;
  flex: 0 0 auto;
  display: block;
  text-decoration: none;

  @media (max-width: 780px) {
    margin-bottom: 0;
  }
`;

const LogoImage = styled.img`
  display: block;
  width: 115px;
  height: 40px;
  object-fit: contain;
`;

const NavArea = styled.nav`
  height: 50px;
  display: flex;
  align-items: center;
  gap: 48px;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.5;
  white-space: nowrap;

  @media (max-width: 1180px) {
    width: auto;
    gap: 30px;
    font-size: 16px;
    justify-content: flex-end;
  }

  @media (max-width: 780px) {
    height: auto;
    flex-wrap: wrap;
    gap: 20px 28px;
    margin-bottom: 0;
  }
`;

const DropdownNav = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;

  &:hover > div,
  &:focus-within > div {
    opacity: 1;
    pointer-events: auto;
    visibility: visible;
  }
`;

const NavLinkBase = styled(Link)`
  height: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  color: #050505;
  text-decoration: none;
  font: inherit;
  cursor: pointer;
  transition: color 0.18s ease;

  &:hover {
    color: ${navy};
  }
`;

const AboutButton = styled(NavLinkBase)`
  color: ${(props) => (props.$active ? navy : "#050505")};
`;

const ResearchButton = styled(NavLinkBase)`
  color: ${(props) => (props.$active ? navy : "#050505")};
`;

const MemberButton = styled(NavLinkBase)`
  color: ${(props) => (props.$active ? navy : "#050505")};
`;

const BoardButton = styled(NavLinkBase)`
  color: ${(props) => (props.$active ? navy : "#050505")};
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);

  width: ${(props) => props.$width || "139px"};
  background: #ffffff;
  border-radius: 5px;

  overflow: hidden;
  opacity: 0;
  pointer-events: none;
  visibility: hidden;

  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.3),
    0 4px 8px 3px rgba(0, 0, 0, 0.15);

  z-index: 10;

  @media (max-width: 780px) {
    top: calc(100% + 12px);
  }
`;

const DropdownLink = styled(Link)`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  color: ${(props) => (props.$active ? "#ffffff" : "#000000")};
  text-decoration: none;
  font-family: "Roboto", "Inter", sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.1px;
  background: ${(props) => (props.$active ? navy : "#ffffff")};

  &:hover {
    background: ${navy};
    color: #ffffff;
  }
`;

const OptntechLink = styled.a`
  width: 126px;
  height: 50px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #000000;
  border-radius: 8px;
  color: #000000;
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0;
  box-sizing: border-box;
  transition: background 0.18s ease, color 0.18s ease;

  @media (max-width: 1320px) {
    width: 112px;
    height: 46px;
    font-size: 16px;
  }

  &:hover {
    background: #111111;
    color: #ffffff;
  }
`;

export default Header;
