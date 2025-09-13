import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// 1. Création du Contexte
const AuthContext = createContext<{ isAuthenticated: boolean; login: (token: string) => void; logout: () => Promise<void> } | null>(null);

// 2. Création du Fournisseur de Contexte
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  const login = (token: string) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        await axios.post('http://127.0.0.1:8000/api/logout', {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (error) {
        console.error("Erreur de déconnexion", error);
      } finally {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
      }
    }
  };

  const value = { isAuthenticated, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 3. Création du Hook Personnalisé pour l'utilisation du Contexte
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
