import { TInventoryItem } from "@/app/types/product";
import { FaStar } from "react-icons/fa6";

const TireTitle = ({ product }: { product: TInventoryItem }) => {
  return (
    <div className="flex flex-col">
      <div>
        <p className="text-2xl font-semibold text-gray-800">
          {product.title?.brand} {""}
          {product.title?.model} <br />{" "}
          <span className="text-lg">{product.title?.size}</span>
        </p>
      </div>
      <div className="flex gap-4 items-center">
        <div className="flex text-lg gap-0.5">
          <FaStar className="text-yellow-400" />
          <FaStar className="text-yellow-400" />
          <FaStar className="text-yellow-400" />
          <FaStar className="text-yellow-400" />
          <FaStar className="text-yellow-400" />
        </div>
        <div className="text-base text-primary">1 Ratings</div>
      </div>
    </div>
  );
};

export default TireTitle;
