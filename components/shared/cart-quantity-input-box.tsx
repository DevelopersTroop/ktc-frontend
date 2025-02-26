"use client";
import { useTypedSelector } from "@/app/globalRedux/store";
import { Minus, Plus } from "lucide-react";
import React, { useMemo } from "react";

type QuantityInputBoxProps = {
  className?: string;
  onIncrease: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onDecrease: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue: string | number;
  quantityStep: string | number;
  maxInputValue: string | number;
  inputName: string;
  id: string;
  borderColor?: string;
};
const CartQuantityInputBox = ({
  borderColor = "border-btext",
  onIncrease,
  onDecrease,
  inputName,
  id,
  className = "",
  onInputChange,
  inputValue,
  quantityStep,
  maxInputValue,
}: QuantityInputBoxProps) => {
  const { products } = useTypedSelector((state) => state.persisted.cart);

  const isDisabled = useMemo(() => {
    const productsData = Object.values(products).filter(
      (p) => p.cartPackage === id && p.item_class !== "Accessories",
    );
    const inCreseDisabled = productsData.some((p) => {
      let quantityStep = 4;
      if (
        p.metaData?.rearForging === "Dually" ||
        p.forging_style === "Dually"
      ) {
        quantityStep = 6;
      }
      return (
        p.inventory_available &&
        p.quantity + quantityStep >= p.inventory_available
      );
    });
    const decreaseDisabled = productsData.some(
      (p) => p.quantity === p.minInventory,
    );
    return {
      increase: inCreseDisabled,
      decrease: decreaseDisabled,
    };
  }, [Object.values(products), id]);
  return (
    <div className={"relative flex w-[164px] items-start gap-0"}>
      <button
        onClick={onIncrease}
        disabled={isDisabled.decrease}
        className="relative flex h-14 w-14 items-center justify-center gap-2 rounded-bl-xl rounded-tl-xl border border-[#cfcfcf] bg-white p-3 disabled:cursor-not-allowed disabled:text-gray-500"
      >
        <Minus size={18} />
      </button>
      <div className="relative flex w-full flex-1 items-center justify-center gap-2 self-stretch border-x-0 border-y border-[#cfcfcf] bg-white p-3">
        <input
          disabled
          onChange={onInputChange}
          value={inputValue}
          step={quantityStep}
          min={quantityStep}
          max={maxInputValue}
          type="number"
          name={inputName}
          id={id}
          className={
            "appearance-none-input-number -mt-0.5 h-full bg-white text-center focus:outline-none disabled:cursor-not-allowed"
          }
        />
      </div>
      <button
        disabled={isDisabled.increase}
        onClick={onDecrease}
        className="relative flex h-14 w-14 items-center justify-center gap-2 rounded-br-xl rounded-tr-xl border border-[#cfcfcf] bg-white p-3 disabled:cursor-not-allowed disabled:text-gray-500"
      >
        <Plus size={18} />
      </button>
    </div>
  );
};

export default CartQuantityInputBox;
