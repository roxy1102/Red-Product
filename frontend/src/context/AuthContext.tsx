import { createContext } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getAuthHeader: () => { Authorization: string } | object;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
