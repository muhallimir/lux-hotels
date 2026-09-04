import React, { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "lux.auth";
const Ctx = createContext({
  user: null,
  signIn: () => false,
  signOut: () => {},
  register: () => false,
  resetPassword: () => false,
});

const SALT = "lux-hotels-static-salt";

const hash = (s) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  }
  return (h >>> 0).toString(16);
};

const credKey = (email) => `${STORAGE_KEY}.creds.${hash(email)}`;
const sessionKey = `${STORAGE_KEY}.session`;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(sessionKey);
      if (stored) setUser(JSON.parse(stored));
    } catch (e) {
      /* ignore */
    }
  }, []);

  const findStored = (email) => {
    try {
      const raw = window.localStorage.getItem(credKey(email));
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  };

  const saveCred = (email, passwordHash, name) => {
    try {
      window.localStorage.setItem(credKey(email), JSON.stringify({ email, passwordHash, name, createdAt: Date.now() }));
    } catch (e) {
      /* ignore */
    }
  };

  const startSession = (u) => {
    setUser(u);
    try {
      window.localStorage.setItem(sessionKey, JSON.stringify(u));
    } catch (e) {
      /* ignore */
    }
  };

  const signIn = ({ email, password }) => {
    const stored = findStored(email);
    if (!stored) return { ok: false, reason: "no_account" };
    if (stored.passwordHash !== hash(password + SALT)) return { ok: false, reason: "bad_password" };
    startSession({ email: stored.email, name: stored.name, signedInAt: Date.now() });
    return { ok: true };
  };

  const register = ({ email, password, name }) => {
    if (!email || !password || !name) return { ok: false, reason: "missing_fields" };
    if (password.length < 6) return { ok: false, reason: "weak_password" };
    if (findStored(email)) return { ok: false, reason: "exists" };
    saveCred(email, hash(password + SALT), name);
    startSession({ email, name, signedInAt: Date.now() });
    return { ok: true };
  };

  const signOut = () => {
    setUser(null);
    try {
      window.localStorage.removeItem(sessionKey);
    } catch (e) {
      /* ignore */
    }
  };

  const resetPassword = ({ email, newPassword }) => {
    const stored = findStored(email);
    if (!stored) return { ok: false, reason: "no_account" };
    saveCred(email, hash(newPassword + SALT), stored.name);
    return { ok: true };
  };

  return (
    <Ctx.Provider value={{ user, signIn, signOut, register, resetPassword }}>
      {children}
    </Ctx.Provider>
  );
};

export const useAuth = () => useContext(Ctx);
export default Ctx;
