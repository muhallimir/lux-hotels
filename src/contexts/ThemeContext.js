import React, { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "lux.theme";
const ThemeContext = createContext({
  theme: "light",
  setTheme: () => {},
  palette: { background: "#ffffff", text: "#111827", accent: "#af9a7d" },
});

const palettes = {
  light: {
    name: "light",
    background: "#ffffff",
    surface: "#f9f9f9",
    border: "#e5e7eb",
    text: "#111827",
    textMuted: "#6b7280",
    accent: "#af9a7d",
    accentDark: "#8c7a5d",
  },
  dark: {
    name: "dark",
    background: "#0f1115",
    surface: "#171a21",
    border: "#2a2f3a",
    text: "#f5f5f5",
    textMuted: "#9ca3af",
    accent: "#d4b88c",
    accentDark: "#af9a7d",
  },
  sepia: {
    name: "sepia",
    background: "#f4ecd8",
    surface: "#ebe0c4",
    border: "#d4c4a0",
    text: "#3a2e1f",
    textMuted: "#5c4d36",
    accent: "#8c6f3f",
    accentDark: "#5c4d36",
  },
};

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState("light");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored && palettes[stored]) {
        setThemeState(stored);
      }
    } catch (e) {
      /* ignore */
    }
  }, []);

  const setTheme = (next) => {
    if (!palettes[next]) return;
    setThemeState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch (e) {
      /* ignore */
    }
  };

  const palette = palettes[theme];

  return (
    <ThemeContext.Provider value={{ theme, setTheme, palette, allPalettes: Object.keys(palettes) }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
export default ThemeContext;
