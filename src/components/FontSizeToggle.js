import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useTheme } from "../contexts/ThemeContext";

const Btn = styled.button`
  position: fixed;
  top: 80px;
  right: 24px;
  background: ${({ palette }) => palette.surface};
  color: ${({ palette }) => palette.text};
  border: 1px solid ${({ palette }) => palette.border};
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  z-index: 9996;
  display: flex;
  gap: 6px;
  align-items: center;
  font-size: 14px;
`;

const Cycle = ({ size }) => {
  switch (size) {
    case "sm":
      return "14px";
    case "lg":
      return "18px";
    default:
      return "16px";
  }
};

const FontSizeToggle = () => {
  const { palette, setTheme } = useTheme();
  const [size, setSize] = useState(() => {
    try { return window.localStorage.getItem("lux.fontSize") || "md"; }
    catch (e) { return "md"; }
  });

  useEffect(() => {
    try { window.localStorage.setItem("lux.fontSize", size); } catch (e) {}
    document.documentElement.style.fontSize = Cycle({ size });
  }, [size]);

  return (
    <Btn
      palette={palette}
      onClick={() => setSize((s) => (s === "sm" ? "md" : s === "md" ? "lg" : "sm"))}
      aria-label={`Font size ${size}, tap to cycle`}
      data-testid="font-size-toggle"
    >
      <span style={{ fontWeight: 700 }}>Aa</span>
      <span style={{ opacity: 0.7, fontSize: 11 }}>{size.toUpperCase()}</span>
    </Btn>
  );
};

export default FontSizeToggle;
