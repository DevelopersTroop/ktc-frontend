import { TCartProduct } from "@/types/cart";

const WheelAttributes = ({ cartProduct }: { cartProduct: TCartProduct }) => {
  return (
    <div className="relative flex items-center gap-2">
      {cartProduct?.wheel_size && (
        <div className="relative flex flex-col items-start justify-center gap-2 rounded-md border border-[#cfcfcf] px-3 py-2">
          <div className="relative flex items-center gap-1">
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

            <small className="text-xs leading-[14px] text-[#504949]">
              <span className="text-xs font-normal text-[#504949]">Size</span>
            </small>
          </div>
          <p className="text-base leading-[19px] text-[#210203]">
            <span className="text-base font-semibold text-[#210203]">
              {cartProduct?.wheel_size}
            </span>
          </p>
        </div>
      )}

      {cartProduct?.finish && (
        <div className="relative flex flex-col items-start justify-center gap-2 rounded-md border border-[#cfcfcf] px-3 py-2">
          <div className="relative flex items-center gap-1">
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
                d="M5.54297 4C5.54297 4.41421 5.20718 4.75 4.79297 4.75C4.37876 4.75 4.04297 4.41421 4.04297 4C4.04297 3.58579 4.37876 3.25 4.79297 3.25C5.20718 3.25 5.54297 3.58579 5.54297 4Z"
                stroke="#504949"
              />
              <path
                d="M8 4C8 4.41421 7.66421 4.75 7.25 4.75C6.83579 4.75 6.5 4.41421 6.5 4C6.5 3.58579 6.83579 3.25 7.25 3.25C7.66421 3.25 8 3.58579 8 4Z"
                stroke="#504949"
              />
            </svg>

            <small className="text-xs leading-[14px] text-[#504949]">
              <span className="text-xs font-normal text-[#504949]">Finish</span>
            </small>
          </div>
          <p className="text-base leading-[19px] text-[#210203]">
            <span className="line-clamp-1 text-base font-semibold text-[#210203]">
              {cartProduct?.finish}
            </span>
          </p>
        </div>
      )}
      {cartProduct?.offset && (
        <div className="relative flex flex-col items-start justify-center gap-2 rounded-md border border-[#cfcfcf] px-3 py-2">
          <div className="relative flex items-center gap-1">
            <small className="text-xs leading-[14px] text-[#504949]">
              <span className="text-xs font-normal text-[#504949]">Offset</span>
            </small>
          </div>
          <p className="text-base leading-[19px] text-[#210203]">
            <span className="text-base font-semibold text-[#210203]">
              {cartProduct?.offset}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default WheelAttributes;
