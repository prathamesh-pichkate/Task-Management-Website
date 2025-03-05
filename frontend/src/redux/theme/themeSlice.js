import { createSlice } from "@reduxjs/toolkit";

const storedTheme = localStorage.getItem("theme") || "light";

const initialState = {
  theme: storedTheme,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.theme); // Persist theme in localStorage
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
