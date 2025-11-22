"use client";
import { TSnapCheckoutReturn, TSnapInputCheckout } from "@/@types/snap";
import {
  setBillingAddress,
  setOrderId,
  setOrderInfo,
} from "@/app/globalRedux/features/checkout/checkout-slice";
import { RootState, useTypedSelector } from "@/app/globalRedux/store";
import Container from "@/app/ui/container/container";
import { triggerGaAddPaymentInfoEvent } from "@/app/utils/analytics";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useCheckout } from "@/context/CheckoutContext";
import { usePaytomorrowCheckout } from "@/hooks/use-pay-tomorrow-checkout";
import { usePaypalCheckout } from "@/hooks/use-paypal-checkout";
import { useStripeCheckout } from "@/hooks/use-stripe-checkout";
import { getLatestOrderId, useSnapFinanceOrderData } from "@/lib/order";
import { getSnapFinanceToken } from "@/lib/snap-finance";
import { TBillingAddress } from "@/types/order";
import { PaymentElement } from "@stripe/react-stripe-js";
import { StripePaymentElement } from "@stripe/stripe-js";
import {
  AlertCircle,
  ChevronLeft,
  Loader,
  ShoppingBasket,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export const StepTwo: React.FC<any> = () => {
  const [activeAccordion, setActiveAccordion] = useState("card");
  const [showTermsAlert, setShowTermsAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const termsRef = useRef<HTMLDivElement>(null);
  const billingAddressUpdate = useSelector(
    (state: RootState) => state.persisted.checkout.billingAddress
  );
  const { productsInfo } = useTypedSelector(
    (state) => state.persisted.checkout
  );
  // Modify stripe
  const paymentElement = useRef<StripePaymentElement | null>(null);
  useEffect(() => {
    if (paymentElement?.current) paymentElement?.current.collapse();
  }, [activeAccordion]);
  const [triggerPayment, setTriggerPayment] = useState(false);

  const { getSnapFinanceTransactionData, placeOrderWithSnapFinance } =
    useSnapFinanceOrderData();

  // ✅ Define handlers (stable, no re-creation)
  const onClickHandler = (data: any, actions: any) => {
    console.log("TCL: onClickHandler -> data", data);
    // Trigger Snap app logic here (apply for credit, etc.)
  };

  const onApprovedHandler = (
    data: { applicationId: string; type: string },
    actions: any
  ) => {
    placeOrderWithSnapFinance(data.applicationId, data.type);
  };

  const onErrorHandler = (error: any) => {
    console.error("Error occurred: And I can see", error);
  };

  const onInitHandler = (d: string) => {
    console.log("Init data:", d);
  };

  // ✅ Input config
  const inputCheckout: TSnapInputCheckout = {
    init: onInitHandler,
    onClick: onClickHandler,
    onApproved: onApprovedHandler,
    onError: onErrorHandler,
    onInit(data, actions) {
      console.log("TCL: onInit -> data", data);
    },
  };

  const snapInstanceRef = useRef<TSnapCheckoutReturn | null>(null);

  const { initiateCheckout } = useStripeCheckout();
  const { initiatePaypalCheckout } = usePaypalCheckout();
  const { initiatePaytomorrowCheckout } = usePaytomorrowCheckout();

  /**
   * Redux Store And Dispatch Hook
   */
  const {
    billingAddress,
    shippingAddress,
    orderInfo,
    shippingProtection,
    taxAmount,
    totalWithTax,
  } = useTypedSelector((state) => state.persisted.checkout);
  const dispatch = useDispatch();

  useEffect(() => {
    const initSnap = async () => {
      if (snapInstanceRef.current) return; // prevent re-init

      try {
        // ✅ Fetch token once
        const token = await getSnapFinanceToken();

        // ✅ Initialize Snap SDK
        window.snap.init(token);

        // ✅ Create Snap instance
        const instance = window.snap.checkoutButton(inputCheckout);
        console.log("TCL: initSnap -> instance", instance);
        snapInstanceRef.current = instance;
      } catch (error) {
        console.error("Snap Finance init failed:", error);
      }
    };

    initSnap();
  }, []);

  const handleSnapFinanceCheckout = async () => {
    getLatestOrderId()
      .then((orderId) => {
        const stringOrderID = orderId.split("-")?.[1] || `AF-0000`;
        const newOrderId = `AF-${(parseInt(stringOrderID, 10) + 1)
          .toString()
          .padStart(6, "0")}`;
        if (newOrderId) {
          dispatch(setOrderId(newOrderId));
        }
        const transactionData = getSnapFinanceTransactionData(newOrderId);
        snapInstanceRef.current?._actions?.launchCheckout(transactionData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /**
   * Checkout Context
   */
  const { totalCost, subTotalCost, discount, cartType } = useCheckout();

  const searchParams = useSearchParams();
  const router = useRouter();
  const [showPaymentError, setShowPaymentError] = useState(false);
  const autoCloseTimerRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    const orderStatus = searchParams.get("order_status");
    if (orderStatus === "false") {
      setShowPaymentError(true);
      autoCloseTimerRef.current = setTimeout(() => {
        handleCloseAlert();
      }, 5000);
    }

    return () => {
      if (autoCloseTimerRef.current) {
        clearTimeout(autoCloseTimerRef.current);
      }
    };
  }, [searchParams]);

  const handleCloseAlert = () => {
    setShowPaymentError(false);
    router.replace(`/checkout?step=2`);
    if (autoCloseTimerRef.current) {
      clearTimeout(autoCloseTimerRef.current);
    }
  };

  const toggleAccordion = (accordion: string) => {
    setActiveAccordion(accordion);
  };

  const {
    register,
    getValues,
    formState: { errors },
    trigger,
    watch,
    setValue,
    reset,
  } = useForm<TBillingAddress>({
    defaultValues: {
      ...billingAddress,
      country: "USA",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const handlePlaceOrder = async () => {
    if (isLoading) return;

    if (subTotalCost < 50) {
      return toast.error("Minimum order amount is $50");
    }

    try {
      // Trigger validation to ensure all fields update
      const isValid = await trigger();

      if (!isValid) {
        return toast.error("Please fill in all required fields");
      }

      triggerGaAddPaymentInfoEvent(
        totalWithTax ?? 0,
        productsInfo,
        activeAccordion ? activeAccordion : "Stripe"
      );

      // Ensure form values are up-to-date
      await new Promise((resolve) => setTimeout(resolve, 0));

      const formValues = getValues(); // Get the latest values

      // Format user full name
      const formattedFName = formValues.fname?.trim() || "";
      const formattedLName = formValues.lname?.trim() || "";
      const fullName = [formattedFName, formattedLName]
        .filter(Boolean)
        .join(" ");

      const finalData = {
        ...formValues,
        fname: formattedFName,
        lname: formattedLName,
        name: fullName,
      };

      if (!orderInfo.termsAndConditions) {
        setShowTermsAlert(true);
        termsRef.current?.scrollIntoView({ behavior: "smooth" });
        return;
      }

      setIsLoading(true);

      // Dispatch billing address update
      dispatch(setBillingAddress(finalData));

      // Trigger payment process after Redux update
      setTriggerPayment(true);
    } catch (error) {
      console.error("Error in handlePlaceOrder:", error);
      toast.error("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (orderInfo.termsAndConditions) {
      setShowTermsAlert(false);
    }
  }, [orderInfo.termsAndConditions]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Extracted Payment Processing Logic
  const processPayment = async () => {
    switch (activeAccordion) {
      case "paypal":
        await initiatePaypalCheckout();
        break;
      case "pay-tomorrow":
        await initiatePaytomorrowCheckout();
        break;
      case "snap-finance":
        await handleSnapFinanceCheckout();
        break;
      default:
        await initiateCheckout();
    }
  };

  // **Detect Redux Update & Trigger Payment**
  useEffect(() => {
    if (triggerPayment && billingAddressUpdate?.name) {
      processPayment()
        .catch((error) => {
          console.error("Payment processing error:", error);
          toast.error("Payment processing failed. Please try again.");
        })
        .finally(() => {
          setIsLoading(false);
          setTriggerPayment(false); // Reset trigger
        });
    }
  }, [billingAddressUpdate, triggerPayment]);

  /**
   * Place order button should be disabled
   */
  const formValues = watch(); // Move outside to ensure reactivity

  const shouldDisableButton = useMemo(() => {
    if (isLoading) return true;

    const requiredFields: (keyof TBillingAddress)[] = [
      "address1",
      "zipCode",
      "country",
      "cityState",
      "phone",
      "email",
      "fname",
      "lname",
    ];

    const hasAllRequiredFields = requiredFields.every(
      (field) => formValues[field]?.trim().length
    );

    return !hasAllRequiredFields || !orderInfo.termsAndConditions;
  }, [isLoading, activeAccordion, formValues, orderInfo.termsAndConditions]); // Depend on formValues

  useEffect(() => {
    const subscription = watch(() => {
      trigger();
    });

    return () => subscription.unsubscribe();
  }, [watch, trigger]);

  const renderPaymentOption = useCallback(
    (method: string, label: string, icon: React.ReactNode) => (
      <div
        key={method}
        onClick={() => toggleAccordion(method)}
        className="relative border border-[#e5e5e5] rounded-[12px] px-2.5 h-[48px] cursor-pointer"
      >
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center cursor-pointer min-w-0 gap-3">
            <div className="ml-2 flex items-center">
              {activeAccordion === method ? (
                <div className="relative w-[15px] h-[15px]">
                  <span className="absolute inset-0 rounded-full border-2 border-black"></span>
                  <span className="absolute inset-[4px] rounded-full bg-black"></span>
                </div>
              ) : (
                <span
                  className={`inline-block w-[15px] h-[15px] rounded-full border-[2px] border-[#6d6e78]`}
                />
              )}
            </div>
            <div className="flex items-center h-full">
              {icon}
              {label && (
                <span className="font-semibold text-gray-900 text-xl truncate">
                  {label}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    ),
    [activeAccordion, toggleAccordion]
  );

  return (
    <Container>
      <Button className="mb-4" onClick={() => router.push(`/checkout?step=1`)}>
        <ChevronLeft />
        Go Back
      </Button>
      {showPaymentError && (
        <div className="mb-6 flex items-center justify-between rounded-lg border border-red-200 bg-red-50 p-4">
          <div className="flex items-center gap-2 text-red-700">
            <AlertCircle className="h-5 w-5" />
            <span>
              Payment failed. Please try again or choose a different payment
              method.
            </span>
          </div>
          <button
            onClick={handleCloseAlert}
            className="text-red-700 hover:text-red-900"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
      <div className="grid grid-cols-11 gap-8">
        <div className="col-span-11 flex w-full flex-col gap-y-8 lg:col-span-7">
          <h3 className="text-2xl font-bold">Select Payment Option</h3>
          {/* <CheckoutForm/> */}
          <div>
            <div className="flex flex-col space-y-4">
              <PaymentElement
                onFocus={() => {
                  setActiveAccordion("");
                }}
                onReady={(element) => {
                  paymentElement.current = element;
                }}
                options={{
                  layout: {
                    type: "accordion",
                    spacedAccordionItems: true,
                    radios: true,
                  },
                }}
              />

              {renderPaymentOption(
                "pay-tomorrow",
                "",
                <Image
                  src="/PTLogo.png"
                  width={100}
                  height={50}
                  alt="PayTomorrow"
                  className="h-8"
                />
              )}

              {renderPaymentOption(
                "snap-finance",
                "",
                <img
                  src="https://snapfinance.com/assets/icons/logo.svg"
                  className="w-auto h-8 mr-2"
                  alt="Snap Finance"
                />
              )}

              {/* <div
                onClick={() => toggleAccordion("paypal")}
                className="relative cursor-pointer rounded-lg border p-2.5"
              >
                <div className="flex items-center">
                  <div className="absolute left-2.5 top-1/2 -translate-y-1/2">
                    <span
                      className={`inline-block h-5 w-5 rounded-full border ${
                        activeAccordion === "paypal"
                          ? "border-4 border-black"
                          : "border-gray-600"
                      }`}
                    />
                  </div>
                  <div className="flex items-center pl-10">
                    <Image
                      src="/paypal.png"
                      width={100}
                      height={50}
                      alt="PayPal"
                      className="h-8"
                    />
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>

        <div className="col-span-11 h-full w-full space-y-6 lg:col-span-4">
          <div className="rounded-xs bg-[#F7F7F7] py-7">
            <div className="space-y-6 text-[#210203]">
              <div className="space-y-2 text-[#210203]">
                <div className="flex items-baseline justify-between px-6 py-2">
                  <p className="text-base leading-[19px] text-[#210203]">
                    Total
                  </p>
                  <div className="relative flex items-baseline gap-0">
                    <p className="text-xl leading-[29px] text-[#210203]">
                      <span className="text-xl font-bold">
                        ${Math.floor(subTotalCost)}.
                      </span>
                      <span className="text-sm font-bold">
                        {subTotalCost.toFixed(2).split(".")[1]}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="relative flex w-full items-baseline justify-between self-stretch px-6">
                  <div className="relative flex items-center gap-2">
                    <p className="text-base leading-[19px] text-[#210203]">
                      Shipping
                    </p>
                    {/* <div className="relative flex items-center gap-0">
                      <p className="text-base leading-[19px] text-[#210203]">
                        ({shippingAddress.zipCode}):
                      </p>
                    </div> */}
                  </div>
                  <div className="relative flex items-baseline gap-0">
                    <h4 className="text-xl font-bold leading-[29px] text-[#210203]">
                      Free
                    </h4>
                  </div>
                </div>
                <div className="relative flex w-full items-baseline justify-between self-stretch px-6">
                  <div className="relative flex items-center gap-2">
                    <p className="text-base leading-[19px] text-[#210203]">
                      Shipping Protection
                    </p>
                    {/* <div className="relative flex items-center gap-0">
                      <p className="text-base leading-[19px] text-[#210203]">
                        ({shippingAddress.zipCode}):
                      </p>
                    </div> */}
                  </div>
                  <div className="relative flex items-baseline gap-0">
                    <h4 className="text-xl font-bold leading-[29px] text-[#210203]">
                      {shippingProtection
                        ? shippingProtection?.toFixed(2)
                        : "Free"}
                    </h4>
                  </div>
                </div>
                {taxAmount ? (
                  <div className="flex justify-between items-baseline px-6">
                    <div className="flex gap-2 items-center">
                      <span className="text-[#210203] text-base font-normal">
                        Sales Tax :
                      </span>
                    </div>
                    <h4 className="text-2xl leading-[29px] text-[#210203] font-normal">
                      ${taxAmount.toFixed(2)}
                    </h4>
                  </div>
                ) : null}
                {discount ? (
                  <div className="px-md flex justify-between">
                    <span className="">Discount:</span>
                    <span className="text-2xl font-bold">-${discount}</span>
                  </div>
                ) : null}
                {cartType === "CENTER_CAP_ONLY" ? (
                  <div className="px-md flex justify-between">
                    <span className="">Delivery Charge:</span>
                    <span className="text-2xl font-bold">$14.99</span>
                  </div>
                ) : null}

                <div className="relative flex w-full items-baseline justify-between self-stretch border-x-0 border-b border-t-0 border-[#cfcfcf] px-6 pb-4 pt-2">
                  <h5 className="text-xl leading-6 text-[#210203]">Total:</h5>
                  <div className="relative flex items-baseline gap-0">
                    <p className="text-xl leading-[38px] text-[#210203]">
                      <span className="font-bold">
                        ${totalWithTax?.toFixed(2)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4" ref={termsRef}>
              <div
                onClick={() =>
                  dispatch(
                    setOrderInfo({
                      ...orderInfo,
                      termsAndConditions: !orderInfo.termsAndConditions,
                    })
                  )
                }
                className="flex cursor-pointer items-start gap-2"
              >
                <Checkbox
                  checked={orderInfo.termsAndConditions}
                  className="h-5 w-5 rounded-md border border-[#AAAAAA] bg-white data-[state=checked]:border-none"
                />
                <p className="text-base">
                  I acknowledge the{" "}
                  <Link href="#" className="font-semibold">
                    Terms and Conditions
                  </Link>{" "}
                  and the{" "}
                  <Link href="#" className="font-semibold">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
              {showTermsAlert && (
                <Alert variant="destructive" className="mt-4">
                  <AlertDescription>
                    To place your order, please accept our policies.
                  </AlertDescription>
                </Alert>
              )}
            </div>

            <div className="px-6">
              <Button
                disabled={shouldDisableButton}
                className="mt-2 flex h-14 w-full items-center justify-center gap-2 rounded-xs font-semibold antialiased"
                onClick={handlePlaceOrder}
              >
                {isLoading ? (
                  <>
                    <Loader className="h-5 w-5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <ShoppingBasket />
                    <span className="text-base">Place Order</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
