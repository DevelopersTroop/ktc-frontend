"use client";
import { useTypedSelector } from "@/app/globalRedux/store";
import { checkCartCategories } from "@/app/utils/checkCartCategories";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Dealer } from "../types/order";

interface CheckoutContextType {
  relocateMap: () => void;
  step: any;
  setStep: (step: number) => void;
  nearestDealer: Dealer;
  setNearestDealer: (dealer: any) => void;
  otherDealers: any[];
  setOtherDealers: (dealers: any[]) => void;
  isDialogOpen: any;
  setIsDialogOpen: (isOpen: any) => void;
  cartType: any;
  subTotalCost: any;
  discount: any;
  salesTax: any;
  totalCost: any;
  validatedZipCode: any;
  setValidatedZipCode: React.Dispatch<React.SetStateAction<any>>;
  isValidZipCode: any;
  setIsValidZipCode: React.Dispatch<React.SetStateAction<any>>;
  zipCodeAddress: any;
  setZipCodeAddress: React.Dispatch<React.SetStateAction<any>>;
  relocate: any;
}

const STORAGE_KEY = "checkout_state";

const loadState = () => {
  if (typeof window === "undefined") return null;
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : null;
};

const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined,
);
export const CheckoutProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Redux Checkout Store
  const { discount, productsInfo, shippingProtection } = useTypedSelector(
    (state) => state.persisted.checkout,
  );
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const initialState = loadState();
  const urlStep = searchParams.get("step");
  const [relocate, setRelocate] = useState<any>(
    initialState?.relocate || false,
  );
  const [step, setStep] = useState<any>(
    urlStep ? parseInt(urlStep) : initialState?.step || 1,
  );
  const [validatedZipCode, setValidatedZipCode] = useState<any>(
    initialState?.validatedZipCode || "",
  );

  const [zipCodeAddress, setZipCodeAddress] = useState<any>(
    initialState?.zipCodeAddress || "",
  );
  const [isValidZipCode, setIsValidZipCode] = useState<any>(
    initialState?.isValidZipCode || false,
  );
  const [nearestDealer, setNearestDealer] = useState<any>(
    initialState?.nearestDealer || null,
  );
  const [otherDealers, setOtherDealers] = useState<any[]>(
    initialState?.otherDealers || [],
  );
  const [isDialogOpen, setIsDialogOpen] = useState<any>(
    initialState?.isDialogOpen || false,
  );

  const saveState = (updates: any) => {
    if (typeof window === "undefined") return;
    const currentState = loadState() || {};
    const newState = { ...currentState, ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
  };

  const handleSetStep = (newStep: any) => {
    if (newStep === step) return;
    setStep(newStep);
    saveState({ step: newStep });

    if (pathname === "/checkout") {
      router.replace(`/checkout?step=${newStep}`, { scroll: false });
    }
  };

  const handleSetNearestDealer = (dealer: any) => {
    setNearestDealer(dealer);
    saveState({ nearestDealer: dealer });
  };

  const handleSetOtherDealers = (dealers: any[]) => {
    setOtherDealers(dealers);
    saveState({ otherDealers: dealers });
  };

  const handleSetIsDialogOpen = (isOpen: any) => {
    setIsDialogOpen(isOpen);
    saveState({ isDialogOpen: isOpen });
  };

  const handleSetValidatedZipCode = (zipCode: any) => {
    setValidatedZipCode(zipCode);
    saveState({ validatedZipCode: zipCode });
  };

  const handleSetIsValidZipCode = (isValid: any) => {
    setIsValidZipCode(isValid);
    saveState({ isValidZipCode: isValid });
  };

  const handleSetZipCodeAddress = (address: any) => {
    setZipCodeAddress(address);
    saveState({ zipCodeAddress: address });
  };

  const cartType = checkCartCategories(productsInfo);
  /**
   * Getting Products Cost From Redux Store
   */
  const subTotalCost = useMemo(() => {
    return productsInfo?.reduce(
      (acc, product) => acc + product.msrp * product.quantity,
      0,
    );
  }, [productsInfo]);

  const deliveryCharge = cartType === "CENTER_CAP_ONLY" ? 14.99 : 0;
  const salesTax = 0;
  const totalCost = subTotalCost - discount + salesTax + deliveryCharge + shippingProtection;

  useEffect(() => {
    if (pathname === "/checkout") {
      const stepParam = searchParams.get("step");
      if (stepParam) {
        const parsedStep = parseInt(stepParam);
        if (parsedStep !== step) {
          setStep(parsedStep);
          saveState({ step: parsedStep });
        }
      } else if (!urlStep && step !== 1) {
        handleSetStep(1);
      }
    }
  }, [pathname, urlStep]);

  const handleRelocateMap = () => {
    const newRelocate = !relocate;
    setRelocate(newRelocate);
    saveState({ relocate: newRelocate });
  };

  const contextValue = {
    relocate,
    relocateMap: handleRelocateMap,
    step,
    setStep: handleSetStep,
    nearestDealer,
    setNearestDealer: handleSetNearestDealer,
    otherDealers,
    setOtherDealers: handleSetOtherDealers,
    isDialogOpen,
    setIsDialogOpen: handleSetIsDialogOpen,
    cartType,
    subTotalCost,
    discount,
    salesTax,
    totalCost,
    validatedZipCode,
    setValidatedZipCode: handleSetValidatedZipCode,
    isValidZipCode,
    setIsValidZipCode: handleSetIsValidZipCode,
    zipCodeAddress,
    setZipCodeAddress: handleSetZipCodeAddress,
  };

  return (
    <CheckoutContext.Provider value={contextValue}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }

  const clearCheckoutState = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
    context.setNearestDealer(null);
    context.setOtherDealers([]);
    context.setIsDialogOpen(false);
    context.setValidatedZipCode("");
    context.setIsValidZipCode(false);
    context.setZipCodeAddress("");
  };

  return {
    ...context,
    clearCheckoutState,
  };
};
