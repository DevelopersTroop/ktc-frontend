import {
    fetchTireFailure,
    fetchTireStart,
    fetchTireSuccess,
} from "@/app/globalRedux/features/tire";
import { AppDispatch, RootState } from "@/app/globalRedux/store";
import { customFetch } from "@/lib/common-fetch";
import { TInventoryItem } from "@/types/product";
import { IApiRes } from "@/types/redux-helper";

export const fetchTireData = async (
  dispatch: AppDispatch,
  { minPrice, maxPrice, ...filters }: RootState["tire"]["filters"],
  page:number
) => {
  dispatch(fetchTireStart());

  try {
    const price =
      minPrice !== undefined || maxPrice !== undefined
        ? {
            ...(minPrice !== undefined && {
              minPrice: parseInt(minPrice.toString(), 10),
            }),
            ...(maxPrice !== undefined && {
              maxPrice: parseInt(maxPrice.toString(), 10),
            }),
          }
        : {};

    const response = await customFetch<IApiRes<{products:TInventoryItem[]}>>(
      "products/list",
      "POST",
      {
        body: {
          ...filters,
          ...price,
          page,
          category:'tires',
          size:12
        },
      }
    );
    dispatch(fetchTireSuccess(response.data));
  } catch (error: any) {
    dispatch(fetchTireFailure(error.message));
  }
};
