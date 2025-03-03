import { TInventoryItem } from "@/types/product";

const AccessoryTitle = ({ product }: { product: TInventoryItem }) => {
  return (
    <div className="flex flex-col">
      <div>
        <p className="text-2xl font-semibold text-gray-700">
          {product.title?.subtitle}
        </p>
      </div>
    </div>
  );
};

export default AccessoryTitle;
