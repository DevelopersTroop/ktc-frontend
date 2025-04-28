import { TInventoryItem } from "@//types/product";
import { TPaginatedResponse, TResponse } from "@/types/response";
import { baseApi } from "./base";

const product = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProductList: builder.query<
      TPaginatedResponse<{ products: TInventoryItem[] }>,
      any
    >({
      query: (params) => {
        return {
          url: `/products/list`,
          params,
        };
      },
      providesTags: ["Products"],
    }),
    getProductDetails: builder.query<
      TResponse<{ product: TInventoryItem }>,
      { slug: string; params: any }
    >({
      query: ({ slug, params }) => {
        return {
          url: `/products/${slug}`,
          params,
        };
      },
      providesTags: (result, error, { slug }) => [
        { type: "Products", id: slug },
      ],
    }),
  }),
});

export const { useGetProductListQuery, useGetProductDetailsQuery } = product;
