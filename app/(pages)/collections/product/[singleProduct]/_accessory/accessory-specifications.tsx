import { TInventoryItem } from "@/types/product";

const AccessorySpecifications = ({ product }: { product: TInventoryItem }) => {
  console.log(product);
  return (
    <div className="w-full">
      <h2 className="w-full uppercase text-lg bg-gray-500 text-gray-100 text-center">
        Part Number
      </h2>
      <div className="mt-2">
        <p className="text-base text-gray-600">
          {/* {product?.specifications?.partNumber} */}
          {product?.manufacturer_part_number}
        </p>
      </div>
    </div>
  );
};

export default AccessorySpecifications;
