import { TInventoryItem } from "@/app/types/product";
import { camelCaseToWords } from "@/app/utils/string";

const TireSpecifications = ({ product }: { product: TInventoryItem }) => {
  return (
    <div className="w-full">
      <h2 className="w-full uppercase text-lg bg-gray-500 text-gray-100 text-center">
        Tire Specs
      </h2>
      <div className="mt-2">
        <div className="flex flex-col">
          <p>
            <span className=" font-medium text-gray-600 text-lg">Brand: </span>{" "}
            <span className="text-gray-600 text-base">
              {" "}
              {product.title?.brand}
            </span>
          </p>
          <p>
            <span className=" font-medium text-gray-600 text-lg">Model: </span>{" "}
            <span className="text-gray-600 text-base">
              {" "}
              {product.title?.model}
            </span>
          </p>
        </div>
        {Object.entries(product.specifications || {}).map(([key, value]) => (
          <div key={key} className="flex items-center">
            <p>
              <span className=" font-medium text-gray-600 text-lg">
                {camelCaseToWords(key)}:{" "}
              </span>{" "}
              <span className="text-gray-600 text-base"> {value}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TireSpecifications;
