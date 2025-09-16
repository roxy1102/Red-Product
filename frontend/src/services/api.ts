import axios from "axios";
import { API_URL } from "../constants";

export const fetchTest = async () => {
  try {
    const response = await axios.get(`${API_URL}/test`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
