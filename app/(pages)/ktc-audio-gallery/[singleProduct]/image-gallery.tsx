"use client";
import { IGallery } from "@/app/globalRedux/api/gallery";
import { s3BucketUrl } from "@/app/utils/api";
import { normalizeImageUrl } from "@/lib/utils";
import { TInventoryItem } from "@/types/product";
import { useEffect, useState } from "react";
import Gallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const ImageGallery = ({ product }: { product: TInventoryItem | IGallery }) => {
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
    const galleryImages = product?.galleryImages || [];
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
    if (product.item_image !== "") {
      setThumbnail([
        {
          original: isCustomProduct
            ? `${s3BucketUrl}/${product.item_image}`
            : normalizeImageUrl(product.item_image || product.thumbnail || ""),
          thumbnail: isCustomProduct
            ? `${s3BucketUrl}/${product.item_image}`
            : normalizeImageUrl(product.item_image || product.thumbnail || ""),
        },
      ]);
    }
  }, [product.item_image]);

  return (
    <div className="custom-gallery mx-2 flex justify-center">
      <div className="md:w-3/5">
        <Gallery
          showPlayButton={false}
          showNav={true}
          showFullscreenButton={true}
          additionalClass="custom-gallery"
          items={productImages.length > 0 ? productImages : imageNotFound}
          renderLeftNav={(onClick, disabled) => (
            <button
              className="custom-left-nav"
              disabled={disabled}
              onClick={onClick}
            >
              &#10094;
            </button>
          )}
          renderRightNav={(onClick, disabled) => (
            <button
              className="custom-right-nav"
              disabled={disabled}
              onClick={onClick}
            >
              &#10095;
            </button>
          )}
        />
      </div>
    </div>
  );
};

export default ImageGallery;
