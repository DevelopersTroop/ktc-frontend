import { addToCart } from "@/app/globalRedux/features/cart/cart-slice";
import store, { useAppDispatch } from "@/app/globalRedux/store";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TInventoryItem } from "@/types/product";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { PiShoppingCartLight } from "react-icons/pi";
import { v4 as uuidv4 } from "uuid";
import { WheelContext } from "./context/WheelProvider";
import QuantityInput from "./quantity-input";
import { YmmSelector } from "./ymm";

type NormalActionButtonProps = {
  setIsStaggered: React.Dispatch<React.SetStateAction<boolean>>;
  product: TInventoryItem;
};

export interface CartData {
  cartSerial: string;
  cartPackage: string;
}

export const NormalActionButton: React.FC<NormalActionButtonProps> = ({
  setIsStaggered,
  product,
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [ymm, setYmm] = useState<{
    year: string;
    make: string;
    model: string;
    trim: string;
    showError?: boolean;
    levelingKit: string;
    finish: string;
  }>({
    year: "",
    make: "",
    model: "",
    trim: "",
    showError: false,
    finish: "",
    levelingKit: "",
  });
  const [isFitmentNeeded, setIsFitmentNeeded] = useState(false);
  const [openFitmentModal, setOpenFitmentModal] = useState(false);
  const { quantity } = useContext(WheelContext);
  console.log("action product  === ", product);
  const handleBuyWheels = () => {
    if (
      !isFitmentNeeded &&
      (!ymm.year.length ||
        !ymm.make.length ||
        !ymm.model.length ||
        !ymm.trim.length)
    ) {
      setOpenFitmentModal(true);
      return;
    }
    addProductToCart(ymm).then((res) => {
      router.push(
        `/cart?cartPackage=${res.cartPackage}&cartSerial=${res.cartSerial}`,
      );
    });
  };


  const handleAddTires = () => {
    // if (
    //   !isFitmentNeeded &&
    //   (!ymm.year.length ||
    //     !ymm.make.length ||
    //     !ymm.model.length ||
    //     !ymm.trim.length)
    // ) {
    //   setOpenFitmentModal(true);
    //   return;
    // }
    addProductToCart(ymm).then((res) => {
      router.push(
        `/collections/product-category/tires?rim_diameter=${product.diameter}&cartPackage=${res.cartPackage}&cartSerial=${res.cartSerial}`,
        // `/collections/product-category/tires?rim_diameter=${product.diameter}`,
      );
    });
  }

  const addProductToCart = async (meta?: any, prePackageId?: string, preCartSerial?: string) => {
    const data = await new Promise<CartData>((resolve, reject) => {
      try {
        const packageId = prePackageId ?? uuidv4();
        const cartSerial = preCartSerial ?? uuidv4();
        const metaData = meta || {};
        dispatch(
          addToCart({
            product: {
              ...product,
              slug: product.slug,
              title: product.title,
              cartPackage: packageId,
              cartSerial: cartSerial,
              quantity: 4,
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

  const addProductToCartQuantity = async (meta?: any) => {
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
  // const [addToCartText, setAddToCartText] = useState(
  //     "Add Tires & Save up to $81!"
  // );
  const [addToCartText, setAddToCartText] = useState("Add To Cart");
  return (
    <div className="flex flex-col gap-y-4">
      <YmmSelector setYmm={setYmm} ymm={ymm} />
      {/* <button
                onClick={() => {
                    setAddToCartText("Adding to cart...");
                    addProductToCart().then((res) => {
                        router.push(`/collections/product-category/tires?cartPackage=${res.cartPackage}&cartSerial=${res.cartSerial}`)
                    })

                }}
                className={"bg-emerald-500 py-3 text-white text-xl rounded w-full"}
            >
                {addToCartText}
            </button> */}
      <div className="relative mt-4 flex w-full flex-row items-baseline justify-between gap-4 self-stretch">
        <QuantityInput
          product={product}
          inventoryAvailable={20}
          name={"quantity"}
          id={"quantity"}
        // isDually={product?.dually}
        />
        <button
          onClick={() => {
            setAddToCartText("Adding to cart...");

            addProductToCartQuantity(ymm).then(() => {
              setAddToCartText("Added to cart");
            });
          }}
          className="relative flex min-h-14 w-full flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-3 transition duration-300 ease-in-out hover:bg-primary-hover hover:text-white"
        >
          <PiShoppingCartLight className="text-2xl text-white" />

          <p className="leading-[22px] text-white">
            <span className="text-base font-semibold text-white">
              {addToCartText}
            </span>
          </p>
        </button>
      </div>
      <button
        onClick={handleAddTires}
        className={"w-full rounded py-1 outline outline-1 outline-primary"}
      >
        Add Tires
      </button>
      <button
        onClick={handleBuyWheels}
        className={"w-full rounded py-1 outline outline-1 outline-primary"}
      >
        Buy Wheels Only
      </button>
      <button
        onClick={() => setIsStaggered(true)}
        className={
          "w-full rounded bg-gray-100 py-1 text-gray-600 outline outline-1 outline-gray-300"
        }
      >
        Add Staggered Setup
      </button>
      <Dialog open={openFitmentModal} onOpenChange={setOpenFitmentModal}>
        <DialogContent className="flex max-w-6xl flex-col gap-y-12 py-12">
          <DialogHeader className="mt-14">
            <DialogTitle className="text-center text-xl text-gray-700">
              Enter your year, make, and model to confirm fitment
            </DialogTitle>
          </DialogHeader>
          <div className="flex w-full flex-col gap-y-4">
            <Button
              onClick={() => {
                setOpenFitmentModal(false);
                setYmm((prev) => ({ ...prev, showError: true }));
              }}
              className="h-10 border border-black bg-primary text-xl font-bold capitalize text-white hover:bg-primary-hover"
            >
              Confirm fitment with vehicle deatils
            </Button>
            <Button
              onClick={() => {
                addProductToCart().then((res) => {
                  router.push(
                    `/cart?cartPackage=${res.cartPackage}&cartSerial=${res.cartSerial}`,
                  );
                });
              }}
              className="h-10 border-black text-xl font-bold capitalize hover:bg-transparent"
              variant={"outline"}
            >
              Proceed without confirming
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
