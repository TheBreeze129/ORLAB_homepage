import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <ContactSection>
      <ContactCard>
        <h2>Contact</h2>
        <p>
          <strong>E-mail</strong> | victorious_s@yonsei.ac.kr (Jimyung Park,
          applicants please send your C.V. and optional supplementaries)
        </p>
        <p>
          <strong>TEL</strong> | 82+ 2-2123-7473
        </p>
        <p>
          <strong>Address</strong> | D1008, 4th Engineering bldg, 50 Yonsei-ro,
          Seodaemun-gu, Seoul, Republic of Korea
        </p>
      </ContactCard>
    </ContactSection>
  );
};

const ContactSection = styled.div`
  display: flex;
  background-color: rgba(34, 77, 96, 100);
  text-align: center;
  align-items: center;
  width: 100%;
`;

const ContactCard = styled.section`
  padding: 30px 30px;
  color: white;
  text-align: left;
  align-items: center;
  margin: auto;
  h2 {
    font-size: 2rem;
    text-align: center;
  }
  p {
    font-size: 1.2rem;
  }
`;

export default Footer;
