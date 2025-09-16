
import { useState, useEffect, type ReactNode } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const API_URL = "https://attractive-eagerness-backend4.up.railway.app";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Vérifie si un token est déjà stocké
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, []);

  // Login : récupère le token depuis le backend
  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post<{ token: string }>(`${API_URL}/api/login`, { email, password });
      const token = response.data.token;

      if (!token) throw new Error("Token manquant dans la réponse backend");

      localStorage.setItem("authToken", token);
      setIsAuthenticated(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Erreur de connexion :", err.message);
      } else {
        console.error("Erreur de connexion inconnue");
      }
      throw err; // on relance pour que le frontend gère l'affichage d'erreur
    }
  };

  // Logout : appelle le backend puis supprime le token
  const logout = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (token) {
        await axios.post(`${API_URL}/api/logout`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch (err) {
      console.error("Erreur lors de la déconnexion :", err);
    } finally {
      localStorage.removeItem("authToken");
      setIsAuthenticated(false);
    }
  };

  // Pour récupérer l'entête Authorization
  const getAuthHeader = () => {
    const token = localStorage.getItem("authToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout, getAuthHeader }}>
      {children}
    </AuthContext.Provider>
  );
};
