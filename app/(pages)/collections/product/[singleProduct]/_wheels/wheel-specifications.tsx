import { camelCaseToWords } from "@/app/utils/string";
import { TInventoryItem } from "@/types/product";

const wheel_specs_key = ["brand", "model"];

const filterKeyValue = (key: keyof TInventoryItem, value: string | number) => {
  if (
    wheel_specs_key.includes(key) &&
    ((typeof value === "string" && value.length > 0) ||
      (typeof value === "number" && value))
  )
    return true;
};

const WheelSpecifications = ({ product }: { product: TInventoryItem }) => {
  return (
    <div className="w-full">
      <h2 className="w-full bg-gray-500 text-center text-lg uppercase text-gray-100">
        Wheel Specs
      </h2>
      <div className="mt-2">
        <div className="flex flex-col">
          <p>
            <span className="text-lg font-medium text-gray-600">Brand: </span>{" "}
            <span className="text-base text-gray-600"> {product.brand}</span>
          </p>
          <p>
            <span className="text-lg font-medium text-gray-600">Model: </span>{" "}
            <span className="text-base text-gray-600"> {product.model}</span>
          </p>
        </div>
        {Object.entries(product).map(([key, value]) => {
          if (filterKeyValue(key as keyof TInventoryItem, value)) {
            return (
              <div key={key} className="flex items-center">
                <p>
                  <span className="text-lg font-medium text-gray-600">
                    {camelCaseToWords(key)}:{" "}
                  </span>{" "}
                  <span className="text-base text-gray-600">
                    {" "}
                    {value as string}
                  </span>
                </p>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default WheelSpecifications;
