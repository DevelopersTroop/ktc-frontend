import { TInventoryItem } from "@/types/product";
import Breadcrumb from "@/app/ui/breadcrumb/breadcrumb";
import Item from "@/app/ui/breadcrumb/item";
import ImageGallery from "../image-gallery";
import ActionButtons from "./action-buttons";
import SuspensionDescription from "./suspension-description";
import SuspensionDetails from "./suspension-details";
import SuspensionSpecifications from "./suspension-specifications";
import SuspensionTitle from "./suspension-title";
import { Reviews } from "@/components/shared/reviews/Reviews";

const Suspension = ({ product }: { product: TInventoryItem }) => {
  return (
    <>
      <Breadcrumb>
        <Item href={"/"}>Home</Item>
        <Item href={"/collections/product-category/suspension"}>
          Collection
        </Item>
        <Item href={"/collections/product-category/suspension"}>
          Suspension
        </Item>
        <Item href={`/collections/product/${product.slug}`}>
          {product?.sku}
        </Item>
      </Breadcrumb>
      <div className="w-full flex flex-col gap-4 mt-4 lg:border sm:p-4">
        <SuspensionTitle product={product} />
        <div className="flex flex-col lg:flex-row gap-4">
          {/* image gallery */}
          <div className="w-full">
            <div>
              <ImageGallery product={product} fallbackImage="/not-available.webp" />
            </div>
            <div className="hidden lg:block mt-4">
              <SuspensionSpecifications product={product} />
            </div>

            <div className="hidden lg:block mt-4">
              <SuspensionDescription product={product} />
            </div>
            <div className="hidden lg:block mt-4">
              <Reviews productId={product._id} />
            </div>
          </div>
          {/* product details */}
          <div className="max-w-[330px] mx-auto p-2 flex flex-col gap-4">
            <SuspensionDetails product={product} />
            <div>
              <ActionButtons product={product} />
            </div>
          </div>
        </div>

        <div className="lg:hidden">
          <SuspensionSpecifications product={product} />
        </div>

        <div className="mt-4 lg:hidden">
          <SuspensionDescription product={product} />
        </div>
        <div className="mt-4 lg:hidden">
          <Reviews productId={product._id} />
        </div>
      </div>
    </>
  );
};

export default Suspension;
