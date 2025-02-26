"use client";
import { useCheckout } from "@/app/context/CheckoutContext";
import { emptyCart } from "@/app/globalRedux/features/cart/cart-slice";
import { useTypedSelector } from "@/app/globalRedux/store";
import { apiBaseUrl } from "@/app/utils/api";
import { toast } from "@/hooks/use-toast";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams, useRouter } from "next/navigation";

export const useProcessPaypalPayment = () => {
  const {
    billingAddress,
    requestDealer,
    shippingAddress,
    cartType,
    discount,
    selectedDealerInfo,
    setOrderSuccessData,
    subTotalCost,
    selectedOptionTitle,
    orderInfo,
    selectedDealer,
  } = useCheckout();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { products } = useTypedSelector((state) => state.persisted.cart);

  // Properly memoized product data
  const productsData = useMemo(() => {
    return { products: Object.values(products) };
  }, [products]);

  const processPayment = async (
    paymentId: string,
    payerId: string,
    setStep?: (step: number) => void
  ) => {
    setLoading(true);
    try {
      // Execute PayPal Payment
      const paypalResponse = await fetch(
        `${apiBaseUrl}/payments/paypal/execute-payment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentId, payerId }),
        }
      );

      if (!paypalResponse.ok)
        throw new Error("Failed to execute PayPal payment");

      const { statusCode, data: payment } = await paypalResponse.json();
      if (statusCode !== 200 || !payment?.payment)
        throw new Error("Invalid PayPal payment response");

      const payerEmail =
        payment?.payment?.payer?.payer_info?.email ||
        billingAddress.email ||
        shippingAddress.email;

      // Create Order
      const userPayload = {
        data: {
          orderInfo,
          shippingAddress,
          productsInfo: productsData.products,
          discount,
          cartType,
          totalCost: subTotalCost.toFixed(2),
          netCost: (subTotalCost - discount).toFixed(2),
          selectedDealer,
          selectedOptionTitle,
          billingAddress,
          requestedDealer: requestDealer,
          selectedDealerInfo,
        },
        email: payerEmail,
      };

      const orderResponse = await fetch(`${apiBaseUrl}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userPayload),
      });

      if (!orderResponse.ok) throw new Error("Failed to create order");

      const { statusCode: orderStatusCode, data: orderData } =
        await orderResponse.json();
      if (orderStatusCode !== 201 || !orderData?.order?._id)
        throw new Error("Invalid order creation response");

      setOrderSuccessData(orderData.order);

      // Create Payment Record
      const paymentData = {
        email: payerEmail,
        orderId: orderData.order._id,
        paymentType: "PayPal",
        currency: payment?.payment?.transactions?.[0]?.amount?.currency,
        amount: payment?.payment?.transactions?.[0]?.amount?.total,
        data: payment?.payment,
      };

      const paymentResponse = await fetch(
        `${apiBaseUrl}/payments/create-payment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(paymentData),
        }
      );

      if (!paymentResponse.ok)
        throw new Error("Failed to create payment record");

      dispatch(emptyCart());
      toast({
        title: "Congrats",
        description: "Order placed successfully",
        variant: "default",
      });

      if (typeof setStep !== "undefined") setStep(5);
    } catch (error) {
      console.error("Payment Processing Error:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to process payment",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return { processPayment, loading };
};
