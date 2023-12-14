import { createSlice } from "@reduxjs/toolkit";
import { decryptObj, encryptObj } from "../../utils/localStorageUtils";
const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? decryptObj(localStorage.getItem("userInfo"))
    : null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, actions) => {
      // fix is admin it should be disable
      state.userInfo = actions.payload;
      localStorage.setItem("userInfo", encryptObj(state.userInfo));
    },
    // eslint-disable-next-line no-unused-vars
    logout: (state, actions) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});
export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
