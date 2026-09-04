import React, { createContext, useContext, useEffect, useState } from "react";

export const LANGUAGES = {
  en: { code: "en", label: "English", flag: "🇬🇧" },
  es: { code: "es", label: "Español", flag: "🇪🇸" },
  fr: { code: "fr", label: "Français", flag: "🇫🇷" },
  de: { code: "de", label: "Deutsch", flag: "🇩🇪" },
  ja: { code: "ja", label: "日本語", flag: "🇯🇵" },
  zh: { code: "zh", label: "中文", flag: "🇨🇳" },
};

const translations = {
  en: {
    bookNow: "Book Now",
    explore: "Explore",
    rooms: "Rooms",
    featured: "Featured Rooms",
    services: "Services",
    hello: "Hello",
  },
  es: {
    bookNow: "Reservar",
    explore: "Explorar",
    rooms: "Habitaciones",
    featured: "Habitaciones Destacadas",
    services: "Servicios",
    hello: "Hola",
  },
  fr: {
    bookNow: "Réserver",
    explore: "Explorer",
    rooms: "Chambres",
    featured: "Chambres en Vedette",
    services: "Services",
    hello: "Bonjour",
  },
  de: {
    bookNow: "Buchen",
    explore: "Erkunden",
    rooms: "Zimmer",
    featured: "Empfohlene Zimmer",
    services: "Dienstleistungen",
    hello: "Hallo",
  },
  ja: {
    bookNow: "予約する",
    explore: "探索",
    rooms: "客室",
    featured: "おすすめ客室",
    services: "サービス",
    hello: "こんにちは",
  },
  zh: {
    bookNow: "立即预订",
    explore: "探索",
    rooms: "客房",
    featured: "精选客房",
    services: "服务",
    hello: "你好",
  },
};

const STORAGE_KEY = "lux.language";
const Ctx = createContext({ language: "en", setLanguage: () => {}, t: (k) => k });

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState("en");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored && translations[stored]) setLanguageState(stored);
    } catch (e) {
      /* ignore */
    }
  }, []);

  const setLanguage = (next) => {
    if (!translations[next]) return;
    setLanguageState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch (e) {
      /* ignore */
    }
  };

  const t = (key) => (translations[language] && translations[language][key]) || translations.en[key] || key;

  return (
    <Ctx.Provider value={{ language, setLanguage, t, allLanguages: Object.keys(LANGUAGES), languages: LANGUAGES }}>
      {children}
    </Ctx.Provider>
  );
};

export const useLanguage = () => useContext(Ctx);
export default Ctx;
