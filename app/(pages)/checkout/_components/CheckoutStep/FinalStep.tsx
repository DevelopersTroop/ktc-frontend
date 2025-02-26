/** eslint-disable @next/next/no-img-element */
"use client";

import { emptyCart } from "@/app/globalRedux/features/cart/cart-slice";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { useCheckout } from "@/context/CheckoutContext";
import useAuth from "@/hooks/useAuth";
import { Clock, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import {
  revokeCouponCode,
  setIsAccountCreated,
  updateOrderSuccessData,
} from "@/app/globalRedux/features/checkout/checkout-slice";
import { useTypedSelector } from "@/app/globalRedux/store";
import { apiBaseUrl } from "@/app/utils/api";
import { TUser } from "@/types/user";
import { CartSummary } from "./CartSummary";
import { CreateAccountSection } from "./CreateAccountSection";
import { DeliveryOptions } from "./DeliveryOptions";
import { OrderConfirmation } from "./OrderConfirmation";
import { OrderSummary } from "./OrderSummary";
import { PaymentData, PaymentInfo } from "./PaymentInfo";
import { ShippingInfo } from "./ShippingInfo";

export const FinalStep: React.FC = () => {
  /**
   * Redux Store & Dispatch hook
   */
  const {
    orderSuccessData,
    shippingAddress,
    billingAddress,
    isAccountCreated,
  } = useTypedSelector((state) => state.persisted.checkout);
  const dispatch = useDispatch();

  /**
   * Checkout context
   */
  const { clearCheckoutState, setStep } = useCheckout();
  const { user, signUp } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [showSurvey, setShowSurvey] = useState(false);
  const [survey, setSurvey] = useState<"yes" | "no" | "">("");
  const [verifying, setVerifying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [paymentData, setPaymentData] = useState(null);
  const [userInfo, setUserInfo] = useState<{ email: string; password: string }>(
    {
      email: "",
      password: "",
    },
  );

  const handleCreateAccount = async () => {
    if (!orderSuccessData) {
      console.error("Order data is not available");
      return;
    }

    const { shippingAddress, billingAddress } = orderSuccessData?.data;
    const firstName =
      billingAddress?.name?.split(" ")[0] ||
      shippingAddress?.name?.split(" ")[0];
    const lastName =
      billingAddress?.name?.split(" ")[1] ||
      shippingAddress?.name?.split(" ")[1];
    const email = billingAddress?.email || shippingAddress?.email;
    const password = userInfo.password;

    //added toast for account creation
    signUp({ firstName, lastName, email, password })
      .then((res: { user: TUser }) => {
        if (res?.user) {
          dispatch(setIsAccountCreated(true));
          toast.success("Account has been created successfully.");
        }
      })
      .catch((error: { message: string }) => {
        toast.error(error.message);
      });
  };

  const handleSumbitSurvey = (data: typeof survey) => {
    setSurvey(data);
    setShowSurvey(false);
  };

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        //Stripe params
        const sessionId = searchParams.get("session_id");
        const orderId = searchParams.get("order_id");

        //PayPal params
        const paymentId = searchParams.get("paymentId");
        const PayerID = searchParams.get("PayerID");

        if (!orderId) {
          throw new Error("Missing order information");
        }

        const interval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 90) {
              clearInterval(interval);
              return 90;
            }
            return prev + 10;
          });
        }, 200);

        let response;

        if (sessionId) {
          // Stripe
          response = await fetch(
            `${apiBaseUrl}/payments/stripe/verify-payment?sessionId=${sessionId}&orderId=${orderId}`,
          );
        } else {
          // PayPal
          response = await fetch(
            `${apiBaseUrl}/payments/verify-paypal-payment?paymentId=${paymentId}&PayerID=${PayerID}&orderId=${orderId}`,
          );
        }

        const result = await response.json();

        if (response.ok && result.data?.order) {
          setProgress(100);
          dispatch(updateOrderSuccessData(result.data.order));
          setPaymentData(result.data.payment);
          toast.error("Payment verification failed");

          clearCheckoutState();
          setStep(5);
          dispatch(emptyCart());
          dispatch(revokeCouponCode());
        } else {
          // throw new Error(result.message || "Payment verification failed");
        }
      } catch (err) {
        console.log("err", err);
        // Redirect to checkout page with error status
        router.push("/checkout?step=4&order_status=false");
      } finally {
        setVerifying(false);
      }
    };

    verifyPayment();
  }, [searchParams, router, dispatch, clearCheckoutState, setStep]);

  useEffect(() => {
    setUserInfo((prev) => ({
      ...prev,
      email: shippingAddress.email || billingAddress.email,
    }));
  }, [billingAddress, shippingAddress]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (verifying) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-4">
        <div className="w-full max-w-md space-y-4">
          <div className="pb-2 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
              <Clock className="h-8 w-8 animate-pulse text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Verifying Payment
            </h2>
            <p className="mt-2 text-gray-600">
              Please wait while we confirm your payment...
            </p>
          </div>
          <Progress value={progress} className="h-2 w-full" />
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <Loader2 className="h-4 w-4 animate-spin" />
            Processing your order
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-11 gap-6 pb-20 pt-8 lg:gap-8">
        <div className="col-span-11 lg:col-span-7">
          <OrderConfirmation
            email={orderSuccessData?.data?.shippingAddress?.email}
            orderData={orderSuccessData}
          />

          <div className="flex flex-col gap-8">
            <CartSummary
              productsInfo={orderSuccessData?.data?.productsInfo}
              totalCost={orderSuccessData?.data?.totalCost}
            />

            <DeliveryOptions
              requestedDealer={orderSuccessData?.data?.requestedDealer}
              selectedDealerInfo={orderSuccessData?.data?.selectedDealerInfo}
              selectedOptionTitle={orderSuccessData?.data?.selectedOptionTitle}
            />

            <ShippingInfo
              shippingAddress={orderSuccessData?.data?.shippingAddress}
              selectedDealer={orderSuccessData?.data?.selectedDealer}
            />

            {paymentData && (
              <PaymentInfo paymentData={paymentData as PaymentData} />
            )}
          </div>
        </div>

        <div className="sticky top-0 col-span-11 flex flex-col gap-8 lg:col-span-4">
          {!isAccountCreated && !user?._id && (
            <CreateAccountSection
              email={
                orderSuccessData?.data?.shippingAddress?.email ||
                orderSuccessData?.data?.billingAddress?.email
              }
              onPasswordChange={(password) =>
                setUserInfo((prev) => ({ ...prev, password }))
              }
              onCreateAccount={handleCreateAccount}
            />
          )}
          <OrderSummary
            totalCost={orderSuccessData?.data?.totalCost}
            netCost={orderSuccessData?.data?.netCost}
            cartType={orderSuccessData?.data?.cartType}
            discount={orderSuccessData?.data?.discount}
            zipCode={orderSuccessData?.data?.shippingAddress?.zipCode}
          />
        </div>
      </div>

      <Dialog open={showSurvey} onOpenChange={setShowSurvey}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="relative w-fit">
              <img
                src="/images/AmaniLogo.webp"
                className="h-20 w-20 rounded-full"
              />
            </DialogTitle>
          </DialogHeader>
          <h2 className="mt-2 text-lg font-bold">Your Opinion Counts</h2>
          <h3 className="font-bold">
            Is this your first time placing an order with us?
          </h3>
          <div className="flex items-center gap-4">
            <div
              onClick={() => handleSumbitSurvey("yes")}
              className="flex cursor-pointer items-center gap-2 font-bold"
            >
              <Checkbox
                checked={survey === "yes"}
                className="rounded-full border-slate-300"
              />
              <p>Yes</p>
            </div>
            <div
              onClick={() => handleSumbitSurvey("no")}
              className="flex cursor-pointer items-center gap-2 font-bold"
            >
              <Checkbox
                checked={survey === "no"}
                className="rounded-full border-slate-300"
              />
              <p>No</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
