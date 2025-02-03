import { TInventoryItem } from "@/app/types/product";
import { FaStar } from "react-icons/fa6";

const SuspensionTitle = ({ product }: { product: TInventoryItem }) => {
  return (
    <div className="flex flex-col">
      <div>
        <p className="text-2xl font-semibold text-gray-700">
          {product.title?.subtitle}
        </p>
      </div>
      <div className="flex gap-4 items-center">
        <div className="flex text-sm gap-0.5">
          <FaStar className="text-gray-400" />
          <FaStar className="text-gray-400" />
          <FaStar className="text-gray-400" />
          <FaStar className="text-gray-400" />
          <FaStar className="text-gray-400" />
        </div>
        <div className="text-sm text-primary">
          Be the first to review this product
        </div>
      </div>
    </div>
  );
};

export default SuspensionTitle;
