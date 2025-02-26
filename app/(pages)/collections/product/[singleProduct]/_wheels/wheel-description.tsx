import { TInventoryItem } from "@/types/product";

const WheelDescription = ({ product }: { product: TInventoryItem }) => {
  return (
    <div className="w-full">
      <h2 className="text-4xl font-bold text-gray-700">
        {" "}
        About The {product.title?.brand}{" "}
      </h2>
      <p className="mt-2 text-base text-gray-600">{product?.description}</p>
    </div>
  );
};

export default WheelDescription;
