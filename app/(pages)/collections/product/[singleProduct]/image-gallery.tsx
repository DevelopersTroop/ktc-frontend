"use client";
import { TInventoryItem } from "@/types/product";
import { useEffect, useState } from "react";
import Gallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const ImageGallery = ({ product, fallbackImage }: { product: TInventoryItem, fallbackImage: string }) => {
  const [productImages, setProductImages] = useState<
    { original: string; thumbnail: string }[]
  >([]);

  const validateImage = (url: string): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(url);
    img.onerror = () => resolve(fallbackImage);
    img.src = url;
  });
};

  useEffect(() => {
    const loadImages = async () => {
      const imagesToValidate: string[] = [];

      // Main thumbnail first
      if (product.thumbnail) {
        const thumbnailUrl = product.thumbnail;
        imagesToValidate.push(thumbnailUrl);
      }

      // Gallery images
      const galleryImages = product.galleryImages || [];
      galleryImages.forEach((img) => {
        const url = img;
        imagesToValidate.push(url);
      });

      // Validate all
      const validated = await Promise.all(imagesToValidate.map(validateImage));

      // Format for react-image-gallery
      const formatted = validated.map((url) => ({
        original: url,
        thumbnail: url,
      }));

      // Fallback if all are broken
      setProductImages(
        formatted.length > 0 ? formatted : [{ original: fallbackImage, thumbnail: fallbackImage }]
      );
    };

    loadImages();
  }, [product, fallbackImage]);

  return (
    <div className="flex justify-center">
      <div className="w-4/5 md:w-3/5">
        <Gallery
          showPlayButton={false}
          showNav={true}
          showFullscreenButton={false}
          items={productImages}
        />
      </div>
    </div>
  );
};

export default ImageGallery;
