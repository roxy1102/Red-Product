import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

interface RegisterData {
    name:string;
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

export const registerUser = async (userData: RegisterData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
};

export const loginUser = async (credentials: LoginData) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
};
export const forgotPassword = async (email: string) => {
  const response = await axios.post(`${API_URL}/forgot-password`, { email });
  return response.data;
};

export const resetPassword = async (data: ResetPasswordData) => {
    const response = await axios.post(`${API_URL}/reset-password`, data);
    return response.data;
}