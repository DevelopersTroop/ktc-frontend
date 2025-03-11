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
  const shouldArray = ['brand','model','color','diameter','rim_diameter','width','load_index']
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
      }
      else if(key === 'sort' && typeof value === 'string'){
        obj[key]=[
          {
            whom: value.split(',')[0],
            order: value.split(',')[1]
          }
        ]
      }
      else{
        obj[key] = value;
      }
    })

    const response = await customFetch<IApiRes<{products:TInventoryItem[]}>>(
      "products/list",
      "POST",
      {
        body: {
          sort: [{
     whom: "msrp",
     order: "desc"
   }],
          ...obj,
          maxPrice:price.maxPrice?Math.round(price.maxPrice/4):price.maxPrice,
          minPrice:price.minPrice?Math.round(price.minPrice/4):price.minPrice,
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
