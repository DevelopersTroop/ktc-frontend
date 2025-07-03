"use client"
import React, { ChangeEvent } from 'react';

type QuantityInputBoxProps = {
    className?: string,
    onIncrease: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    onDecrease: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    inputValue: string | number,
    quantityStep: string | number,
    maxInputValue: string | number,
    inputName: string,
    id: string,
    borderColor?: string
}
const QuantityInputBox = ({ borderColor = "border-[#cfcfcf]", onIncrease, onDecrease, inputName, id, className="", onInputChange, inputValue, quantityStep, maxInputValue }: QuantityInputBoxProps) => {
    return (
        <div className={`${className} h-[45px] inline-flex items-center border ${borderColor} justify-between rounded-xl overflow-hidden`}>
            <button onClick={onIncrease} className={`border-r ${borderColor} px-3 -mt-px h-full text-3xl font-light `}>-</button>
            <input
                onChange={onInputChange}
                value={inputValue}
                step={quantityStep}
                min={quantityStep}
                max={maxInputValue}
                className={'w-14 -mt-0.5  h-full text-center appearance-none focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'}
                type="number"
                name={inputName}
                id={id} />
            <button onClick={onDecrease} className={`border-l  ${borderColor} px-3 -mt-px h-full text-3xl font-light`}>+</button>
        </div>
    );
};

export default QuantityInputBox;