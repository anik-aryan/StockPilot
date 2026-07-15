import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const getInventory = () =>
  axios.get(`${API}/inventory`, {
    withCredentials: true,
  });