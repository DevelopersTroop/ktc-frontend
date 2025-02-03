import { TInventoryItem } from "@/app/types/product";
import Breadcrumb from "@/app/ui/breadcrumb/breadcrumb";
import Item from "@/app/ui/breadcrumb/item";
import ImageGallery from "../image-gallery";
import ActionButtons from "./action-buttons";
import WheelDescription from "./wheel-description";
import WheelSpecifications from "./wheel-specifications";
import WheelDetails from "./wheels-details";
import WheelsTitle from "./wheels-title";

const Wheels = ({ product }: { product: TInventoryItem }) => {
  return (
    <>
      <Breadcrumb>
        <Item href={"/"}>Home</Item>
        <Item href={"/collections/product-category/wheels"}>Collection</Item>
        <Item href={"/collections/product-category/wheels"}>Wheels</Item>
        <Item href={`/collections/product/${product.slug}`}>
          {product.title?.brand}
        </Item>
      </Breadcrumb>
      <div className="w-full flex flex-col gap-4 mt-4 lg:border sm:p-4">
        <WheelsTitle product={product} />
        <div className="flex flex-col lg:flex-row gap-4">
          {/* image gallery */}
          <div className="w-full">
            <div>
              <ImageGallery product={product} />
            </div>
            <div className="hidden lg:block mt-4">
              <WheelSpecifications product={product} />
            </div>
          </div>
          {/* product details */}
          <div className="max-w-[330px] mx-auto p-2 flex flex-col gap-4">
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
    </>
  );
};

export default Wheels;
