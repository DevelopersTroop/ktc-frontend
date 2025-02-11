import {
  fetchWheelFailure,
  fetchWheelStart,
  fetchWheelSuccess,
} from "@/app/globalRedux/features/wheel";
import { AppDispatch, RootState } from "@/app/globalRedux/store";
import { TInventoryItem } from "@/app/types/product";
import { IApiRes } from "@/app/types/redux-helper";
import { customFetch } from "@/lib/common-fetch";

export const fetchWheelData = async (
  dispatch: AppDispatch,
  { minPrice, maxPrice, ...filters }: RootState["wheel"]["filters"]
) => {
  dispatch(fetchWheelStart());

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
    console.log(filters);

    const response = await customFetch<IApiRes<TInventoryItem[], "products">>(
      "products/list",
      "POST",
      {
        body: {
          ...filters,
          ...price,
        },
      }
    );
    dispatch(fetchWheelSuccess(response.data));
  } catch (error: any) {
    dispatch(fetchWheelFailure(error.message));
  }
};
