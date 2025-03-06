import { camelCaseToWords } from "@/app/utils/string";
import { TInventoryItem } from "@/types/product";

const accessories_specs_key: keyof TInventoryItem[] = [
  "brand_cd",
  "upc",
];

const filterKeyValue = (key: keyof TInventoryItem, value: string | number) => {
  if (accessories_specs_key.includes(key)) return true;
};

const AccessoryDescription = ({ product }: { product: TInventoryItem }) => {
  return (
    <div className="w-full flex flex-col gap-5">
      <div>
        <h2 className="w-full uppercase text-lg bg-gray-500 text-gray-100 text-center">
          Details
        </h2>
        <p className="text-base text-gray-600 mt-2">{product?.description}</p>
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

      {/* <div>
        <h2 className="w-full uppercase text-lg bg-gray-500 text-gray-100 text-center">
          Features
        </h2>
        <ul className="list-disc list-inside text-base text-gray-600 mt-2">
          {product?.features?.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="w-full uppercase text-lg bg-gray-500 text-gray-100 text-center">
          Notes
        </h2>
        <ul className="list-disc list-inside text-base text-gray-600 mt-2">
          {product?.notes?.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default AccessoryDescription;
