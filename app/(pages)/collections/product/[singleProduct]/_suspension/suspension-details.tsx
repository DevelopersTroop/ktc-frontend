import { TInventoryItem } from "@/types/product";
import { LiaShippingFastSolid } from "react-icons/lia";
import { PiHandCoinsDuotone } from "react-icons/pi";

const SuspensionDetails = ({ product }: { product: TInventoryItem }) => {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-gray-700 text-5xl font-semibold">
          ${product.price.toFixed(2)}
        </p>
      </div>

      <div className=" flex items-center gap-2">
        <div className={"rounded-full p-1 inline-block bg-primary"}>
          <LiaShippingFastSolid className={"text-white"} />
        </div>
        <div className="text-sm uppercase">
          <p className="text-gray-600">
            Estimated Delivery:{" "}
            <span className="text-black font-semibold">
              {product.delivery_date}
            </span>{" "}
            to the lower 48
          </p>
        </div>
      </div>

      <div className=" flex items-center gap-2">
        <div className={"rounded-full p-1 inline-block bg-primary"}>
          <PiHandCoinsDuotone className={"text-white"} />
        </div>
        <div className="text-sm uppercase">
          <p className="text-gray-600">Financing Available</p>
        </div>
      </div>
    </div>
  );
};

export default SuspensionDetails;
