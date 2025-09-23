// src/utils/axiosInstance.js
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Request interceptor to attach token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // get token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
