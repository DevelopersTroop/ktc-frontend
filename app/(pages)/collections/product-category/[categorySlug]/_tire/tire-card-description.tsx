"use client";
import { TInventoryItem } from "@/types/product";
import { FaStar } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
// import { PiTireBold } from "react-icons/pi";

const TireCardDescription = ({ product }: { product: TInventoryItem }) => {
  return (
    <div>
      {/* product title */}
      <div>
        <h3 className="text-sm font-semibold uppercase text-black">
          {product.title}
        </h3>
      </div>
      {/* product review */}
      <div className="flex justify-between py-1">
        <div className="flex gap-0.5 text-sm">
          <FaStar className="text-yellow-400" />
          <FaStar className="text-yellow-400" />
          <FaStar className="text-yellow-400" />
          <FaStar className="text-yellow-400" />
          <FaStar className="text-yellow-400" />
        </div>
        <div className="text-xs text-gray-600">7 Review</div>
      </div>

      {/* product pricing */}
      <div className="hidden flex-col gap-3 min-[600px]:flex">
        <div className="flex items-start gap-1">
          $
          <span className="text-3xl font-semibold">
            {(product.msrp * 4).toFixed(2)}
          </span>{" "}
          <span className="my-auto text-xs font-medium uppercase text-primary">
            set of four
          </span>
        </div>
        <div>
          <p className="text-sm">
            Starting at <span className="font-bold">$82</span>/MO{" "}
            <span className="font-bold">Affirm</span>{" "}
          </p>
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-3">
        {/* <div className=" flex items-center gap-2">
          <div className={"rounded-full p-1 inline-block bg-primary"}>
            <AiOutlineDollarCircle className={"text-white"} />
          </div>
          <p className="text-xs uppercase text-gray-600">
            {product.item_promo}
          </p>
        </div> */}
        <div className="flex items-center gap-2">
          <div className={"inline-block rounded-full bg-primary p-1"}>
            <MdOutlineShoppingCart className={"text-white"} />
          </div>
          <div className="text-xs uppercase">
            <p className="text-gray-800">{product.item_shipping}</p>
            <p className="font-semibold">
              {" "}
              {product.delivery_date} to the lower 48{" "}
            </p>
          </div>
        </div>
        {/* <div className="flex items-center gap-2">
          <div className={"inline-block rounded-full bg-primary p-1"}>
            <PiTireBold className={"text-white"} />
          </div>
          <p className="text-xs uppercase text-gray-800">
            {product?.tire_type}
          </p>
        </div> */}
        {/* <div className="flex items-center gap-2">
          <div className={"inline-block rounded-full bg-primary p-1"}>
            <FaStar className={"text-white"} />
          </div>
          <p className="text-xs uppercase text-gray-800">{product?.warranty}</p>
        </div> */}
      </div>

      {/* product pricing */}
      <div className="flex flex-col gap-3 min-[600px]:hidden">
        <div className="flex items-start gap-1">
          $
          <span className="text-3xl font-semibold">
            {(product.msrp * 4).toFixed(2)}
          </span>{" "}
          <span className="my-auto text-xs font-medium uppercase text-primary">
            set of four
          </span>
        </div>
        <div>
          <p className="text-sm">
            Starting at <span className="font-bold">$82</span>/MO{" "}
            <span className="font-bold">Affirm</span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TireCardDescription;
