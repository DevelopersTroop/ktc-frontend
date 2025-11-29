import { TResponse } from "@/types/response";
import { baseApi } from "./base";
import { IPromoBar } from "@/types/promo";

const promo = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPromo: builder.query<
      TResponse<{
        promoBar: IPromoBar;
      }>,
      string
    >({
      query: (arg) => ({
        url: `/promo/active/${arg}`,
      }),
    }),
  }),
});

export const { useGetPromoQuery } = promo;
