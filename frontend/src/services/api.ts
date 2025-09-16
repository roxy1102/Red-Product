import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchTest = async () => {
  try {
    const response = await axios.get(`${API_URL}/test`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
