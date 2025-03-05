"use client";
import {
  setBillingAddress,
  setOrderInfo,
} from "@/app/globalRedux/features/checkout/checkout-slice";
import { RootState, useTypedSelector } from "@/app/globalRedux/store";
import Container from "@/app/ui/container/container";
import { Flex } from "@/components/shared/flex";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useCheckout } from "@/context/CheckoutContext";
import { usePaypalCheckout } from "@/hooks/use-paypal-checkout";
import { useStripeCheckout } from "@/hooks/use-stripe-checkout";
import { BillingAddress } from "@/types/order";
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
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Input } from "./StepOne";

export const StepTwo: React.FC<any> = () => {
  const [activeAccordion, setActiveAccordion] = useState("card");
  const [shippingSameAsBilling, setShippingSameAsBilling] = useState(true);
  const [showTermsAlert, setShowTermsAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const termsRef = useRef<HTMLDivElement>(null);
  const billingAddressUpdate = useSelector(
    (state: RootState) => state.persisted.checkout.billingAddress,
  );
  const [triggerPayment, setTriggerPayment] = useState(false);

  const { initiateCheckout } = useStripeCheckout();
  const { initiatePaypalCheckout } = usePaypalCheckout();

  /**
   * Redux Store And Dispatch Hook
   */
  const { billingAddress, shippingAddress, orderInfo } = useTypedSelector(
    (state) => state.persisted.checkout,
  );
  const dispatch = useDispatch();

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
  } = useForm<BillingAddress>({
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
      case "card":
      case "affirm":
      case "cashapp":
      case "klarna":
        await initiateCheckout();
        break;
      case "paypal":
        await initiatePaypalCheckout();
        break;
      default:
        console.warn("No valid payment method selected.");
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

    const paymentMethodsRequiringValidation = new Set([
      "card",
      "affirm",
      "cashapp",
      "klarna",
      "paypal",
    ]);

    if (paymentMethodsRequiringValidation.has(activeAccordion)) {
      const requiredFields: (keyof BillingAddress)[] = [
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
        (field) => formValues[field]?.trim().length,
      );

      return !hasAllRequiredFields || !orderInfo.termsAndConditions;
    }

    return false;
  }, [isLoading, activeAccordion, formValues, orderInfo.termsAndConditions]); // Depend on formValues

  useEffect(() => {
    const subscription = watch(() => {
      trigger();
    });

    return () => subscription.unsubscribe();
  }, [watch, trigger]);

  useEffect(() => {
    if (shippingSameAsBilling) {
      setValue("fname", shippingAddress.fname);
      setValue("lname", shippingAddress.lname);
      setValue("zipCode", shippingAddress.zipCode);
      setValue("name", shippingAddress.name);
      setValue("country", "USA");
      setValue("cityState", shippingAddress.cityState);
      setValue("company", shippingAddress.company);
      setValue("phone", shippingAddress.phone);
      setValue("email", shippingAddress.email);
      setValue("address1", shippingAddress.address1);
      setValue("address2", shippingAddress.address2);
    } else {
      reset({
        address1: "",
        address2: "",
        cityState: "",
        company: "",
        country: "",
        email: "",
        fname: "",
        lname: "",
        name: "",
        phone: "",
        zipCode: "",
      });
    }
  }, [shippingSameAsBilling, setValue, reset, shippingAddress]);

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
          <div>
            <div className="flex flex-col space-y-4">
              <div
                onClick={() => toggleAccordion("card")}
                className="relative cursor-pointer rounded-lg border p-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex min-w-0 cursor-pointer items-center">
                    {/* Radio button with absolute positioning */}
                    <div className="absolute left-2.5 top-1/2 -translate-y-1/2">
                      <span
                        className={`inline-block h-5 w-5 rounded-full border ${
                          activeAccordion === "card"
                            ? "border-4 border-black"
                            : "border-gray-600"
                        }`}
                      />
                    </div>
                    {/* Content with consistent left padding */}
                    <div className="flex items-center pl-10">
                      <img
                        src="https://js.stripe.com/v3/fingerprinted/img/card-ce24697297bd3c6a00fdd2fb6f760f0d.svg"
                        className="mr-2 h-4 w-4"
                        alt="Credit Card"
                      />
                      <span className="truncate text-xl font-semibold text-gray-900">
                        Card
                      </span>
                    </div>
                  </div>
                  <div className="ml-auto flex gap-2">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div
                        key={index}
                        className="flex h-6 w-10 items-center justify-center rounded-sm bg-[#d9d9d9]"
                      >
                        <Image
                          src={`/accepted-cards/${index + 1}.png`}
                          width={40}
                          height={40}
                          alt=""
                          className="object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div
                onClick={() => toggleAccordion("affirm")}
                className="relative cursor-pointer rounded-lg border p-2.5"
              >
                <div className="flex items-center">
                  <div className="absolute left-2.5 top-1/2 -translate-y-1/2">
                    <span
                      className={`inline-block h-5 w-5 rounded-full border ${
                        activeAccordion === "affirm"
                          ? "border-4 border-black"
                          : "border-gray-600"
                      }`}
                    />
                  </div>
                  <div className="flex items-center pl-10">
                    <img
                      src="https://js.stripe.com/v3/fingerprinted/img/affirm-bce57680b3d99bf1f1390bda5d024909.svg"
                      className="mr-2 h-4 w-4"
                      alt="Affirm"
                    />
                    <span className="truncate text-xl font-semibold text-gray-900">
                      Affirm
                    </span>
                  </div>
                </div>
              </div>

              <div
                onClick={() => toggleAccordion("cashapp")}
                className="relative cursor-pointer rounded-lg border p-2.5"
              >
                <div className="flex items-center">
                  <div className="absolute left-2.5 top-1/2 -translate-y-1/2">
                    <span
                      className={`inline-block h-5 w-5 rounded-full border ${
                        activeAccordion === "cashapp"
                          ? "border-4 border-black"
                          : "border-gray-600"
                      }`}
                    />
                  </div>
                  <div className="flex items-center pl-10">
                    <img
                      src="https://js.stripe.com/v3/fingerprinted/img/payment-methods/icon-pm-cashapp-981164a833e417d28a8ac2684fda2324.svg"
                      className="mr-2 h-4 w-4"
                      alt="Cash App"
                    />
                    <span className="truncate text-xl font-semibold text-gray-900">
                      Cash App Pay
                    </span>
                  </div>
                </div>
              </div>

              <div
                onClick={() => toggleAccordion("klarna")}
                className="relative cursor-pointer rounded-lg border p-2.5"
              >
                <div className="flex items-center">
                  <div className="absolute left-2.5 top-1/2 -translate-y-1/2">
                    <span
                      className={`inline-block h-5 w-5 rounded-full border ${
                        activeAccordion === "klarna"
                          ? "border-4 border-black"
                          : "border-gray-600"
                      }`}
                    />
                  </div>
                  <div className="flex items-center pl-10">
                    <img
                      src="https://js.stripe.com/v3/fingerprinted/img/klarna-531cd07130cfad7de4c678ef467cbeb7.svg"
                      className="mr-2 h-4 w-4"
                      alt="Klarna"
                    />
                    <span className="truncate text-xl font-semibold text-gray-900">
                      Klarna
                    </span>
                  </div>
                </div>
              </div>

              <div
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
              </div>
            </div>

            <div className="flex flex-col gap-y-8 pt-8">
              <h2 className="text-xl font-bold">Billing Info</h2>
              <div
                className="flex cursor-pointer items-center gap-1 py-2"
                onClick={() => setShippingSameAsBilling((prev) => !prev)}
              >
                <Checkbox
                  checked={shippingSameAsBilling}
                  className="h-5 w-5 border-black data-[state=checked]:bg-black"
                />
                <span className="text-lg">Same as shipping address</span>
              </div>
              <div className="space-y-8">
                <div className="flex flex-col gap-y-8">
                  <div className="flex gap-4">
                    <Input
                      label="First Name"
                      required
                      error={errors.fname?.message}
                      {...register("fname", {
                        required: "First name is required",
                      })}
                    />
                    <Input
                      label="Last Name"
                      required
                      error={errors.lname?.message}
                      {...register("lname", {
                        required: "Last name is required",
                      })}
                    />
                  </div>
                  <Input label="Company/Care of" {...register("company")} />
                  <Flex>
                    <div className="w-full space-y-3">
                      <Input
                        label="Address Line 1"
                        required
                        error={errors.address1?.message}
                        {...register("address1", {
                          required: "Address is required",
                        })}
                      />
                      <div className="text-sm text-muted">
                        Note: Cannot be a P.O. box, except at APO/FPO addresses.
                      </div>
                    </div>
                    <Input label="Address Line 2" {...register("address2")} />
                  </Flex>
                  <Input
                    label="ZIP/Postal Code"
                    required
                    error={errors.zipCode?.message}
                    {...register("zipCode", {
                      required: "ZIP/Postal Code is required",
                    })}
                  />
                  <Flex>
                    <Input
                      label="Country"
                      required
                      error={errors.country?.message}
                      {...register("country", {
                        required: "Country is required",
                      })}
                      placeholder="Enter country name or wait for auto-detection"
                    />
                    <Input
                      label="City/State"
                      required
                      error={errors.cityState?.message}
                      {...register("cityState", {
                        required: "City/State is required",
                      })}
                    />
                  </Flex>
                  <Flex>
                    <Input
                      label="Phone Number"
                      type="tel"
                      required
                      error={errors.phone?.message}
                      {...register("phone", {
                        required: "Phone number is required",
                      })}
                    />
                    <Input
                      label="Email Address"
                      required
                      type="email"
                      error={errors.email?.message}
                      {...register("email", {
                        required: "Email address is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Please enter a valid email address",
                        },
                      })}
                    />
                  </Flex>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-11 h-full w-full space-y-6 lg:col-span-4">
          <div className="rounded-xs bg-[#F7F7F7] py-7">
            <div className="space-y-6 text-[#210203]">
              <div className="space-y-2 text-[#210203]">
                <div className="flex items-baseline justify-between px-6 py-2">
                  <p className="text-base leading-[19px] text-[#210203]">
                    Item(s) Total
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
                    <div className="relative flex items-center gap-0">
                      <p className="text-base leading-[19px] text-[#210203]">
                        ({shippingAddress.zipCode}):
                      </p>
                    </div>
                  </div>
                  <div className="relative flex items-baseline gap-0">
                    <h4 className="text-xl font-bold leading-[29px] text-[#210203]">
                      Free
                    </h4>
                  </div>
                </div>
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
                        ${totalCost?.toFixed(2)}
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
                    }),
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
