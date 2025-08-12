import axios from "axios";

// const getBaseURL = () => {
//   if (import.meta.env.MODE === "development") {
//     return "http://localhost:5001/api";
//   }
//   return "https://neurochat-ech0.onrender.com/api";
// };
export const axiosInstance = axios.create({
  baseURL: "https://neurochat-ech0.onrender.com/api",
  withCredentials: true,
});

// Add request interceptor to include token in Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle 401 errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth state on 401 errors
      localStorage.removeItem("auth-token");
      localStorage.clear();
      sessionStorage.clear();

      // Redirect to login page
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
