"use client";
import { GProduct } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }: { product: GProduct }) => {
  const productLink = `/ktc-audio-gallery/${product.slug}`;
  return (
    <>
      <Link href={productLink}>
        <div className="flex flex-col bg-gray-500 hover:bg-black duration-500 group">
          <div className="text-start text-white p-3">
            <h2 className="text-xl font-medium">{product.ymm.title}</h2>
            <p className="text-xl font-medium">{product.ymm.model}</p>
          </div>
          <div className="w-[300px] overflow-hidden">
            <Image
              className="transition-transform duration-500 ease-in-out transform group-hover:scale-110"
              src={product.image}
              alt={product.ymm.title}
              width={300}
              height={300}
            />
          </div>
          <div className="text-start text-white p-2 ">
            <div>
              <h2 className="text-lg font-medium"> {product.wheel.title} </h2>
              <p className="">{product.wheel.size}</p>
            </div>
            <div>
              <h2 className="text-lg font-medium"> {product.tire.title} </h2>
              <p>{product.tire.size}</p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
