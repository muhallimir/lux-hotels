import React, { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "lux.bookings";
const Ctx = createContext({ bookings: [], createBooking: () => {}, cancelBooking: () => {}, modifyBooking: () => {}, findById: () => null });

export const BookingsProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setBookings(JSON.parse(stored));
    } catch (e) {
      /* ignore */
    }
  }, []);

  const persist = (next) => {
    setBookings(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (e) {
      /* ignore */
    }
  };

  const createBooking = ({ roomSlug, roomName, checkIn, checkOut, guests, total }) => {
    const id = `bk_${Date.now()}`;
    const booking = {
      id,
      roomSlug,
      roomName,
      checkIn,
      checkOut,
      guests,
      total,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };
    persist([booking, ...bookings]);
    return booking;
  };

  const cancelBooking = (id) => {
    persist(bookings.map((b) => (b.id === id ? { ...b, status: "cancelled" } : b)));
  };

  const modifyBooking = (id, updates) => {
    persist(bookings.map((b) => (b.id === id ? { ...b, ...updates } : b)));
  };

  const findById = (id) => bookings.find((b) => b.id === id) || null;

  return (
    <Ctx.Provider value={{ bookings, createBooking, cancelBooking, modifyBooking, findById }}>
      {children}
    </Ctx.Provider>
  );
};

export const useBookings = () => useContext(Ctx);
export default Ctx;
