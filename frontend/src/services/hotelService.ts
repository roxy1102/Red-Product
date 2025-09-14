import axios from 'axios';
import type { Hotel } from '../interfaces/hotel';

const API_URL = 'http://127.0.0.1:8000/api';

const getToken = () => localStorage.getItem('authToken');

export const getHotels = async (): Promise<Hotel[]> => {
  const response = await axios.get(`${API_URL}/hotels`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return response.data as Hotel[];
};

export const getUserHotels = async (): Promise<Hotel[]> => {
  const response = await axios.get(`${API_URL}/user/hotels`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return response.data as Hotel[];
};

// Ajouter un hôtel
export const createHotel = async (hotelData: FormData): Promise<Hotel> => {
  const response = await axios.post(`${API_URL}/hotels`, hotelData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data as Hotel;
};

// Mettre à jour un hôtel
export const updateHotel = async (id: number, hotelData: FormData): Promise<Hotel> => {
  hotelData.append('_method', 'PUT'); // Indique à Laravel que c'est une requête PUT
  const response = await axios.post(`${API_URL}/hotels/${id}`, hotelData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data as Hotel;
};

// Supprimer un hôtel
export const deleteHotel = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/hotels/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};