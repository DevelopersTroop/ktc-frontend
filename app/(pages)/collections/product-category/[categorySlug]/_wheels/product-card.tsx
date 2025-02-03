"use client";
import { TInventoryItem } from "@/app/types/product";
import Image from "next/image";
import Link from "next/link";
import CardDescription from "./card-description";

const ProductCard = ({ product }: { product: TInventoryItem }) => {
  const productLink = `/collections/product/${product.slug}`;
  return (
    <div
      className={
        "w-full min-[600px]:w-[250px] flex flex-row min-[600px]:flex-col border border-white shadow px-4 py-4"
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
        <CardDescription product={product} />
      </Link>
    </div>
  );
};

export default ProductCard;
