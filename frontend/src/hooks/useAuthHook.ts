// src/hooks/useAuthHook.ts
import { useContext } from "react";
import { AuthContext } from "./useAuth.tsx"; // Import the context from the other file

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};