import { TInventoryItem } from "@/types/product";

const WheelDescription = ({ product }: { product: TInventoryItem }) => {
  return (
    <div className="w-full">
      <h2 className="text-4xl font-bold text-gray-700">
        {" "}
        About The {product.brand}{" "}
      </h2>
      <p className="mt-2 text-base text-gray-600">{product?.product_desc}</p>
    </div>
  );
};

export default WheelDescription;
