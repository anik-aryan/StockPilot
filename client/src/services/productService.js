import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const getProducts = () =>
  axios.get(`${API}/products`, {
    withCredentials: true,
  });