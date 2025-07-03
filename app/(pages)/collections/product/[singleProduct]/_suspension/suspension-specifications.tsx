import { TInventoryItem } from "@/types/product";

const SuspensionSpecifications = ({ product }: { product: TInventoryItem }) => {
  console.log(product);
  return (
    <div className="w-full">
      <h2 className="w-full uppercase text-lg bg-gray-500 text-gray-100 text-center">
        Part Number
      </h2>
      <div className="mt-2">
        <p className="text-base text-gray-600">
          {/* {product.specifications?.partNumber} */}
          1234567
        </p>
      </div>
    </div>
  );
};

export default SuspensionSpecifications;
