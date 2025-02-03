import { TInventoryItem } from "@/app/types/product";

const WheelDescription = ({ product }: { product: TInventoryItem }) => {
  return (
    <div className="w-full">
      <h2 className="text-4xl text-gray-700 font-bold">
        {" "}
        About The {product.title?.brand}{" "}
      </h2>
      <p className="text-base text-gray-600 mt-2">{product?.description}</p>
    </div>
  );
};

export default WheelDescription;
