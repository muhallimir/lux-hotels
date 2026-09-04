import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useTheme } from "../contexts/ThemeContext";

const Banner = styled.div`
  position: fixed;
  bottom: 24px;
  left: 24px;
  right: 24px;
  max-width: 720px;
  margin: 0 auto;
  background: ${({ palette }) => palette.surface};
  color: ${({ palette }) => palette.text};
  border: 1px solid ${({ palette }) => palette.border};
  padding: 16px 20px;
  border-radius: 10px;
  display: ${({ visible }) => (visible ? "flex" : "none")};
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  z-index: 9998;
  flex-wrap: wrap;
`;

const Buttons = styled.div`
  display: flex;
  gap: 8px;
`;

const Primary = styled.button`
  background: ${({ palette }) => palette.accent};
  color: ${({ palette }) => palette.accentDark};
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  &:hover { filter: brightness(1.05); }
`;

const Secondary = styled.button`
  background: transparent;
  color: ${({ palette }) => palette.text};
  border: 1px solid ${({ palette }) => palette.border};
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  &:hover { background: ${({ palette }) => palette.border}; }
`;

const CookieConsentBanner = () => {
  const [visible, setVisible] = useState(false);
  const { palette } = useTheme();

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("lux.cookieConsent");
      if (stored === null) setVisible(true);
    } catch (e) {
      /* ignore */
    }
  }, []);

  const accept = () => {
    try { window.localStorage.setItem("lux.cookieConsent", "true"); } catch (e) {}
    setVisible(false);
  };

  const decline = () => {
    try { window.localStorage.setItem("lux.cookieConsent", "false"); } catch (e) {}
    setVisible(false);
  };

  return (
    <Banner palette={palette} visible={visible} role="region" aria-label="Cookie consent">
      <div>
        <strong>We use cookies.</strong>
        <span style={{ marginLeft: 8, opacity: 0.85 }}>
          They help us improve your stay. You can change your choice anytime.
        </span>
      </div>
      <Buttons>
        <Primary palette={palette} onClick={accept} data-testid="cookie-accept">Accept</Primary>
        <Secondary palette={palette} onClick={decline} data-testid="cookie-decline">Decline</Secondary>
      </Buttons>
    </Banner>
  );
};

export default CookieConsentBanner;
