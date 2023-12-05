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
      providesTags: ["Product"],
    }),
    createProduct: builder.mutation({
      query: () => ({
        url: PRODUCTS_URL,
        method: "POST",
      }),
      invalidatesTags: ["Product"], // For no cash
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: PRODUCTS_URL + "/" + data.productId,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});
export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
} = productsApiSlice;
