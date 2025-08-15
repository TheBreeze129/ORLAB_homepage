import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // ✅ window 참조 X

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // ✅ 초기 실행

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // ✅ 초기 실행

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <HeaderContainer isScrolled={isScrolled}>
        <Divwidth>
          <Name isScrolled={isScrolled}>Operations Research Lab</Name>

          {!isMobile ? (
            <Nav>
              <NavLink to="/" isScrolled={isScrolled}>
                HOME
              </NavLink>
              <NavLink to="/research" isScrolled={isScrolled}>
                RESEARCH AREA
              </NavLink>
              <NavLink to="/lecture" isScrolled={isScrolled}>
                LECTURE
              </NavLink>

              <Dropdown>
                <NavLink to="#" isScrolled={isScrolled}>
                  MEMBERS ▾
                </NavLink>
                <DropdownContent>
                  <DropdownItem to="/members/professor">PROFESSOR</DropdownItem>
                  <DropdownItem to="/members/student">STUDENT</DropdownItem>
                  <DropdownItem to="/members/alumni">ALUMNI</DropdownItem>
                </DropdownContent>
              </Dropdown>

              <NavLink to="/project" isScrolled={isScrolled}>
                PROJECTS
              </NavLink>

              <NavLink to="/publications" isScrolled={isScrolled}>
                PUBLICATION
              </NavLink>

              <Dropdown>
                <NavLink
                  to="#"
                  isScrolled={isScrolled}
                  onClick={(e) => e.preventDefault()}
                >
                  BOARD ▾
                </NavLink>
                <DropdownContent>
                  <SubDropdown>
                    <DropdownItem to="#">
                      SEMINAR
                      ▸&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </DropdownItem>
                    <SubDropdownContent>
                      <DropdownItem to="/board/seminar?year=2025">
                        2025 SEMINAR
                      </DropdownItem>
                      <DropdownItem to="/board/seminar?year=2024">
                        2024 SEMINAR
                      </DropdownItem>
                      <DropdownItem to="/board/seminar?year=2023">
                        2023 SEMINAR
                      </DropdownItem>
                      <DropdownItem to="/board/seminar?year=2022">
                        2022 SEMINAR
                      </DropdownItem>
                      <DropdownItem to="/board/seminar?year=2021">
                        2021 SEMINAR
                      </DropdownItem>
                    </SubDropdownContent>
                  </SubDropdown>
                  <SubDropdown>
                    <DropdownItem to="#">
                      WORKSHOP
                      ▸&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </DropdownItem>
                    <SubDropdownContent>
                      <DropdownItem to="/board/workshop?year=2023">
                        2023 WORKSHOP
                      </DropdownItem>
                      <DropdownItem to="/board/workshop?year=2022">
                        2022 WORKSHOP
                      </DropdownItem>
                      <DropdownItem to="/board/workshop?year=2021">
                        2021 WORKSHOP
                      </DropdownItem>
                    </SubDropdownContent>
                  </SubDropdown>
                  <SubDropdown>
                    <DropdownItem to="#">
                      PHOTO
                      ▸&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </DropdownItem>
                    <SubDropdownContent>
                      <DropdownItem to="/board/photo?year=2025">
                        2025 PHOTO
                      </DropdownItem>
                      <DropdownItem to="/board/photo?year=2023">
                        2023 PHOTO
                      </DropdownItem>
                      <DropdownItem to="/board/photo?year=2022">
                        2022 PHOTO
                      </DropdownItem>
                    </SubDropdownContent>
                  </SubDropdown>
                </DropdownContent>
              </Dropdown>

              <ExternalNavLink
                href="https://www.optntech.com/"
                target="_blank"
                rel="noopener noreferrer"
                isScrolled={isScrolled}
                onClick={() => setMenuOpen(false)}
              >
                OPTNTECH
              </ExternalNavLink>
            </Nav>
          ) : (
            <Hamburger onClick={() => setMenuOpen(true)}>
              <Bar isScrolled={isScrolled} />
              <Bar isScrolled={isScrolled} />
              <Bar isScrolled={isScrolled} />
            </Hamburger>
          )}
        </Divwidth>
      </HeaderContainer>

      {menuOpen && (
        <Overlay isOpen={menuOpen} onClick={() => setMenuOpen(false)} />
      )}

      {/* ✅ 사이드바 (모바일 전용) */}
      {isMobile && (
        <Sidebar isOpen={menuOpen} isMobile={isMobile}>
          <CloseButton onClick={() => setMenuOpen(false)}>×</CloseButton>
          <Nav isOpen={menuOpen} isMobile={isMobile}>
            <NavLink to="/" onClick={() => setMenuOpen(false)}>
              HOME
            </NavLink>
            <NavLink to="/research" onClick={() => setMenuOpen(false)}>
              RESEARCH AREA
            </NavLink>
            <NavLink to="/lecture" onClick={() => setMenuOpen(false)}>
              LECTURE
            </NavLink>

            <Dropdown>
              <NavLink to="#" onClick={(e) => e.preventDefault()}>
                MEMBERS ▾
              </NavLink>
              <DropdownContent>
                <DropdownItem
                  to="/members/professor"
                  onClick={() => setMenuOpen(false)}
                >
                  PROFESSOR
                </DropdownItem>
                <DropdownItem
                  to="/members/student"
                  onClick={() => setMenuOpen(false)}
                >
                  STUDENT
                </DropdownItem>
                <DropdownItem
                  to="/members/alumni"
                  onClick={() => setMenuOpen(false)}
                >
                  ALUMNI
                </DropdownItem>
              </DropdownContent>
            </Dropdown>

            <NavLink to="/project" onClick={() => setMenuOpen(false)}>
              PROJECTS
            </NavLink>

            <NavLink to="/publications" onClick={() => setMenuOpen(false)}>
              PUBLICATION
            </NavLink>

            <Dropdown>
              <NavLink
                to="#"
                isScrolled={false}
                onClick={(e) => e.preventDefault()}
              >
                BOARD ▾
              </NavLink>
              <DropdownContent>
                <SubDropdown>
                  <DropdownItem to="#">
                    SEMINAR
                    ▸&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </DropdownItem>
                  <SubDropdownContent2>
                    <DropdownItem to="/board/seminar?year=2025">
                      2025 SEMINAR
                    </DropdownItem>
                    <DropdownItem to="/board/seminar?year=2024">
                      2024 SEMINAR
                    </DropdownItem>
                    <DropdownItem to="/board/seminar?year=2023">
                      2023 SEMINAR
                    </DropdownItem>
                    <DropdownItem to="/board/seminar?year=2022">
                      2022 SEMINAR
                    </DropdownItem>
                    <DropdownItem to="/board/seminar?year=2021">
                      2021 SEMINAR
                    </DropdownItem>
                  </SubDropdownContent2>
                </SubDropdown>
                <SubDropdown>
                  <DropdownItem to="#">
                    WORKSHOP
                    ▸&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </DropdownItem>
                  <SubDropdownContent2>
                    <DropdownItem to="/board/workshop?year=2023">
                      2023 WORKSHOP
                    </DropdownItem>
                    <DropdownItem to="/board/workshop?year=2022">
                      2022 WORKSHOP
                    </DropdownItem>
                    <DropdownItem to="/board/workshop?year=2021">
                      2021 WORKSHOP
                    </DropdownItem>
                  </SubDropdownContent2>
                </SubDropdown>
                <DropdownItem to="/board/photo">PHOTO</DropdownItem>
              </DropdownContent>
            </Dropdown>

            <ExternalNavLink
              href="https://www.optntech.com/"
              target="_blank"
              rel="noopener noreferrer"
              isScrolled={isScrolled}
              onClick={() => setMenuOpen(false)}
            >
              OPTNTECH
            </ExternalNavLink>
          </Nav>
        </Sidebar>
      )}
    </>
  );
};

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  min-width: 150px;
  z-index: 10001;

  ${Dropdown}:hover & {
    display: block;
  }
`;

const SubDropdown = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SubDropdownContent = styled.div`
  display: none;
  position: absolute;
  left: 100%;
  top: 0;
  background: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  min-width: 150px;
  z-index: 10002;

  ${SubDropdown}:hover & {
    display: block;
  }
`;

const SubDropdownContent2 = styled.div`
  display: none;
  position: absolute;
  right: 100%;
  top: 0;
  background: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  min-width: 150px;
  z-index: 10002;

  ${SubDropdown}:hover & {
    display: block;
  }
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 10px 15px;
  color: black;
  text-decoration: none;
  font-size: 14px;
  position: relative;
  white-space: nowrap;

  &:hover {
    background: #007bff;
    color: white;
  }
`;

const Divwidth = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  width: 80%;
  gap: 40px;
`;

const Name = styled.h2`
  color: ${(props) => (props.isScrolled ? "black" : "white")};
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
  display: ${(props) =>
    props.isOpen ? "block" : "none"}; /* menuOpen 상태에 따라 표시 */
`;

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  right: 0; /* ✅ 오른쪽에서 나오도록 변경 */
  width: 250px;
  height: 100%;
  background: rgba(34, 77, 96, 0.7);
  box-shadow: ${(props) =>
    props.isMobile ? "-2px 0px 10px rgba(0, 0, 0, 0.1)" : "none"};
  transition: transform 0.3s ease-in-out;
  transform: ${(props) =>
    props.isOpen
      ? "translateX(0)"
      : "translateX(100%)"}; /* ✅ 오른쪽에서 등장 */
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 30px;
  cursor: pointer;
`;

const Hamburger = styled.div`
  display: flex;
  flex-direction: column; /* ✅ 수직 정렬 */
  align-items: center;
  justify-content: center;
  width: 40px;
  padding-left: 20px;
  height: 40px; /* ✅ 충분한 높이 */
  cursor: pointer;
  background: transparent;
`;

const Bar = styled.div`
  width: 25px;
  height: 2px; /* ✅ 두께 조정 */
  background: ${(props) => (props.isScrolled ? "black" : "white")};
  margin: 3px 0; /* ✅ 줄 간격 조정 */
  transition: all 0.3s ease-in-out; /* 애니메이션 추가 */
`;

// 헤더 스타일 정의
const HeaderContainer = styled.header`
  position: fixed;
  margin: 0px;
  padding: 0px;
  top: 0;
  width: 100%;
  padding-top: 15px;
  padding-bottom: 15px;
  display: flex;
  justify-content: center;
  gap: 20px;
  align-items: center;
  background: ${(props) => (props.isScrolled ? "white" : "transparent")};
  transition: background 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
`;

const Nav = styled.nav`
  display: flex;
  margin: 0px;
  padding: 0px;
  gap: 15px; /* 간격 유지 */
  flex-wrap: wrap; /* 자동 줄바꿈 */
  justify-content: center; /* 중앙 정렬 */
  max-width: 900px; /* 네비게이션이 너무 길어지지 않도록 제한 */

  @media (max-width: 768px) {
    display: ${(props) => (props.isOpen && props.isMobile ? "flex" : "none")};
    flex-direction: column;
    margin: 0px;
    padding: 0px;
    align-items: center;
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    background: ${(props) => (props.isOpen ? "transparent" : "white")};
    padding: 10px 0;
  }
`;

const NavLink = styled(Link)`
  color: ${(props) => (props.isScrolled ? "black" : "white")};
  text-decoration: none;
  margin: 0px;
  padding: 0px;
  font-size: 16px;
  font-weight: 600;
  position: relative;

  &:hover {
    color: #007bff;
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 100%;
    height: 2px;
    background: #007bff;
    transform: scaleX(0);
    transition: transform 0.3s ease-in-out;
  }

  &:hover::after {
    transform: scaleX(1);
  }
`;

const ExternalNavLink = styled.a`
  color: ${(props) => (props.isScrolled ? "black" : "white")};
  text-decoration: none;
  margin: 0px;
  padding: 0px;
  font-size: 16px;
  font-weight: 600;
  position: relative;

  &:hover {
    color: #007bff;
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 100%;
    height: 2px;
    background: #007bff;
    transform: scaleX(0);
    transition: transform 0.3s ease-in-out;
  }

  &:hover::after {
    transform: scaleX(1);
  }
`;

export default Header;
