"use client";
import { s3BucketUrl } from "@/app/utils/api";
import { TInventoryItem } from "@/types/product";
import { useEffect, useState } from "react";
import Gallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const ImageGallery = ({ product }: { product: TInventoryItem }) => {
  const isCustomProduct = false;
  const [thumbnail, setThumbnail] = useState<
    { original: string; thumbnail: string }[]
  >([]);
  const [galleryImages, setGalleryImages] = useState<typeof thumbnail>([]);
  const productImages = [...thumbnail, ...galleryImages];
  const imageNotFound = [
    {
      original: "/not-available.webp",
      thumbnail: "/not-available.webp",
    },
  ];

  // add gallery Images
  useEffect(() => {
    const galleryImages = product.galleryImages || [];
    if (galleryImages?.length > 0) {
      interface Image {
        original: string;
        thumbnail: string;
      }

      const images: Image[] = [];
      galleryImages.forEach((imageLink) => {
        images.push({
          original: isCustomProduct ? `${s3BucketUrl}/${imageLink}` : imageLink,
          thumbnail: isCustomProduct
            ? `${s3BucketUrl}/${imageLink}`
            : imageLink,
        });
      });
      setGalleryImages(images);
    }
  }, [product.galleryImages]);

  // add thumbnail
  useEffect(() => {
    if (product.thumbnail !== "") {
      setThumbnail([
        {
          original: product.thumbnail,
          thumbnail: product.thumbnail,
          // isCustomProduct
          //   ? `${s3BucketUrl}/${product.thumbnail}`
          //   : product.thumbnail,
          // thumbnail: isCustomProduct
          //   ? `${s3BucketUrl}/${product.thumbnail}`
          //   : product.thumbnail,
        },
      ]);
    }
  }, [product.thumbnail]);

  return (
    <div className="flex justify-center">
      <div className="w-4/5 md:w-3/5">
        <Gallery
          showPlayButton={false}
          showNav={true}
          showFullscreenButton={false}
          items={productImages.length > 0 ? productImages : imageNotFound}
        />
      </div>
    </div>
  );
};

export default ImageGallery;
