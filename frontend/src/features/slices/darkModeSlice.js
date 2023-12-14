import { createSlice } from "@reduxjs/toolkit";
const initialState = localStorage.getItem("theme")
  ? JSON.parse(localStorage.getItem("theme"))
  : { theme: "light" };
const darkModeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    darkMode: (state, action) => {
      return (state.theme = action.payload);
    },
    lightMode: (state, action) => {
      return (state.theme = action.payload);
    },
  },
});
export const { darkMode, lightMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
