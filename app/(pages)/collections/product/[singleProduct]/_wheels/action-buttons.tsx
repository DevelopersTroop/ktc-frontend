"use client";
import { TInventoryItem } from "@/app/types/product";
import React from "react";
import wait from "wait";
// import { CenterCapContext } from "./context/CenterCapProvider";

const ActionButtons = ({ product }: { product: TInventoryItem }) => {
  console.log("product = ", product);
  //   const dispatch = useDispatch();
  //   const { quantity } = useContext(CenterCapContext);
  //   const { year, make, model } = useSelector(
  //     (state: RootState) => state.persisted.yearMakeModel
  //   );

  //   const cartProducts = useSelector(
  //     (state: RootState) => state.persisted.cart.products
  //   );
  const addProductToCart = () => {
    // const alreadyAddedProduct = Object.values(cartProducts).find(
    //   (cartProduct) => cartProduct.sku === product.sku
    // );
    // if (alreadyAddedProduct) {
    //   dispatch(
    //     changeItemQuantity({
    //       cartSerial: alreadyAddedProduct.cartSerial,
    //       quantity: alreadyAddedProduct.quantity + quantity,
    //     })
    //   );
    //   return {
    //     cartSerial: alreadyAddedProduct.cartSerial,
    //     cartPackage: alreadyAddedProduct.cartPackage,
    //   };
    // }
    // const packageId = uuidv4();
    // const cartSerial = uuidv4();
    // dispatch(
    //   addToCart({
    //     product: {
    //       ...product,
    //       id: product._id,
    //       slug: product.slug,
    //       image: product.item_image,
    //       title: product.title,
    //       maxInventory: product.inventory_available,
    //       inventoryStep: 1,
    //       minInventory: 1,
    //       sku: product.sku,
    //       category: product.category.title,
    //       price: getPrice(product.msrp, product.price),
    //       vehicleInformation: `${year} ${make} ${model}`,
    //       quantity,
    //       cartPackage: packageId,
    //       cartSerial: cartSerial,
    //     },
    //   })
    // );
    // return { cartSerial, cartPackage: packageId };
  };
  const [addToCartText, setAddToCartText] = React.useState(
    "Add Tires & Save up to $81!"
  );

  return (
    <>
      <div>
        <button
          onClick={() => {
            setAddToCartText("Adding to cart...");
            wait(400).then(() => {
              addProductToCart();
              setAddToCartText("Added to cart");
            });
          }}
          className={"bg-emerald-500 py-3 text-white text-xl rounded w-full"}
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
            " py-1 rounded outline outline-1 outline-emerald-500 w-full"
          }
        >
          Buy Wheels Only
        </button>
      </div>
      <div className="mt-4">
        <button
          onClick={() => {
            console.log("clicked");
          }}
          className={
            " py-1 rounded outline outline-1 outline-gray-300 bg-gray-100 text-gray-600 w-full"
          }
        >
          Add Staggered Setup
        </button>
      </div>
      <div className="mt-4">
        <button
          onClick={() => {
            console.log("clicked");
          }}
          className={
            " py-1 rounded outline outline-1 outline-gray-300 bg-gray-100 text-gray-600 w-full"
          }
        >
          Learn more about Factory Reproductions Wheels
        </button>
      </div>
      <div className="mt-4">
        <button
          onClick={() => {
            console.log("clicked");
          }}
          className={
            " py-1 rounded outline outline-1 outline-gray-300 bg-gray-100 text-gray-600 w-full"
          }
        >
          See these on Vehicles
        </button>
      </div>
    </>
  );
};

export default ActionButtons;
