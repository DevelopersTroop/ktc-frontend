"use client";
import { addToCart } from "@/app/globalRedux/features/cart/cart-slice";
import store, {
  useAppDispatch,
  useTypedSelector,
} from "@/app/globalRedux/store";
import { TInventoryItem } from "@/types/product";
import { v4 as uuidv4 } from "uuid";
import React, { useContext } from "react";
import wait from "wait";
import QuantityInput from "./quantity-input";
import { TireContext } from "./context/TireProvider";
import { CartData } from "../_wheels/normal-action";
import { useRouter, useSearchParams } from "next/navigation";
import { addPackage } from "@/app/globalRedux/features/package";
// import { CenterCapContext } from "./context/CenterCapProvider";

const ActionButtons = ({ product }: { product: TInventoryItem }) => {
  const searhcParams = useSearchParams();
  const cartPackage = searhcParams.get("cartPackage") as string;
  const packages = useTypedSelector((state) => state.persisted.package);
  const dispatch = useAppDispatch();
  const { quantity } = useContext(TireContext);

  const wheel = packages[cartPackage]?.wheel;

  const router = useRouter();
  //   const { quantity } = useContext(CenterCapContext);
  //   const { year, make, model } = useSelector(
  //     (state: RootState) => state.yearMakeModel
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
          })
        );
        setTimeout(() => {
          const updatedProducts = store.getState().persisted.cart.products;
          const addedProduct = Object.values(updatedProducts).find(
            (p) =>
              p._id === product._id &&
              JSON.stringify(p.metaData) === JSON.stringify(metaData)
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

  const [addToCartText, setAddToCartText] = React.useState("Buy Tires Only");

  const addWheels = () => {
    new Promise<{ cartPackage: string }>((res) => {
      const cartPackage = uuidv4();
      const cartSerial = uuidv4();
      dispatch(
        addPackage({
          packageId: cartPackage,
          tire: {
            ...product,
            cartPackage,
          },
        })
      );
      res({ cartPackage });
    }).then((res) => {
      router.push(
        `/collections/product-category/wheels?diameter=${product.rim_diameter}&cartPackage=${res.cartPackage}`
      );
    });
  };

  const addTires = () => {
    new Promise<{ cartPackage: string }>((res) => {
      dispatch(
        addPackage({
          packageId: cartPackage,
          tire: {
            ...product,
            cartPackage,
          },
        })
      );
      res({ cartPackage });
    }).then((res) => {
      router.push(`/wheel-and-tire-package?cartPackage=${res.cartPackage}`);
    });
  };

  return (
    <>
      <div className="flex flex-col justify-center gap-4">
        <div className="max-w-52">
          <QuantityInput
            product={product}
            inventoryAvailable={20}
            name={"quantity"}
            id={"quantity"}
          />
        </div>
        {wheel?._id ? (
          <button
            onClick={addTires}
            className={"w-full rounded py-1 outline outline-1 outline-primary"}
          >
            Add Tires to your package
          </button>
        ) : null}
        {wheel?._id ? null : (
          <button
            onClick={addWheels}
            className={"bg-primary py-3 text-white rounded text-xl w-full"}
          >
            Add Wheels & Save More !
          </button>
        )}
      </div>
      <div className="mt-4">
        <button
          onClick={() => {
            wait(400).then(() => {
              addProductToCart();
              setAddToCartText("Loading..");
              router.push("/cart");
            });
          }}
          className={" py-1 rounded outline outline-1 outline-primary w-full"}
        >
          {addToCartText}
        </button>
      </div>
    </>
  );
};

export default ActionButtons;
