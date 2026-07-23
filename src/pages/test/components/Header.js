import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import orlabLogo from "../../../assets/logo.svg";

const navy = "#113275";

const aboutItems = [
  { id: "about", label: "About", to: "/about" },
  { id: "contact", label: "Contact", to: "/about?tab=contact" },
];

const memberItems = [
  { id: "professor", label: "PROFESSOR", to: "/member?tab=professor" },
  {
    id: "researchers",
    label: "RESEARCHERS",
    to: "/member?tab=researchers",
  },
  { id: "alumni", label: "ALUMNI", to: "/member?tab=alumni" },
];

const researchItems = [
  { id: "project", label: "Project", to: "/research?tab=project" },
  { id: "publication", label: "Publication", to: "/research?tab=publication" },
];

const boardNavItems = [
  { id: "album", label: "ALBUM", to: "/board" },
  { id: "seminar", label: "SEMINAR", to: "/board?board=seminar" },
  { id: "workshop", label: "WORKSHOP", to: "/board?board=workshop" },
];

const Header = ({
  activeAbout,
  activeBoard,
  activeMember,
  activeResearch,
  activeSection = "board",
}) => {
  return (
    <>
      <LogoLink to="/" aria-label="ORLAB home">
        <LogoImage src={orlabLogo} alt="ORLAB Operations Research Lab" />
      </LogoLink>

      <NavArea aria-label="Primary navigation">
        <DropdownNav>
          <AboutButton to="/about" $active={activeSection === "about"}>
            ABOUT
          </AboutButton>
          <DropdownMenu $width="118px" $left="-31px">
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
            to="/member?tab=professor"
            $active={activeSection === "member"}
          >
            MEMBERS
          </MemberButton>
          <DropdownMenu $width="174px" $left="-42px">
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
            to="/research?tab=project"
            $active={activeSection === "research"}
          >
            RESEARCH
          </ResearchButton>
          <DropdownMenu $width="132px" $left="-24px">
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
          <BoardButton to="/board" $active={activeSection === "board"}>
            BOARD
          </BoardButton>
          <DropdownMenu $width="132px" $left="-30px">
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
    </>
  );
};

const LogoLink = styled(Link)`
  position: absolute;
  left: 115px;
  top: 88px;
  width: 115px;
  height: 40px;
  display: block;
  text-decoration: none;

  @media (max-width: 780px) {
    position: static;
    margin-bottom: 34px;
  }
`;

const LogoImage = styled.img`
  display: block;
  width: 115px;
  height: 40px;
  object-fit: contain;
`;

const NavArea = styled.nav`
  position: absolute;
  left: 680px;
  top: 77px;
  height: 50px;
  display: flex;
  align-items: center;
  gap: 48px;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.5;
  white-space: nowrap;

  @media (max-width: 780px) {
    position: static;
    height: auto;
    flex-wrap: wrap;
    gap: 20px 28px;
    margin-bottom: 78px;
  }
`;

const DropdownNav = styled.div`
  position: relative;

  &::after {
    content: "";
    position: absolute;
    left: -48px;
    top: 100%;
    width: calc(100% + 96px);
    height: 72px;
  }

  &:hover > div,
  &:focus-within > div {
    opacity: 1;
    pointer-events: auto;
    visibility: visible;
  }
`;

const NavLinkBase = styled(Link)`
  display: inline-flex;
  align-items: center;
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
  top: 66.5px;
  left: ${(props) => props.$left || "-29px"};
  width: ${(props) => props.$width || "139px"};
  background: #ffffff;
  border-radius: 5px;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3), 0 4px 8px 3px rgba(0, 0, 0, 0.15);
  z-index: 10;

  @media (max-width: 780px) {
    left: auto;
    right: 0;
    top: 36px;
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
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
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

  &:hover {
    background: #111111;
    color: #ffffff;
  }
`;

export default Header;
