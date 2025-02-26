import { TInventoryItem } from "@/types/product";
import Breadcrumb from "@/app/ui/breadcrumb/breadcrumb";
import Item from "@/app/ui/breadcrumb/item";
import ImageGallery from "../image-gallery";
import ActionButtons from "./action-buttons";
import TireDescription from "./tire-description";
import TireDetails from "./tire-details";
import TireSpecifications from "./tire-specifications";
import TireTitle from "./tire-title";

export const step = 4;
export const duallyStep = 6;

const Tire = ({ product }: { product: TInventoryItem }) => {
  return (
    <>
      <Breadcrumb>
        <Item href={"/"}>Home</Item>
        <Item href={"/collections/product-category/tires"}>Collection</Item>
        <Item href={"/collections/product-category/tires"}>Tire</Item>
        <Item href={`/collections/product/${product.slug}`}>
          {product.title?.brand}
        </Item>
      </Breadcrumb>
      <div className="w-full flex flex-col gap-4 mt-4 lg:border sm:p-4">
        <TireTitle product={product} />
        <div className="flex flex-col lg:flex-row gap-4">
          {/* image gallery */}
          <div className="w-full">
            <div>
              <ImageGallery product={product} />
            </div>
            <div className="hidden lg:block mt-4">
              <TireSpecifications product={product} />
            </div>
          </div>
          {/* product details */}
          <div className="max-w-[330px] mx-auto p-2 flex flex-col gap-4">
            <TireDetails product={product} />
            <div>
              <ActionButtons product={product} />
            </div>
          </div>
        </div>

        <div className="lg:hidden">
          <TireSpecifications product={product} />
        </div>

        <div className="mt-4">
          <TireDescription product={product} />
        </div>
      </div>
    </>
  );
};

export default Tire;
