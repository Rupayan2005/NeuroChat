import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const getBaseURL = () => {
  if (import.meta.env.MODE === "development") {
    return "http://localhost:5001";
  }
  return "https://neurochat-ech0.onrender.com";
};

const BASE_URL = getBaseURL();

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdartingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.error("Error checking auth:", error);

      // Clear auth state on any auth check failure
      set({ authUser: null });

      // If it's a 401, the interceptor will handle the redirect
      if (error.response?.status !== 401) {
        console.log("Auth check failed with non-401 error");
      }
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      console.log("Attempting signup...");
      const res = await axiosInstance.post("/auth/signup", data);

      // Store token in localStorage
      if (res.data.token) {
        localStorage.setItem("auth-token", res.data.token);
        console.log("Token stored after signup");
      }

      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      console.error("Signup error:", error);
      const errorMessage =
        error.response?.data?.message || "Signup failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      console.log("Attempting login...");
      const res = await axiosInstance.post("/auth/login", data);

      // Store token in localStorage
      if (res.data.token) {
        localStorage.setItem("auth-token", res.data.token);
        console.log("Token stored after login");
      }

      set({ authUser: res.data });
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();

      // Clear token from localStorage
      localStorage.removeItem("auth-token");
      localStorage.clear();
      sessionStorage.clear();

      // Force a page reload to ensure complete state reset
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout error:", error);
      // Even if logout request fails, clear local state
      set({ authUser: null });
      get().disconnectSocket();
      localStorage.removeItem("auth-token");
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/login";
    }
  },

  updateProfile: async (data) => {
    set({ isUpdartingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Update profile error:", error);
    } finally {
      set({ isUpdartingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    console.log("Connecting to socket with user ID:", authUser._id);
    const socket = io(BASE_URL, {
      query: { userId: authUser._id },
      transports: ["websocket", "polling"],
      forceNew: true,
    });

    socket.connect();
    set({ socket: socket });

    socket.on("connect", () => {
      console.log("Socket connected successfully");
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
