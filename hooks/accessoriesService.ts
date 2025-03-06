import { fetchAccessoriesFailure, fetchAccessoriesStart, fetchAccessoriesSuccess } from "@/app/globalRedux/features/accessories";
import { AppDispatch, RootState } from "@/app/globalRedux/store";
import { customFetch } from "@/lib/common-fetch";
import { TInventoryItem } from "@/types/product";
import { IApiRes } from "@/types/redux-helper";

export const fetchAccessoriesData = async (
  dispatch: AppDispatch,
  { minPrice, maxPrice, ...filters }: RootState["accessories"]["filters"],
  page:number
) => {
  dispatch(fetchAccessoriesStart());

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
          category:'accessories'
        },
      }
    );
    dispatch(fetchAccessoriesSuccess(response.data));
  } catch (error: any) {
    dispatch(fetchAccessoriesFailure(error.message));
  }
};
