import { TInventoryItem } from "@/types/product";
import Link from "next/link";
import { LiaShippingFastSolid } from "react-icons/lia";
import { MdOutlineLocalPhone, MdOutlineShoppingCart } from "react-icons/md";
import { PiHandCoinsDuotone } from "react-icons/pi";
import { FaDollarSign } from "react-icons/fa6";
import { useMemo } from "react";
import { getPrice } from "@/app/utils/price";

const PackageDetails = ({
  wheel,
  tire,
}: {
  wheel: TInventoryItem;
  tire: TInventoryItem;
}) => {
  const totalPrice = useMemo(() => {
    return getPrice(wheel.msrp, wheel.price) + getPrice(tire.msrp, tire.price);
  }, [wheel, tire]);
  return (
    <div className="flex flex-col gap-5">
      <div className="text-red-600 font-semibold">
        <h2 className="text-4xl">SALE! WAS</h2>
        <h2 className="text-3xl line-through">${totalPrice}</h2>
      </div>

      <div className="text-primary font-semibold">
        <h2 className="text-5xl">Package Price</h2>
        <h2 className="text-4xl">${totalPrice - 50}</h2>
      </div>

      <div className="flex items-center gap-2">
        <div className={"inline-block rounded-full bg-primary p-1"}>
          <FaDollarSign className={"text-white"} />
        </div>
        <div className="text-base uppercase">
          <p className="text-gray-600">
            Save up to <span className="font-semibold"> $20</span> When adding
            tires to package
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className={"inline-block rounded-full bg-primary p-1"}>
          <LiaShippingFastSolid className={"text-white"} />
        </div>
        <div className="text-base uppercase">
          <p className="text-gray-600">
            Free Mount & Balance with Tire packaging!
          </p>
        </div>
      </div>

      <div className=" flex items-center gap-2">
        <div className={"rounded-full p-1 inline-block bg-primary"}>
          <MdOutlineShoppingCart className={"text-white"} />
        </div>
        <div className="text-base uppercase">
          <p className="text-gray-600">In stock & Free Quick Delivery</p>
          <p className="text-gray-600">
            <span className="text-black font-semibold">
              {" "}
              As Fast As:{" "}
              {(() => {
                const today = new Date();
                const start = new Date(today);
                start.setDate(today.getDate() + 3);
                const end = new Date(today);
                end.setDate(today.getDate() + 7);

                const format = (date: Date) =>
                  date.toLocaleString("en-US", {
                    month: "short",
                    day: "2-digit",
                  });

                return `${format(start)} - ${format(end)}`;
              })()}
            </span>{" "}
            to the lower 48
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className={"inline-block rounded-full bg-primary p-1"}>
          <PiHandCoinsDuotone className={"text-white"} />
        </div>
        <div className="text-base">
          <p className="text-gray-800">
            Starting at $79/mo or 0% APR with{" "}
            <span className="font-bold text-btext">affirm</span>{" "}
            <Link href="#" className="text-gray-900">
              Check your purchasing power
            </Link>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className={"inline-block rounded-full bg-primary p-1"}>
          <PiHandCoinsDuotone className={"text-white"} />
        </div>
        <div className="text-base">
          <Link href="#">
            <p className="underline">
              Make 6 payments of <br /> $210.00/mo at 0% APR with
              <img
                src="/paypal.svg"
                alt="paypal"
                className="inline-block h-5"
              />
              <br />
              <span className="text-primary underline">Learn More</span>{" "}
            </p>
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className={"inline-block rounded-full bg-primary p-1"}>
          <MdOutlineLocalPhone className={"text-white"} />
        </div>
        <p className="text-base uppercase text-gray-600">
          Questions or Help Needed? Call our experts at{" "}
          <span className="text-primary"> +1 (303) 695-6305 </span>
        </p>
      </div>
    </div>
  );
};

export default PackageDetails;
