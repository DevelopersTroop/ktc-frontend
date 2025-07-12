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
import useYmm from "@/hooks/use-ymm";

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

  const ymm = useYmm();
  const [openFitmentModal, setOpenFitmentModal] = useState(false);
  const { quantity } = useContext(WheelContext);
  const addProductToCart = async (checkYmm:boolean = true, meta: Record<string, string> = {}, customQuantity: number = quantity) => {
    if (checkYmm && !(ymm.year && ymm.make && ymm.model && ymm.bodyType && ymm.subModel?.SubModel)) {
      setOpenFitmentModal(true);
      return;
    }

    const data = await new Promise<CartData>((resolve, reject) => {
      try {
        const packageId = uuidv4();
        const cartSerial = uuidv4();
        const metaData = {
          year: ymm.year,
          make: ymm.make,
          model: ymm.model,
          bodyType: ymm.bodyType,
          subModel: ymm.subModel,
          ...(meta ?? {})
        };
        dispatch(
          addToCart({
            product: {
              ...product,
              slug: product.slug,
              title: product.title,
              cartPackage: packageId,
              cartSerial: cartSerial,
              quantity: customQuantity,
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

  const handleAddTires = (checkYmm:boolean = true) => {
  
    addProductToCart(checkYmm, {}, 4).then((res) => {
      if (res) {
        router.push(
          `/collections/product-category/tires?rim_diameter=${product.diameter}&cartPackage=${res.cartPackage}&cartSerial=${res.cartSerial}`,
          // `/collections/product-category/tires?rim_diameter=${product.diameter}`,
        );
      }
    });
  }


  // const [addToCartText, setAddToCartText] = useState(
  //     "Add Tires & Save up to $81!"
  // );
  const [addToCartText, setAddToCartText] = useState("Add To Cart");
  return (
    <div className="flex flex-col gap-y-4">
      <YmmSelector ymm={ymm} />
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
            addProductToCart().then((res) => {
              if (res)
                setAddToCartText("Added to cart");
              else
                setAddToCartText("Add to cart");
            })
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
        onClick={() => handleAddTires()}
        className={"w-full rounded py-1 outline outline-1 outline-primary"}
      >
        Add Tires
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
              }}
              className="h-10 border border-black bg-primary text-xl font-bold capitalize text-white hover:bg-primary-hover"
            >
              Confirm fitment with vehicle deatils
            </Button>
            <Button
              onClick={() => {
                addProductToCart(false).then((res) => {
                  console.log("res", res)
                  if (res) {
                    router.push(
                      `/cart?cartPackage=${res.cartPackage}&cartSerial=${res.cartSerial}`,
                    );
                  }
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
