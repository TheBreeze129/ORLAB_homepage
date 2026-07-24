import React from "react";
import styled from "styled-components";
import footerLogo from "../../../assets/logo.svg";

const Footer = () => {
  return (
    <FooterFrame>
      <FooterDivider />
      <FooterLogo
        src={footerLogo}
        alt="ORLAB Operations Research Lab"
      />
      <ContactList aria-label="ORLAB contact information">
        <ContactLine>E-mail | kh.lee@yonsei.ac.kr (Keonhee Lee)</ContactLine>
        <ContactLine>Tel | 82+ 2-2123-7473</ContactLine>
        <ContactLine>
          Address | D1008, 4th Engineering bldg, 50 Yonsei-ro, Seodaemun-gu,
          Seoul, Republic of Korea
        </ContactLine>
      </ContactList>
    </FooterFrame>
  );
};

const FooterFrame = styled.footer`
  position: relative;
  width: min(100%, 1442px);
  margin: 0 auto;
  padding: 56px 78px 56px 85px;
  background: #ffffff;
  display: flex;
  align-items: flex-start;
  gap: 250px;
  box-sizing: border-box;
  border-top: 1px solid #e6e6e6;

  @media (max-width: 780px) {
    margin-top: 0;
    padding: 40px 24px 44px;
    flex-direction: column;
    gap: 28px;
  }
`;

const FooterDivider = styled.div`
  display: none;
`;

const FooterLogo = styled.img`
  width: 169px;
  height: 59px;
  flex: 0 0 auto;
  display: block;
  object-fit: contain;
  object-position: left center;

  @media (max-width: 780px) {
    width: 180px;
    height: 70px;
  }
`;

const ContactList = styled.div`
  width: auto;
  color: #000000;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0;

  @media (max-width: 980px) {
    width: auto;
    flex: 1 1 auto;
  }

  @media (max-width: 780px) {
    width: auto;
    font-size: 15px;
    line-height: 1.6;
  }
`;

const ContactLine = styled.div`
  overflow-wrap: anywhere;
`;

export default Footer;
