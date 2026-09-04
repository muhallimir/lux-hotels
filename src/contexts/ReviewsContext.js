import React, { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "lux.reviews";
const Ctx = createContext({ reviews: [], addReview: () => {}, averageFor: () => ({ average: 0, count: 0 }) });

const seedReviews = [
  { id: "r1", roomSlug: "single-economy", name: "Maya R.", rating: 5, comment: "Clean and quiet. Friendly front desk.", createdAt: "2024-11-12T10:00:00Z" },
  { id: "r2", roomSlug: "double-deluxe", name: "Andre T.", rating: 4, comment: "Spacious and well-appointed.", createdAt: "2024-12-02T14:30:00Z" },
];

export const ReviewsProvider = ({ children }) => {
  const [reviews, setReviews] = useState(seedReviews);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setReviews([...seedReviews, ...parsed]);
      }
    } catch (e) {
      /* ignore */
    }
  }, []);

  const persist = (next) => {
    setReviews(next);
    try {
      const stored = next.filter((r) => !seedReviews.find((s) => s.id === r.id));
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    } catch (e) {
      /* ignore */
    }
  };

  const addReview = ({ roomSlug, name, rating, comment }) => {
    if (!roomSlug || !name) return;
    const entry = {
      id: `r_${Date.now()}`,
      roomSlug,
      name,
      rating: Math.max(1, Math.min(5, Number(rating) || 0)),
      comment: comment || "",
      createdAt: new Date().toISOString(),
    };
    persist([entry, ...reviews]);
    return entry;
  };

  const averageFor = (slug) => {
    const list = reviews.filter((r) => r.roomSlug === slug);
    if (list.length === 0) return { average: 0, count: 0 };
    const total = list.reduce((s, r) => s + r.rating, 0);
    return { average: +(total / list.length).toFixed(2), count: list.length };
  };

  return (
    <Ctx.Provider value={{ reviews, addReview, averageFor }}>
      {children}
    </Ctx.Provider>
  );
};

export const useReviews = () => useContext(Ctx);
export default Ctx;
