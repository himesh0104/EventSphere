import { useEffect, useState } from "react";
import api from "../services/api";

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    api
      .get("/api/auth/me")
      .then((res) => setUser(res.data.user))
      .catch(() => localStorage.removeItem("token"))
      .finally(() => setLoading(false));
  }, []);

  function login(token: string, userObj: any) {
    localStorage.setItem("token", token);
    setUser(userObj);
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return { user, loading, login, logout };
}
