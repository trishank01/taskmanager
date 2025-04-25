/* eslint-disable no-unused-vars */
import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "Application/json",
    Accept: "Application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response?.status;
    if (status === 401) window.location.href = "/login";
    if (status === 500) console.error("Server error. Try later.");
    if (error.code === "ECONNABORTED") console.error("Request timed out.");
    return Promise.reject(error);
  }
);

export default axiosInstance;
