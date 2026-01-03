"use client";

import { addToCart } from "@/app/globalRedux/features/cart/cart-slice";
import { useTypedSelector } from "@/app/globalRedux/store";
import { getPrice } from "@/app/utils/price";
import { Button } from "@/components/ui/button";
import { getProductImage } from "@/lib/utils";
import { redirect, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import TireSpecifications from "../collections/product/[singleProduct]/_tire/tire-specifications";
import WheelSpecifications from "../collections/product/[singleProduct]/_wheels/wheel-specifications";
import PackageDetails from "./package-details";
import { Ymm } from "./ymm";

export default function WheelTirePackage() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const packages = useTypedSelector((state) => state.persisted.package);

  const packageData = packages[searchParams.get("cartPackage") as string];
  if (!packageData?.wheel || !packageData?.tire) return null;

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
    <div className="max-w-7xl mx-auto  py-10">
      <h2 className="text-left text-3xl font-semibold mb-8">
        Wheel & Tire Package
      </h2>
      <div className="grid grid-cols-12 gap-10">
        <div className=" col-span-12 lg:col-span-8 flex flex-col gap-y-8">
          <div className="flex flex-col md:flex-row gap-4 ">
            <div>
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl flex gap-2">
                  <span className="font-bold">
                    {packageData.wheel.brand_desc}
                  </span>
                  <span>{packageData.wheel.model}</span>
                </h3>

                <h4 className="text-xl flex gap-2">
                  <span>{packageData.wheel.color}</span>
                  <span className="font-bold">
                    {packageData.wheel.diameter}x{packageData.wheel.width}
                  </span>
                  <span className="font-bold">{packageData.wheel.offset}</span>
                </h4>
                <h2 className="text-3xl font-bold text-primary">
                  ${getPrice(packageData.wheel.msrp, packageData.wheel.price)}
                </h2>
              </div>
              <img
                className={"d-block  rounded-xl object-cover max-w-[350px]"}
                alt="product image"
                src={getProductImage(false, packageData.wheel)}
              ></img>
              <WheelSpecifications product={packageData.wheel} />
            </div>
            <div>
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl flex gap-2">
                  <span className="font-bold">
                    {packageData.tire.brand_desc}
                  </span>
                  <span>{packageData.tire.model}</span>
                </h3>

                <h4 className="text-xl flex gap-2">
                  <span>{packageData.tire.color}</span>
                  <span className="font-bold">
                    {packageData.tire.diameter}x{packageData.tire.width}
                  </span>
                  {/* <span className="font-bold">
                  (Load{packageData.tire.loadRating})
                </span> */}
                </h4>
                <h2 className="text-3xl font-bold text-primary">
                  ${getPrice(packageData.tire.msrp, packageData.tire.price)}
                </h2>
              </div>
              <img
                className={
                  "d-block mx-auto rounded-xl object-cover max-w-[350px]"
                }
                alt="product image"
                src={getProductImage(false, packageData.tire)}
              ></img>
              <TireSpecifications product={packageData.tire} />
            </div>
          </div>
          {packageData.wheel.product_desc && (
            <div>
              <h2 className="text-2xl font-semibold">
                About The {packageData.wheel.brand} {packageData.wheel.model}
              </h2>
              <p>{packageData.wheel.product_desc}</p>
            </div>
          )}

          {packageData.tire.product_desc && (
            <div>
              <h2 className="text-2xl font-semibold">
                About The {packageData.tire.brand} {packageData.tire.model}
              </h2>
              <p>{packageData.tire.product_desc}</p>
            </div>
          )}
        </div>
        <div className=" col-span-12 lg:col-span-4 flex flex-col w-full">
          <div className="mx-auto flex flex-col gap-4 p-2">
            <PackageDetails wheel={packageData.wheel} tire={packageData.tire} />
          </div>
          <div className="mb-4">
            <Ymm wheel={packageData.wheel} tire={packageData.tire} />
          </div>
          <Button className="w-full h-12" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
