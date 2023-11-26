import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, actions) => {
      state.userInfo = actions.payload;
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    },
  },
});
export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;
