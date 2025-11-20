import { useTypedSelector } from "@/app/globalRedux/store";
import { createSnapFinanceData } from "./snap-finance";
import { apiBaseUrl } from "@/app/utils/api";
import { apiInstance } from "@/app/globalRedux/api/base";
import { TOrder } from "@/types/order";
import { toast } from "sonner";
import { useCheckout } from "@/context/CheckoutContext";

export const getLatestOrderId = async () => {
  const { data: response } = await apiInstance.get<{
    data: {
      order: TOrder;
    };
  }>("/orders/last-order");
  console.log("TCL: getLatestOrderId -> response", response);

  return response.data.order.orderId;
};

export const useSnapFinanceOrderData = () => {
  const {
    billingAddress,
    shippingAddress,
    orderInfo,
    selectedOptionTitle,
    affiliateDiscount,
    productBasedDiscountApplied,
    isCouponApplied,
    shippingMethod,
    selectedDealerInfo,
    selectedDealer,
    requestedDealer,
    isAccountCreated,
    productsInfo,
    couponCode,
    couponDiscount,
    localDealerSelected,
    localDealerInfo,
    vehicleInformation,
    discount,
    productBasedDiscount,
    existingOrderId,
    referralCode,
    dealerDiscountApplied,
    paymentStatus,
    selectedOption,
    orderId,
  } = useTypedSelector((state) => state.persisted.checkout);
  const { cartType, subTotalCost, totalCost } = useCheckout();

  const orderData = {
    orderInfo,
    shippingMethod,
    shippingAddress,
    billingAddress,
    discount,
    cartType,
    totalCost: parseFloat(subTotalCost).toFixed(2),
    netCost: parseFloat(totalCost).toFixed(2),
    selectedDealer,
    selectedOptionTitle,
    requestedDealer,
    selectedDealerInfo,
    deliveryCharge: cartType === "CENTER_CAP_ONLY" ? 14.99 : 0,
    isAccountCreated,
    productsInfo,
    isCouponApplied,
    couponCode,
    couponDiscount,
    user: null,
    localDealerSelected,
    localDealerInfo,
    paymentMethod: "Snap Finance",
    vehicleInformation,
    productBasedDiscount,
    productBasedDiscountApplied,
    existingOrderId,
    referralCode,
    affiliateDiscount,
  };

  // Prepare the transaction data for Snap Finance
  const getSnapFinanceTransactionData = (newOrderId: string) => {
    return createSnapFinanceData(newOrderId, {
      ...orderData,
      dealerDiscountApplied,
      paymentStatus,
      selectedOption,
    });
  };

  const placeOrderWithSnapFinance = async (
    applicationId: string,
    snapStatus: string
  ) => {
    try {
      const { productsInfo, ...rest } = orderData;
      Object.assign(rest, {
        applicationId,
        snapStatus,
        orderId,
        productsInfo,
      });

      const response = await fetch(
        `${apiBaseUrl}/payments/snap-finance/checkout`,
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
    } catch (err: any) {
      toast("Error", {
        description: err.message,
      });
    }
  };

  return {
    getSnapFinanceTransactionData,
    placeOrderWithSnapFinance,
  };
};
