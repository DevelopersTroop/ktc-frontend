import { TInventoryItem } from "@/types/product";
import { camelCaseToWords } from "@/app/utils/string";

const filterKeyValue = (key: string, value: any) => {
  if (key === "brand" || key === "model" || Array.isArray(value) || value === null || typeof value === "object" || key === '_id' || key === 'thumbnail' || key === 'price' || key === 'stockQuantity' || key === 'title' || key === 'isDelete' || key === 'createdAt' || key === 'updatedAt' || key === 'slug') return true
}

const WheelSpecifications = ({ product }: { product: TInventoryItem }) => {
  return (
    <div className="w-full">
      <h2 className="w-full uppercase text-lg bg-gray-500 text-gray-100 text-center">
        Wheel Specs
      </h2>
      <div className="mt-2">
        <div className="flex flex-col">
          <p>
            <span className=" font-medium text-gray-600 text-lg">Brand: </span>{" "}
            <span className="text-gray-600 text-base">
              {" "}
              {product.brand}
            </span>
          </p>
          <p>
            <span className=" font-medium text-gray-600 text-lg">Model: </span>{" "}
            <span className="text-gray-600 text-base">
              {" "}
              {product.model}
            </span>
          </p>
        </div>
        {Object.entries(product || {}).map(([key, value]) => {
          if (filterKeyValue(key, value)) return null
          return (
            <div key={key} className="flex items-center">
              <p>
                <span className=" font-medium text-gray-600 text-lg">
                  {camelCaseToWords(key)}:{" "}
                </span>{" "}
                <span className="text-gray-600 text-base"> {value}</span>
              </p>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default WheelSpecifications;
