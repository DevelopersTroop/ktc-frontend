import { TInventoryItem } from "@/types/product";

const GalleryDetails = ({ product }: { product: TInventoryItem }) => {
  console.log("product = ", product);
  return (
    <>
      <div className="w-full">
        <h2 className="w-full uppercase text-lg bg-gray-500 text-gray-100 text-center">
          About this Build
        </h2>
      </div>

      <div className="w-full">
        <h2 className="w-full uppercase text-lg bg-gray-500 text-gray-100 text-start px-2">
          Wheel Info
        </h2>
      </div>

      <div className="w-full">
        <h2 className="w-full uppercase text-lg bg-gray-500 text-gray-100 text-start px-2">
          Tire Info
        </h2>
      </div>

      <div className="w-full">
        <h2 className="w-full uppercase text-lg bg-gray-500 text-gray-100 text-start px-2">
          Suspension Info
        </h2>
      </div>
    </>
  );
};

export default GalleryDetails;
