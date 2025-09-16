// src/services/authServices.ts
import axios from "axios";

// URL de ton backend Railway depuis les variables d'environnement
const API_URL = (import.meta.env.VITE_API_URL || "https://attractive-eagerness-backend4.up.railway.app").replace(/\/api$/, "") + "/api";

// Interfaces pour les données
interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface ResetPasswordData {
  token: string;
  email: string;
  password: string;
  password_confirmation?: string;
}

interface LoginResponse {
  user: unknown;
  token: string;
}

// Register
export const registerUser = async (userData: RegisterData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (err: any) {
    console.error("Erreur API register :", err.response?.data || err.message);
    throw err;
  }
};

// Login
export const loginUser = async (credentials: LoginData): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(`${API_URL}/login`, credentials);
    // Laravel renvoie { user: {...}, token: "..." }
    return response.data;
  } catch (err: unknown) {
    console.error("Erreur API login :", err);
    throw err;
  }
};

// Forgot password
export const forgotPassword = async (email: string) => {
  try {
    const response = await axios.post(`${API_URL}/forgot-password`, { email });
    return response.data;
  } catch (err: any) {
    console.error("Erreur API forgot password :", err.response?.data || err.message);
    throw err;
  }
};

// Reset password
export const resetPassword = async (data: ResetPasswordData) => {
  try {
    const response = await axios.post(`${API_URL}/reset-password`, data);
    return response.data;
  } catch (err: any) {
    console.error("Erreur API reset password :", err.response?.data || err.message);
    throw err;
  }
};
