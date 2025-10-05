"use client";
import { TInventoryItem } from "@/types/product";
import Breadcrumb from "@/app/ui/breadcrumb/breadcrumb";
import Item from "@/app/ui/breadcrumb/item";
import Container from "@/app/ui/container/container";
import GalleryDetails from "./gallery-details";
import ImageGallery from "./image-gallery";
import { useParams } from "next/navigation";
import { useGetGalleryQuery } from "@/app/globalRedux/api/gallery";
// import "./single-product.css";

const SingleProduct = () => {
  const { singleProduct } = useParams();
  const { data } = useGetGalleryQuery(singleProduct as string);
  if (!data?.gallery) return null;

  return (
    <>
      <div className="p-2">
        <Breadcrumb>
          <Item href={"/"}>Home</Item>
          <Item href={"/ktc-audio-gallery"}>ktc-audio-gallery</Item>
          <Item href={"/ktc-audio-gallery"}> {singleProduct} </Item>
        </Breadcrumb>
      </div>
      <Container>
        <div className="w-full flex flex-col mx-auto gap-4 mt-4 sm:p-4">
          <div className="w-full">
            <ImageGallery product={data.gallery} />
          </div>
          <div className="px-2">
            <p className="text-4xl font-medium">{data.gallery.title}</p>
            <p className="font-medium">
              {data.gallery.title} | {data.gallery.title}
            </p>
          </div>
          <GalleryDetails product={data.gallery} />
        </div>
      </Container>
    </>
  );
};

export default SingleProduct;
