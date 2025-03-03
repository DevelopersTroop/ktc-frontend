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
  netCost,
}) => {
  return (
    <div className="h-fit rounded-xs bg-[#F7F7F7] py-5">
      <div className="space-y-2">
        {totalCost && (
          <div className="flex items-baseline justify-between px-6 py-2">
            <p className="text-base leading-[19px] text-[#210203]">
              <span className="text-base font-normal text-[#210203]">
                Item(s) Total
              </span>
            </p>
            <div className="flex items-baseline gap-0">
              ${parseFloat(totalCost).toFixed(2)}
            </div>
          </div>
        )}

        {cartType === "CENTER_CAP_ONLY" && (
          <div className="flex justify-between px-6 py-2">
            <span className="text-base text-[#210203]">Delivery Charge:</span>
            <span className="text-2xl font-bold text-[#210203]">$14.99</span>
          </div>
        )}

        {discount > 0 && (
          <div className="flex items-baseline justify-between px-6">
            <p className="text-base leading-[19px] text-[#210203]">
              <span className="text-base font-normal text-[#210203]">
                Discount
              </span>
            </p>
            <h4 className="text-2xl leading-[29px] text-[#210203]">
              <span className="text-2xl font-normal text-[#210203]">
                -${discount.toFixed(2)}
              </span>
            </h4>
          </div>
        )}

        <div className="flex items-baseline justify-between px-6">
          <div className="flex items-center gap-2">
            <span className="text-base font-normal text-[#210203]">
              Shipping {zipCode && `(${zipCode}):`}
            </span>
          </div>
          <h4 className="text-2xl font-normal leading-[29px] text-[#210203]">
            Free
          </h4>
        </div>

        <div className="flex items-baseline justify-between px-6">
          <h5 className="text-xl font-normal leading-6 text-[#210203]">
            Total:
          </h5>
          <div className="flex items-baseline">
            <p className="text-[32px] font-bold leading-[38px] text-[#210203]">
              $
              {netCost && isNaN(parseFloat(netCost))
                ? "0.00"
                : Number(netCost).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
