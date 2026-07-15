import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const getMovementHistory = () =>
  axios.get(`${API}/stock/history`, {
    withCredentials: true,
  });