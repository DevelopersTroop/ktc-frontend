import { TInventoryItem } from "@/app/types/product";

const SuspensionDescription = ({ product }: { product: TInventoryItem }) => {
  return (
    <div className="w-full flex flex-col gap-5">
      <div>
        <h2 className="w-full uppercase text-lg bg-gray-500 text-gray-100 text-center">
          Details
        </h2>
        <p className="text-base text-gray-600 mt-2">{product?.description}</p>
      </div>

      <div>
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
      </div>
    </div>
  );
};

export default SuspensionDescription;
