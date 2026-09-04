import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useTheme } from "../contexts/ThemeContext";

const Bar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: ${({ palette }) => palette.accent};
  transform-origin: left center;
  transform: scaleX(${({ progress }) => progress});
  transition: transform 0.18s ease;
  z-index: 9995;
`;

const ScrollProgress = () => {
  const { palette } = useTheme();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const cur = total > 0 ? window.scrollY / total : 0;
      setProgress(Math.max(0, Math.min(1, cur)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <Bar palette={palette} progress={progress} aria-hidden="true" />;
};

export default ScrollProgress;
