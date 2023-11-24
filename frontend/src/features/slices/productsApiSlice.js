import { PRODUCTS_URL } from "@/constants";
import apiSlice from "./apiSlice";
export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query({
      query: (productID) => ({
        url: PRODUCTS_URL + "/" + productID,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});
export const { useGetProductsQuery, useGetProductDetailsQuery } =
  productsApiSlice;
