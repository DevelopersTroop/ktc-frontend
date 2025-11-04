"use client";
import { TInventoryItem } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import TireCardDescription from "./tire-card-description";
import { useSearchParams } from "next/navigation";
import { getProductImage } from "@/lib/utils";

const TireCard = ({ product }: { product: TInventoryItem }) => {
  const searchparams = useSearchParams();
  const cartPackage = searchparams.get("cartPackage");
  const productLink = `/collections/product/${product.slug}?cartPackage=${cartPackage}`;
  const [imageErr, setImageErr] = useState(false);
  return (
    <div
      className={
        "flex w-full flex-row overflow-hidden rounded-xl border border-[#cfcfcf] bg-white px-4 min-[600px]:max-w-[250px] min-[600px]:flex-col shadow-xl"
      }
    >
      <div className="flex w-full items-center justify-center pt-5">
        <Link href={productLink}>
          <Image
            className={"d-block mx-auto w-full rounded-xl object-cover"}
            height={238}
            width={238}
            alt="product image"
            src={getProductImage(imageErr, product)}
            onError={() => setImageErr(true)}
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
