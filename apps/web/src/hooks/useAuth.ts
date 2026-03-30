import { useState } from "react";
import type { User } from "../types/user";

export function useAuth() {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user") || "null");
  });

  const loginUser = (userData: User) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);

    //refresh page 
    window.location.reload();
  };

  return { user, loginUser, logout };
}