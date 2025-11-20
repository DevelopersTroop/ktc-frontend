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
          params: Object.entries(params)
            .filter(
              ([key]) =>
                key !== "packageId" && key !== "selectedVehicleInformation"
            )
            .reduce((acc, [key, value]) => {
              acc[key] = value;
              return acc;
            }, {} as Record<string, unknown>),
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

export const { useGetProductListQuery, useLazyGetProductListQuery, useGetProductDetailsQuery } = product;
