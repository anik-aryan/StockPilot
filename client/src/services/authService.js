import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const login = (data) =>
  axios.post(`${API}/auth/login`, data, {
    withCredentials: true,
  });

export const logout = () =>
  axios.post(
    `${API}/auth/logout`,
    {},
    {
      withCredentials: true,
    }
  );

export const getCurrentUser = () =>
  axios.get(`${API}/auth/me`, {
    withCredentials: true,
  });