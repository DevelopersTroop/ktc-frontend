import { TInventoryItem } from "@/types/product";

const SuspensionDescription = ({ product }: { product: TInventoryItem }) => {
  return (
    <div className="flex w-full flex-col gap-5">
      <div>
        <h2 className="w-full bg-gray-500 text-center text-lg uppercase text-gray-100">
          Details
        </h2>
        <p className="mt-2 text-base text-gray-600">{product?.description}</p>
      </div>

      <div>
        <h2 className="w-full bg-gray-500 text-center text-lg uppercase text-gray-100">
          Features
        </h2>
        <ul className="mt-2 list-inside list-disc text-base text-gray-600">
          {product?.features?.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="w-full bg-gray-500 text-center text-lg uppercase text-gray-100">
          Notes
        </h2>
        <ul className="mt-2 list-inside list-disc text-base text-gray-600">
          {product?.notes?.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SuspensionDescription;
