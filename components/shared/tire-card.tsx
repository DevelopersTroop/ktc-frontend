import { removeFromCart } from "@/app/globalRedux/features/cart/cart-slice";
import { s3BucketUrl } from "@/app/utils/api";
import { TCartProduct } from "@/types/cart";
import { useDispatch } from "react-redux";
import CardPrice from "./card-price";
import DeliveryWithStock from "./delivery-with-stock";
import Quantity from "./quantity";
import Rating from "./rating";
import TireAttributes from "./tire-attributes";
import TireTypeBadge from "./tire-type-badge";

export interface Tire extends TCartProduct {
  accessories: TCartProduct[];
}

const TiresCard = ({ tires }: { tires: Tire[] }) => {
  const dispatch = useDispatch();

  const removeCartProduct = (cartSerial: string) => {
    dispatch(removeFromCart({ cartSerial }));
  };

  return (
    <div className="flex w-full flex-col rounded-b-none border-b border-[#cfcfcf]">
      <div className="relative flex w-full flex-row items-start justify-between">
        <div className="relative flex w-full flex-col items-start justify-center gap-2 px-2 pb-3 pt-6 sm:px-5">
          <p className="text-base leading-[19px] text-[#210203]">
            <span className="text-base font-normal text-[#210203]">
              {tires[0].title}
            </span>
          </p>

          <h4 className="text-2xl leading-[29px] text-[#210203]">
            <span className="text-2xl font-bold text-[#210203]">
              {tires[0].model_group}
            </span>
          </h4>
          <TireTypeBadge products={tires} />
        </div>

        <div className="items-end justify-center px-2 pb-3 pt-6 sm:px-5">
          <button onClick={() => removeCartProduct(tires[0].cartSerial)}>
            <small className="text-sm leading-[17px] text-[#210203] underline">
              <span className="text-sm font-semibold text-[#210203]">
                Remove
              </span>
            </small>
          </button>
        </div>
      </div>

      <div className="relative flex w-full flex-col items-start gap-6 self-stretch pl-2 pr-0 sm:flex-row sm:pl-5">
        {/* Rating and Image */}
        <div className="relative flex w-full flex-col items-start gap-4 sm:w-auto">
          <Rating />
          <div className="relative flex w-full justify-center">
            <img
              src={`${s3BucketUrl}/${tires[0].item_image}`}
              width={160}
              height={160}
              alt={tires[0].title}
            />
          </div>
        </div>

        <div className="relative flex w-full flex-1 flex-col items-start justify-center">
          {tires.slice(0, 2).map((tire, index) => {
            return (
              <div
                key={tire.cartSerial}
                className={`relative flex w-full flex-col items-start self-stretch py-5 ${
                  index === 1 ? "border-t border-[#cfcfcf]" : ""
                } ${tires.length === 1 ? "gap-9" : "gap-4"} `}
              >
                <div className="relative flex w-full items-center justify-between self-stretch pl-0 pr-4">
                  <div className="relative flex flex-col items-start gap-2">
                    <h5 className="text-xl leading-6 text-[#210203]">
                      <span className="text-xl font-semibold text-[#210203]">
                        {tires.length <= 1
                          ? "Front & Rear"
                          : tire.isFrontTire
                            ? "Front"
                            : "Rear"}
                      </span>
                    </h5>
                    <CardPrice price={tire.price.toFixed(2)} type="tire" />
                  </div>
                  <Quantity cartProduct={tire} isTirePackage={true} />
                </div>

                <div className="relative flex w-full flex-col items-start gap-2 md:flex-row">
                  <TireAttributes product={tire} />
                  <DeliveryWithStock />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TiresCard;
