import axios from "axios";

// Determine the base URL based on environment
const getBaseURL = () => {
  if (import.meta.env.MODE === "development") {
    return "http://localhost:5001/api";
  }
  return "https://neurochat-ech0.onrender.com/api";
};

export const axiosInstance = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
});
