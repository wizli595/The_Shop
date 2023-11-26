import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "@/features/slices/apiSlice";
import cartSliceReducer from "@/features/slices/cartSlice";
import authSliceReducer from "@/features/slices/authSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
    auth: authSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
export default store;
