"use client";

import { useTypedSelector } from "@/app/globalRedux/store";
import Container from "@/app/ui/container/container";
import LoadingSpinner from "@/app/ui/loading-spinner/loading-spinner";
import { useCheckout } from "@/context/CheckoutContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Stepper } from "./_components/Stepper";
import { Renderer } from "./_components/StepRenderer";

const Page: React.FC = () => {
  const router = useRouter();
  const { step, setStep } = useCheckout();
  const products = useTypedSelector((state) => state.persisted.cart.products);
  const [isLoading, setIsLoading] = useState(true);

  const steps = [
    {
      title: "Shipping Info",
      subTitle: "Enter shipping info and a few additional details.",
    },
    {
      title: "Secure payment options",
      subTitle: "Check order details to ensure everything is correct.",
    },
    {
      title: "Order Confirmation",
      subTitle: "All information you need about your order.",
    },
  ];

  useEffect(() => {
    // if (Object.keys(products).length === 0 && step !== 5) {
    //   toast.error(
    //     "Your cart is empty. Please add items before proceeding to checkout.",
    //   );
    //   router.push("/cart");
    //   return;
    // }
    setIsLoading(false);
  }, [products, router, step]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="my-10 w-full">
      <Container>
        <Stepper currentStep={step} steps={steps} setStep={setStep} />
        <Renderer setStep={setStep} step={step} />
      </Container>
    </div>
  );
};

export default Page;
