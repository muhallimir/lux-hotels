import React, { createContext, useContext, useEffect, useState } from "react";

export const CURRENCIES = {
  USD: { symbol: "$", rate: 1, code: "USD", label: "US Dollar" },
  EUR: { symbol: "€", rate: 0.92, code: "EUR", label: "Euro" },
  GBP: { symbol: "£", rate: 0.79, code: "GBP", label: "British Pound" },
  JPY: { symbol: "¥", rate: 149.5, code: "JPY", label: "Japanese Yen" },
  CAD: { symbol: "C$", rate: 1.36, code: "CAD", label: "Canadian Dollar" },
  AUD: { symbol: "A$", rate: 1.52, code: "AUD", label: "Australian Dollar" },
};

const STORAGE_KEY = "lux.currency";
const Ctx = createContext({ currency: "USD", setCurrency: () => {}, convert: (n) => n });

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrencyState] = useState("USD");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored && CURRENCIES[stored]) setCurrencyState(stored);
    } catch (e) {
      /* ignore */
    }
  }, []);

  const setCurrency = (next) => {
    if (!CURRENCIES[next]) return;
    setCurrencyState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch (e) {
      /* ignore */
    }
  };

  const convert = (usdAmount) => {
    const c = CURRENCIES[currency] || CURRENCIES.USD;
    if (currency === "JPY") {
      return Math.round(usdAmount * c.rate).toLocaleString() + c.symbol;
    }
    return c.symbol + (usdAmount * c.rate).toFixed(2);
  };

  return (
    <Ctx.Provider value={{ currency, setCurrency, convert, allCurrencies: Object.keys(CURRENCIES), currencies: CURRENCIES }}>
      {children}
    </Ctx.Provider>
  );
};

export const useCurrency = () => useContext(Ctx);
export default Ctx;
