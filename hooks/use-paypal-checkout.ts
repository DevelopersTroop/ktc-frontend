"use client";

import { useTypedSelector } from "@/app/globalRedux/store";
import { apiBaseUrl } from "@/app/utils/api";
import { useCheckout } from "@/context/CheckoutContext";
import { toast } from "sonner";

export const usePaypalCheckout = () => {
  const { cartType, subTotalCost, totalCost } = useCheckout();
  const {
    billingAddress,
    shippingAddress,
    shippingMethod,
    discount,
    orderInfo,
    isAccountCreated,
    productsInfo,
    isCouponApplied,
    couponCode,
    couponDiscount,
  } = useTypedSelector((state) => state.persisted.checkout);

  const initiatePaypalCheckout = async () => {
    try {
      const orderData = {
        orderInfo,
        shippingAddress,
        billingAddress,
        discount,
        cartType,
        totalCost: parseFloat(subTotalCost).toFixed(2),
        netCost: parseFloat(totalCost).toFixed(2),
        isAccountCreated,
        shippingMethod,
        deliveryCharge: cartType === "CENTER_CAP_ONLY" ? 14.99 : 0,
        productsInfo,
        isCouponApplied,
        couponCode,
        couponDiscount,
      };

      const response = await fetch(
        `${apiBaseUrl}/payments/create-paypal-payment`,
        // `http://localhost:8080/api/v1/payments/create-paypal-payment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderData,
          }),
        }
      );
      if (!response.ok) {
        const error = await response.text();

        const parsedError = JSON.parse(error);

        if (parsedError.errors && Array.isArray(parsedError.errors)) {
          throw new Error(parsedError.errors[0].message);
        }

        throw new Error(response.statusText);
      }

      const result = await response.json();

      window.location.href = result.data.data.approvalUrl;
    } catch (err: {message: string}) {
      toast.error(err.message);
    }
  };

  return { initiatePaypalCheckout };
};
