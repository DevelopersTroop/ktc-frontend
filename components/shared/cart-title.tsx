"use client";
import { useTypedSelector } from "@/app/globalRedux/store";
import { usePathname, useRouter } from "next/navigation";

const CartTitle = () => {
  const { accessToken, userDetails } = useTypedSelector(
    (state) => state.persisted.user,
  );
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="relative flex items-center justify-between pb-3">
      <h5 className="text-xl leading-6 text-[#210203]">
        <span className="text-xl font-bold text-[#210203]">
          Tire & Wheel packages
        </span>
      </h5>
      <div className="relative flex items-center gap-5">
        {/* <small className="text-sm leading-[17px] underline text-[#210203]">
          <span className="text-[#210203] text-sm font-semibold">
            Change package
          </span>
        </small> */}

        {!accessToken && !userDetails?.email && pathname !== "/checkout" ? (
          <small
            onClick={() => {
              router.push("/cart/email");
            }}
            className="cursor-pointer text-sm leading-[17px] text-[#210203] underline"
          >
            <span className="text-sm font-semibold text-[#210203]">
              Save for later
            </span>
          </small>
        ) : null}
      </div>
    </div>
  );
};

export default CartTitle;
