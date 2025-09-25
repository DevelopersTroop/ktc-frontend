import { camelCaseToWords } from "@/app/utils/string";
import { TInventoryItem } from "@/types/product";

const wheel_specs_key: string[] = [
  "manufacturer_part_number",
  "size",
  "diameter",
  "lug_count",
  "bolt_pattern_metric",
  "bolt_pattern_standard",
  "offset",
  "upc",
  "backspacing",
  "centerbore",
  "hubBore",
  "material",
  "style",
  "cap_part_no",
  "load_rating_metric",
  "load_rating_standard",
  "division",
  "weight",
  "box_label_desc",
  "color",
  "width",
  "trueDirectional",
];

const filterKeyValue = (key: keyof TInventoryItem, value: any) => {
  if (wheel_specs_key.includes(key)) return true;
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
            <span className="text-base text-gray-600">
              {" "}
              {product.brand_desc}
            </span>
          </p>
          <p>
            <span className="text-lg font-medium text-gray-600">Model: </span>{" "}
            <span className="text-base text-gray-600"> {product.model}</span>
          </p>
        </div>
        {Object.entries(product).map(([key, value]) => {
          console.log("TCL: TireSpecifications -> key", key);
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
