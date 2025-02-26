"use client";

interface OrderSummaryProps {
  totalCost?: string;
  cartType?: string;
  discount?: number;
  zipCode?: string;
  netCost?: string;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  totalCost,
  cartType,
  discount = 0,
  zipCode,
  netCost
}) => {

  return (
    <div className="bg-[#F7F7F7] h-fit py-5 rounded-xs">
      <div className="space-y-2">
        {totalCost && (
          <div className="flex justify-between items-baseline py-2 px-md">
            <p className="text-base leading-[19px] text-[#210203]">
              <span className="text-[#210203] text-base font-normal">
                Item(s) Total
              </span>
            </p>
            <div className="flex gap-0 items-baseline">
              ${parseFloat(totalCost).toFixed(2)}
            </div>
          </div>
        )}

        {cartType === "CENTER_CAP_ONLY" && (
          <div className="flex justify-between py-2 px-md">
            <span className="text-[#210203] text-base">Delivery Charge:</span>
            <span className="text-[#210203] font-bold text-2xl">$14.99</span>
          </div>
        )}

        {discount > 0 && (
          <div className="flex justify-between items-baseline px-md">
            <p className="text-base leading-[19px] text-[#210203]">
              <span className="text-[#210203] text-base font-normal">
                Discount
              </span>
            </p>
            <h4 className="text-2xl leading-[29px] text-[#210203]">
              <span className="text-[#210203] text-2xl font-normal">
                -${discount.toFixed(2)}
              </span>
            </h4>
          </div>
        )}

        <div className="flex justify-between items-baseline px-md">
          <div className="flex gap-2 items-center">
            <span className="text-[#210203] text-base font-normal">
              Shipping {zipCode && `(${zipCode}):`}
            </span>
          </div>
          <h4 className="text-2xl leading-[29px] text-[#210203] font-normal">
            Free
          </h4>
        </div>

        <div className="flex justify-between items-baseline px-md">
          <h5 className="text-xl leading-6 text-[#210203] font-normal">
            Total:
          </h5>
          <div className="flex items-baseline">
            <p className="text-[32px] leading-[38px] text-[#210203] font-bold">
              ${(netCost && isNaN(parseFloat(netCost))) ? '0.00' : Number(netCost).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;