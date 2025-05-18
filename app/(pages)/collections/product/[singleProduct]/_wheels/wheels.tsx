"use client";
import Breadcrumb from "@/app/ui/breadcrumb/breadcrumb";
import Item from "@/app/ui/breadcrumb/item";
import { TInventoryItem } from "@/types/product";
import ImageGallery from "../image-gallery";
import ActionButtons from "./action-buttons";
import WheelProvider from "./context/WheelProvider";
import WheelDescription from "./wheel-description";
import WheelSpecifications from "./wheel-specifications";
import WheelDetails from "./wheels-details";
import WheelsTitle from "./wheels-title";

const Wheels = ({ product }: { product: TInventoryItem }) => {
  return (
    <WheelProvider>
      <Breadcrumb>
        <Item href={"/"}>Home</Item>
        <Item href={"/collections/product-category/wheels"}>Collection</Item>
        <Item href={"/collections/product-category/wheels"}>Wheels</Item>
        <Item href={`/collections/product/${product?.slug}`}>
          {product?.sku}
        </Item>
      </Breadcrumb>
      <div className="mt-4 flex w-full flex-col gap-4 sm:p-4 lg:border">
        <WheelsTitle product={product} />
        <div className="flex flex-col gap-4 lg:flex-row">
          {/* image gallery */}
          <div className="w-full">
            <div>
              <ImageGallery product={product} />
            </div>
            <div className="mt-4 hidden lg:block">
              <WheelSpecifications product={product} />
            </div>
          </div>
          {/* product details */}
          <div className="mx-auto flex max-w-[330px] flex-col gap-4 p-2">
            <WheelDetails product={product} />
            <div>
              <ActionButtons product={product} />
            </div>
          </div>
        </div>

        <div className="lg:hidden">
          <WheelSpecifications product={product} />
        </div>

        <div className="mt-4">
          <WheelDescription product={product} />
        </div>
      </div>
    </WheelProvider>
  );
};

export default Wheels;
