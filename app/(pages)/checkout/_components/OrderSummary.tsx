"use client";

import React from "react";
import { useCheckout } from "@/app/context/CheckoutContext";

const OrderSummary: React.FC = () => {
  const {
    cartType,
    subTotalCost,
    discount,
    salesTax,
    totalCost,
    validatedZipCode,
    setIsValidZipCode
  } = useCheckout();

  return (
    <div className="bg-white">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Delivery & Installation
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        You are viewing the best delivery and installation options for{' '}
        <span className="underline font-semibold font-mono text-primary">{validatedZipCode}</span>{' '}
        ZIP Code.
      </p>
      <p className="underline cursor-pointer font-semibold text-primary" onClick={() => setIsValidZipCode(false)}>Change ZIP Code</p>
      <div className="space-y-2">
        <div className="flex justify-between py-2">
          <span className="text-gray-600">Item(s) Total:</span>
          <span className="font-medium">${subTotalCost.toFixed(2)}</span>
        </div>

        {discount ? (
          <div className="flex justify-between py-2">
            <span className="text-gray-600">Discount:</span>
            <span className="text-red-600">-${discount}</span>
          </div>
        ) : ''}

        {cartType === "CENTER_CAP_ONLY" && (
          <div className="flex justify-between py-2">
            <span className="text-gray-600">Delivery Charge:</span>
            <span className="text-red-600">$14.99</span>
          </div>
        )}

        {/* <div className="flex justify-between py-2">
          <span className="text-gray-600">Sales Tax:</span>
          <span className="font-medium">${salesTax}</span>
        </div> */}
        <div className="flex justify-between font-bold mt-4 pt-4 border-t border-gray-200">
          <span>TOTAL:</span>
          <span>${totalCost.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
