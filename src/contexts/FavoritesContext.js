import React, { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "lux.favorites";
const Ctx = createContext({ items: [], toggle: () => {}, isFavorite: () => false, count: 0 });

export const FavoritesProvider = ({ children }) => {
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

  const toggle = (room) => {
    if (!room || !room.slug) return;
    const exists = items.find((r) => r.slug === room.slug);
    if (exists) {
      persist(items.filter((r) => r.slug !== room.slug));
    } else {
      persist([{ slug: room.slug, name: room.name, price: room.price, images: room.images, excerpt: room.excerpt }, ...items]);
    }
  };

  const isFavorite = (slug) => Boolean(items.find((r) => r.slug === slug));

  return (
    <Ctx.Provider value={{ items, toggle, isFavorite, count: items.length }}>
      {children}
    </Ctx.Provider>
  );
};

export const useFavorites = () => useContext(Ctx);
export default Ctx;
