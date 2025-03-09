import { TInventoryItem } from "@/types/product";
import Breadcrumb from "@/app/ui/breadcrumb/breadcrumb";
import Item from "@/app/ui/breadcrumb/item";
import ImageGallery from "../image-gallery";
import AccessoryDescription from "./accessory-description";
import AccessoryDetails from "./accessory-details";
import AccessorySpecifications from "./accessory-specifications";
import AccessoryTitle from "./accessory-title";
import ActionButtons from "./action-buttons";
import AccessoryProvider from "./context/AccessoryProvider";

const Accessory = ({ product }: { product: TInventoryItem }) => {
  return (
    <AccessoryProvider>
      <Breadcrumb>
        <Item href={"/"}>Home</Item>
        <Item href={"/collections/product-category/accessories"}>
          Collection
        </Item>
        <Item href={"/collections/product-category/accessories"}>
          Accessories
        </Item>
        <Item href={`/collections/product/${product.slug}`}>
          {product?.brand}
        </Item>
      </Breadcrumb>
      <div className="w-full flex flex-col gap-4 mt-4 lg:border sm:p-4">
        <AccessoryTitle product={product} />
        <div className="flex flex-col lg:flex-row gap-4">
          {/* image gallery */}
          <div className="w-full">
            <div>
              <ImageGallery product={product} />
            </div>
            <div className="hidden lg:block mt-4">
              <AccessorySpecifications product={product} />
            </div>

            <div className="hidden lg:block mt-4">
              <AccessoryDescription product={product} />
            </div>
          </div>
          {/* product details */}
          <div className="max-w-[330px] mx-auto p-2 flex flex-col gap-4">
            <AccessoryDetails product={product} />
            <div>
              <ActionButtons product={product} />
            </div>
          </div>
        </div>

        <div className="lg:hidden">
          <AccessorySpecifications product={product} />
        </div>

        <div className="mt-4 lg:hidden">
          <AccessoryDescription product={product} />
        </div>
      </div>
    </AccessoryProvider>
  );
};

export default Accessory;
