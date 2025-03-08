import {
    fetchWheelFailure,
    fetchWheelStart,
    fetchWheelSuccess,
} from "@/app/globalRedux/features/wheel";
import { AppDispatch, RootState } from "@/app/globalRedux/store";
import { customFetch } from "@/lib/common-fetch";
import { TInventoryItem } from "@/types/product";
import { IApiRes } from "@/types/redux-helper";

export const fetchWheelData = async (
  dispatch: AppDispatch,
  { minPrice, maxPrice, ...filters }: RootState["wheel"]["filters"],
  page:number
) => {
  dispatch(fetchWheelStart());

  const shouldArray = ['brand','model','color','diameter']

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

    const obj:Record<string,string[]|number[]|string|number|object> ={}

    Object.entries(filters).forEach(function([key,value]){
      if(shouldArray.includes(key) && key !=='sort' && typeof value !=='object'){
        obj[key] = value.split(',').map((brand:string)=>brand.trim());
      }else{
        obj[key] = value;
      }
    })


    const response = await customFetch<IApiRes<{products:TInventoryItem[]}>>(
      "products/list",
      "POST",
      {
        body: {
          ...obj,
          ...price,
          page,
          category:'wheels',
          size:12
        },
      }
    );
    dispatch(fetchWheelSuccess(response.data));
  } catch (error: any) {
    dispatch(fetchWheelFailure(error.message));
  }
};
