"use client";
import { useWishlist } from "@/hooks/useWishlist";
import { TInventoryItem } from "@/types/product";
import { useState } from "react";
import { NormalActionButton } from "./normal-action";
import { StaggeredActionButton } from "./stagger-action";

const ActionButtons = ({ product }: { product: TInventoryItem }) => {
  const { saveToLater } = useWishlist();

  const [isStaggered, setIsStaggered] = useState(false);

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
        onClick={() => saveToLater(product)}
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
