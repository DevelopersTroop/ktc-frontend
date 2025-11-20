import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useCheckout } from "./CheckoutContext";
import { useAppDispatch, useTypedSelector } from "@/app/globalRedux/store";
import { apiInstance } from "@/app/globalRedux/api/base";
import LoadingSpinner from "@/app/ui/loading-spinner/loading-spinner";
import { Elements } from "@stripe/react-stripe-js";
import { setTaxAmount } from "@/app/globalRedux/features/checkout/checkout-slice";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type TStripeContext = {
  clientSecret?: string;
  paymentIntentId?: string;
};

const StripeContext = createContext<TStripeContext | undefined>(undefined);

// --------------------
// Stripe Instance
// --------------------
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

// --------------------
// Provider Component
// --------------------
export default function StripeProvider({ children }: React.PropsWithChildren) {
  const { totalCost, step } = useCheckout();
  const { billingAddress, shippingAddress } = useTypedSelector(
    (state) => state.persisted.checkout
  );
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState<string>("");
  const [paymentIntentId, setPaymentIntentId] = useState<string>("");
  const hasFetched = useRef(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [err, setErr] = useState("");

  useEffect(() => {
    if (
      !totalCost ||
      hasFetched.current ||
      (!billingAddress && !shippingAddress)
    )
      return;
    hasFetched.current = true;
    setLoading(true);

    const amount = Math.round(parseFloat(totalCost) * 100); // always integer cents

    apiInstance
      .post<{
        data: {
          secret: string;
          id: string;
          taxAmount: number;
          totalWithTax: number;
        };
      }>("/payments/stripe/intent", {
        amount,
        currency: "USD",
        billingAddress,
        shippingAddress,
      })
      .then((res) => {
        console.log("StripeProvider -> PaymentIntent created:", res.data);
        setClientSecret(res.data.data.secret);
        setPaymentIntentId(res.data.data.id);
        dispatch(
          setTaxAmount({
            taxAmount: res.data.data.taxAmount / 100,
            totalWithTax: res.data.data.totalWithTax / 100,
          })
        );
      })
      .catch((err) => {
        setErr(
          err.response.data.errors.map((c: any) => c.message).join("") as string
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [totalCost, billingAddress, shippingAddress, dispatch, step]);

  // Wait until clientSecret is ready
  if (loading) return <LoadingSpinner />;

  if (!clientSecret || err) {
    return (
      <div className="text-center py-10 text-2xl font-semibold text-black">
        <h2>{err ?? "You don't have valid shipping or billing address"}</h2>
        {err.includes("tax") && (
          <Button onClick={() => router.push("?step=1")}>Go back</Button>
        )}
      </div>
    );
  }

  // Stripe Element appearance and options
  const options: StripeElementsOptions = {
    clientSecret,
    loader: "always",
    appearance: {
      theme: "flat",
      variables: {
        colorPrimary: "#000",
        accordionItemSpacing: "16px",
        borderRadius: "12px",
      },
    },
  };

  return (
    <StripeContext.Provider value={{ clientSecret, paymentIntentId }}>
      <Elements stripe={stripePromise} options={options}>
        {children}
      </Elements>
    </StripeContext.Provider>
  );
}

// --------------------
// Hook
// --------------------
export const useStripeContext = () => {
  const context = useContext(StripeContext);
  if (!context)
    throw new Error("useStripeContext must be used within StripeProvider");
  return context;
};
