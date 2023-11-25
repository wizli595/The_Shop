export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};
export const updateCart = (state) => {
  // Calcul items price
  state.itemsPrice = state.cartItems.reduce(
    (acc, curr) => acc + curr.price * curr.qty,
    0
  );
  //   Calcul shipping price (policie)
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
  //   Calcul tax price
  state.taxPrice = addDecimals(Number((0.5 * state.itemsPrice).toFixed(2)));
  //    Calcul the total price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);
  localStorage.setItem("cart", JSON.stringify(state));
  return state;
};
