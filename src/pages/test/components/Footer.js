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
  right: 77px;
  top: 1px;
  width: auto;
  height: 1px;
  background: #e6e6e6;

  @media (max-width: 780px) {
    left: 24px;
    right: 24px;
    top: 0;
    width: auto;
  }
`;

const FooterLogo = styled.img`
  position: absolute;
  left: 85px;
  top: 56px;
  width: 169px;
  height: 59px;
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
  right: 78px;
  top: 56px;
  width: auto;
  color: #000000;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0;

  @media (max-width: 980px) {
    left: 330px;
    right: 48px;
    width: auto;
  }

  @media (max-width: 780px) {
    position: static;
    width: auto;
    font-size: 15px;
    line-height: 1.6;
  }
`;

const ContactLine = styled.div`
  overflow-wrap: anywhere;
`;

export default Footer;
