import { useState } from "react";
import type { User } from "../types/user";

export function useAuth() {
  const [user, setUser] = useState(() => {
    return JSON.parse(sessionStorage.getItem("user") || "null");
  });

  const loginUser = (userData: User) => {
    sessionStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    sessionStorage.removeItem("user");
    setUser(null);

    //refresh page 
    window.location.reload();
  };

  return { user, loginUser, logout };
}