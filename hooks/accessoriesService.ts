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

  const shouldArray = ['brand','model','color','diameter','load_index','width']
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

    console.log("Filter page",obj)

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
          ...price,
          page,
          category:'accessories',

          size:12
        },
      }
    );
    dispatch(fetchAccessoriesSuccess(response.data));
  } catch (error: any) {
    dispatch(fetchAccessoriesFailure(error.message));
  }
};
