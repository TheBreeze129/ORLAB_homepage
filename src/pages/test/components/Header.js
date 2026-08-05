import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import orlabLogo from "../../../assets/logo.svg";

const navy = "#113275";

const aboutItems = [
  { id: "about", label: "About", to: "/about" },
  { id: "contact", label: "Contact", to: "/about?tab=contact" },
];

const memberItems = [
  { id: "professor", label: "Professor", to: "/member?tab=professor" },
  {
    id: "researchers",
    label: "Researchers",
    to: "/member?tab=researchers",
  },
  { id: "alumni", label: "Alumni", to: "/member?tab=alumni" },
];

const researchItems = [
  { id: "project", label: "Project", to: "/research?tab=project" },
  { id: "publication", label: "Publication", to: "/research?tab=publication" },
];

const boardNavItems = [
  { id: "seminar", label: "Seminar", to: "/board" },
  { id: "workshop", label: "Workshop", to: "/board?board=workshop" },
  { id: "album", label: "Album", to: "/board?board=album" },
];

const Header = ({
  activeAbout,
  activeBoard,
  activeMember,
  activeResearch,
  activeSection = "board",
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const clearDropdownFocus = (event) => {
    const currentTarget = event.currentTarget;

    window.setTimeout(() => {
      const activeElement = document.activeElement;
      if (activeElement instanceof HTMLElement && currentTarget.contains(activeElement)) {
        activeElement.blur();
      }
    }, 0);
  };

  return (
    <HeaderFrame>
      <LogoLink to="/" aria-label="ORLAB home">
        <LogoImage src={orlabLogo} alt="ORLAB Operations Research Lab" />
      </LogoLink>

      <NavArea aria-label="Primary navigation">
        <DropdownNav
          onContextMenu={clearDropdownFocus}
          onMouseLeave={clearDropdownFocus}
        >
          <AboutButton to="/about" $active={activeSection === "about"}>
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

        <DropdownNav
          onContextMenu={clearDropdownFocus}
          onMouseLeave={clearDropdownFocus}
        >
          <MemberButton
            to="/member?tab=professor"
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

        <DropdownNav
          onContextMenu={clearDropdownFocus}
          onMouseLeave={clearDropdownFocus}
        >
          <ResearchButton
            to="/research?tab=project"
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

        <DropdownNav
          onContextMenu={clearDropdownFocus}
          onMouseLeave={clearDropdownFocus}
        >
          <BoardButton to="/board" $active={activeSection === "board"}>
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

      <HamburgerButton
        type="button"
        aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isMobileMenuOpen}
        onClick={() => setIsMobileMenuOpen((current) => !current)}
      >
        <HamburgerLine />
        <HamburgerLine />
        <HamburgerLine />
      </HamburgerButton>

      <MobileBackdrop
        $open={isMobileMenuOpen}
        aria-hidden="true"
        onClick={closeMobileMenu}
      />
      <MobileDrawer $open={isMobileMenuOpen} aria-hidden={!isMobileMenuOpen}>
        <MobileNav aria-label="Mobile navigation">
          <MobileNavGroup>
            <MobileNavLink
              to="/about"
              $active={activeSection === "about"}
              onClick={closeMobileMenu}
            >
              ABOUT
            </MobileNavLink>
            {aboutItems.map((item) => (
              <MobileSubLink
                key={item.to}
                to={item.to}
                $active={activeAbout === item.id}
                onClick={closeMobileMenu}
              >
                {item.label}
              </MobileSubLink>
            ))}
          </MobileNavGroup>

          <MobileNavGroup>
            <MobileNavLink
              to="/member?tab=professor"
              $active={activeSection === "member"}
              onClick={closeMobileMenu}
            >
              MEMBERS
            </MobileNavLink>
            {memberItems.map((item) => (
              <MobileSubLink
                key={item.to}
                to={item.to}
                $active={activeMember === item.id}
                onClick={closeMobileMenu}
              >
                {item.label}
              </MobileSubLink>
            ))}
          </MobileNavGroup>

          <MobileNavGroup>
            <MobileNavLink
              to="/research?tab=project"
              $active={activeSection === "research"}
              onClick={closeMobileMenu}
            >
              RESEARCH
            </MobileNavLink>
            {researchItems.map((item) => (
              <MobileSubLink
                key={item.to}
                to={item.to}
                $active={activeResearch === item.id}
                onClick={closeMobileMenu}
              >
                {item.label}
              </MobileSubLink>
            ))}
          </MobileNavGroup>

          <MobileNavGroup>
            <MobileNavLink
              to="/board"
              $active={activeSection === "board"}
              onClick={closeMobileMenu}
            >
              BOARD
            </MobileNavLink>
            {boardNavItems.map((item) => (
              <MobileSubLink
                key={item.to}
                to={item.to}
                $active={activeBoard === item.id}
                onClick={closeMobileMenu}
              >
                {item.label}
              </MobileSubLink>
            ))}
          </MobileNavGroup>

          <MobileExternalLink
            href="https://www.optntech.com/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMobileMenu}
          >
            OPTNTECH
          </MobileExternalLink>
        </MobileNav>
      </MobileDrawer>
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
    height: 44px;
    padding-top: 0;
    position: relative;
    align-items: center;
    flex-direction: row;
    gap: 24px;
  }
`;

const LogoLink = styled(Link)`
  width: 115px;
  height: 40px;
  flex: 0 0 auto;
  display: block;
  text-decoration: none;

  @media (max-width: 780px) {
    height: 44px;
    display: flex;
    align-items: center;
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
    display: none;
  }
`;

const DropdownNav = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;

  &:hover > div {
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

const HamburgerButton = styled.button`
  display: none;
  width: 44px;
  height: 44px;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 6px;
  flex: 0 0 auto;

  @media (max-width: 780px) {
    display: inline-flex;
    position: absolute;
    top: 0;
    right: 0;
    transform: translateY(-2px);
  }
`;

const HamburgerLine = styled.span`
  display: block;
  width: 25px;
  height: 2px;
  border-radius: 999px;
  background: #111111;
`;

const MobileBackdrop = styled.div`
  display: none;

  @media (max-width: 780px) {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.2);
    opacity: ${(props) => (props.$open ? 1 : 0)};
    pointer-events: ${(props) => (props.$open ? "auto" : "none")};
    transition: opacity 0.24s ease;
    z-index: 90;
  }
`;

const MobileDrawer = styled.aside`
  display: none;

  @media (max-width: 780px) {
    display: block;
    position: fixed;
    top: 0;
    right: 0;
    width: min(320px, calc(100vw - 48px));
    height: 100vh;
    padding: 84px 28px 32px;
    background: #ffffff;
    box-shadow: -8px 0 28px rgba(0, 0, 0, 0.18);
    box-sizing: border-box;
    transform: translateX(${(props) => (props.$open ? "0" : "100%")});
    visibility: ${(props) => (props.$open ? "visible" : "hidden")};
    pointer-events: ${(props) => (props.$open ? "auto" : "none")};
    transition: transform 0.28s ease;
    z-index: 100;
    overflow-y: auto;
  }
`;

const MobileNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 26px;
`;

const MobileNavGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MobileNavLink = styled(Link)`
  color: ${(props) => (props.$active ? navy : "#050505")};
  text-decoration: none;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.25;
`;

const MobileSubLink = styled(Link)`
  color: ${(props) => (props.$active ? navy : "#666666")};
  text-decoration: none;
  font-size: 15px;
  font-weight: ${(props) => (props.$active ? 700 : 500)};
  line-height: 1.3;
`;

const MobileExternalLink = styled.a`
  min-height: 46px;
  padding: 0 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  border: 2px solid #000000;
  border-radius: 8px;
  color: #000000;
  text-decoration: none;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
`;

export default Header;
