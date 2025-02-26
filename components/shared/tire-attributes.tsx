import { TInventoryItem } from "@/types/product";

const TireAttributes = ({ product }: { product: TInventoryItem }) => {
  return (
    <div className="relative flex w-full flex-wrap items-start gap-2 self-stretch">
      {product?.tire_size !== "" ? (
        <div className="group relative flex cursor-pointer flex-col items-start justify-center gap-2 rounded-md border border-[#cfcfcf] bg-white px-3 py-2 hover:bg-[#210203]">
          <div className="relative flex items-center gap-1">
            <i className="icon-size text-[#504949] group-hover:text-[#ffffff]"></i>
            <small className="text-xs leading-[14px] text-[#504949]">
              <span className="text-xs font-normal text-[#504949] group-hover:text-[#ffffff]">
                Size
              </span>
            </small>
          </div>
          <p className="text-base leading-[19px] text-[#210203]">
            <span className="text-base font-semibold text-[#210203] group-hover:text-[#ffffff]">
              {product?.tire_size}
            </span>
          </p>
        </div>
      ) : (
        ""
      )}
      {product?.sidewall !== "" ? (
        <div className="group relative flex cursor-pointer flex-col items-start justify-center gap-2 rounded-md border border-[#cfcfcf] bg-white px-3 py-2 hover:bg-[#210203]">
          <div className="relative flex items-center gap-1">
            <i className="icon-finish text-[#504949] group-hover:text-[#ffffff]"></i>
            <small className="text-xs leading-[14px] text-[#504949]">
              <span className="text-xs font-normal text-[#504949] group-hover:text-[#ffffff]">
                Style
              </span>
            </small>
          </div>
          <p className="text-base leading-[19px] text-[#210203]">
            <span className="text-base font-semibold text-[#210203] group-hover:text-[#ffffff]">
              {product?.sidewall}
            </span>
          </p>
        </div>
      ) : (
        ""
      )}
      {product?.load_rating !== "" ? (
        <div className="group relative flex cursor-pointer flex-col items-start justify-center gap-2 rounded-md border border-[#cfcfcf] bg-white px-3 py-2 hover:bg-[#210203]">
          <div className="relative flex items-center gap-1">
            <small className="text-xs leading-[14px] text-[#504949]">
              <span className="text-xs font-normal text-[#504949] group-hover:text-[#ffffff]">
                Load Range
              </span>
            </small>
          </div>
          <p className="text-base leading-[19px] text-[#210203]">
            <span className="text-base font-semibold text-[#210203] group-hover:text-[#ffffff]">
              {product?.load_rating}
            </span>
          </p>
        </div>
      ) : (
        ""
      )}
      {product?.tire_load_index !== "" && product?.speed_rating !== "" ? (
        <>
          <div className="group relative flex cursor-pointer flex-col items-start justify-center gap-2 rounded-md border border-[#cfcfcf] bg-white px-3 py-2 hover:bg-[#210203]">
            <div className="relative flex items-center gap-1">
              <small className="text-xs leading-[14px] text-[#504949]">
                <span className="text-xs font-normal text-[#504949] group-hover:text-[#ffffff]">
                  Serv. Desc
                </span>
              </small>
            </div>
            <p className="text-base leading-[19px] text-[#210203]">
              <span className="text-base font-semibold text-[#210203] group-hover:text-[#ffffff]">
                {product?.tire_load_index}
                {product?.speed_rating}
              </span>
            </p>
          </div>
        </>
      ) : (
        ""
      )}

      {/* <div
                className="rounded-md border border-[#cfcfcf] px-3 py-2 flex flex-col gap-2 justify-center items-start relative w-[132px]">
                <div className="flex gap-1 items-center relative">
                    <small className="text-xs leading-[14px] text-[#504949]">
                        <span className="text-[#504949] text-xs font-normal">UTQG</span>
                    </small>
                </div>
                <p className="text-base leading-[19px] text-black">
                    <span className="text-black text-base font-semibold">500 AA A</span>
                </p>
            </div> */}
    </div>
  );
};

export default TireAttributes;
