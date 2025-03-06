"use client";
import { addToCart } from "@/app/globalRedux/features/cart/cart-slice";
import store, { useAppDispatch } from "@/app/globalRedux/store";
import { TInventoryItem } from "@/types/product";
import { v4 as uuidv4 } from "uuid";
import React, { useContext } from "react";
import wait from "wait";
import QuantityInput from "./quantity-input";
import { TireContext } from "./context/TireProvider";
// import { CenterCapContext } from "./context/CenterCapProvider";

const ActionButtons = ({ product }: { product: TInventoryItem }) => {
  console.log("product = ", product);
  const dispatch = useAppDispatch();
  const {quantity} = useContext(TireContext);
  //   const { quantity } = useContext(CenterCapContext);
  //   const { year, make, model } = useSelector(
  //     (state: RootState) => state.persisted.yearMakeModel
  //   );

  //   const cartProducts = useSelector(
  //     (state: RootState) => state.persisted.cart.products
  //   );
  const addProductToCart = async (meta?: any) => {
    const data = await new Promise<CartData>((resolve, reject) => {
      try {
        const packageId = uuidv4();
        const cartSerial = uuidv4();
        const metaData = meta || {};
        dispatch(
          addToCart({
            product: {
              ...product,
              slug: product.slug,
              title: product.title,
              cartPackage: packageId,
              cartSerial: cartSerial,
              quantity: quantity,
              metaData,
            },
          }),
        );
        setTimeout(() => {
          const updatedProducts = store.getState().persisted.cart.products;
          const addedProduct = Object.values(updatedProducts).find(
            (p) =>
              p._id === product._id &&
              JSON.stringify(p.metaData) === JSON.stringify(metaData),
          );
          resolve({
            cartSerial: addedProduct?.cartSerial || cartSerial,
            cartPackage: addedProduct?.cartPackage || packageId,
          });
        }, 1000);
      } catch (error) {
        reject(error);
      }
    });
    return data;
  };

  const [addToCartText, setAddToCartText] = React.useState(
    "Add Wheels & Save More!"
  );

  return (
    <>
      <div className="flex flex-col justify-center gap-4">
        <div className="max-w-52" >
          <QuantityInput
              product={product}
              inventoryAvailable={20}
              name={"quantity"}
              id={"quantity"}
            />
          </div>
        <button
          onClick={() => {
            setAddToCartText("Adding to cart...");
            wait(400).then(() => {
              addProductToCart();
              setAddToCartText("Added to cart");
            });
          }}
          className={"bg-primary py-3 text-white rounded text-xl w-full"}
        >
          {addToCartText}
        </button>
      </div>
      <div className="mt-4">
        <button
          onClick={() => {
            console.log("clicked");
          }}
          className={
            " py-1 rounded outline outline-1 outline-primary w-full"
          }
        >
          Buy Tires Only
        </button>
      </div>
    </>
  );
};

export default ActionButtons;
