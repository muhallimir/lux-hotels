import React, { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "lux.compare";
const MAX_ITEMS = 4;
const Ctx = createContext({ items: [], add: () => {}, remove: () => {}, clear: () => {}, has: () => false });

export const CompareProvider = ({ children }) => {
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

  const add = (room) => {
    if (!room || !room.slug) return;
    if (items.find((r) => r.slug === room.slug)) return;
    if (items.length >= MAX_ITEMS) return;
    persist([...items, { slug: room.slug, name: room.name, price: room.price, capacity: room.capacity, size: room.size, type: room.type, pets: room.pets, breakfast: room.breakfast, images: room.images }]);
  };

  const remove = (slug) => persist(items.filter((r) => r.slug !== slug));

  const clear = () => persist([]);

  const has = (slug) => Boolean(items.find((r) => r.slug === slug));

  return (
    <Ctx.Provider value={{ items, add, remove, clear, has, max: MAX_ITEMS }}>
      {children}
    </Ctx.Provider>
  );
};

export const useCompare = () => useContext(Ctx);
export default Ctx;
