import React, { createContext, useEffect, useMemo, useState } from "react";
import { api, endpoints } from "../lib/api";

export const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    try {
      const raw = localStorage.getItem("auth:user");
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem("auth:user", JSON.stringify(user));
    else localStorage.removeItem("auth:user");
  }, [user]);

  const login = async ({ email, password }) => {
    const res = await api.post(endpoints.auth.login, { email, password });
    setUser(res);
    return res;
  };

  const signup = async ({ name, email, password, role }) => {
    const res = await api.post(endpoints.auth.signup, { name, email, password, role });
    if (res?.driverId) {
      try { localStorage.setItem('driverId', res.driverId); } catch {}
    }
    setUser(res);
    return res;
  };

  const logout = () => setUser(null);

  const value = useMemo(() => ({ user, isAuthenticated, login, signup, logout }), [user, isAuthenticated]);

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}
