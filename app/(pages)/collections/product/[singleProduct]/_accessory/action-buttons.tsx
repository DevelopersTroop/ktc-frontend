"use client";
import { addToCart } from "@/app/globalRedux/features/cart/cart-slice";
import store, { useAppDispatch } from "@/app/globalRedux/store";
import { TInventoryItem } from "@/types/product";
import React, { useContext } from "react";
import wait from "wait";
import { v4 as uuidv4 } from "uuid";
import { AccessoryContext } from "./context/AccessoryProvider";
import QuantityInput from "./quantity-input";
import { CartData } from "../_wheels/normal-action";
// import { CenterCapContext } from "./context/CenterCapProvider";

const ActionButtons = ({ product }: { product: TInventoryItem }) => {
  const dispatch = useAppDispatch();
  const {quantity} = useContext(AccessoryContext);
  //   const { quantity } = useContext(CenterCapContext);
  //   const { year, make, model } = useSelector(
  //     (state: RootState) => state.yearMakeModel
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

  //   const cartProducts = useSelector(
  //     (state: RootState) => state.persisted.cart.products
  //   );
  // const addProductToCart = () => {
  //   const alreadyAddedProduct = Object.values(cartProducts).find(
  //     (cartProduct) => cartProduct.sku === product.sku
  //   );
  //   if (alreadyAddedProduct) {
  //     dispatch(
  //       changeItemQuantity({
  //         cartSerial: alreadyAddedProduct.cartSerial,
  //         quantity: alreadyAddedProduct.quantity + quantity,
  //       })
  //     );
  //     return {
  //       cartSerial: alreadyAddedProduct.cartSerial,
  //       cartPackage: alreadyAddedProduct.cartPackage,
  //     };
  //   }
  //   const packageId = uuidv4();
  //   const cartSerial = uuidv4();
  //   dispatch(
  //     addToCart({
  //       product: {
  //         ...product,
  //         id: product._id,
  //         slug: product.slug,
  //         image: product.item_image,
  //         title: product.title,
  //         maxInventory: product.inventory_available,
  //         inventoryStep: 1,
  //         minInventory: 1,
  //         sku: product.sku,
  //         category: product.category.title,
  //         price: getPrice(product.msrp, product.price),
  //         vehicleInformation: `${year} ${make} ${model}`,
  //         quantity,
  //         cartPackage: packageId,
  //         cartSerial: cartSerial,
  //       },
  //     })
  //   );
  //   return { cartSerial, cartPackage: packageId };
  // };
  const [addToCartText, setAddToCartText] = React.useState("Add to Cart");

  return (
    <>
      <div className="flex flex-col justify-center gap-4">
        <div className="max-w-52"> 
        <QuantityInput
          product={product}
          inventoryAvailable={20}
          name={"quantity"}
          id={"quantity"}
          // isDually={product?.dually}
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
          className={"w-full rounded bg-primary py-3 text-xl text-white"}
        >
          {addToCartText}
        </button>
      </div>
    </>
  );
};

export default ActionButtons;
