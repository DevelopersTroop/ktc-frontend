"use client";

import {
  setSelectedOption as dispatchSelectedOption,
  setSelectedDealerInfo,
  setSelectedOptionTitle,
  setShippingMethod,
} from "@/app/globalRedux/features/checkout/checkout-slice";
import { useTypedSelector } from "@/app/globalRedux/store";
import { apiBaseUrl } from "@/app/utils/api";
import { useCheckout } from "@/context/CheckoutContext";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { DealerRequest } from "./CheckoutStep/DealerRequest";
import { SelectAmaniDealerWithDiscount } from "./SelectAmaniDealerWithDiscount";
import { SelectAmaniDealerWithoutDiscount } from "./SelectAmaniDealerWithouDiscount";
import { SelectDirectToCustomer } from "./SelectDirecToCustomer";

const DeliveryOptions: React.FC<{
  setStep: (step: number) => void;
}> = ({ setStep }) => {
  const dispatch = useDispatch();
  const {
    cartType,
    nearestDealer,
    setNearestDealer,
    otherDealers,
    setOtherDealers,
    isDialogOpen,
    setIsDialogOpen,
    zipCodeAddress,
  } = useCheckout();

  const { selectedOption, selectedDealer } = useTypedSelector(
    (state) => state.persisted.checkout,
  );

  const [isLoading, setIsLoading] = useState(false);

  const fetchDealers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${apiBaseUrl}/dealer/nearest-dealer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: {
            "Address 1": zipCodeAddress || "",
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch dealers");
      }

      const result = await response.json();

      if (result.data.nearestDealer) {
        setNearestDealer(result.data.nearestDealer);
        // Dispathcing Selected Dealer Info
        dispatch(setSelectedDealerInfo(result.data.nearestDealer));
      }
      if (result.data.otherDealers) {
        setOtherDealers(result.data.otherDealers);
      }
    } catch (error) {
      console.error("Error fetching dealers:", error);
      toast.error("Failed to fetch dealers. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (zipCodeAddress) {
      fetchDealers();
    }
  }, [zipCodeAddress]);

  useEffect(() => {
    if (nearestDealer && !selectedDealer) {
      const shouldAutoSelectDealer =
        (cartType === "IN_STOCK_ONLY" && selectedOption === 1) ||
        (cartType === "IN_STOCK_AND_TIRE" &&
          (selectedOption === 3 || selectedOption === 2)) ||
        (cartType === "CUSTOM_WHEELS_ONLY" && selectedOption === 1);

      if (shouldAutoSelectDealer) {
        dispatch(setSelectedDealerInfo(nearestDealer));
      }
    }

    let newTitle = "";

    switch (cartType) {
      case "IN_STOCK_ONLY":
        if (selectedOption === 1) newTitle = "Direct To Customer";
        else if (selectedOption === 2)
          newTitle = "Ship to Authorized Amani Dealer With $200 Discount";
        break;
      case "IN_STOCK_AND_OTHERS":
      case "IN_STOCK_AND_TIRE":
        if (selectedOption === 1) newTitle = "Direct To Customer";
        else if (selectedOption === 2)
          newTitle =
            "Ship to Authorized Amani Dealer With Free Mount Balance And Install";
        else if (selectedOption === 3)
          newTitle = "Ship to Authorized Amani Dealer With $200 Discount";
        break;

      case "CUSTOM_WHEELS_ONLY":
        if (selectedOption === 1) newTitle = "Ship to Authorized Amani Dealer";
        else if (selectedOption === 2) newTitle = "Direct To Customer";
        break;
      case "WHEELS_AND_OTHERS":
      case "CUSTOM_WHEELS_AND_TIRE":
        if (selectedOption === 1)
          newTitle =
            "Ship to Authorized Amani Dealer With Free Mount Balance And Install";
        if (selectedOption === 2) newTitle = "Ship to Authorized Amani Dealer";
        else if (selectedOption === 3) newTitle = "Direct To Customer";
        break;

      case "CUSTOM_WHEELS_AND_IN_STOCK":
        if (selectedOption === 1)
          newTitle =
            "Ship to Authorized Amani Dealer With Free Mount Balance And Install";
        else if (selectedOption === 2)
          newTitle = "Ship to Authorized Amani Dealer With $200 Discount";
        else if (selectedOption === 3) newTitle = "Direct To Customer";
        break;

      case "STEERING_WHEEL_ONLY":
      case "CENTER_CAP_ONLY":
        if (selectedOption === 1) newTitle = "Direct To Customer";
        break;
    }
    if (newTitle) {
      dispatchShippingMethod(selectedOption, newTitle);
      dispatch(setSelectedOptionTitle(newTitle));
    }
  }, [selectedOption, nearestDealer, selectedDealer, cartType]);

  const handleOptionSelect = (option: number, title: string) => {
    dispatchShippingMethod(option, title);
    setSelectedOption(option);
    dispatch(setSelectedOptionTitle(title));
  };

  function setSelectedOption(option: number) {
    dispatch(dispatchSelectedOption(option));
  }

  function dispatchShippingMethod(option: number, title: string) {
    dispatch(setShippingMethod({ option, title }));
  }

  return (
    <>
      <div className="flex flex-col gap-y-3">
        {cartType === "IN_STOCK_ONLY" && (
          <>
            <SelectDirectToCustomer
              checked={selectedOption === 1}
              handleOptionSelect={() =>
                handleOptionSelect(1, "Direct To Customer")
              }
              setSelectedOption={() => setSelectedOption(1)}
              setStep={setStep}
            />
            <SelectAmaniDealerWithDiscount
              setStep={setStep}
              checked={selectedOption === 2}
              setSelectedOption={() => setSelectedOption(2)}
              isLoading={isLoading}
              nearestDealer={nearestDealer}
              otherDealers={otherDealers}
              handleOptionSelect={() =>
                handleOptionSelect(
                  2,
                  "Ship to Authorized Amani Dealer With $200 Discount",
                )
              }
            />
          </>
        )}

        {(cartType === "IN_STOCK_AND_TIRE" ||
          cartType === "IN_STOCK_AND_OTHERS") && (
          <>
            <SelectDirectToCustomer
              handleOptionSelect={() =>
                handleOptionSelect(1, "Direct To Customer")
              }
              checked={selectedOption === 1}
              setSelectedOption={() => setSelectedOption(1)}
              setStep={setStep}
            />

            <SelectAmaniDealerWithoutDiscount
              setStep={setStep}
              checked={selectedOption === 2}
              setSelectedOption={() => setSelectedOption(2)}
              isLoading={isLoading}
              nearestDealer={nearestDealer}
              otherDealers={otherDealers}
              handleOptionSelect={() =>
                handleOptionSelect(
                  2,
                  "Ship to Authorized Amani Dealer With Free Mount Balance And Install",
                )
              }
            />
            <SelectAmaniDealerWithDiscount
              setStep={setStep}
              checked={selectedOption === 3}
              setSelectedOption={() => setSelectedOption(3)}
              isLoading={isLoading}
              nearestDealer={nearestDealer}
              otherDealers={otherDealers}
              handleOptionSelect={() =>
                handleOptionSelect(
                  3,
                  "Ship to Authorized Amani Dealer With $200 Discount",
                )
              }
            />
          </>
        )}

        {(cartType === "CUSTOM_WHEELS_ONLY" ||
          cartType === "WHEELS_AND_OTHERS") && (
          <>
            <SelectAmaniDealerWithoutDiscount
              setStep={setStep}
              checked={selectedOption === 1}
              setSelectedOption={() => setSelectedOption(1)}
              isLoading={isLoading}
              nearestDealer={nearestDealer}
              otherDealers={otherDealers}
              showSubtitle={false}
              handleOptionSelect={() =>
                handleOptionSelect(1, "Ship to Authorized Amani Dealer")
              }
            />
            {Number(nearestDealer?.distance || 0) > 25 && (
              <SelectDirectToCustomer
                checked={selectedOption === 2}
                handleOptionSelect={() =>
                  handleOptionSelect(2, "Direct To Customer")
                }
                setSelectedOption={() => setSelectedOption(2)}
                setStep={setStep}
              />
            )}
          </>
        )}

        {cartType === "STEERING_WHEEL_ONLY" && (
          <SelectDirectToCustomer
            checked={selectedOption === 1}
            handleOptionSelect={() =>
              handleOptionSelect(1, "Direct To Customer")
            }
            setSelectedOption={() => setSelectedOption(1)}
            setStep={setStep}
          />
        )}

        {cartType === "CENTER_CAP_ONLY" && (
          <SelectDirectToCustomer
            checked={selectedOption === 1}
            handleOptionSelect={() =>
              handleOptionSelect(1, "Direct To Customer")
            }
            setSelectedOption={() => setSelectedOption(1)}
            setStep={setStep}
          />
        )}
        {cartType === "CUSTOM_WHEELS_AND_TIRE" && (
          <>
            <SelectAmaniDealerWithoutDiscount
              setStep={setStep}
              checked={selectedOption === 1}
              setSelectedOption={() => setSelectedOption(1)}
              isLoading={isLoading}
              nearestDealer={nearestDealer}
              otherDealers={otherDealers}
              handleOptionSelect={() =>
                handleOptionSelect(
                  1,
                  "Ship to Authorized Amani Dealer With Free Mount Balance And Install",
                )
              }
            />

            <SelectAmaniDealerWithoutDiscount
              setStep={setStep}
              checked={selectedOption === 2}
              setSelectedOption={() => setSelectedOption(2)}
              isLoading={isLoading}
              nearestDealer={nearestDealer}
              otherDealers={otherDealers}
              showSubtitle={false}
              handleOptionSelect={() =>
                handleOptionSelect(2, "Ship to Authorized Amani Dealer")
              }
              subtitle="Does not include free mount, balance and install"
            />

            <SelectDirectToCustomer
              checked={selectedOption === 3}
              handleOptionSelect={() =>
                handleOptionSelect(3, "Direct To Customer")
              }
              setSelectedOption={() => setSelectedOption(3)}
              setStep={setStep}
            />
          </>
        )}
        {cartType === "CUSTOM_WHEELS_AND_IN_STOCK" && (
          <>
            <SelectAmaniDealerWithoutDiscount
              setStep={setStep}
              checked={selectedOption === 1}
              setSelectedOption={() => setSelectedOption(1)}
              isLoading={isLoading}
              nearestDealer={nearestDealer}
              otherDealers={otherDealers}
              handleOptionSelect={() =>
                handleOptionSelect(
                  1,
                  "Ship to Authorized Amani Dealer With Free Mount Balance And Install",
                )
              }
            />
            <SelectAmaniDealerWithDiscount
              setStep={setStep}
              handleOptionSelect={() =>
                handleOptionSelect(
                  2,
                  "Ship to Authorized Amani Dealer With $200 Discount",
                )
              }
              isLoading={isLoading}
              nearestDealer={nearestDealer}
              otherDealers={otherDealers}
              checked={selectedOption === 2}
              setSelectedOption={() => setSelectedOption(2)}
            />
            <SelectDirectToCustomer
              checked={selectedOption === 3}
              handleOptionSelect={() =>
                handleOptionSelect(3, "Direct To Customer")
              }
              setSelectedOption={() => setSelectedOption(3)}
              setStep={setStep}
            />
          </>
        )}
        <DealerRequest
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
        />
      </div>
    </>
  );
};

export default DeliveryOptions;
