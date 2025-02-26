"use client";
import { TInventoryItem } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import TireCardDescription from "./tire-card-description";

const TireCard = ({ product }: { product: TInventoryItem }) => {
  const productLink = `/collections/product/${product.slug}`;
  return (
    <div
      className={
        "w-full min-[600px]:max-w-[250px] flex flex-row min-[600px]:flex-col gap-4 border border-white shadow px-4 py-4"
      }
    >
      <div className="w-full flex justify-center items-center">
        <Link href={productLink}>
          <Image
            className={"mx-auto d-block rounded-xl w-full object-cover"}
            height={238}
            width={238}
            alt="product image"
            src={
              product.item_image !== ""
                ? product.item_image
                : "/not-available.webp"
            }
          ></Image>
        </Link>
      </div>
      <Link href={productLink}>
        <TireCardDescription product={product} />
      </Link>
    </div>
  );
};

export default TireCard;
