"use client";
import { removeFromCart } from "@/app/globalRedux/features/cart/cart-slice";
import {
  initiateCheckout,
  setSelectedOption,
  updateShippingProtection,
} from "@/app/globalRedux/features/checkout/checkout-slice";
import {
  RootState,
  useAppDispatch,
  useTypedSelector,
} from "@/app/globalRedux/store";
import { calculateCartTotal } from "@/app/utils/price";
import { useWishlist } from "@/hooks/useWishlist";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useSelector } from "react-redux";
import Quantity from "./_components/quantity";
import EmptyCart from "./empty-cart";
import { TCartProduct } from "@/types/cart";
import { getProductImage } from "@/lib/utils";
import { triggerGaBeginCheckoutEvent } from "@/app/utils/analytics";
const Cart = () => {
  const { saveAllProductFromCart } = useWishlist();
  const [isShippingProtectionChecked, setIsShippingProtectionChecked] =
    useState<boolean>(false);
  const shippingProtectionCost = 65.0;

  const cart = useSelector((state: RootState) => state.persisted.cart);
  const cartProducts = useTypedSelector(
    (state) => state.persisted.cart.products
  );

  const subTotalCost = Number(
    calculateCartTotal(cart.products).replace(/,/g, "")
  );
  const costWithoutFormatic = calculateCartTotal(cart.products, 0, false);
  const [totalCost, setTotalCost] = useState<number>(subTotalCost);

  const handleCheckboxChange = () => {
    setIsShippingProtectionChecked((prevChecked) => !prevChecked);
  };

  console.log("cart product = ", cartProducts);

  const [shippingOption, setShippingOption] = useState<
    Record<string, "standard" | "speedy">
  >({});
  const speedyShippingCost = 32.0;
  const handleShippingOptionChange = (
    cartSerial: string,
    option: "standard" | "speedy"
  ) => {
    setShippingOption((prev) => ({
      ...prev,
      [cartSerial]: option,
    }));
  };

  const totalSpeedyShipping = Object.values(cartProducts).reduce(
    (sum, product: TCartProduct) => {
      return shippingOption[product.cartSerial] === "speedy"
        ? sum + speedyShippingCost
        : sum;
    },
    0
  );

  useEffect(() => {
    const numericSubTotal = Number(subTotalCost); // Ensure it's a clean number
    let updatedTotal = numericSubTotal + totalSpeedyShipping;
    if (isShippingProtectionChecked) updatedTotal += shippingProtectionCost;
    // const updatedTotal = isShippingProtectionChecked
    //   ? numericSubTotal + shippingProtectionCost
    //   : numericSubTotal;

    setTotalCost(updatedTotal); // Format properly
  }, [isShippingProtectionChecked, subTotalCost, totalSpeedyShipping]);

  const dispatch = useAppDispatch();

  const removeCartProduct = (cartSerial: string) => {
    dispatch(removeFromCart({ cartSerial }));
  };

  useEffect(() => {
    if (isShippingProtectionChecked) {
      dispatch(updateShippingProtection(shippingProtectionCost));
    } else {
      dispatch(updateShippingProtection(0));
    }
  }, [isShippingProtectionChecked, dispatch]);

  return (
    <div>
      {!Object.keys(cartProducts).length ? (
        <>
          {" "}
          <EmptyCart />{" "}
        </>
      ) : (
        <>
          <div className="bg-gray-200">
            <div className="mx-auto w-full max-w-[1600px] py-4 min-[1100px]:px-[50px]">
              <h1 className="px-4 pb-6 text-xl font-semibold min-[1100px]:px-0">
                Shopping Cart
              </h1>
              <div className="flex w-full flex-col gap-4 min-[1100px]:flex-row min-[1100px]:gap-20">
                <div className="order-2 flex w-full flex-col gap-6 px-[5%] min-[1100px]:order-1 min-[1100px]:w-4/6 min-[1100px]:px-0">
                  {Object.values(cartProducts).map((product, index) => {
                    const categoryTitle =
                      product?.category?.title?.toLowerCase();
                    console.log("categoryTitle =====   ", categoryTitle);
                    let emptyThumbnail = "";
                    if (categoryTitle === "wheels") {
                      emptyThumbnail = "/not-available.webp";
                    } else if (categoryTitle === "tires") {
                      emptyThumbnail = "/tire-not-available.webp";
                    } else if (categoryTitle === "accessories") {
                      emptyThumbnail = "/accessory-not-available.webp";
                    } else {
                      emptyThumbnail = "/not-available.webp";
                    }

                    return (
                      <div key={index} className="w-full bg-white p-4">
                        <div className="flex gap-4 text-black">
                          <p className="text-xl font-semibold">
                            {product?.category?.title}
                          </p>
                          <p className="hidden font-medium md:block">
                            Vehicle: {product.brand}
                          </p>
                          <div className="block flex-1 text-end md:hidden">
                            <button
                              onClick={() =>
                                removeCartProduct(product.cartSerial)
                              }
                              className="text-lg text-primary"
                            >
                              Remove
                            </button>
                          </div>
                        </div>

                        <div className="mt-2 flex flex-col gap-8 md:flex-row">
                          <div className="order-2 w-full md:order-1 md:w-4/6">
                            <div className="flex w-full items-center gap-5 md:items-start">
                              <div className="min-w-[100px]">
                                <Image
                                  className="h-full w-[100px] rounded-xl object-cover"
                                  height={100}
                                  width={100}
                                  alt="product image"
                                  src={getProductImage(false, product)}
                                />
                              </div>
                              <div className="hidden md:block">
                                <p className="text-xl font-semibold">
                                  {product.title}
                                </p>
                                <p className="text-gray-500">
                                  {" "}
                                  {product.model}{" "}
                                </p>
                                <p> {product._id} </p>
                              </div>
                              <div className="flex-1 text-end">
                                <p className="flex items-start justify-end font-semibold">
                                  $
                                  <span className="text-2xl">
                                    {product?.msrp.toFixed(2)}
                                  </span>
                                </p>
                              </div>
                            </div>

                            <div className="flex flex-col gap-3 border-gray-300 text-end md:border-b md:pb-28">
                              <div className="flex justify-end gap-2 pt-5">
                                {/* <p className="text-lg font-medium">Quantity:</p> */}
                                <Quantity cartProduct={product} />
                              </div>

                              <div className="hidden md:block">
                                <button
                                  onClick={() =>
                                    removeCartProduct(product.cartSerial)
                                  }
                                  className="text-xl text-primary"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>

                            <div className="w-full border-b border-gray-300 pb-5 pt-3 md:hidden">
                              <p className="text-xl font-semibold">
                                {product.title}
                              </p>
                              <p className="text-gray-500"> {product.model} </p>
                              <p> {product._id} </p>
                            </div>

                            <div className="mt-2 flex justify-between">
                              <p className="text-2xl font-semibold">
                                {product?.category?.title}
                              </p>
                              <p className="flex items-start text-primary">
                                $
                                <span className="text-2xl font-semibold">
                                  {(product?.msrp * product?.quantity).toFixed(
                                    2
                                  )}
                                </span>
                              </p>
                            </div>
                          </div>

                          <div className="order-1 w-full md:order-2 md:w-2/6">
                            <div className="border-gray-400 pb-5 md:border-b">
                              <h1 className="text-base font-semibold">
                                Choose your delivery Option:
                              </h1>
                              <div className="flex flex-row items-center gap-2 p-5 shadow-2xl md:p-0 md:shadow-none">
                                <div>
                                  <input
                                    className="h-5 w-5"
                                    type="checkbox"
                                    id={`delivery-option-standard-${product._id}`}
                                    name={`delivery-option-${product.cartSerial}`}
                                    checked={
                                      shippingOption[product.cartSerial] !==
                                      "speedy"
                                    }
                                    onChange={() =>
                                      handleShippingOptionChange(
                                        product.cartSerial,
                                        "standard"
                                      )
                                    }
                                  />
                                </div>
                                <div className="flex flex-col text-lg">
                                  <p className="font-semibold text-primary">
                                    {(() => {
                                      const today = new Date();
                                      const start = new Date(today);
                                      start.setDate(today.getDate() + 3);
                                      const end = new Date(today);
                                      end.setDate(today.getDate() + 7);

                                      const format = (date: Date) =>
                                        date.toLocaleString("en-US", {
                                          month: "short",
                                          day: "2-digit",
                                        });

                                      return `${format(start)} - ${format(
                                        end
                                      )}`;
                                    })()}
                                  </p>
                                  <p>Free Standard Shipping</p>
                                </div>
                              </div>
                              <div className="flex flex-row items-center gap-2 p-5 shadow-2xl md:p-0 md:shadow-none mt-4">
                                <div>
                                  <input
                                    className="h-5 w-5"
                                    type="checkbox"
                                    id={`delivery-option-speedy-${product._id}`}
                                    name={`delivery-option-${product.cartSerial}`}
                                    checked={
                                      shippingOption[product.cartSerial] ===
                                      "speedy"
                                    }
                                    onChange={() =>
                                      handleShippingOptionChange(
                                        product.cartSerial,
                                        "speedy"
                                      )
                                    }
                                  />
                                </div>
                                <div className="flex flex-col text-lg">
                                  <p className="font-semibold text-primary">
                                    {(() => {
                                      const today = new Date();
                                      const start = new Date(today);
                                      start.setDate(today.getDate() + 1);
                                      const end = new Date(today);
                                      end.setDate(today.getDate() + 3);

                                      const format = (date: Date) =>
                                        date.toLocaleString("en-US", {
                                          month: "short",
                                          day: "2-digit",
                                        });

                                      return `${format(start)} - ${format(
                                        end
                                      )}`;
                                    })()}
                                  </p>
                                  <p className="font-semibold">$32</p>
                                  <p>Speedy Shipping</p>
                                </div>
                              </div>
                            </div>

                            <div className="mt-3">
                              <h1 className="text-base font-semibold">
                                Shipping Protection
                              </h1>
                              <div className="flex flex-row items-center gap-2 p-5 shadow-2xl md:p-0 md:shadow-none">
                                <div>
                                  <input
                                    className="h-5 w-5"
                                    type="checkbox"
                                    id={`delivery-option-${product._id}`}
                                    name="delivery-option"
                                    checked={isShippingProtectionChecked}
                                    onChange={handleCheckboxChange}
                                  />
                                </div>
                                <div className="flex flex-col text-lg">
                                  <p className="font-semibold">
                                    ${shippingProtectionCost.toFixed(2)}
                                  </p>
                                  <p>
                                    Covers lost, stolen, or Damaged packages
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Order Summary */}
                <div className="order-1 h-full w-full bg-white p-8 text-center shadow min-[1100px]:order-2 min-[1100px]:w-2/6">
                  <h2 className="text-3xl font-semibold uppercase">
                    Order Summary
                  </h2>
                  <div className="mt-6 flex flex-col gap-4">
                    <div className="flex justify-between text-start text-xl font-medium">
                      <p className="uppercase">Original Price</p>
                      <p>${subTotalCost.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between text-start text-xl font-medium">
                      <p className="uppercase">Discount Savings</p>
                      <p>$0.00</p>
                    </div>
                    <div className="flex justify-between text-start text-xl font-medium">
                      <p className="uppercase">Subtotal</p>
                      <p>${subTotalCost.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between text-start text-xl font-medium">
                      <p className="uppercase">Shipping</p>
                      <p>
                        <p>${totalSpeedyShipping.toFixed(2)}</p>
                      </p>
                    </div>
                    <div className="flex justify-between text-start text-xl font-medium">
                      <p className="uppercase">Shipping Protection</p>
                      <p>
                        ${" "}
                        {isShippingProtectionChecked
                          ? shippingProtectionCost.toFixed(2)
                          : "0.00"}{" "}
                      </p>
                    </div>
                    <div className="border-b border-gray-800"></div>
                  </div>
                  <div>
                    <h2 className="mt-2 text-2xl font-medium uppercase">
                      Total Before Tax
                    </h2>
                    <p className="mt-2 text-4xl font-semibold">
                      ${totalCost.toFixed(2)}
                    </p>
                    <p className="mt-4 text-sm">
                      Tax is calculated during checkout
                    </p>
                  </div>
                  <div className="mx-[10%] my-4">
                    <Link
                      onClick={() => {
                        triggerGaBeginCheckoutEvent(
                          Number(costWithoutFormatic),
                          Object.values(cart.products)
                        );
                        dispatch(initiateCheckout());
                        dispatch(setSelectedOption());
                      }}
                      href="/checkout"
                    >
                      <button className="w-full rounded bg-gray-400 py-2 text-xl font-semibold text-white shadow-2xl">
                        Choose Shipping Optons
                      </button>
                    </Link>
                  </div>
                  <div className="mx-[10%]">
                    <Link href="/collections/product-category/wheels">
                      <button className="w-full rounded py-2 text-lg font-semibold outline outline-1">
                        Continue Shopping
                      </button>
                    </Link>
                  </div>
                  <div className="mt-3 flex cursor-pointer justify-center gap-5 text-lg font-medium text-primary">
                    <div className="flex items-center gap-2">
                      <p>Share</p>
                      <MdKeyboardArrowRight />
                    </div>
                    <button
                      onClick={saveAllProductFromCart}
                      className="flex items-center gap-2"
                    >
                      <p>Save for Later</p>
                      <MdKeyboardArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
