import { useTypedSelector } from "@/app/globalRedux/store";
import { customFetch } from "@/lib/common-fetch";
import { TInventoryItem } from "@/types/product";
import { toast } from "sonner";
import useAuth from "./useAuth";

export const useWishlist =()=>{
  const {user}= useAuth()
  const {products}=useTypedSelector(state=>state.persisted.cart)

  const saveToLater = async (product:TInventoryItem) => {
      try {
        if (!user) {
          toast.error('You must be logged in to save to wishlist.');
          return;
        }
        await customFetch(`wishlists`,'POST', {
          headers: {
            "Authorization": `Bearer ${user.accessToken}`,
          },
          body:{
            slug: product?.slug,
            data: {
              title: product?.title,
              category: product?.category,
              thumbnail: product?.thumbnail,
              slug:product?.slug
            },
          }
        });
       toast.success('Saved to wishlist')

      } catch {
        toast.error('Failed to save to wishlist.');
      }
    }

  const saveAllProductFromCart=()=>{
    if(!Object.values(products).length){
      toast.error('No product found at cart')
    }
    Promise.all(Object.values(products).map(async product=>{
      await saveToLater(product)
    }))
  }

  return {
    saveToLater,
    saveAllProductFromCart
  }
}
