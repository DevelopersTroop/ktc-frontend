import {
  revokeCouponCode,
  setOrderInfo,
} from "@/app/globalRedux/features/checkout/checkout-slice";
import { useTypedSelector } from "@/app/globalRedux/store";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useCheckout } from "@/context/CheckoutContext";
import { useApplyCoupon } from "@/hooks/use-apply-coupon";
import { TCartProduct } from "@/types/cart";
import { InfoIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { ProductCard } from "./ProductCard";
import { ICheckoutStepProps } from "./StepOne";
export const StepThree: React.FC<ICheckoutStepProps> = ({ setStep }) => {
  const newsLetterRef = useRef<HTMLDivElement>(null);
  const phoneNumberRef = useRef<HTMLDivElement>(null);
  /**
   * Redux Store & Dispatch
   */
  const { products } = useTypedSelector((state) => state.persisted.cart);
  const {
    discount,
    shippingAddress,
    orderInfo,
    requestedDealer,
    selectedDealerInfo,
    selectedOptionTitle,
    selectedDealer,
    couponCode,
    isCouponApplied,
  } = useTypedSelector((state) => state.persisted.checkout);
  const [coupon, setCoupon] = useState(couponCode);
  const { applyCoupon, isLoading } = useApplyCoupon();
  const dispatch = useDispatch();

  const { cartType, subTotalCost, totalCost } = useCheckout();

  useEffect(() => {
    if (orderInfo.newsLetter !== "") {
      const element = newsLetterRef?.current?.querySelector(".error-message");
      if (element) newsLetterRef.current?.removeChild(element);
    }
  }, [orderInfo.newsLetter]);

  useEffect(() => {
    if (orderInfo.phone !== "") {
      const element = phoneNumberRef?.current?.querySelector(".error-message");
      if (element) phoneNumberRef.current?.removeChild(element);
    }
  }, [orderInfo.phone]);

  const product = useMemo(() => {
    let count = 0;
    const productsData: TCartProduct[] = [];
    let totalPrice = 0;

    for (const [_, value] of Object.entries(products)) {
      count += value.quantity;
      totalPrice += value.price;
      productsData.push(value);
    }
    return {
      qty: count,
      products: productsData,
      totalPrice,
    };
  }, [products]);

  const handlePlaceOrderModal = function () {
    if (!orderInfo.newsLetter.length) {
      // Check if an error element already exists
      const existingError =
        newsLetterRef.current?.querySelector(".error-message");

      // If it exists, do nothing
      if (!existingError) {
        const erroEl = document.createElement("p");
        erroEl.innerText = "Please select an option";
        erroEl.classList.add("error-message"); // Add a class to identify the error element later
        newsLetterRef.current?.focus();

        // Insert the error element before the last element
        const lastElement = newsLetterRef.current?.lastElementChild;
        if (lastElement) {
          newsLetterRef.current?.insertBefore(erroEl, lastElement);
        } else {
          // If there are no elements, prepend it
          newsLetterRef.current?.prepend(erroEl);
        }
      }
      newsLetterRef.current?.scrollIntoView({
        behavior: "smooth",
      });
      return;
    }
    if (orderInfo.orderInfoText && !orderInfo.phone.length) {
      const existingError =
        phoneNumberRef.current?.querySelector(".error-message");
      // If it exists, do nothing
      if (!existingError) {
        const erroEl = document.createElement("p");
        erroEl.innerText = "Please enter phone number";
        erroEl.classList.add("error-message"); // Add a class to identify the error element later
        newsLetterRef.current?.focus();

        // Insert the error element before the last element
        const lastElement =
          phoneNumberRef.current?.querySelector(".error-wrapper");
        if (lastElement) {
          phoneNumberRef.current?.insertBefore(erroEl, lastElement);
        } else {
          // If there are no elements, prepend it
          phoneNumberRef.current?.prepend(erroEl);
        }
      }
      phoneNumberRef.current?.scrollIntoView({
        behavior: "smooth",
      });
      return;
    }
    if (typeof setStep !== "undefined") setStep(4);
  };

  useEffect(() => {
    if (!orderInfo.orderInfoText && orderInfo.newsLetterText) {
      dispatch(setOrderInfo({ ...orderInfo, newsLetterText: false }));
    }
  }, [orderInfo, dispatch]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4 pb-5 pt-3">
        <h2 className="text-xl font-bold">Order Summary</h2>
        <p className="text-gray-700">
          Please review your order details below to ensure everything is
          correct.
        </p>
      </div>
      <div className="grid grid-cols-11 gap-6 pb-20 pt-8 lg:gap-8">
        <div className="col-span-11 space-y-8 lg:col-span-7">
          <div className="flex items-start gap-4 font-bold">
            <div className="relative mt-1">
              <svg
                width="24"
                height="24"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.86383 1.90704C1.53636 1.79789 1.18241 1.97486 1.07326 2.30233C0.964103 2.62979 1.14108 2.98374 1.46854 3.0929L1.6893 3.16648C2.25297 3.35438 2.62564 3.47959 2.90018 3.60731C3.16015 3.72825 3.27255 3.82558 3.34456 3.9255C3.41658 4.02541 3.47337 4.16282 3.50589 4.44769C3.54024 4.74853 3.54119 5.14167 3.54119 5.73583L3.54118 7.96237C3.54117 9.10202 3.54115 10.0206 3.63829 10.7431C3.73913 11.4932 3.95488 12.1247 4.45648 12.6263C4.95807 13.1279 5.58964 13.3437 6.33973 13.4445C7.0622 13.5417 7.98079 13.5417 9.12045 13.5416H14.9995C15.3447 13.5416 15.6245 13.2618 15.6245 12.9166C15.6245 12.5715 15.3447 12.2916 14.9995 12.2916H9.16618C7.97 12.2916 7.13574 12.2903 6.50629 12.2057C5.89481 12.1235 5.571 11.9731 5.34036 11.7425C5.14437 11.5465 5.00634 11.2832 4.91885 10.8333H13.3512C14.1507 10.8333 14.5505 10.8333 14.8636 10.6269C15.1767 10.4204 15.3341 10.053 15.6491 9.3181L16.0062 8.48477C16.6808 6.91075 17.0181 6.12374 16.6476 5.56186C16.2771 4.99997 15.4208 4.99997 13.7084 4.99997H4.78706C4.78215 4.74357 4.77138 4.51223 4.74783 4.3059C4.7017 3.90189 4.6012 3.53117 4.35862 3.19461C4.11604 2.85805 3.79612 2.64547 3.42743 2.47395C3.08057 2.31259 2.63946 2.16557 2.11749 1.9916L1.86383 1.90704Z"
                  fill="#210203"
                />
                <path
                  d="M6.24935 15C6.9397 15 7.49935 15.5596 7.49935 16.25C7.49935 16.9404 6.9397 17.5 6.24935 17.5C5.55899 17.5 4.99935 16.9404 4.99935 16.25C4.99935 15.5596 5.55899 15 6.24935 15Z"
                  fill="#210203"
                />
                <path
                  d="M13.7493 15.0001C14.4397 15.0001 14.9993 15.5597 14.9993 16.2501C14.9993 16.9404 14.4397 17.5001 13.7493 17.5001C13.059 17.5001 12.4993 16.9404 12.4993 16.2501C12.4993 15.5597 13.059 15.0001 13.7493 15.0001Z"
                  fill="#210203"
                />
              </svg>

              <span className="absolute -right-2 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                {product.qty}
              </span>
            </div>
            <div className="flex w-full flex-col gap-4">
              <h2 className="text-lg">Shopping Cart</h2>
              <ProductCard />
              <Link
                href={"/cart"}
                className="inline-block py-3 font-medium text-black underline"
              >
                Return to Cart
              </Link>
            </div>
          </div>

          {/**
           * Delivery Options
           */}
          <div className="flex items-start gap-4">
            <div className="relative mt-1 flex h-5 w-5 items-center justify-center rounded-full font-semibold text-white">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.916 12.9166C18.1493 12.9166 18.3327 13.1 18.3327 13.3333V14.1666C18.3327 15.55 17.216 16.6666 15.8327 16.6666C15.8327 15.2916 14.7077 14.1666 13.3327 14.1666C11.9577 14.1666 10.8327 15.2916 10.8327 16.6666H9.16602C9.16602 15.2916 8.04102 14.1666 6.66602 14.1666C5.29102 14.1666 4.16602 15.2916 4.16602 16.6666C2.78268 16.6666 1.66602 15.55 1.66602 14.1666V12.5C1.66602 12.0416 2.04102 11.6666 2.49935 11.6666H10.416C11.566 11.6666 12.4993 10.7333 12.4993 9.58329V4.99996C12.4993 4.54163 12.8743 4.16663 13.3327 4.16663H14.0327C14.6327 4.16663 15.1827 4.49163 15.4827 5.00829L16.016 5.94163C16.091 6.07496 15.991 6.24996 15.8327 6.24996C14.6827 6.24996 13.7493 7.18329 13.7493 8.33329V10.8333C13.7493 11.9833 14.6827 12.9166 15.8327 12.9166H17.916Z"
                  fill="#210203"
                />
                <path
                  d="M6.66667 18.3333C7.58714 18.3333 8.33333 17.5871 8.33333 16.6667C8.33333 15.7462 7.58714 15 6.66667 15C5.74619 15 5 15.7462 5 16.6667C5 17.5871 5.74619 18.3333 6.66667 18.3333Z"
                  fill="#210203"
                />
                <path
                  d="M13.3327 18.3333C14.2532 18.3333 14.9993 17.5871 14.9993 16.6667C14.9993 15.7462 14.2532 15 13.3327 15C12.4122 15 11.666 15.7462 11.666 16.6667C11.666 17.5871 12.4122 18.3333 13.3327 18.3333Z"
                  fill="#210203"
                />
                <path
                  d="M18.3333 10.4417V11.6667H15.8333C15.375 11.6667 15 11.2917 15 10.8333V8.33333C15 7.875 15.375 7.5 15.8333 7.5H16.9083L18.1167 9.61667C18.2583 9.86667 18.3333 10.15 18.3333 10.4417Z"
                  fill="#210203"
                />
                <path
                  d="M10.9013 1.66663H4.74297C3.2513 1.66663 2.0013 2.73329 1.7263 4.14996H5.36797C5.68464 4.14996 5.93464 4.40829 5.93464 4.72496C5.93464 5.04163 5.68464 5.29163 5.36797 5.29163H1.66797V6.44163H3.83464C4.1513 6.44163 4.40964 6.69996 4.40964 7.01663C4.40964 7.33329 4.1513 7.58329 3.83464 7.58329H1.66797V8.73329H2.30964C2.6263 8.73329 2.88464 8.99163 2.88464 9.30829C2.88464 9.62496 2.6263 9.87496 2.30964 9.87496H1.66797V10.0666C1.66797 10.525 2.04297 10.9 2.5013 10.9H10.1263C10.9763 10.9 11.668 10.2083 11.668 9.35829V2.43329C11.668 2.00829 11.3263 1.66663 10.9013 1.66663Z"
                  fill="#210203"
                />
                <path
                  d="M1.72565 4.1499H1.60065H0.783984C0.467318 4.1499 0.208984 4.40824 0.208984 4.7249C0.208984 5.04157 0.467318 5.29157 0.783984 5.29157H1.54232H1.66732V4.74157C1.66732 4.54157 1.69232 4.34157 1.72565 4.1499Z"
                  fill="#210203"
                />
                <path
                  d="M1.54232 6.44165H0.783984C0.467318 6.44165 0.208984 6.69998 0.208984 7.01665C0.208984 7.33332 0.467318 7.58332 0.783984 7.58332H1.54232H1.66732V6.44165H1.54232Z"
                  fill="#210203"
                />
                <path
                  d="M1.54232 8.73328H0.783984C0.467318 8.73328 0.208984 8.99161 0.208984 9.30828C0.208984 9.62494 0.467318 9.87494 0.783984 9.87494H1.54232H1.66732V8.73328H1.54232Z"
                  fill="#210203"
                />
              </svg>
            </div>
            <div className="flex flex-col items-start gap-4">
              <h2 className="text-lg font-bold">Delivery Options</h2>
              {requestedDealer?.businessName ? (
                <div className="flex max-w-lg flex-col gap-y-3">
                  <h2 className="text-lg font-semibold">Dealer Requested</h2>
                  <div className="rounded-xs flex gap-2 bg-[#F7F7F7] p-4">
                    <InfoIcon className="fill-black stroke-white" />
                    <p className="text-muted">
                      Dealer setup will begin after checkout. An Amani
                      representative will confirm once the dealer is onboarded,
                      and shippling will proceed afterward.
                    </p>
                  </div>
                  <p className="text-lg text-muted">
                    {requestedDealer?.businessName}
                  </p>
                  <p className="text-lg text-muted">
                    {requestedDealer?.website}
                  </p>
                  <p className="text-lg text-muted">
                    {requestedDealer?.contact}
                  </p>
                </div>
              ) : null}
              {selectedDealerInfo ? (
                <div className="flex max-w-lg flex-col gap-y-3">
                  <h2 className="text-lg font-semibold">Dealer Selected</h2>
                  <p className="text-lg text-muted">
                    {selectedDealerInfo?.Addressee}
                  </p>
                  <p className="text-lg text-muted">
                    {selectedDealerInfo["Address Phone"]}
                  </p>
                </div>
              ) : (
                selectedOptionTitle
              )}

              <button
                onClick={() => {
                  if (typeof setStep !== "undefined") setStep(1);
                }}
                className="mt-2 font-semibold text-black underline"
              >
                Edit
              </button>
            </div>
          </div>
          {/**
           * Shipping Info
           */}
          <div className="flex items-start gap-4 font-bold">
            <div className="relative mt-1 flex h-5 w-5 items-center justify-center rounded-full text-white">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.916 12.9166C18.1493 12.9166 18.3327 13.1 18.3327 13.3333V14.1666C18.3327 15.55 17.216 16.6666 15.8327 16.6666C15.8327 15.2916 14.7077 14.1666 13.3327 14.1666C11.9577 14.1666 10.8327 15.2916 10.8327 16.6666H9.16602C9.16602 15.2916 8.04102 14.1666 6.66602 14.1666C5.29102 14.1666 4.16602 15.2916 4.16602 16.6666C2.78268 16.6666 1.66602 15.55 1.66602 14.1666V12.5C1.66602 12.0416 2.04102 11.6666 2.49935 11.6666H10.416C11.566 11.6666 12.4993 10.7333 12.4993 9.58329V4.99996C12.4993 4.54163 12.8743 4.16663 13.3327 4.16663H14.0327C14.6327 4.16663 15.1827 4.49163 15.4827 5.00829L16.016 5.94163C16.091 6.07496 15.991 6.24996 15.8327 6.24996C14.6827 6.24996 13.7493 7.18329 13.7493 8.33329V10.8333C13.7493 11.9833 14.6827 12.9166 15.8327 12.9166H17.916Z"
                  fill="#210203"
                />
                <path
                  d="M6.66667 18.3333C7.58714 18.3333 8.33333 17.5871 8.33333 16.6667C8.33333 15.7462 7.58714 15 6.66667 15C5.74619 15 5 15.7462 5 16.6667C5 17.5871 5.74619 18.3333 6.66667 18.3333Z"
                  fill="#210203"
                />
                <path
                  d="M13.3327 18.3333C14.2532 18.3333 14.9993 17.5871 14.9993 16.6667C14.9993 15.7462 14.2532 15 13.3327 15C12.4122 15 11.666 15.7462 11.666 16.6667C11.666 17.5871 12.4122 18.3333 13.3327 18.3333Z"
                  fill="#210203"
                />
                <path
                  d="M18.3333 10.4417V11.6667H15.8333C15.375 11.6667 15 11.2917 15 10.8333V8.33333C15 7.875 15.375 7.5 15.8333 7.5H16.9083L18.1167 9.61667C18.2583 9.86667 18.3333 10.15 18.3333 10.4417Z"
                  fill="#210203"
                />
                <path
                  d="M10.9013 1.66663H4.74297C3.2513 1.66663 2.0013 2.73329 1.7263 4.14996H5.36797C5.68464 4.14996 5.93464 4.40829 5.93464 4.72496C5.93464 5.04163 5.68464 5.29163 5.36797 5.29163H1.66797V6.44163H3.83464C4.1513 6.44163 4.40964 6.69996 4.40964 7.01663C4.40964 7.33329 4.1513 7.58329 3.83464 7.58329H1.66797V8.73329H2.30964C2.6263 8.73329 2.88464 8.99163 2.88464 9.30829C2.88464 9.62496 2.6263 9.87496 2.30964 9.87496H1.66797V10.0666C1.66797 10.525 2.04297 10.9 2.5013 10.9H10.1263C10.9763 10.9 11.668 10.2083 11.668 9.35829V2.43329C11.668 2.00829 11.3263 1.66663 10.9013 1.66663Z"
                  fill="#210203"
                />
                <path
                  d="M1.72565 4.1499H1.60065H0.783984C0.467318 4.1499 0.208984 4.40824 0.208984 4.7249C0.208984 5.04157 0.467318 5.29157 0.783984 5.29157H1.54232H1.66732V4.74157C1.66732 4.54157 1.69232 4.34157 1.72565 4.1499Z"
                  fill="#210203"
                />
                <path
                  d="M1.54232 6.44165H0.783984C0.467318 6.44165 0.208984 6.69998 0.208984 7.01665C0.208984 7.33332 0.467318 7.58332 0.783984 7.58332H1.54232H1.66732V6.44165H1.54232Z"
                  fill="#210203"
                />
                <path
                  d="M1.54232 8.73328H0.783984C0.467318 8.73328 0.208984 8.99161 0.208984 9.30828C0.208984 9.62494 0.467318 9.87494 0.783984 9.87494H1.54232H1.66732V8.73328H1.54232Z"
                  fill="#210203"
                />
              </svg>
            </div>
            <div className="flex flex-col items-start gap-4">
              <h2 className="text-lg">Shipping Info</h2>
              <div>
                {shippingAddress?.name ? (
                  <>
                    <p className="font-light text-gray-700">
                      {shippingAddress.name}
                    </p>
                    <p className="font-light text-gray-700">
                      {shippingAddress.address1 || shippingAddress.address2}
                    </p>
                    <p className="font-light text-gray-700">
                      {shippingAddress.cityState} {shippingAddress.zipCode}
                    </p>
                  </>
                ) : selectedDealer ? (
                  <p className="font-medium">
                    Authorized Dealer Contact: {selectedDealer}
                  </p>
                ) : (
                  ""
                )}
              </div>
              <button
                onClick={() => {
                  if (typeof setStep !== "undefined") {
                    if (selectedOptionTitle !== "Direct To Customer") {
                      setStep(1);
                    } else {
                      setStep(2);
                    }
                  }
                }}
                className="mt-2 font-semibold text-black underline"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
        {/**
         * Order Summary
         */}
        <div className="rounded-xs sticky top-0 col-span-11 mt-12 h-fit bg-[#F7F7F7] py-5 lg:col-span-4">
          <div className="w-full px-2 pb-4 sm:px-6">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Do you have a coupon code?</AccordionTrigger>
                <AccordionContent className="flex items-center gap-2 px-1 py-1">
                  <Input
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Enter your coupon "
                    className="h-12 !bg-white"
                  />
                  <Button
                    disabled={isLoading}
                    onClick={() => {
                      if (isCouponApplied) {
                        dispatch(revokeCouponCode());
                      } else {
                        applyCoupon(coupon);
                      }
                    }}
                    className="!h-12 font-semibold"
                  >
                    {isLoading
                      ? "Loading"
                      : isCouponApplied
                        ? "Revoke"
                        : "Apply"}
                  </Button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="space-y-2 text-[#210203]">
            <div className="px-md flex items-baseline justify-between py-2">
              <p className="text-base leading-[19px] text-[#210203]">
                <span className="text-base font-normal text-[#210203]">
                  Item(s) Total
                </span>
              </p>
              <div className="relative flex items-baseline gap-0">
                <p className="text-2xl leading-[29px] text-[#210203]">
                  <span className="text-2xl font-bold text-[#210203]">
                    ${Math.floor(subTotalCost)}.
                  </span>
                  <span className="text-sm font-bold text-[#210203]">
                    {subTotalCost.toFixed(2).split(".")[1]}
                  </span>
                </p>
              </div>
            </div>
            <div className="px-md relative flex w-full items-baseline justify-between self-stretch">
              <div className="relative flex items-center gap-2">
                <p className="text-base leading-[19px] text-[#210203]">
                  <span className="text-base font-normal text-[#210203]">
                    Shipping{" "}
                  </span>
                </p>
                <div className="relative flex items-center gap-0">
                  <p className="text-base leading-[19px] text-[#210203]">
                    <span className="text-base font-semibold text-[#210203]">
                      (33625)
                    </span>
                  </p>

                  <p className="text-base leading-[19px] text-[#210203]">
                    <span className="text-base font-normal text-[#210203]">
                      :
                    </span>
                  </p>
                </div>
              </div>
              <div className="relative flex items-baseline gap-0">
                <h4 className="text-2xl leading-[29px] text-[#210203]">
                  <span className="text-2xl font-bold text-[#210203]">
                    Free
                  </span>
                </h4>
              </div>
            </div>

            {discount ? (
              <div className="px-md flex items-center justify-between py-2">
                <span className="">Discount:</span>
                <span className="text-2xl font-bold">-${discount}</span>
              </div>
            ) : null}

            {cartType === "CENTER_CAP_ONLY" && (
              <div className="px-md flex justify-between py-2">
                <span className="">Delivery Charge:</span>
                <span className="text-2xl font-bold">$14.99</span>
              </div>
            )}

            <div className="px-md relative flex w-full items-baseline justify-between self-stretch border-x-0 border-b border-t-0 border-[#cfcfcf] pb-4 pt-2">
              <h5 className="text-xl leading-6 text-[#210203]">
                <span className="text-xl font-normal text-[#210203]">
                  Total:
                </span>
              </h5>
              <div className="relative flex items-baseline gap-0">
                <p className="text-[32px] leading-[38px] text-[#210203]">
                  <span className="text-[32px] font-bold text-[#210203]">
                    ${totalCost.toFixed(2)}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="px-md space-y-4 py-5">
            {/* <div ref={phoneNumberRef} className="grid gap-y-4">
              <h2 className="font-bold text-[20px]">Let's stay in touch!</h2>
              <div
                className="flex items-start gap-2 cursor-pointer"
                onClick={() =>
                  setOrderInfo((prev: any) => ({
                    ...prev,
                    orderInfoText: !orderInfo.orderInfoText,
                  }))
                }
              >
                <Checkbox
                  checked={orderInfo.orderInfoText}
                  className="rounded-[6px] border border-[#AAAAAA] bg-white h-6 w-6 mt-1"
                />
                <p className="text-lg m-0 p-0">
                  Receive <span className="font-bold">order-related</span> text
                  message
                </p>
              </div>
              <div
                onClick={() => {
                  if (orderInfo.orderInfoText) {
                    setOrderInfo((prev: any) => ({
                      ...prev,
                      newsLetterText: !orderInfo.newsLetterText,
                    }));
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    if (orderInfo.orderInfoText) {
                      setOrderInfo((prev: any) => ({
                        ...prev,
                        newsLetterText: !orderInfo.newsLetterText,
                      }));
                    }
                  }
                }}
                className={cn(
                  "mt-2 flex items-start gap-2 font-normal ml-6 cursor-pointer",
                  !orderInfo.orderInfoText &&
                    "cursor-not-allowed text-[#B1AAAA]"
                )}
              >
                <Checkbox
                  checked={orderInfo.newsLetterText}
                  className="rounded-[6px] border border-[#AAAAAA] bg-white h-6 w-6 mt-1"
                />
                <p className="text-lg m-0 p-0">
                  Receive deals and promotions text messages
                </p>
              </div>
              <div className="grid gap-y-3 error-wrapper">
                <Label
                  className={cn(
                    "font-medium text-lg",
                    !orderInfo.orderInfoText && "text-[#B1AAAA]"
                  )}
                >
                  Phone Number
                </Label>
                <Input
                  disabled={!orderInfo.orderInfoText}
                  value={orderInfo.phone}
                  type="tel"
                  onChange={(e) =>
                    setOrderInfo((prev: any) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                  className="rounded-[10px] h-14 placeholder:text-[#B1AAAA] bg-white"
                  placeholder="+1 (000) 0000 00 00"
                />
              </div>
            </div> */}
            <div ref={newsLetterRef} className="grid gap-y-3">
              <p className="text-lg">
                Would you like to recive emails with special offers and new
                production information?
              </p>
              <div className="grid gap-3 font-semibold">
                <div
                  className="flex cursor-pointer items-center gap-2"
                  onClick={() =>
                    dispatch(setOrderInfo({ ...orderInfo, newsLetter: "yes" }))
                  }
                >
                  <Checkbox
                    checked={orderInfo.newsLetter === "yes"}
                    className="h-6 w-6 rounded-full border border-[#AAAAAA] bg-white data-[state=checked]:border-none"
                  />
                  <p className="text-sm">Yes</p>
                </div>
                <div
                  onClick={() =>
                    dispatch(setOrderInfo({ ...orderInfo, newsLetter: "no" }))
                  }
                  className="flex cursor-pointer items-center gap-2"
                >
                  <Checkbox
                    checked={orderInfo.newsLetter === "no"}
                    className="h-6 w-6 rounded-full border border-[#AAAAAA] bg-white data-[state=checked]:border-none"
                  />
                  <p className="text-sm">No, thanks.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="px-md">
            <Button
              onClick={handlePlaceOrderModal}
              className="rounded-xs mt-4 flex h-14 w-full items-center font-bold"
            >
              <svg
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.166 3.33337H8.83268C5.68999 3.33337 4.11864 3.33337 3.14233 4.30968C2.43938 5.01264 2.24255 6.02406 2.18745 7.70837H18.8113C18.7561 6.02406 18.5593 5.01264 17.8564 4.30968C16.8801 3.33337 15.3087 3.33337 12.166 3.33337Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.166 16.6667H8.83268C5.68999 16.6667 4.11864 16.6667 3.14233 15.6904C2.16602 14.7141 2.16602 13.1427 2.16602 10C2.16602 9.63176 2.16602 9.28507 2.16759 8.95837H18.8311C18.8327 9.28507 18.8327 9.63176 18.8327 10C18.8327 13.1427 18.8327 14.7141 17.8564 15.6904C16.8801 16.6667 15.3087 16.6667 12.166 16.6667ZM13.87 10.2084C14.2307 10.2083 14.5613 10.2083 14.8304 10.2445C15.1266 10.2843 15.4397 10.378 15.6972 10.6355C15.9547 10.893 16.0484 11.2061 16.0883 11.5024C16.1244 11.7714 16.1244 12.1021 16.1244 12.4628V12.5373C16.1244 12.898 16.1244 13.2287 16.0883 13.4977C16.0484 13.7939 15.9547 14.1071 15.6972 14.3646C15.4397 14.6221 15.1266 14.7158 14.8304 14.7556C14.5613 14.7918 14.2306 14.7918 13.87 14.7917L13.8327 14.7917L13.7954 14.7917C13.4347 14.7918 13.104 14.7918 12.835 14.7556C12.5388 14.7158 12.2257 14.6221 11.9682 14.3646C11.7106 14.1071 11.6169 13.7939 11.5771 13.4977C11.5409 13.2287 11.541 12.898 11.541 12.5373L11.541 12.5L11.541 12.4628C11.541 12.1021 11.5409 11.7714 11.5771 11.5024C11.6169 11.2061 11.7106 10.893 11.9682 10.6355C12.2257 10.378 12.5388 10.2843 12.835 10.2445C13.104 10.2083 13.4347 10.2083 13.7954 10.2084H13.87ZM4.87435 11.25C4.87435 10.9049 5.15417 10.625 5.49935 10.625H7.16602C7.51119 10.625 7.79102 10.9049 7.79102 11.25C7.79102 11.5952 7.51119 11.875 7.16602 11.875H5.49935C5.15417 11.875 4.87435 11.5952 4.87435 11.25ZM4.87435 13.75C4.87435 13.4049 5.15417 13.125 5.49935 13.125H8.83268C9.17786 13.125 9.45768 13.4049 9.45768 13.75C9.45768 14.0952 9.17786 14.375 8.83268 14.375H5.49935C5.15417 14.375 4.87435 14.0952 4.87435 13.75Z"
                  fill="white"
                />
                <path
                  d="M12.8521 11.5193L12.8541 11.5183C12.8557 11.5174 12.8584 11.5161 12.8627 11.5143C12.8808 11.5069 12.9211 11.4941 13.0016 11.4833C13.1772 11.4597 13.4222 11.4584 13.8327 11.4584C14.2432 11.4584 14.4882 11.4597 14.6638 11.4833C14.7443 11.4941 14.7846 11.5069 14.8027 11.5143C14.8069 11.5161 14.8097 11.5174 14.8113 11.5183L14.8133 11.5194L14.8145 11.5214C14.8153 11.523 14.8167 11.5258 14.8184 11.53C14.8259 11.5482 14.8386 11.5885 14.8494 11.6689C14.873 11.8445 14.8743 12.0895 14.8743 12.5C14.8743 12.9105 14.873 13.1556 14.8494 13.3312C14.8386 13.4116 14.8259 13.4519 14.8184 13.4701C14.8167 13.4743 14.8153 13.477 14.8145 13.4786L14.8133 13.4807L14.8113 13.4818C14.8097 13.4827 14.8069 13.484 14.8027 13.4857C14.7846 13.4932 14.7443 13.506 14.6638 13.5168C14.4882 13.5404 14.2432 13.5417 13.8327 13.5417C13.4222 13.5417 13.1772 13.5404 13.0016 13.5168C12.9211 13.506 12.8808 13.4932 12.8627 13.4857C12.8584 13.484 12.8557 13.4827 12.8541 13.4818L12.852 13.4807L12.8509 13.4786C12.8501 13.477 12.8487 13.4743 12.847 13.4701C12.8395 13.4519 12.8268 13.4116 12.816 13.3312C12.7923 13.1556 12.791 12.9105 12.791 12.5C12.791 12.0895 12.7923 11.8445 12.816 11.6689C12.8268 11.5885 12.8395 11.5482 12.847 11.53C12.8487 11.5258 12.8501 11.523 12.8509 11.5214L12.8521 11.5193Z"
                  fill="white"
                />
              </svg>
              <span className="text-[18px]">Continue to Payment</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
