"use client";
import { TInventoryItem } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import AccessoriesCardDescription from "./accessories-card-description";

const AccessoriesCard = ({ product }: { product: TInventoryItem }) => {
  const productLink = `/collections/product/${product.slug}`;
  return (
    <div
      className={
        "max-w-[300px] flex flex-col bg-white border shadow relative group"
      }
    >
      <Link className="inline-block" href={productLink}>
        <div className="flex justify-center items-center">
          <Image
            className={"mx-auto d-block  w-full h-[280px] object-cover py-12"}
            height={238}
            width={238}
            alt="accessories image"
            src={
              product.item_image !== ""
                ? product.item_image
                : "/not-available.webp"
            }
          ></Image>
        </div>
        <div className="absolute top-0 left-0 bg-gray-600 text-white px-3 py-1 group-hover:bg-primary group-hover:pr-8">
          <p className="text-xl"> ${product?.price} </p>
        </div>
        <AccessoriesCardDescription product={product} />
      </Link>
    </div>
  );
};

export default AccessoriesCard;
