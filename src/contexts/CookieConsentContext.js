import React, { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "lux.cookieConsent";
const Ctx = createContext({ accepted: false, accept: () => {}, decline: () => {}, reset: () => {} });

export const CookieConsentProvider = ({ children }) => {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      setAccepted(stored === "true");
    } catch (e) {
      /* ignore */
    }
  }, []);

  const accept = () => {
    setAccepted(true);
    try {
      window.localStorage.setItem(STORAGE_KEY, "true");
    } catch (e) {
      /* ignore */
    }
  };

  const decline = () => {
    setAccepted(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, "false");
    } catch (e) {
      /* ignore */
    }
  };

  const reset = () => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      /* ignore */
    }
    setAccepted(false);
  };

  return (
    <Ctx.Provider value={{ accepted, accept, decline, reset }}>
      {children}
    </Ctx.Provider>
  );
};

export const useCookieConsent = () => useContext(Ctx);
export default Ctx;
