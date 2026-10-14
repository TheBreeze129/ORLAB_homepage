import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ieeeLogo from "../../../assets/ieee-logo.svg";

const DAY_IN_MS = 24 * 60 * 60 * 1000;

const LandingPopup = ({ event }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isEventActive(event)) {
      setIsVisible(false);
      return;
    }

    setIsVisible(isForcedOpen() || !isDismissedForToday(event.id));
  }, [event]);

  if (!event || !isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleDismissForToday = () => {
    dismissForToday(event.id);
    setIsVisible(false);
  };

  return (
    <PopupLayer role="presentation">
      <PopupDialog role="dialog" aria-modal="true" aria-label={event.title}>
        <PopupHeader>
          {event.eyebrow ? <PopupEyebrow>{event.eyebrow}</PopupEyebrow> : null}
          <JournalBrand aria-label="IEEE TCAD">
            <IeeeLogo src={ieeeLogo} alt="IEEE" />
            <JournalName>TCAD</JournalName>
          </JournalBrand>
        </PopupHeader>
        <CertificateFrame>
          <PopupImageFrame>
            <PopupImage src={event.image} alt={event.imageAlt || ""} />
            {event.imageLabel ? (
              <PopupImageLabel>{event.imageLabel}</PopupImageLabel>
            ) : null}
          </PopupImageFrame>
        </CertificateFrame>
        <PopupTitle>{event.title}</PopupTitle>
        {event.description ? (
          <PopupDescription>{event.description}</PopupDescription>
        ) : null}
        <PopupActions>
          <DismissButton type="button" onClick={handleDismissForToday}>
            오늘 하루 보지 않기
          </DismissButton>
          <CloseButton type="button" onClick={handleClose}>
            닫기
          </CloseButton>
        </PopupActions>
      </PopupDialog>
    </PopupLayer>
  );
};

const isEventActive = (event) => {
  if (!event?.enabled) return false;

  const now = Date.now();
  const start = event.startAt ? Date.parse(event.startAt) : null;
  const end = event.endAt ? Date.parse(event.endAt) : null;

  if (Number.isFinite(start) && now < start) return false;
  if (Number.isFinite(end) && now > end) return false;

  return true;
};

const getStorageKey = (eventId) => `orlab:landing-popup:${eventId}`;

const isForcedOpen = () => {
  try {
    return new URLSearchParams(window.location.search).get("popup") === "show";
  } catch (error) {
    return false;
  }
};

const isDismissedForToday = (eventId) => {
  try {
    const dismissedAt = Number.parseInt(
      window.localStorage.getItem(getStorageKey(eventId)) || "",
      10
    );

    if (!Number.isFinite(dismissedAt)) return false;

    return Date.now() - dismissedAt < DAY_IN_MS;
  } catch (error) {
    return false;
  }
};

const dismissForToday = (eventId) => {
  try {
    window.localStorage.setItem(getStorageKey(eventId), String(Date.now()));
  } catch (error) {
    // Closing should still work even when localStorage is unavailable.
  }
};

const PopupLayer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(0, 0, 0, 0.18);
  box-sizing: border-box;
`;

const PopupDialog = styled.div`
  position: relative;
  width: min(843px, 100%);
  min-height: 641px;
  padding: 45px 22px 12px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25),
    inset 0 4px 4px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;

  @media (max-width: 720px) {
    min-height: auto;
    padding: 24px 18px 14px;
  }
`;

const CertificateFrame = styled.div`
  position: relative;
  width: min(679px, 100%);
  height: 412px;
  margin: 0 auto;
  padding: 10px;
  border: 2px solid #a88635;
  background: #fffdf7;
  box-shadow: inset 0 0 0 3px #fffdf7, inset 0 0 0 4px #d7bd72,
    0 8px 20px rgba(17, 50, 117, 0.08);
  box-sizing: border-box;

  &::before {
    content: "";
    position: absolute;
    inset: 5px;
    border: 1px solid #d7bd72;
    pointer-events: none;
  }

  @media (max-width: 720px) {
    height: auto;
    aspect-ratio: 679 / 412;
  }
`;

const PopupImageFrame = styled.figure`
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 14px;
  display: grid;
  overflow: hidden;
  border: 1px solid #d5dce8;
  border-radius: 6px;
  background: #f3f5f8;
  box-shadow: 0 8px 20px rgba(17, 50, 117, 0.08);
  box-sizing: border-box;
`;

const PopupImage = styled.img`
  grid-area: 1 / 1;
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  align-self: center;
  justify-self: center;
  display: block;
  object-fit: contain;
  object-position: center;
`;

const PopupImageLabel = styled.figcaption`
  grid-area: 1 / 1;
  align-self: start;
  justify-self: stretch;
  z-index: 1;
  margin-top: 28px;
  color: #000000;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.2;
  text-align: center;
  letter-spacing: 0;
`;

const PopupHeader = styled.div`
  width: min(679px, 100%);
  min-height: 42px;
  margin: 0 auto 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
`;

const PopupEyebrow = styled.p`
  margin: 0;
  padding-left: 10px;
  border-left: 4px solid #113275;
  color: #113275;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: 0;
  box-sizing: border-box;
`;

const JournalBrand = styled.div`
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #113275;
`;

const IeeeLogo = styled.img`
  width: 76px;
  height: 42px;
  display: block;
  object-fit: contain;
`;

const JournalName = styled.span`
  padding-left: 10px;
  border-left: 1px solid #b99a4a;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: 0.04em;

  @media (max-width: 480px) {
    display: none;
  }
`;

const PopupTitle = styled.h2`
  width: min(679px, 100%);
  margin: 22px auto 0;
  color: #113275;
  font-size: 26px;
  font-weight: 700;
  line-height: 1.35;
  letter-spacing: 0;

  @media (max-width: 720px) {
    font-size: 21px;
  }
`;

const PopupDescription = styled.p`
  width: min(679px, 100%);
  margin: 8px auto 0;
  color: #333333;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.6;
  letter-spacing: 0;

  @media (max-width: 720px) {
    font-size: 16px;
  }
`;

const PopupActions = styled.div`
  width: min(679px, 100%);
  margin: 16px auto 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  flex-wrap: wrap;
`;

const DismissButton = styled.button`
  height: 46px;
  padding: 0 18px;
  border: 1px solid #113275;
  background: #ffffff;
  color: #113275;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background: #f0f4fc;
  }
`;

const CloseButton = styled.button`
  width: 100px;
  height: 46px;
  border: 0;
  background: #113275;
  color: #ffffff;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.5;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background: #0a265e;
  }
`;

export default LandingPopup;
