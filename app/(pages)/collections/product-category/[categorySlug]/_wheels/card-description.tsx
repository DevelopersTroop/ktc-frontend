"use client";
import { TInventoryItem } from "@/app/types/product";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { FaStar } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";

const CardDescription = ({ product }: { product: TInventoryItem }) => {
  return (
    <div>
      {/* product title */}
      <div>
        <h3 className="text-sm uppercase font-semibold text-black">
          {product.title.brand}
        </h3>
        <h4 className="text-sm uppercase text-gray-600">
          {product.title.model}
        </h4>
        <p className="text-sm uppercase text-black">{product.title.subtitle}</p>
      </div>
      {/* product review */}
      <div className="flex justify-between py-1">
        <div className="flex text-sm gap-0.5">
          <FaStar className="text-yellow-400" />
          <FaStar className="text-yellow-400" />
          <FaStar className="text-yellow-400" />
          <FaStar className="text-yellow-400" />
          <FaStar className="text-yellow-400" />
        </div>
        <div className="text-xs text-gray-600">55 Review</div>
      </div>

      {/* product pricing */}
      <div className="hidden min-[600px]:flex flex-col gap-3">
        <div className="flex items-start gap-1">
          $
          <span className="font-semibold text-3xl">
            {product.price.toFixed(2)}{" "}
          </span>{" "}
          <span className="uppercase text-primary text-xs font-medium my-auto">
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

      <div className="flex flex-col gap-3 mt-3">
        <div className=" flex items-center gap-2">
          <div className={"rounded-full p-1 inline-block bg-primary"}>
            <AiOutlineDollarCircle className={"text-white"} />
          </div>
          <p className="text-xs uppercase text-gray-800">
            {product.item_promo}
          </p>
        </div>
        <div className=" flex items-center gap-2">
          <div className={"rounded-full p-1 inline-block bg-primary"}>
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
      </div>

      {/* product pricing */}
      <div className="flex flex-col gap-3 min-[600px]:hidden">
        <div className="flex items-start gap-1">
          $
          <span className="font-semibold text-3xl">
            {product.price.toFixed(2)}{" "}
          </span>{" "}
          <span className="uppercase text-primary text-xs font-medium my-auto">
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

export default CardDescription;
