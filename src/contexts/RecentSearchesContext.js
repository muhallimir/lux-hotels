import React, { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "lux.recentSearches";
const Ctx = createContext({ items: [], addSearch: () => {}, clear: () => {} });

export const RecentSearchesProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch (e) {
      /* ignore */
    }
  }, []);

  const persist = (next) => {
    setItems(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (e) {
      /* ignore */
    }
  };

  const addSearch = (term) => {
    if (!term || !term.trim()) return;
    const normalized = term.trim();
    const filtered = items.filter((i) => i.term !== normalized);
    persist([{ term: normalized, at: Date.now() }, ...filtered].slice(0, 8));
  };

  const clear = () => persist([]);

  return (
    <Ctx.Provider value={{ items, addSearch, clear }}>
      {children}
    </Ctx.Provider>
  );
};

export const useRecentSearches = () => useContext(Ctx);
export default Ctx;
