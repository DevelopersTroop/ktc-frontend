"use client";

import { useTypedSelector } from "@/app/globalRedux/store";
import { redirect, useSearchParams } from "next/navigation";
import TireCard from "../collections/product-category/[categorySlug]/_tire/tire-card";
import ProductCard from "../collections/product-category/[categorySlug]/_wheels/product-card";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/app/globalRedux/features/cart/cart-slice";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { CartData } from "../collections/product/[singleProduct]/_wheels/normal-action";

export default function Page() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const packages = useTypedSelector((state) => state.persisted.package);

  const packageData = packages[searchParams.get("cartPackage") as string];
  if (!packageData.wheel || !packageData.tire) return null;

  const handleAddToCart = () => {
    new Promise<boolean>((resolve, reject) => {
      try {
        if (!packageData.wheel || !packageData.tire) return;
        dispatch(
          addToCart({
            product: {
              ...packageData.wheel,
              cartSerial: uuidv4(),
              quantity: 1,
            } as any,
          })
        );
        dispatch(
          addToCart({
            product: {
              ...packageData.tire,
              cartSerial: uuidv4(),
              quantity: 1,
            } as any,
          })
        );
        resolve(true);
      } catch (error) {
        reject(error);
      }
    }).then((res) => {
      if (res) {
        redirect("/cart");
      }
    });
  };
  return (
    <div className="max-w-3xl mx-auto py-10 space-y-4 flex flex-col items-center">
      <div className="flex gap-4 justify-center">
        <ProductCard product={packageData.wheel as any} />
        <TireCard product={packageData.tire as any} />
      </div>
      <Button onClick={handleAddToCart}>Add to cart this package</Button>
    </div>
  );
}
