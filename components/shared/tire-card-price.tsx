const TireCardPrice = ({ price }: { price: string | undefined }) => {
  const splitedPrice = price?.split(".") ?? [];

  return (
    <div className="relative flex items-baseline gap-1">
      <div className="relative flex items-baseline gap-0">
        <h4 className="text-2xl leading-[29px] text-[#210203]">
          <span className="text-2xl font-bold text-[#210203]">
            ${splitedPrice[0]}.
          </span>
        </h4>

        <small className="text-sm leading-[17px] text-[#210203]">
          <span className="text-sm font-bold text-[#210203]">
            {splitedPrice[1]}
          </span>
        </small>
      </div>
      <small className="text-sm leading-[17px] text-[#210203]">
        <span className="text-sm font-normal text-[#210203]">per tire</span>
      </small>
    </div>
  );
};

export default TireCardPrice;
