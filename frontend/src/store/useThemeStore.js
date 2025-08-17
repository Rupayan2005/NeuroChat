import { create } from "zustand";

// Function to safely get theme from localStorage
const getStoredTheme = () => {
  try {
    return localStorage.getItem("chat-theme") || "coffee";
  } catch {
    return "coffee";
  }
};

// Function to safely set theme to localStorage
const setStoredTheme = (theme) => {
  try {
    localStorage.setItem("chat-theme", theme);
  } catch (error) {
    console.warn("Could not save theme to localStorage:", error);
  }
};

export const useThemeStore = create((set, get) => ({
  theme: getStoredTheme(),
  setTheme: (theme) => {
    setStoredTheme(theme);
    set({ theme });
    // Apply theme immediately to document
    document.documentElement.setAttribute("data-theme", theme);
  },
  // Initialize theme on store creation
  initializeTheme: () => {
    const theme = get().theme;
    document.documentElement.setAttribute("data-theme", theme);
  },
}));
