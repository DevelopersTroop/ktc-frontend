"use client";
import React from "react";

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
  return (
    <div className={"flex gap-0 items-end justify-end relative w-full"}>
      <button
        onClick={onDecrease}
        className="rounded-tl-xl rounded-bl-xl border border-[#cfcfcf] p-3 flex gap-2 justify-center items-center relative w-10 h-10 bg-white"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 10H5"
            stroke="#210203"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <div className="border-x-0 border-y border-[#cfcfcf] py-2 flex justify-center items-center self-stretch relative bg-white">
        <input
          onChange={onInputChange}
          value={inputValue}
          step={quantityStep}
          min={quantityStep}
          max={maxInputValue}
          type="number"
          name={inputName}
          id={id}
          className="-mt-0.5 h-full w-8 text-center appearance-none focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
      </div>
      <button
        onClick={onIncrease}
        className="rounded-tr-xl rounded-br-xl border border-[#cfcfcf] p-3 flex justify-center items-center relative w-10 h-10 bg-white"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 10L10 10M10 10L5 10M10 10L10 5M10 10L10 15"
            stroke="#210203"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default CartQuantityInputBox;
