// src/utils/axios.js
import axios from "axios";
import { navigationHandler } from "./navigation";

const BASE_URL = process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: BASE_URL,
});

// Response interceptor to handle redirects
api.interceptors.response.use(
  (response) => {
    // Check if response contains redirect
    if (response.data?.redirect) {
      navigationHandler.navigate(response.data.redirect);
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem("token");
      navigationHandler.navigate("/login");
    }
    return Promise.reject(error);
  }
);

export default api;
