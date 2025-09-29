"use client";
import { IGallery } from "@/app/globalRedux/api/gallery";
import { normalizeImageUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }: { product: IGallery }) => {
  const productLink = `/ktc-audio-gallery/${product.slug}`;
  return (
    <>
      <Link href={productLink}>
        <div className="flex flex-col bg-gray-500 hover:bg-black duration-500 group">
          <div className="text-start text-white p-3">
            <h2 className="text-xl font-medium">{product.title}</h2>
            <p className="text-xl font-medium">{product.wheelModel}</p>
          </div>
          <div className="w-[300px] overflow-hidden h-[300px]">
            <Image
              className="transition-transform duration-500 ease-in-out transform group-hover:scale-110"
              src={normalizeImageUrl(product.thumbnail)}
              alt={product.title}
              width={300}
              height={300}
              objectFit="cover"
            />
          </div>
          <div className="text-start text-white p-2 ">
            <div>
              <h2 className="text-lg font-medium"> {product.wheelTitle} </h2>
              {/* <p className="">{product.}</p> */}
            </div>
            <div>
              <h2 className="text-lg font-medium"> {product.tireTitle} </h2>
              {/* <p>{product.tire.size}</p> */}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
