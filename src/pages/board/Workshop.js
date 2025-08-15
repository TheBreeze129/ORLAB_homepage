import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../../components/Header.js";
import Footer from "../../components/Footer.js";
import styled from "styled-components";
import yonseiImage from "../../assets/yonsei.jpg";

function Workshop() {
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState("");
  const [seminars, setSeminars] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  const year = searchParams.get("year");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // year에 따라 token 설정
  useEffect(() => {
    if (year === "2023") {
      setToken(process.env.REACT_APP_WORKSHOP_2023);
    } else if (year === "2022") {
      setToken(process.env.REACT_APP_WORKSHOP_2022);
    } else if (year === "2021") {
      setToken(process.env.REACT_APP_WORKSHOP_2021);
    }
  }, [year]);

  // token이 설정되면 API 호출
  useEffect(() => {
    if (token !== "") {
      const fetchSeminars = async () => {
        setIsLoading(true); // API 호출 직전에 로딩 시작
        try {
          const res = await fetch("/api/seminar", {
            method: "GET",
            headers: {
              dbtoken: token,
            },
          });
          const data = await res.json();
          setSeminars(data.results);
        } catch (err) {
          console.error(err);
        } finally {
          setIsLoading(false); // 로딩 완료
        }
      };

      fetchSeminars();
    }
  }, [token]);

  return (
    <Outer>
      <FixedHeader>
        <Header />
      </FixedHeader>

      <HeroContainer>
        <HeroContent>
          <Title>Workshop : {year}</Title>
          <Description>Operation Research Lab's Workshop in {year}</Description>
        </HeroContent>
        <ImageWrapper>
          <StyledImage src={yonseiImage} alt="Workshop" />
        </ImageWrapper>
      </HeroContainer>

      <Container>
        {/* 1) token이 아직 없으면 */}
        {token === "" ? (
          <Heading>Sorry, this will be updated soon.</Heading>
        ) : (
          <>
            {/* 2) 로딩 중이면 -> 스켈레톤 표시 */}
            {isLoading ? (
              <SkeletonWrapper>
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
              </SkeletonWrapper>
            ) : // 3) 로딩 끝났는데 데이터가 있는 경우 -> 테이블 표시
            seminars.length > 0 ? (
              <TableWrapper>
                <Table>
                  <thead>
                    <tr>
                      <Th>
                        Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </Th>
                      <Th>Name</Th>
                      <Th>Title</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {/** 1) 먼저 세미나 데이터를 그룹화 */}
                    {groupSeminars(seminars).map((group, groupIndex) => {
                      const rowCount = group.splittedTitles.length;

                      return group.splittedTitles.map(
                        (titleObj, titleIndex) => {
                          if (titleIndex === 0) {
                            // 첫 행: Date, Name, Title
                            return (
                              <tr key={`${groupIndex}-${titleIndex}`}>
                                <Td rowSpan={rowCount}>
                                  {formatDate(group.date)}
                                </Td>
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
                            // 나머지 행: Title만
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
                        }
                      );
                    })}
                  </tbody>
                </Table>
              </TableWrapper>
            ) : (
              // 4) 로딩 끝났는데 세미나 데이터가 없다면
              <Heading>No Workshop data available.</Heading>
            )}
          </>
        )}
      </Container>

      <Footer />
    </Outer>
  );
}

export default Workshop;

function groupSeminars(seminars) {
  const groups = [];
  let currentGroup = null;

  for (let i = 0; i < seminars.length; i++) {
    const item = seminars[i];
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

function formatDate(str) {
  // str은 yymmdd 형식이라고 가정합니다.
  const year = "20" + str.slice(0, 2); // 예: "24" -> "2024"
  const month = parseInt(str.slice(2, 4), 10); // "04" -> 4
  const day = parseInt(str.slice(4, 6), 10); // "04" -> 4

  // 새로운 Date 객체를 생성 (월은 0부터 시작하므로 month - 1)
  const dateObj = new Date(year, month - 1, day);

  // 옵션을 사용해 원하는 형식으로 변환
  return dateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/* -------------------------------
   스켈레톤 스타일
-------------------------------- */
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

/* -------------------------------
   기존 스타일들
-------------------------------- */
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
  margin: 0px;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const Description = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
`;

const ImageWrapper = styled.div`
  width: 500px;
  height: auto;
  position: absolute;
  bottom: -50px;
  right: 20%;
  background: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);

  @media (max-width: 1024px) {
    width: 280px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

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
