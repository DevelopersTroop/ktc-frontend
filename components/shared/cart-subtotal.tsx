"use client";
import { RootState } from "@/app/globalRedux/store";
import { calculateCartTotal } from "@/app/utils/price";
import { useSelector } from "react-redux";

const CartSubtotal = () => {
  const cart = useSelector((state: RootState) => state.persisted.cart);
  const subTotalCost = calculateCartTotal(cart.products);
  return (
    <div className="relative flex w-full items-baseline justify-between self-stretch overflow-hidden bg-white px-2 py-5 sm:px-5">
      <p className="text-base leading-[19px] text-[#210203]">
        <span className="text-base font-normal text-[#210203]">Subtotal:</span>
      </p>
      <div className="relative flex items-baseline gap-0">
        <p>
          <span className="text-[32px] font-bold text-[#210203]">
            ${String(subTotalCost).split(".")[0] || "0"}.
          </span>
          <span className="text-xl font-bold text-[#210203]">
            {String(subTotalCost).split(".")[1] || "00"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default CartSubtotal;
