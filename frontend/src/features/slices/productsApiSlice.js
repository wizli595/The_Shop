import { PRODUCTS_URL } from "@/constants";
import apiSlice from "./apiSlice";
import { UPLOAD_URL } from "../constants";
export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ keyword, pageNumber, category }) => ({
        url: PRODUCTS_URL,
        params: {
          keyword,
          pageNumber,
          category,
        },
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
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: UPLOAD_URL,
        method: "POST",
        body: data,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: PRODUCTS_URL + "/" + productId,
        method: "DELETE",
      }),
      providesTags: ["Product"],
    }),
    createProductReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.id}/reviews`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    getTopProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL + "/top",
      }),
    }),
    getCatgories: builder.query({
      query: () => ({
        url: PRODUCTS_URL + "/category",
      }),
    }),
  }),
});
export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useCreateProductReviewMutation,
  useGetTopProductsQuery,
  useGetCatgoriesQuery,
} = productsApiSlice;
