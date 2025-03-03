import { TInventoryItem } from "@/types/product";
import { s3BucketUrl } from "@/app/utils/api";
import StockBadge from "@/components/shared/stock-badge";
import TireCardPrice from "@/components/shared/tire-card-price";
import TireRating from "@/components/shared/tire-rating";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import React from "react";

export const FinalStepProductCard: React.FC<{ products: TInventoryItem[] }> = ({
  products,
}) => {
  return (
    <div>
      {products.map((product: any, index) => {
        return (
          <div
            key={index}
            className="relative flex w-full flex-col items-start gap-0 overflow-hidden border-b bg-white px-4 last:border-none"
          >
            <div className="relative flex flex-col items-start justify-center gap-4 py-6">
              <h4 className="text-2xl leading-[29px] text-[#210203]">
                <span className="text-2xl font-bold uppercase text-[#210203]">
                  {product?.brand} {product.model_group}
                </span>
              </h4>
              <TireRating />
            </div>

            <div className="relative flex h-full w-full flex-col items-start gap-10 md:flex-row">
              <Image
                src={`${s3BucketUrl}/${product.item_image}`}
                width={200}
                height={200}
                alt={product.title}
              />
              <div className="flex h-full w-full flex-col md:gap-14">
                <div className="flex w-full flex-col justify-between gap-y-3 md:flex-row md:items-center">
                  <div>
                    <div className="relative flex w-full items-center justify-between self-stretch pl-0 pr-4">
                      <div className="relative flex flex-col items-start gap-2">
                        <h5 className="text-xl leading-6 text-[#210203]">
                          <span className="text-xl font-semibold text-[#210203]">
                            {true ? "Front & Rear" : "Front"}
                          </span>
                        </h5>
                      </div>
                    </div>
                    <TireCardPrice price={product.price.toFixed(2)} />
                  </div>
                  <Quanity quantity={product.quantity} />
                </div>
                <div className="relative flex w-full flex-col items-center justify-between md:flex-row md:gap-4">
                  <div className="relative flex w-full flex-col items-start justify-center gap-4 self-stretch py-5">
                    <TireAttributes product={product} />
                  </div>
                  <div className="flex w-full flex-col md:items-end">
                    <StockBadge />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const TireAttributes: React.FC<{ product: TInventoryItem }> = ({ product }) => {
  return (
    <div className="flex w-full gap-2">
      {product?.wheel_size && (
        <div className="w-fit rounded-[6px] border px-3 py-2 text-center">
          <div className="flex items-center justify-center gap-1">
            <svg
              width="12"
              height="13"
              viewBox="0 0 12 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.5 8L1 11.5M1 11.5H3.92857M1 11.5V8.57143"
                stroke="#504949"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.5 5L11 1.5M11 1.5H8.07143M11 1.5V4.42857"
                stroke="#504949"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-sm font-normal text-muted">Size</p>
          </div>
          <p>{product.wheel_size}</p>
        </div>
      )}

      {product?.finish && (
        <div className="w-fit rounded-[6px] border px-3 py-2 text-center">
          <div className="flex items-center justify-center gap-1">
            <svg
              width="12"
              height="13"
              viewBox="0 0 12 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 6.51306C1 9.08617 2.93356 11.2065 5.42339 11.4931C5.7908 11.5354 6.14691 11.3788 6.40841 11.1166C6.73514 10.7891 6.73514 10.2579 6.40841 9.93036C6.14691 9.66818 5.93372 9.27707 6.13094 8.96341C6.91927 7.7096 11 10.589 11 6.51306C11 3.74442 8.76142 1.5 6 1.5C3.23858 1.5 1 3.74442 1 6.51306Z"
                stroke="#504949"
              />
              <circle cx="8.75" cy="6.25" r="0.75" stroke="#504949" />
              <circle cx="3.25" cy="6.25" r="0.75" stroke="#504949" />
              <path
                d="M5.54297 3.99988C5.54297 4.41409 5.20718 4.74988 4.79297 4.74988C4.37876 4.74988 4.04297 4.41409 4.04297 3.99988C4.04297 3.58566 4.37876 3.24988 4.79297 3.24988C5.20718 3.24988 5.54297 3.58566 5.54297 3.99988Z"
                stroke="#504949"
              />
              <path
                d="M8 4C8 4.41421 7.66421 4.75 7.25 4.75C6.83579 4.75 6.5 4.41421 6.5 4C6.5 3.58579 6.83579 3.25 7.25 3.25C7.66421 3.25 8 3.58579 8 4Z"
                stroke="#504949"
              />
            </svg>

            <p className="text-sm font-normal text-muted">Finish</p>
          </div>
          <p>{product.finish}</p>
        </div>
      )}
      {product.offset && (
        <div className="w-fit rounded-[6px] border px-3 py-2 text-center">
          <div className="flex items-center justify-center gap-1">
            <svg
              width="12"
              height="13"
              viewBox="0 0 12 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 6.51306C1 9.08617 2.93356 11.2065 5.42339 11.4931C5.7908 11.5354 6.14691 11.3788 6.40841 11.1166C6.73514 10.7891 6.73514 10.2579 6.40841 9.93036C6.14691 9.66818 5.93372 9.27707 6.13094 8.96341C6.91927 7.7096 11 10.589 11 6.51306C11 3.74442 8.76142 1.5 6 1.5C3.23858 1.5 1 3.74442 1 6.51306Z"
                stroke="#504949"
              />
              <circle cx="8.75" cy="6.25" r="0.75" stroke="#504949" />
              <circle cx="3.25" cy="6.25" r="0.75" stroke="#504949" />
              <path
                d="M5.54297 3.99988C5.54297 4.41409 5.20718 4.74988 4.79297 4.74988C4.37876 4.74988 4.04297 4.41409 4.04297 3.99988C4.04297 3.58566 4.37876 3.24988 4.79297 3.24988C5.20718 3.24988 5.54297 3.58566 5.54297 3.99988Z"
                stroke="#504949"
              />
              <path
                d="M8 4C8 4.41421 7.66421 4.75 7.25 4.75C6.83579 4.75 6.5 4.41421 6.5 4C6.5 3.58579 6.83579 3.25 7.25 3.25C7.66421 3.25 8 3.58579 8 4Z"
                stroke="#504949"
              />
            </svg>

            <p className="text-sm font-normal text-muted">Offset</p>
          </div>
          <p>{product.offset}mm</p>
        </div>
      )}
    </div>
  );
};

const Quanity: React.FC<{ quantity: number }> = ({ quantity }) => {
  return (
    <div className={"flex w-full max-w-fit items-start gap-0"}>
      <button
        disabled
        className="relative flex h-14 w-14 items-center justify-center gap-2 rounded-bl-xl rounded-tl-xl border border-[#cfcfcf] bg-white p-3 disabled:cursor-not-allowed disabled:text-gray-500"
      >
        <Minus size={18} />
      </button>
      <div className="relative flex w-14 flex-1 items-center justify-center gap-2 self-stretch border-x-0 border-y border-[#cfcfcf] bg-white p-3">
        <input
          disabled
          value={quantity}
          className={
            "appearance-none-input-number -mt-0.5 h-full bg-transparent text-center focus:outline-none disabled:cursor-not-allowed"
          }
        />
      </div>
      <button
        disabled
        className="relative flex h-14 w-14 items-center justify-center gap-2 rounded-br-xl rounded-tr-xl border border-[#cfcfcf] bg-white p-3 disabled:cursor-not-allowed disabled:text-gray-500"
      >
        <Plus size={18} />
      </button>
    </div>
  );
};
