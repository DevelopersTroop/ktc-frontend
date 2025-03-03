"use client";
import { TInventoryItem } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import CardDescription from "./card-description";

const ProductCard = ({ product }: { product: TInventoryItem }) => {
  const productLink = `/collections/product/${product.slug}`;
  return (
    <div
      className={
        "flex w-full flex-row overflow-hidden rounded-xl border border-[#cfcfcf] bg-white px-4 min-[600px]:w-[250px] min-[600px]:flex-col"
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
              product.thumbnail.length
                ? product.thumbnail
                : product.image_url.length
                  ? product.image_url
                  : "/not-available.webp"
            }
          ></Image>
        </Link>
      </div>

      <Link href={productLink} className="py-6">
        <CardDescription product={product} />
      </Link>
    </div>
  );
};

export default ProductCard;
