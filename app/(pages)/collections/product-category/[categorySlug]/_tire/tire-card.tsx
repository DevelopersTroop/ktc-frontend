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
        "flex w-full flex-row min-[600px]:max-w-[250px] min-[600px]:flex-col overflow-hidden rounded-xl border border-[#cfcfcf] px-4 bg-white"
      }
    >
      <div className="flex w-full items-center justify-center pt-5">
        <Link href={productLink}>
          <Image
            className={"d-block mx-auto w-full rounded-xl object-cover"}
            height={238}
            width={238}
            alt="product image"
            src={
              product.thumbnail !== ""
                ? product.thumbnail
                : "/not-available.webp"
            }
          ></Image>
        </Link>
      </div>
      <Link href={productLink} className="py-6">
        <TireCardDescription product={product} />
      </Link>
    </div>
  );
};

export default TireCard;
