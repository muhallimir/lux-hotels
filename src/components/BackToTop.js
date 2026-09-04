import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useTheme } from "../contexts/ThemeContext";

const Wrap = styled.a`
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: ${({ palette }) => palette.accent};
  color: ${({ palette }) => palette.accentDark};
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: ${({ visible }) => (visible ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  font-size: 22px;
  text-decoration: none;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  z-index: 9997;
  transition: opacity 0.2s ease;
  &:hover { opacity: 0.85; }
`;

const BackToTop = () => {
  const { palette } = useTheme();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 320);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Wrap palette={palette} visible={visible} href="#top" onClick={go} aria-label="Back to top">
      ↑
    </Wrap>
  );
};

export default BackToTop;
