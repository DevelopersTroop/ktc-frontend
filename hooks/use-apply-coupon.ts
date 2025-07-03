import { updateCouponCode } from "@/app/globalRedux/features/checkout/checkout-slice";
import { useTypedSelector } from "@/app/globalRedux/store";
import { apiBaseUrl } from "@/app/utils/api";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export const useApplyCoupon = () => {

  const { products: productsInfo } = useTypedSelector(
    (state) => state.persisted.cart
  );
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const applyCoupon = async (code: string) => {
    setIsLoading(true);
    if (!code.length) {
      return;
    }
    validateCoupon(code)
      .then((validatedData) => {
        if (!validatedData) {
          return;
        }
        if (validatedData?.percentage) {
          const productsPrice = Object.values(productsInfo).reduce(
            (a, b) => a + b.price * b.quantity,
            0
          );
          const discountAmount = Math.round(
            productsPrice * (validatedData.percentage / 100)
          );

          dispatch(
            updateCouponCode({
              couponCode: code,
              couponDiscount: discountAmount,
            })
          );
        } else {
          dispatch(
            updateCouponCode({
              couponCode: code,
              couponDiscount: validatedData?.amount,
            })
          );
        }
      })
      .finally(() => setIsLoading(false));
  };

  const validateCoupon = async (code: string) => {
    try {
      const response = await fetch(`${apiBaseUrl}/coupons/apply/${code}`);

      const result = await response.json();

      if (!result.data?.coupon) {
        throw new Error();
      }
      return result.data?.coupon;
    } catch {
      toast.error("Invalid coupon code or expired");
    }
  };

  return { applyCoupon, isLoading };
};
