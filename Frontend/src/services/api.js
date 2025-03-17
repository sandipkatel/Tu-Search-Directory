import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000/api";

export const api = {
  get: (endpoint) => axios.get(`${BASE_URL}/${endpoint}`),
  post: (endpoint, data) => axios.post(`${BASE_URL}/${endpoint}`, data),
  put: (endpoint, data) => axios.put(`${BASE_URL}/${endpoint}`, data),
  delete: (endpoint) => axios.delete(`${BASE_URL}/${endpoint}`),
};
