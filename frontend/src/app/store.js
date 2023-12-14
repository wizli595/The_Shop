import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "@/features/slices/apiSlice";
import cartSliceReducer from "@/features/slices/cartSlice";
import authSliceReducer from "@/features/slices/authSlice";
import darkModeSlice from "../features/slices/darkModeSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
    auth: authSliceReducer,
    theme: darkModeSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
export default store;
