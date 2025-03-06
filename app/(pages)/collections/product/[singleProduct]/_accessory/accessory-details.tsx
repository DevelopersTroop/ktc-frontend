import { TInventoryItem } from "@/types/product";
import Link from "next/link";
import { LiaShippingFastSolid } from "react-icons/lia";
import { PiHandCoinsDuotone } from "react-icons/pi";

const AccessoryDetails = ({ product }: { product: TInventoryItem }) => {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-gray-700 text-5xl font-semibold">
          ${product.msrp.toFixed(2)}
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

      <div className=" flex items-center gap-2">
        <div className={"rounded-full p-1 inline-block bg-primary"}>
          <PiHandCoinsDuotone className={"text-white"} />
        </div>
        <div className="text-sm">
          <Link href="#">
            <p>
              {" "}
              Pay in 4 interest-free payments of $33.25 with
              <img
                src="/paypal.svg"
                alt="paypal"
                className="h-5 inline-block"
              />
              <span className="underline text-primary">Learn More</span>{" "}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccessoryDetails;
