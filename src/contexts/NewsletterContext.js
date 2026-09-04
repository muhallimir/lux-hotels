import React, { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "lux.newsletter";
const Ctx = createContext({ subscribed: false, subscribe: () => {}, unsubscribe: () => {} });

export const NewsletterProvider = ({ children }) => {
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setSubscribed(true);
    } catch (e) {
      /* ignore */
    }
  }, []);

  const subscribe = (email) => {
    if (!email || !email.includes("@")) return false;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ email, at: Date.now() }));
      setSubscribed(true);
      return true;
    } catch (e) {
      return false;
    }
  };

  const unsubscribe = () => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      /* ignore */
    }
    setSubscribed(false);
  };

  return (
    <Ctx.Provider value={{ subscribed, subscribe, unsubscribe }}>
      {children}
    </Ctx.Provider>
  );
};

export const useNewsletter = () => useContext(Ctx);
export default Ctx;
