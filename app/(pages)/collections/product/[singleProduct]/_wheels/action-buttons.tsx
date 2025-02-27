"use client";
import useAuth from "@/hooks/useAuth";
import { customFetch } from "@/lib/common-fetch";
import { errorMessage, successMessage } from "@/lib/toast";
import { TInventoryItem } from "@/types/product";
import { useState } from "react";
import { NormalActionButton } from "./normal-action";
import { StaggeredActionButton } from "./stagger-action";

const ActionButtons = ({ product }: { product: TInventoryItem }) => {
  const { user } = useAuth();

  const [isStaggered, setIsStaggered] = useState(false);
  const handleWishlist = async () => {
    if (!user) {
      errorMessage("You must have to loging");
      return;
    }

    try {
      await customFetch("wishlists", "POST", {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
        body: {
          slug: product?.slug,
          data: {
            title: product?.title,
            item_image: product?.thumbnail,
            category: "wheels",
          },
        },
      });
      successMessage("Added to wishlist");
    } catch (error: any) {
      errorMessage(error.message);
    }
  };
  return (
    <div className="flex flex-col gap-y-4">
      {isStaggered ? (
        <StaggeredActionButton product={product} />
      ) : (
        <NormalActionButton product={product} setIsStaggered={setIsStaggered} />
      )}
      <div>
        <button
          onClick={() => {
            console.log("clicked");
          }}
          className={
            "w-full rounded bg-gray-100 py-1 text-gray-600 outline outline-1 outline-gray-300"
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
          "w-full rounded bg-gray-100 py-1 text-gray-600 outline outline-1 outline-gray-300"
        }
      >
        See these on Vehicles
      </button>
      <button
        onClick={handleWishlist}
        className={
          "w-full rounded bg-gray-100 py-1 text-gray-600 outline outline-1 outline-gray-300"
        }
      >
        Add to wishlist
      </button>
    </div>
  );
};

export default ActionButtons;
