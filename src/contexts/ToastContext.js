import React, { createContext, useContext, useState } from "react";

const Ctx = createContext({ toasts: [], push: () => {}, dismiss: () => {} });

let counter = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const push = (message, type = "info", ttl = 3500) => {
    const id = `t_${++counter}_${Date.now()}`;
    setToasts((current) => [...current, { id, message, type }]);
    if (ttl > 0) {
      setTimeout(() => {
        setToasts((current) => current.filter((t) => t.id !== id));
      }, ttl);
    }
    return id;
  };

  const dismiss = (id) => setToasts((current) => current.filter((t) => t.id !== id));

  return (
    <Ctx.Provider value={{ toasts, push, dismiss }}>{children}</Ctx.Provider>
  );
};

export const useToast = () => useContext(Ctx);
export default Ctx;
