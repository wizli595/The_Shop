import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../../utils/cartUtils";
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((e) => e._id === item._id);
      existItem
        ? (state.cartItems = state.cartItems.map((e) =>
            e._id === existItem._id ? item : e
          ))
        : (state.cartItems = [...state.cartItems, item]);
      /////
      // NOTE :: add additional stuff to the cart state
      /////
      return updateCart(state);
    },
  },
});
export default cartSlice.reducer;
export const { addToCart } = cartSlice.actions;
