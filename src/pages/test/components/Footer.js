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
  height: 171px;
  margin: 0 auto;
  background: #ffffff;

  @media (max-width: 780px) {
    height: auto;
    margin-top: 0;
    padding: 40px 24px 44px;
    box-sizing: border-box;
  }
`;

const FooterDivider = styled.div`
  position: absolute;
  left: 85px;
  top: 0;
  width: 1280px;
  height: 1px;
  background: #d0d0d0;

  @media (max-width: 780px) {
    left: 24px;
    right: 24px;
    top: 0;
    width: auto;
  }
`;

const FooterLogo = styled.img`
  position: absolute;
  left: 83px;
  top: 52px;
  width: 180px;
  height: 70px;
  display: block;
  object-fit: contain;
  object-position: left center;

  @media (max-width: 780px) {
    position: static;
    width: 180px;
    height: 70px;
    margin-bottom: 28px;
  }
`;

const ContactList = styled.div`
  position: absolute;
  left: 504px;
  top: 56px;
  width: 860px;
  color: #000000;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.42;
  letter-spacing: 0;

  @media (max-width: 980px) {
    left: 330px;
    width: calc(100% - 378px);
  }

  @media (max-width: 780px) {
    position: static;
    width: auto;
    font-size: 15px;
    line-height: 1.6;
  }
`;

const ContactLine = styled.div`
  white-space: nowrap;

  @media (max-width: 980px) {
    white-space: normal;
  }
`;

export default Footer;
