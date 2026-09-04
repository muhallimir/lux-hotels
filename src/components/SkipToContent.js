import React from "react";
import { useTheme } from "../contexts/ThemeContext";

const SkipToContent = ({ targetId = "main-content" }) => {
  const { palette } = useTheme();
  return (
    <a
      href={`#${targetId}`}
      style={{
        position: "absolute",
        top: -40,
        left: 8,
        background: palette.accent,
        color: palette.accentDark,
        padding: "8px 16px",
        borderRadius: 4,
        zIndex: 10000,
        fontWeight: 700,
        textDecoration: "none",
        transition: "top 150ms ease",
      }}
      onFocus={(e) => {
        e.currentTarget.style.top = "8px";
      }}
      onBlur={(e) => {
        e.currentTarget.style.top = "-40px";
      }}
    >
      Skip to content
    </a>
  );
};

export default SkipToContent;
