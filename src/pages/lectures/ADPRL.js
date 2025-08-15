import React, { useEffect, useState } from "react";
import Header from "../../components/Header.js";
import Footer from "../../components/Footer.js";
import styled from "styled-components";
import yonseiImage from "../../assets/yonsei.jpg";

function ADPRL() {
  const [project, setProject] = useState([]);
  const [paper, setPaper] = useState([]);
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchProject = async () => {
      setIsLoading1(true);
      try {
        const res = await fetch("/api/seminar", {
          method: "GET",
          headers: {
            dbtoken: process.env.REACT_APP_LECTURE_ADPRL1,
          },
        });
        const data = await res.json();
        setProject(data.results);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading1(false);
      }
    };

    const fetchPaper = async () => {
      setIsLoading2(true);
      try {
        const res = await fetch("/api/seminar", {
          method: "GET",
          headers: {
            dbtoken: process.env.REACT_APP_LECTURE_ADPRL2,
          },
        });
        const data = await res.json();
        setPaper(data.results);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading2(false);
      }
    };

    fetchProject();
    fetchPaper();
  }, []);

  return (
    <Outer>
      <FixedHeader>
        <Header />
      </FixedHeader>

      <HeroContainer>
        <HeroContent>
          <Title>
            Advanced Dynamic Programming and Reinforcement Learning (2023)
          </Title>
        </HeroContent>
      </HeroContainer>

      <Container>
        {/* ============================ Project 표 ============================ */}
        <Heading>Project</Heading>
        {isLoading1 ? (
          <SkeletonWrapper>
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </SkeletonWrapper>
        ) : project.length > 0 ? (
          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  <Th>Category</Th>
                  <Th>Title</Th>
                </tr>
              </thead>
              <tbody>
                {groupSeminars(project).map((group, groupIndex) => {
                  const rowCount = group.splittedTitles.length;
                  return group.splittedTitles.map((titleObj, titleIndex) => {
                    // 첫 번째 줄: Category 열(rowSpan) + Title
                    if (titleIndex === 0) {
                      return (
                        <tr key={`${groupIndex}-${titleIndex}`}>
                          <Td rowSpan={rowCount}>{group.name}</Td>
                          <Td>
                            {titleObj.link === "#" ? (
                              titleObj.text
                            ) : (
                              <TitleLink
                                href={titleObj.link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {titleObj.text}
                              </TitleLink>
                            )}
                          </Td>
                        </tr>
                      );
                    } else {
                      // 이후 줄: Category 열은 출력 X, Title 열만
                      return (
                        <tr key={`${groupIndex}-${titleIndex}`}>
                          <Td>
                            {titleObj.link === "#" ? (
                              titleObj.text
                            ) : (
                              <TitleLink
                                href={titleObj.link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {titleObj.text}
                              </TitleLink>
                            )}
                          </Td>
                        </tr>
                      );
                    }
                  });
                })}
              </tbody>
            </Table>
          </TableWrapper>
        ) : (
          <Heading>No data available.</Heading>
        )}

        <HorizontalLine />

        {/* ============================ Paper Review 표 ============================ */}
        <Heading>Paper Review</Heading>
        {isLoading2 ? (
          <SkeletonWrapper>
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </SkeletonWrapper>
        ) : paper.length > 0 ? (
          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  <Th>
                    Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </Th>
                  <Th>
                    Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </Th>
                  <Th>Title</Th>
                </tr>
              </thead>
              <tbody>
                {groupSeminars(paper).map((group, groupIndex) => {
                  const rowCount = group.splittedTitles.length;
                  return group.splittedTitles.map((titleObj, titleIndex) => {
                    // 첫 번째 줄: Date, Name 열(rowSpan) + Title
                    if (titleIndex === 0) {
                      return (
                        <tr key={`${groupIndex}-${titleIndex}`}>
                          <Td rowSpan={rowCount}>{formatDate(group.date)}</Td>
                          <Td rowSpan={rowCount}>{group.name}</Td>
                          <Td>
                            {titleObj.link === "#" ? (
                              titleObj.text
                            ) : (
                              <TitleLink
                                href={titleObj.link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {titleObj.text}
                              </TitleLink>
                            )}
                          </Td>
                        </tr>
                      );
                    } else {
                      // 이후 줄: Date, Name 열은 출력 X, Title 열만
                      return (
                        <tr key={`${groupIndex}-${titleIndex}`}>
                          <Td>
                            {titleObj.link === "#" ? (
                              titleObj.text
                            ) : (
                              <TitleLink
                                href={titleObj.link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {titleObj.text}
                              </TitleLink>
                            )}
                          </Td>
                        </tr>
                      );
                    }
                  });
                })}
              </tbody>
            </Table>
          </TableWrapper>
        ) : (
          <Heading>No data available.</Heading>
        )}
      </Container>

      <Footer />
    </Outer>
  );
}

export default ADPRL;

/* 
  연속된 세미나 데이터를 날짜(date)와 이름(name)이 같으면 하나의 그룹으로 묶고,
  title(문자열)을 "/" 기준으로 분리하여 splittedTitles에 넣음
*/
function groupSeminars(seminars) {
  const groups = [];
  let currentGroup = null;

  for (let i = 0; i < seminars.length; i++) {
    const item = seminars[i];
    // 연속된 아이템에서 date, name이 같으면 같은 그룹, 아니면 새로운 그룹 생성
    if (
      !currentGroup ||
      currentGroup.date !== item.date ||
      currentGroup.name !== item.name
    ) {
      if (currentGroup) {
        groups.push(currentGroup);
      }
      currentGroup = {
        date: item.date,
        name: item.name,
        splittedTitles: [],
      };
    }

    // title을 "/" 기준으로 분할하여 각각 하나의 row로 표현
    const parts = item.title.split("/");
    parts.forEach((part) => {
      currentGroup.splittedTitles.push({
        text: part.trim(),
        link: item.link,
      });
    });
  }

  if (currentGroup) {
    groups.push(currentGroup);
  }

  return groups;
}

// "231206" → "Dec 6, 2023" 형태로 변환 (데이터가 없거나 공백이면 그냥 리턴)
function formatDate(str) {
  if (!str || str.trim() === "") return "";
  const year = "20" + str.slice(0, 2);
  const month = parseInt(str.slice(2, 4), 10);
  const day = parseInt(str.slice(4, 6), 10);
  const dateObj = new Date(year, month - 1, day);
  return dateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/* ------------------ 스타일 컴포넌트 ------------------ */
const Outer = styled.div`
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const FixedHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: white;
  z-index: 1000;
`;

const HeroContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: left;
  padding: 80px 20%;
  background: url(${yonseiImage}) no-repeat center center/cover;
  min-height: 60vh;
  position: relative;
  box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.4);

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 60px 5%;
  }
`;

const HeroContent = styled.div`
  max-width: 50%;
  color: #fff;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: bold;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const Container = styled.div`
  max-width: 60%;
  margin: 40px auto;
  padding-bottom: 50px;
  padding-top: 100px;
`;

const Heading = styled.h1`
  font-size: 2rem;
  margin-bottom: 40px;
  text-align: center;
  color: #333;
  text-transform: uppercase;
`;

const TableWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  overflow-x: auto;
  font-size: 1rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  background-color: rgba(34, 77, 96, 0.5);
  padding: 12px;
  border: 0px;
  color: white;
  line-height: 2;
  text-align: left;
`;

const Td = styled.td`
  padding: 12px;
  line-height: 2;
  border: 1px solid #ddd;
`;

const TitleLink = styled.a`
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const HorizontalLine = styled.div`
  width: 100%;
  height: 1px;
  margin-top: 50px;
  background-color: gray;
  margin-bottom: 10px;
`;

const SkeletonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 50px auto;
  max-width: 600px;
`;

const SkeletonRow = styled.div`
  background-color: #eee;
  height: 20px;
  border-radius: 4px;
`;
