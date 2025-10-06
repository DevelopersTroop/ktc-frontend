import { removeFromCart } from "@/app/globalRedux/features/cart/cart-slice";
import { s3BucketUrl } from "@/app/utils/api";
import { TCartProduct } from "@/types/cart";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import CardPrice from "./card-price";
import DeliveryWithStock from "./delivery-with-stock";
import CustomwheelsFrontAttributes from "./front-attributes";
import Quantity from "./quantity";
import Rating from "./rating";
import CustomwheelsRearAttributes from "./rear-attributes";
import WheelAttributes from "./wheel-attributes";

const WheelCard = ({
  cartProduct,
  isTirePackage,
}: {
  cartProduct: TCartProduct;
  isTirePackage: boolean;
}) => {
  const [openModal, setOpenModal] = useState(false);
  const pathname = usePathname();

  const isObject = useMemo(() => {
    return "slug" in cartProduct.category;
  }, [cartProduct.category]);

  const category = isObject ? cartProduct.category.title : cartProduct.category;
  let productType = "wheel";
  let frontRear = "Front";

  if (category === "In-stock, Factory Wheels") {
    productType = "wheel";
    frontRear = "Front & Rear";
  } else if (category === "Custom Wheels") {
    if (
      cartProduct.metaData?.frontForging !== "" &&
      cartProduct.metaData?.rearForging !== ""
    ) {
      productType = "wheel";
      frontRear = "Front & Rear";
    } else if (cartProduct.metaData?.frontForging !== "") {
      productType = "wheel";
      frontRear = "Front";
    } else if (cartProduct.metaData?.rearForging !== "") {
      productType = "wheel";
      frontRear = "Rear";
    } else {
      productType = "wheel";
      frontRear = "Front";
    }
  } else {
    productType = category.toLowerCase();
    frontRear = category;
  }

  const dispatch = useDispatch();

  const removeCartProduct = (cartSerial: string) => {
    dispatch(removeFromCart({ cartSerial }));
  };

  const cartProductImage = `${s3BucketUrl}/${cartProduct.item_image}`;

  const isWheel =
    cartProduct?.category === "Custom Wheels" ||
    cartProduct?.category === "In-stock, Factory Wheels" ||
    cartProduct?.category === "Pre-Built, In-Stock Wheel";

  return (
    <div className="flex w-full flex-col rounded-b-none border-b border-[#cfcfcf]">
      <div className="relative flex w-full flex-row items-start justify-between">
        <div className="relative flex w-full flex-col items-start justify-center gap-2 px-2 pb-3 pt-6 sm:px-5">
          <p className="text-base leading-[19px] text-[#210203]">
            <span className="text-base font-normal text-[#210203]">
              {cartProduct.title}
            </span>
          </p>

          <h4 className="text-2xl leading-[29px] text-[#210203]">
            <Link
              href={`/collections/product/${cartProduct.slug}`}
              className="text-2xl font-bold text-[#210203] hover:underline"
            >
              {cartProduct.model_group}
            </Link>
          </h4>
        </div>
        <div className="flex w-full items-center justify-end gap-4 px-2 pb-3 pt-6 sm:px-5">
          {pathname === "/cart" &&
            (isTirePackage ? (
              <button
                // onClick={() => {
                //   changeTirePackage(cartProduct.cartPackage);
                // }}
                className="text-sm font-semibold leading-[17px] text-[#210203] underline"
              >
                Change Package
              </button>
            ) : (
              isWheel && (
                <button
                  className="w-fit text-sm font-semibold leading-[17px] text-[#210203] underline"
                  // onClick={buildTirePackage}
                >
                  Build Tire Package
                </button>
              )
            ))}
          {pathname === "/cart" && (
            <button onClick={() => removeCartProduct(cartProduct.cartSerial)}>
              <small className="text-sm leading-[17px] text-[#210203] underline">
                <span className="text-sm font-semibold text-[#210203]">
                  Remove
                </span>
              </small>
            </button>
          )}
        </div>
      </div>

      <div className="relative flex w-full flex-col items-start gap-6 self-stretch pl-2 pr-0 sm:flex-row sm:pl-5">
        {/* Rating and Image */}
        <div className="relative flex w-full flex-col items-start gap-4 sm:w-auto">
          <Rating />
          <div className="relative flex w-full justify-center pb-4">
            <Link href={`/collections/product/${cartProduct.slug}`}>
              <Image
                src={
                  cartProductImage !== ""
                    ? cartProductImage
                    : "/not-available.webp"
                }
                width={210}
                height={210}
                className={`h-[160px] w-[160px]`}
                alt={cartProduct.title}
              />
            </Link>
          </div>
        </div>

        {category === "Custom Wheels" ? (
          <div className="relative flex w-full flex-1 flex-col">
            <div className="flex w-full flex-col items-start justify-between gap-4 py-5">
              <div className="relative flex w-full items-center justify-between self-stretch pl-0 pr-4">
                <div className="relative flex flex-col items-start gap-2">
                  <h5 className="text-xl leading-6 text-[#210203]">
                    <span className="text-xl font-semibold text-[#210203]">
                      {cartProduct.metaData?.frontForging !== "" && "Front"}
                    </span>
                  </h5>
                  <CardPrice
                    price={cartProduct.price.toFixed(2)}
                    type={productType}
                  />
                </div>
                <Quantity
                  cartProduct={cartProduct}
                  isTirePackage={isTirePackage}
                />
              </div>

              <div className="relative flex w-full flex-col items-start gap-2 md:flex-row">
                <CustomwheelsFrontAttributes cartProduct={cartProduct} />
                <DeliveryWithStock />
              </div>
            </div>
            <div className="flex w-full flex-col items-start justify-between gap-4 border-t border-[#cfcfcf] py-5">
              <div className="relative flex w-full items-center justify-between self-stretch pl-0 pr-4">
                <div className="relative flex flex-col items-start gap-2">
                  <h5 className="text-xl leading-6 text-[#210203]">
                    <span className="text-xl font-semibold text-[#210203]">
                      {cartProduct.metaData?.rearForging !== "" && "Rear"}
                    </span>
                  </h5>
                  <CardPrice
                    price={cartProduct.price.toFixed(2)}
                    type={productType}
                  />
                </div>
                {/* <Quantity
                  cartProduct={cartProduct}
                  isTirePackage={isTirePackage}
                /> */}
              </div>

              <div className="relative flex w-full flex-col items-start gap-2 md:flex-row">
                <CustomwheelsRearAttributes cartProduct={cartProduct} />
                <DeliveryWithStock />
              </div>
            </div>
          </div>
        ) : (
          <div className="relative flex w-full flex-1 flex-col">
            <div className="flex w-full flex-col items-start justify-between gap-9 py-5">
              <div className="relative flex w-full items-center justify-between self-stretch pl-0 pr-4">
                <div className="relative flex flex-col items-start gap-2">
                  <h5 className="text-xl leading-6 text-[#210203]">
                    <span className="text-xl font-semibold text-[#210203]">
                      {frontRear}
                    </span>
                  </h5>
                  <CardPrice
                    price={cartProduct.price.toFixed(2)}
                    type={productType}
                  />
                </div>
                <Quantity
                  cartProduct={cartProduct}
                  isTirePackage={isTirePackage}
                />
              </div>

              <div className="relative flex w-full flex-col items-start gap-2 md:flex-row">
                <WheelAttributes cartProduct={cartProduct} />
                <DeliveryWithStock />
              </div>
            </div>
          </div>
        )}
      </div>
      {/* <PackageModal
        executeBeforeRedirect={() => {
          // change quantity to 4 or 6
          dispatch(
            changeItemQuantity({
              cartSerial: cartProduct.cartSerial,
              quantity:
                cartProduct.category === "Custom Wheels"
                  ? cartProduct.metaData?.rearForging === "Dually"
                    ? 6
                    : 4
                  : cartProduct.forging_style === "Dually"
                    ? 6
                    : 4,
            }),
          );
        }}
        packageId={cartProduct.cartPackage}
        open={openModal}
        setOpen={setOpenModal}
      /> */}
    </div>
  );
};

export default WheelCard;
