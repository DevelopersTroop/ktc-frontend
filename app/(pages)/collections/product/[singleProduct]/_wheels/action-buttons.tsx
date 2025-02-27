"use client";
import useAuth from "@/app/(pages)/_hooks/useAuth";
import { TInventoryItem } from "@/types/product";
import { customFetch } from "@/lib/common-fetch";
import { errorMessage, successMessage } from "@/lib/toast";
import { useState } from "react";
import { NormalActionButton } from "./normal-action";
import { StaggeredActionButton } from "./stagger-action";

const ActionButtons = ({ product }: { product: TInventoryItem }) => {
  const { user } = useAuth()

  const [isStaggered, setIsStaggered] = useState(false)
  const handleWishlist = async () => {
    if (!user) {
      errorMessage("You must have to loging")
      return;
    }

    try {
      await customFetch('wishlists', 'POST', {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`
        },
        body: {
          slug: product?.slug,
          data: {
            title: product?.title,
            item_image: product?.thumbnail,
            category: "wheels"
          },
        }
      })
      successMessage("Added to wishlist")
    } catch (error: any) {
      errorMessage(error.message)
    }
  }
  return (
    <div className="flex flex-col gap-y-4">
      {
        isStaggered ? (
          <StaggeredActionButton product={product} />
        ) : (<NormalActionButton product={product} setIsStaggered={setIsStaggered} />)
      }
      <div>
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
      <button
        onClick={handleWishlist}
        className={
          " py-1 rounded outline outline-1 outline-gray-300 bg-gray-100 text-gray-600 w-full"
        }
      >
        Add to wishlist
      </button>
    </div>
  );
};

export default ActionButtons;


