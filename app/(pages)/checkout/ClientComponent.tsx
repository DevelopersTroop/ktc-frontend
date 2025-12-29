"use client";

import { useTypedSelector } from "@/app/globalRedux/store";
import Container from "@/app/ui/container/container";
import LoadingSpinner from "@/app/ui/loading-spinner/loading-spinner";
import { useCheckout } from "@/context/CheckoutContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Stepper } from "./_components/Stepper";
import { Renderer } from "./_components/StepRenderer";
import { GoogleLibraryLoader } from "@/components/shared/goolge-library-loader";

const Page: React.FC = () => {
  const router = useRouter();
  const { step, setStep } = useCheckout();
  const products = useTypedSelector((state) => state.persisted.cart.products);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (Object.keys(products).length === 0 && step !== 2) {
      toast.error(
        "Your cart is empty. Please add items before proceeding to checkout."
      );
      router.push("/cart");
      return;
    }
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
        <GoogleLibraryLoader>
          <Renderer setStep={setStep} step={step} />
        </GoogleLibraryLoader>
      </Container>
    </div>
  );
};

export default Page;
