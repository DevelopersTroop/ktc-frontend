import { TInventoryItem } from "@/types/product";
import Link from "next/link";
import { LiaShippingFastSolid } from "react-icons/lia";
import { MdOutlineLocalPhone } from "react-icons/md";
import { PiHandCoinsDuotone } from "react-icons/pi";

const WheelDetails = ({ product }: { product: TInventoryItem }) => {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-gray-700">
          <span className="text-2xl font-semibold">${product?.msrp}</span> each{" "}
          <span className="text-2xl font-semibold">
            /${(product?.msrp * 4).toFixed(2)}
          </span>{" "}
          set
        </p>
      </div>

      {/* <div className=" flex items-center gap-2">
        <div className={"rounded-full p-1 inline-block bg-primary"}>
          <AiOutlineDollarCircle className={"text-white"} />
        </div>
        <p className="text-base uppercase text-gray-600">
          {product.price}
        </p>
      </div> */}

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

      {/* <div className=" flex items-center gap-2">
        <div className={"rounded-full p-1 inline-block bg-primary"}>
          <MdOutlineShoppingCart className={"text-white"} />
        </div>
        <div className="text-base uppercase">
          <p className="text-gray-600">{product.price}</p>
          <p className="text-gray-600">
            <span className="text-black font-semibold">
            </span>{" "}
            to the lower 48
          </p>
        </div>
      </div> */}

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

export default WheelDetails;
