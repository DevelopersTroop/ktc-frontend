import { ProductRating } from "@/components/shared/reviews/ProductRating";
import { TInventoryItem } from "@/types/product";
import { FaStar } from "react-icons/fa6";

const TireTitle = ({ product }: { product: TInventoryItem }) => {
  return (
    <div className="flex flex-col">
      <div>
        <p className="text-2xl font-semibold text-gray-800">
          {product.title} {""}
          {product.brand} <br />{" "}
          <span className="text-lg">{product?.size}</span>
        </p>
      </div>
      <ProductRating productId={product._id}/>
    </div>
  );
};

export default TireTitle;
