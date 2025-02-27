"use client";
import { TInventoryItem } from "@/types/product";
import React from "react";
import wait from "wait";
// import { CenterCapContext } from "./context/CenterCapProvider";

const ActionButtons = ({ product }: { product: TInventoryItem }) => {
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
  const [addToCartText, setAddToCartText] = React.useState("Add to Cart");

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
          className={"w-full rounded bg-emerald-500 py-3 text-xl text-white"}
        >
          {addToCartText}
        </button>
      </div>
    </>
  );
};

export default ActionButtons;
